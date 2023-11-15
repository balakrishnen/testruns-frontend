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
  DepartmentList,
  LaboratoryList,
  OrganizationList,
} from '../../utils/data';
import { fetchDepartmentData } from '../../api/departmentAPI';

import { postRunsData } from '../../api/RunsAPI';
import { fetchLabData } from '../../api/labAPI';
import Confirmationpopup from '../../components/ConfirmationPopup';
import SuccessPopup from '../../components/SuccessPopup';

const validationSchema = Yup.object().shape({
  procedureId: Yup.string().notRequired(),
  createdAt: Yup.string().notRequired(),
  departmentId: Yup.array().notRequired(),
  laboratoryId: Yup.array().notRequired(),
  objective: Yup.string().notRequired(),
  dueDate: Yup.string().notRequired(),
  assignedTo: Yup.string().notRequired(),
});

const RunsForm = React.forwardRef(
  ({ openConfirmationPopup, type }: any, ref) => {
    // const [openDlg2Dialog, setDialog2Open] = React.useState(false);
    // const [openSuccess, setSuccessOpen] = React.useState(false);
    const [answers, setAnswers] = React.useState('');
    const [departmentData, setDepartmentData] = React.useState([]);
    const [laboratory, setLaboratory] = React.useState([]);
    const [departments, setDepartments] = React.useState([]);
    const [labData, setLabData] = React.useState([]);
    const dispatch: any = useDispatch();
    const confirmationPopupRef: any = React.useRef();
    const successPopupRef: any = React.useRef();
    const Placeholder = ({ children }: any) => {
      return <div>{children}</div>;
    };
    const [runsOpen, setRunsOpen] = React.useState(false);
    const [runCreate, setRunsCreate] = React.useState(false);
    React.useImperativeHandle(ref, () => ({
      open(state: any) {
        setRunsCreate(state);
      },
    }));
    // const departments: any = [];
    // const laboratory: any = [];
    const checkCredentials = (values: any) => {
      return true;
    };
    const onSubmit = (values: any) => {
      const isMatch = checkCredentials(values.name);
      if (isMatch) {

        var deptArray: any = []
        departments.map((item: any) => (deptArray.push(item?.id)))
        var labArray: any = []
        laboratory.map((item: any) => (labArray.push(item?.id)))
        let runsValues = {
          objective: values.objective,
          procedureId: values.procedureId,
          departmentId: deptArray,
          laboratoryId: labArray,
          assignedTo: values.assignedTo,
          assignedBy: values.assignedBy,
          dueDate: values.dueDate,
          status: values.status,
          organisationId: values.organisationId,
          // procedureId:values.procedure,
          // createdAt:values.createdAt ,
          // departmentId:values.departmentId,
          // laboratoryId:values.laboratoryId,
          // objective:values.objective,
          // dueDate:values.dueDate,
          // assignedTo:values.assignedTo,
        }
        // console.log(assetValues);

        dispatch(postRunsData(runsValues));
        submitFormPopup()
        // console.log("depart",departments)
        // console.log("lab",laboratory)
      } else {
        formik.setFieldError('name', 'Invalid first name');
      }
    };

    const formik = useFormik({
      initialValues: {
        organisationId: '',
        procedureId: '',
        departmentId: [],
        laboratoryId: [],
        objective: '',
        dueDate: new Date(),
        assignedBy: "username",
        assignedTo: 'toy',
        status: "Created"
      },
      validationSchema: validationSchema,
      onSubmit: onSubmit,
    });

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

    // const handleAddButtonClick = () => {
    //     setSuccessOpen(true);
    //     closeFormPopup(false)
    //     setTimeout(() => {
    //       setSuccessOpen(false);
    //     }, 3000);
    //   };
    //   const handleConfirmationYes = () => {
    //     setDialog2Open(false);
    //     closeFormPopup(false)
    //   };

    const handleConfirmationState = (state: number) => {
      if (state === 0) {
        confirmationPopupRef.current.open(false);
      } else {
        confirmationPopupRef.current.open(false);
        setRunsCreate(false);
      }
    };

    const submitFormPopup = () => {
      setRunsCreate(false);
      successPopupRef.current.open(true, 'Run');
      setTimeout(() => {
        successPopupRef.current.open(false, 'Run');
      }, 3000);
    };

    return (
      <div>
        {/* <Confirmationpopup
              ref={confirmationPopupRef}
              confirmationDone={handleConfirmationDone}
                // open={openDlg2Dialog}
                // close={() => setDialog2Open(false)}
                // handleConfirmationYes={handleConfirmationYes}
            />
            <Successpopup open={openSuccess} type={"Runs"} close={() => setSuccessOpen(false)} /> */}
        <Dialog
          open={runCreate}
          keepMounted
          aria-labelledby="add-new-asset-title"
          aria-describedby="add-new-asset"
          fullWidth
          maxWidth="md"
          className="popup-outer"
        >
          <form onSubmit={formik.handleSubmit}>
            <Box className="popup-section">
              <Box className="title-popup">
                <Typography>{type} Run</Typography>
                <CloseIcon onClick={() => setRunsCreate(false)} />
              </Box>
              <Box>
                <Grid container className="asset-popup" spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Procedure name</label>
                      <TextField
                        margin="normal"
                        // required
                        fullWidth
                        id="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="organisationId"
                        autoComplete="name"
                        autoFocus
                        InputLabelProps={{ shrink: false }}
                        placeholder="ID023659ADN"
                        className="bg-gray-input"
                        size="small"
                        value={formik.values.organisationId}
                        error={formik.touched.organisationId && Boolean(formik.errors.organisationId)}
                      />
                      {formik.touched.organisationId &&
                        formik.errors.organisationId && (
                          <Typography className="error-field">
                            {formik.errors.organisationId}
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
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>
                        Procedure Id (autogenerated)
                      </label>
                      <TextField
                        margin="none"
                        fullWidth
                        id="procedureId"
                        name="procedureId"
                        autoComplete="procedureId"
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
                      // disabled
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    className="asset-popup calender-sec"
                  >
                    <Box>
                      <label>Created on</label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker format="DD/MM/YYYY" />
                      </LocalizationProvider>
                      {formik.touched.dueDate && formik.errors.dueDate && (
                        <Typography className="error-field">
                          Date required
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
                    <Box>
                      <label style={{ display: 'block' }}>Department/s</label>

                      <Autocomplete
                        multiple
                        id="departmentId"

                        value={departments}
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
                        onChange={(_, selectedOptions: any) => setDepartments(selectedOptions)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                        placeholder="Department"
                        size="medium"
                      // onChange={(e, f) => {
                      //   f.forEach((element) => departments.push(element.id));
                      //   formik.setFieldValue('departmentId', departments);
                      // }}
                      // disabled
                      // onChange={formik.handleChange}
                      // onBlur={formik.handleBlur}
                      // value={formik.values.department}
                      // error={
                      //   formik.touched.department &&
                      //   Boolean(formik.errors.department)
                      // }
                      />
                      {formik.touched.departmentId &&
                        formik.errors.departmentId && (
                          <Typography className="error-field">
                            {formik.errors.departmentId}
                          </Typography>
                        )}
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box>
                      <label style={{ display: 'block' }}>Laboratory/ies</label>

                      <Autocomplete
                        multiple
                        id="laboratoryId"
                        value={laboratory}
                        options={labData !== undefined ? labData : []}
                        disableCloseOnSelect
                        getOptionLabel={(option: any) => option.label}
                        // renderOption={(props, option, { selected }) => (
                        //   <li {...props}>
                        //     <Checkbox
                        //       style={{ marginRight: 0 }}
                        //       checked={selected}
                        //     />
                        //     {option.label}
                        //   </li>
                        // )}
                        renderInput={(params) => <TextField {...params} />}
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
                        onChange={(_, selectedOptions: any) => setLaboratory(selectedOptions)}
                      // onChange={(e, f) => {
                      //   f.forEach((element) => laboratory.push(element.id));
                      //   formik.setFieldValue('laboratoryId', laboratory);
                      // }}
                      // disabled
                      />
                      {formik.touched.laboratoryId &&
                        formik.errors.laboratoryId && (
                          <Typography className="error-field">
                            {formik.errors.laboratoryId}
                          </Typography>
                        )}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Test objective</label>
                      <TextField
                        margin="none"
                        fullWidth
                        id="objective"
                        name="objective"
                        autoComplete="objective"
                        InputLabelProps={{ shrink: false }}
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
                    <Box>
                      <label>Due date</label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker format="DD/MM/YYYY" />
                      </LocalizationProvider>
                      {formik.touched.dueDate && formik.errors.dueDate && (
                        <Typography className="error-field">
                          Date required
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={0} sm={6} md={6} lg={6} />
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingRight: { sm: '1rem !important' } }}
                  >
                    <Box>
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
                  </Grid>
                </Grid>
                {/* <Grid item xs={65} sm={12} md={12} lg={12}>
                    <Box>
                      <label
                        style={{ display: 'block', marginBottom: '0.8rem' }}
                      >
                        Assign to
                      </label>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src={Avatars} alt="Avatars" />
                        <Button
                          type="submit"
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
                <Button type="submit" variant="contained" className="add-btn">
                  {type === 'edit' ? 'Update' : 'Create'}
                </Button>
              </Box>
            </Box>
          </form>
        </Dialog>
        <AddPeoplePopup open={runsOpen} close={() => setRunsOpen(false)} />
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
