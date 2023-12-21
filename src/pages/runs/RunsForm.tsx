/* eslint-disable react/display-name */
import React from 'react';
import Dialog from '@mui/material/Dialog';
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  Checkbox,
  Autocomplete,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import Avatars from '../../assets/images/Avatars.svg';
import AddIcon from '@mui/icons-material/Add';
import AddPeoplePopup from '../../components/AddPeoplePopup';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProcedureData,
  deleteProcedureData,
} from '../../api/procedureAPI';
import {
  DepartmentList,
  LaboratoryList,
  OrganizationList,
} from '../../utils/data';
import { fetchDepartmentData } from '../../api/departmentAPI';

import { fetchSingleRunsData, fetchUpdateRunsData, postRunsData } from '../../api/RunsAPI';
import { fetchLabData } from '../../api/labAPI';
import Confirmationpopup from '../../components/ConfirmationPopup';
import SuccessPopup from '../../components/SuccessPopup';
import dayjs from 'dayjs';
import moment from 'moment';
import { toast } from 'react-toastify';
import { navigate } from 'gatsby';

const validationSchema = Yup.object().shape({
  procedureId: Yup.string().required("Procedure name is required" ),
  createdOn: Yup.string().required('Created date is required'),
  departmentId: Yup.array().notRequired(),
  laboratoryId: Yup.array().notRequired(),
  objective: Yup.string().trim().required('Test Objective is required').max(20, 'Label must be at most 20 characters').matches(/^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/, 'Label cannot have empty spaces'),
  // dueDate: Yup.date().required('Due Date is required'),
  dueDate: Yup.string().required('Due Date is required'),
  assignedTo: Yup.string().notRequired(),
  organisationId:Yup.string().required('Procedure Name is required')
});

const RunsForm = React.forwardRef(
  ({ openConfirmationPopup, type, formData, reload,handleReloadSingleData }: any, ref) => {
    // const [openDlg2Dialog, setDialog2Open] = React.useState(false);
    // const [openSuccess, setSuccessOpen] = React.useState(false);

    console.log('formData', formData)
    const [answers, setAnswers] = React.useState('');
    const [procedureData, setprocedureData] = React.useState('');
    const [departmentData, setDepartmentData] = React.useState([]);

    let DepartmentData = formData?.departmentId?.map((item: any) => ({
      label: item.name,
      value: item.name,
      id: item._id,
    }))
    console.log('DepartmentData', DepartmentData)

    let LabData = formData?.laboratoryId?.map((item: any) => ({
      label: item.name,
      value: item.name,
      id: item._id,
    }))
    const loginUserSliceData=  useSelector(
      (state: any) => state.userLogin.data, 
    );
    const [lab, setLab] = React.useState(LabData ? LabData : [])

    const [department, setDepartment] = React.useState(DepartmentData ? DepartmentData : [])

    const [departments, setDepartments] = React.useState(
      DepartmentData
    );
    const [laboratory, setLaboratory] = React.useState(
      formData?.laboratoryId?.map((item: any) => ({
        label: item?.name,
        value: item?.name,
        id: item?._id,
      })),
    );
    const [labData, setLabData] = React.useState([]);
    const dispatch: any = useDispatch();
    const confirmationPopupRef: any = React.useRef();
    const successPopupRef: any = React.useRef();
    const Placeholder = ({ children }: any) => {
      return <div>{children}</div>;
    };
    const [runsOpen, setRunsOpen] = React.useState(false);
    const [runCreate, setRunsCreate] = React.useState(false);
    const runzSliceData = useSelector(
      (state: any) => state.runs.data
    );
  
    React.useEffect(()=>{
      console.log("procedureId",runzSliceData?.get_run?.procedureId._id);
      
      formik.setFieldValue('objective',runzSliceData?.get_run?.objective)
      formik.setFieldValue('laboratoryId',runzSliceData?.get_run?.laboratoryId)
      formik.setFieldValue('departmentId',runzSliceData?.get_run?.departmentId)
      // formik.setFieldValue('procedureId',runzSliceData?.get_run?.procedureId[0]?._id)
      formik.setFieldValue('dueDate', type == 'edit' ? dayjs(runzSliceData?.get_run?.dueDate) : null)

      
      console.log("runzSliceData",runzSliceData);
      
    },[runzSliceData])
    React.useImperativeHandle(ref, () => ({
      open(state: any,row: any) {
        setRunsCreate(state)
        if (row?._id) {
       
          let payload={
            _id:row?._id
          }
        dispatch(fetchSingleRunsData(payload))
        formik.setFieldValue('procedureId',runzSliceData?.get_run?.procedureId?._id)
        // console.log("procedureId",runzSliceData?.get_run?.procedureId[0]?._id);
        }
      },
    }));
    // const departments: any = [];
    // const laboratory: any = [];
    const checkCredentials = (values: any) => {
      return true;
    };
    const onSubmit = async(values: any) => {
      const isMatch = checkCredentials(values.name);
      console.log('values.createdOn', values.createdOn);
      
      if (isMatch) {

        var deptArray: any = []
        departments.map((item: any) => (deptArray.push(item?.id)))
        var labArray: any = []
        laboratory.map((item: any) => (labArray.push(item?.id)))
        let runsValues: any = {
          objective: values.objective,
          procedureId: values.procedureId,
          departmentId: deptArray,
          laboratoryId: labArray,
          assignedTo: values.assignedTo,
          assignedBy: values.assignedBy,
          dueDate: values.dueDate,
          createdOn: moment(values.createdOn.$d).format('MM/DD/YYYY'),
          status: values.status,
          organisationId: values.organisationId,
          // procedureDetials:values.procedureDetials

        };

        if (type == 'edit') {
          runsValues['_id'] = formData._id
        }
        if (type == 'edit') {
         await dispatch(fetchUpdateRunsData(runsValues))
         setTimeout(()=>{
          handleReloadSingleData()
         },2000)
          
        }
        else {
          dispatch(postRunsData(runsValues)); 
          
        }
        submitFormPopup();
          reload()
        clearForm()
        

      } else {
        formik.setFieldError('name', '');
      }
    };
    const createdDate = type === 'edit' ? dayjs(moment(formData?.createdOn).format('MM/DD/YYYY')) : dayjs(moment(new Date()).format('MM/DD/YYYY')) ;

    var dateDue = (type == 'edit' ? dayjs(formData?.dueDate) : null);
    console.log("date",moment(new Date()).format('MM/DD/YYYY'));
    console.log("type",type);
    const formik = useFormik({
      initialValues: {
        departmentId: formData ? formData.departmentId : "",
        laboratoryId: formData ? formData.laboratoryId : "",
        organisationId: '657420e5c63327a74f3c756a',
        procedureId: formData ? formData.procedureId?._id : '',
        objective: formData ? formData.objective : '',
        dueDate: dateDue,
        createdOn: type=='edit' ? createdDate : dayjs(moment(new Date()).format('MM/DD/YYYY')),
        assignedBy: loginUserSliceData?.verifyToken?._id,
        assignedTo:loginUserSliceData?.verifyToken?._id,
        status: "Created",
        // procedureDetials:""
      },
      validationSchema: validationSchema,
      onSubmit: onSubmit,
    });

    console.log(formik);
    
    const departmentSliceData = useSelector(
      (state: any) => state.department.data?.get_all_departments,
    );
    const labSliceData = useSelector(
      (state: any) => state.lab.data?.get_all_labs,
    );
    React.useEffect(() => {
      setDepartmentData(
        departmentSliceData?.map((item: any) => ({
          label: item.name,
          value: item.name,
          id: item._id,
        })),
      );
      setLabData(
        labSliceData?.map((item: any) => ({
          label: item.name,
          value: item.name,
          id: item._id,
        })),
      );
    }, [departmentSliceData, labSliceData]);

    console.log(departmentData);

    console.log(DepartmentList);

    React.useEffect(() => {
      dispatch(fetchDepartmentData());
      dispatch(fetchLabData());
    }, []);

    const handleDateChanges = (selectedDate: any, name: any) => {
      const formattedDate = moment(selectedDate?.$d).format('MM/DD/YYYY');
      formik.handleChange(name)(formattedDate);
    }
    const handleConfirmationState = (state: number) => {
      if (state === 0) {
        confirmationPopupRef.current.open(false);
      } else {
        confirmationPopupRef.current.open(false);
        setRunsCreate(false);
        clearForm()
      }
    };

    const submitFormPopup = () => {
      setRunsCreate(false);
      toast(`Runs ${type=='edit'?'updated':'created'} !`, {
        style: {
          background: '#00bf70', color: '#fff'
        }
      });
      // if(type=='edit'){
       
      // }
      clearForm()
      // successPopupRef.current.open(true, 'Run');
      // setTimeout(() => {
      //   successPopupRef.current.open(false, 'Run');
      // }, 3000);
    };
    const clearForm = () => {
      formik.resetForm();
      setDepartment([]);
      setLab([]);
      formik.dirty=false
      // setOrganization([]);
    };
    const procedureSliceData = useSelector(
      (state: any) => state.procedure.data?.get_all_procedures,
    );
    React.useEffect(() => {
      dispatch(fetchProcedureData({
        page: 1,
        perPage: 25
      }));
    }, []);

    return (
      <div>
        <Dialog
          open={runCreate}
          keepMounted
          aria-labelledby="add-new-asset-title"
          aria-describedby="add-new-asset"
          fullWidth
          maxWidth="md"
          className="popup-outer"
          disableScrollLock={ true }
        >
          <form onSubmit={formik.handleSubmit}>
            <Box className="popup-section">
              <Box className="title-popup">
                <Typography>{type} Run</Typography>
                <CloseIcon onClick={() => {
                  if (type !== 'edit') {

                    formik.resetForm();
                    setDepartment([]);
                    setLab([]);
                  }
                  setRunsCreate(false);
                }} />
              </Box>
              <Box>
                <Grid container className="asset-popup" spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Procedure name<span style={{ color: "#E2445C" }}>*</span></label>
                      <Select
                      MenuProps={{                   
                        disableScrollLock: true,                   
                        marginThreshold: null
                      }}
                        className="placeholder-color"
                        displayEmpty
                        IconComponent={ExpandMoreOutlinedIcon}
                        renderValue={
                          formik.values.procedureId !== ''
                            ? undefined
                            : () => (
                              <Placeholder>Select Procedure</Placeholder>
                            )
                        }
                        margin="none"
                        fullWidth
                        id="procedureId"
                        name="procedureId"
                        // autoComplete="organisationId"
                        placeholder="organisationId"

                        onChange={(e) => {
                          formik.handleChange(e);

                          const selectedProcedure = procedureSliceData?.Procedures.find(
                            (item:any) => item._id === e.target.value
                          );
                          let LabData = selectedProcedure?.laboratoryId?.map((item: any) => ({
                            label: item.name,
                            value: item.name,
                            id: item._id,
                          }))

                          console.log("LabData", LabData)
                          formik.setFieldValue('laboratoryId', LabData || '');
                          setLaboratory(
                            LabData
                          );
                          let DepartmentData = selectedProcedure?.departmentId?.map((item: any) => ({
                            label: item.name,
                            value: item.name,
                            id: item._id,
                          }))
                          setDepartments(DepartmentData)

                          formik.setFieldValue('procedureId', selectedProcedure?._id || '');
                          formik.setFieldValue('departmentId', DepartmentData || '');
                          setDepartment(DepartmentData)
                          setLab(LabData)

                        }}
                        onBlur={formik.handleBlur}
                        // getOptionLabel={(option: any) => option.label}
                        // isOptionEqualToValue={(option: any, value: any) =>
                        //       value.id == option.id
                        //     }
                        value={formik.values.procedureId}
                        size="small"
                        error={
                          formik.touched.procedureId &&
                          Boolean(formik.errors.procedureId)
                        }
                      >
                        {procedureSliceData?.Procedures.map((item, index) => (
                          <MenuItem key={index} value={item._id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched.procedureId &&
                        formik.errors.procedureId && (
                          <Typography className="error-field">
                            {formik.errors.procedureId}
                          </Typography>
                        )}
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingRight: { sm: '1rem !important' } }}
                  >
                    {type=='edit'?
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>
                       Run Id(autogenerated)
                      </label>
                      <TextField
                        margin="none"
                        fullWidth
                        id="procedureId"
                        name="procedureId"
                        // autoComplete="procedureId"
                        InputLabelProps={{ shrink: false }}
                        placeholder="Procedure Id"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formData?.runNumber}
                        size="small"
                        error={
                          formik.touched.procedureId &&
                          Boolean(formik.errors.procedureId)
                        }
                        disabled
                      />
                    </Box>
                    :
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>
                        Procedure Id (autogenerated)
                      </label>
                      <TextField
                        margin="none"
                        fullWidth
                        id="procedureId"
                        name="procedureId"
                        // autoComplete="procedureId"
                        InputLabelProps={{ shrink: false }}
                        placeholder="Procedure Id"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.procedureId}
                        size="small"
                        error={
                          formik.touched.procedureId &&
                          Boolean(formik.errors.procedureId)
                        }
                        disabled
                      />
                    </Box>
  }
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    className="asset-popup calender-sec"
                  >
                    <Box style={{position:'relative'}}>
                      <label>Created on</label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker format="MM/DD/YYYY" value={formik.values.createdOn} disabled disablePast />
                      </LocalizationProvider>
                      {formik.touched.createdOn && formik.errors.createdOn && (
                        <Typography className="error-field">
                          Created Date is required
                        </Typography>
                      )}
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    className="multi-selection"
                    sx={{ paddingRight: { sm: '1rem !important' } }}
                  >
                    <Box style={{position:'relative'}}>
                      <label style={{ display: 'block' }}>Department/s</label>
                      <Autocomplete
                        multiple
                        id="departmentId"
                        value={department}
                        options={
                          departmentData !== undefined ? departmentData : []
                        }
                        disableCloseOnSelect
                        getOptionLabel={(option: any) => option.label}
                        isOptionEqualToValue={(option: any, value: any) => value.id == option.id}
                        renderOption={(props, option: any, { selected }) => (
                          <React.Fragment>
                            <li {...props}>
                              <Checkbox
                                style={{ marginRight: 0 }}
                                checked={selected}
                              />
                              {option.value}
                            </li>

                          </React.Fragment>
                        )}
                        onChange={(_, selectedOptions: any) => setDepartment(selectedOptions)}
                        renderInput={(params) => <TextField {...params} value={params.value} placeholder={department?.length==0?"Department/s":""}  />}
                        fullWidth
                        placeholder="Department"
                        size="medium"

                        disabled

                      />
                      {/* {formik.touched.departmentId &&
                        formik.errors.departmentId && (
                          <Typography className="error-field">
                            {formik.errors.departmentId}
                          </Typography>
                        )} */}
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6} className="multi-selection">
                    <Box style={{position:'relative'}}>
                      <label style={{ display: 'block' }}>Laboratory/ies</label>

                      <Autocomplete
                        multiple
                        id="laboratoryId"
                        value={lab}
                        options={labData !== undefined ? labData : []}
                        disableCloseOnSelect
                        getOptionLabel={(option: any) => option.label}

                        renderInput={(params) => <TextField {...params} placeholder={lab?.length==0?"Laboratory/ies":""} />}
                        fullWidth

                        placeholder="Laboratory"
                        size="medium"
                        renderOption={(props, option: any, { selected }) => (
                          <React.Fragment>
                            <li {...props}>
                              <Checkbox
                                style={{ marginRight: 0 }}
                                checked={selected}
                              />
                              {option.value}
                            </li>

                          </React.Fragment>
                        )}
                        onChange={(_, selectedOptions: any) => {setLaboratory(selectedOptions) }}

                        disabled
                      />
                      {/* {formik.touched.laboratoryId &&
                        formik.errors.laboratoryId && (
                          <Typography className="error-field">
                            {formik.errors.laboratoryId}
                          </Typography>
                        )} */}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block', marginBottom: '8px' }}>Test objective<span style={{ color: "#E2445C" }}>*</span></label>
                      <TextField
                        margin="none"
                        fullWidth
                        id="objective"
                        name="objective"
                        autoComplete="off"
                        InputLabelProps={{ shrink: false }}
                        inputProps={{ maxLength: 20 }}
                        placeholder="Test objective"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.objective}
                        size="small"
                        error={
                          formik.touched.objective &&
                          Boolean(formik.errors.objective)
                        }
                      />
                       {formik.touched.objective &&
                        formik.errors.objective && (
                          <Typography className="error-field">
                            {formik.errors.objective}
                          </Typography>
                        )}
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingRight: { sm: '1rem !important' } }}
                    className="asset-popup calender-sec"
                  >
                    <Box style={{position:'relative'}}>
                      <label>Due date<span style={{ color: "#E2445C" }}>*</span></label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker format="MM/DD/YYYY"  disablePast onChange={(selectedDate: any) => handleDateChanges(selectedDate, 'dueDate')} value={formik.values.dueDate} />
                      </LocalizationProvider>
                      {formik.touched.dueDate && formik.errors.dueDate && (
                        <Typography className="error-field">
                        Due Date is required
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  
                  <Grid item xs={0} sm={6} md={6} lg={6} />
                  {/* <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingRight: { sm: '1rem !important' } }}
                  >
                    <Box style={{position:'relative'}}>
                      <label
                        style={{ display: 'block', marginBottom: '0.8rem' }}
                      >
                        Assign to
                      </label>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src={Avatars} alt="Avatars" />
                        <Button
                          variant="contained"
                          className="avatar-add"
                          onClick={() => {
                            setRunsOpen(true);
                          }}
                        >
                          <AddIcon sx={{ mr: 1 }} />
                          Add
                        </Button>
                      </Box>
                    </Box>
                  </Grid> */}
                </Grid>

              </Box>
              
              <Box
                sx={{
                  display: { xs: 'block', sm: 'flex' },
                  justifyContent: 'flex-end',
                  mt: 3,
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    confirmationPopupRef.current.open(true);
                  }}
                  className="cancel-btn"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" disabled={type=='edit'?!formik.dirty:false} className="add-btn">
                  {type === 'edit' ? 'Update' : 'Create'}
                </Button>
              </Box>
            </Box>
          </form>
        </Dialog>
        <AddPeoplePopup open={runsOpen} close={() => setRunsOpen(false)} 
        // runzId={runzId}
        //         runzRow={runzRow}
        //         typePopup={typePopup}
                 />
        <Confirmationpopup
          ref={confirmationPopupRef}
          confirmationState={handleConfirmationState}
          type={type}
        />
        <SuccessPopup ref={successPopupRef} type={type} />
      </div>
    );
  },
);
export default RunsForm;
