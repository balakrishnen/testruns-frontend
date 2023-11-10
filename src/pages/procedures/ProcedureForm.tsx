/* eslint-disable react/display-name */
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Checkbox,
  Autocomplete,
  FormControl,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LaboratoryList, DepartmentList } from '../../utils/data';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDepartmentData } from '../../api/departmentAPI';
import { fetchLabData } from '../../api/labAPI';
import { fetchUpdateProcedureData, postProcedureData } from '../../api/procedureAPI';
import Confirmationpopup from '../../components/ConfirmationPopup';
import SuccessPopup from '../../components/SuccessPopup';
import { fetchUpdateAssetsData } from '../../api/assetsAPI';
// import Confirmationpopup from "../../components/ConfirmationPopup";
// import Successpopup from "../../components/SuccessPopup";
const validationSchema = Yup.object().shape({
  organisationId: Yup.string().notRequired(),
  createdBy: Yup.string().notRequired(),
  departmentId: Yup.array().notRequired(),
  laboratoryId: Yup.array().notRequired(),
  name: Yup.string().notRequired(),
});

const ProcedureForm = React.forwardRef(
  ({ open, close, closeFormPopup, type ,formData}: any, ref) => {
    // const [openDlg2Dialog, setDialog2Open] = React.useState(false);
    // const [openSuccess, setSuccessOpen] = React.useState(false);
    console.log(formData);

    const [openForm, setFormOpen] = React.useState(false);
    // const departments: any = [];
    // const laboratory: any = [];
    const [departmentData, setDepartmentData] = React.useState([]);
    const [labData, setLabData] = React.useState([]);
    const dispatch: any = useDispatch();
    const confirmationPopupRef: any = React.useRef();
    const successPopupRef: any = React.useRef();
    const [departments, setDepartments] = React.useState(
      formData?.departmentId?.map((item: any) => ({
        label: item?.name,
        value: item?.name,
        id: item?._id,
      })),
    );
    const [laboratory, setLaboratory] = React.useState(
      formData?.laboratoryId?.map((item: any) => ({
        label: item?.name,
        value: item?.name,
        id: item?._id,
      })),
    );
    // const handleAddButtonClick = () => {
    //     setSuccessOpen(true);
    //     closeFormPopup();
    //     setTimeout(() => {
    //       setSuccessOpen(false);
    //     }, 2000);
    //   };
    //   const handleConfirmationYes = () => {
    //     setDialog2Open(false);
    //     closeFormPopup();
    //   };
    const checkCredentials = (values: any) => {
      return true;
    };
    const onSubmit = (values: any) => {
      console.log(values);

      const isMatch = checkCredentials(values.name);
      var deptArray:any=[]
      departments.map((item:any)=>(deptArray.push(item?.id)))
      var labArray:any=[]
      laboratory.map((item:any)=>(labArray.push(item?.id)))
      const procedures: any = {
        name: values.name,
        // organisationId: values.organisationId,
        departmentId: deptArray,
        laboratoryId: labArray,
        createdBy: values.createdBy,
      };
      if(type=='create'){
        procedures['organisationId']=values.organisationId
      }
      else{
        procedures['_id']=formData._id
      }
      console.log(procedures);
      
      if (isMatch) {
        if(type=='edit'){
          dispatch(fetchUpdateProcedureData(procedures))
          submitFormPopup();
        }
        else{
          dispatch(postProcedureData(procedures));
          submitFormPopup();
        }
      }
    };
    React.useImperativeHandle(ref, () => ({
      open(state: any) {
        setFormOpen(state);
      },
    }));
    // const[formValues,setFormValues]=React.useState<any>({})

    // React.useEffect(()=>{
    //   if(formData?.name)
    //   setFormValues(formData)
    // },[])


    // const initialValues = {
    //   name: formData?.name,
    //   createdBy: new Date(),
    //   departmentId: formData?.departmentId,
    //   laboratoryId: formData?.laboratoryId,
    //   organisationId: formData?.organisationId,
    // };
    // console.log(initialValues);
    const formik = useFormik({
      initialValues:{
        name: formData?formData.name:'',
        createdBy: new Date(),
        departmentId: formData?formData.departmentId:"",
        laboratoryId: formData?formData.laboratoryId:"",
        organisationId: formData?formData.organisationId:"",
      },
      validationSchema: validationSchema,
      onSubmit: onSubmit,
    });
    // console.log(formValues);

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

    console.log(laboratory);

    React.useEffect(() => {
      dispatch(fetchDepartmentData());
      dispatch(fetchLabData());
    }, []);

    const handleConfirmationState = (state: any) => {
      if (state === 0) {
        confirmationPopupRef.current.open(false);
      } else {
        confirmationPopupRef.current.open(false);
        setFormOpen(false);
      }
    };

    const submitFormPopup = () => {
      setFormOpen(false);
      successPopupRef.current.open(true, 'Procedure');
      setTimeout(() => {
        successPopupRef.current.open(false, 'Procedure');
      }, 3000);
    };
console.log(type);

    return (
      <div>
        {/* <Confirmationpopup
                open={openDlg2Dialog}
                close={() => setDialog2Open(false)}
                handleConfirmationYes={handleConfirmationYes}
            />
            <Successpopup open={openSuccess} type={"Procedures"} close={() => setSuccessOpen(false)} /> */}
        <Dialog
          open={openForm}
          keepMounted
          // onClose={() => closeFormPopup(false)}
          aria-labelledby="add-new-asset-title"
          aria-describedby="add-new-asset"
          fullWidth
          maxWidth="md"
          className="popup-outer"
        >
          <form onSubmit={formik.handleSubmit}>
            <Box className="popup-section">
              <Box className="title-popup">
                <Typography>{type} Procedure</Typography>
                <CloseIcon onClick={() => closeFormPopup(false)} />
              </Box>

              <Box>
                <Grid
                  container
                  spacing={2}
                  className="asset-popup calender-sec"
                >
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingRight: { sm: '1rem !important' } }}
                  >
                    <Box>
                      <label style={{ display: 'block' }}>
                        Procedure ID (autogenerated)
                      </label>
                      <TextField
                        margin="normal"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        // required
                        fullWidth
                        id="name"
                        name="organisationId"
                        autoComplete="name"
                        autoFocus
                        InputLabelProps={{ shrink: false }}
                        placeholder="ID023659ADN"
                        className="bg-gray-input"
                        value={formData?._id}
                        disabled
                        size="small"
                        // error={
                        //   formik.touched.organisationId &&
                        //   Boolean(formik.errors.organisationId)
                        // }
                      />
                      {/* {formik.touched.organisationId &&
                        formik.errors.organisationId && (
                          <Typography className="error-field">
                            {formik.errors.organisationId}
                          </Typography>
                        )} */}
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{
                      paddingLeft: { sm: '1rem !important' },
                      paddingTop: {
                        xs: '0rem !important',
                        sm: '1rem !important',
                      },
                    }}
                  >
                    <Box className="bg-gray-input">
                      <label style={{ display: 'block' }}>Created on</label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker format="DD/MM/YYYY" />
                      </LocalizationProvider>
                    </Box>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  className="asset-popup multi-selection"
                >
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingRight: { sm: '1rem !important' } }}
                  >
                    <Box>
                      <label style={{ display: 'block' }}>Department</label>
                      <Autocomplete
                              multiple
                              id="departmentId"
                              disableCloseOnSelect
                              value={departments}
                              options={
                                departmentData !== undefined
                                  ? departmentData
                                  : []
                              }
                              getOptionLabel={(option: any) => option.label}
                              isOptionEqualToValue={(option: any, value: any) =>
                                value.id == option.id
                              }
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                              fullWidth
                              placeholder="Department"
                              size="medium"
                              renderOption={(
                                props,
                                option: any,
                                { selected },
                              ) => (
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
                              onChange={(_, selectedOptions: any) =>
                                setDepartments(selectedOptions)
                              }
                            />
                      {/* <Autocomplete
                        multiple
                        id="departmentId"
                        options={
                          departmentData !== undefined ? departmentData : []
                        }
                        disableCloseOnSelect
                        getOptionLabel={(option: any) => option.label}
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>
                            <Checkbox
                              name="departmentId"
                              style={{ marginRight: 0 }}
                              checked={selected}
                            />
                            {option.label}
                          </li>
                        )}
                        disabled={type == 'create' ? true : false}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            className={type == 'create' ? 'bg-gray-input' : ''}
                          />
                        )}
                        fullWidth
                        placeholder="Department"
                        size="medium"
                        onChange={(e, f) => {
                          f.forEach((element) =>
                            departments.push(element.value),
                          );
                          formik.setFieldValue('departmentId', departments);
                        }}
                      /> */}
                      {formik.touched.departmentId &&
                        formik.errors.departmentId && (
                          <Typography className="error-field">
                            {formik.errors.departmentId}
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
                    sx={{
                      paddingLeft: { sm: '1rem !important' },
                      paddingTop: {
                        xs: '0rem !important',
                        sm: '1rem !important',
                      },
                    }}
                  >
                    <Box>
                      <label style={{ display: 'block' }}>Laboratory</label>
                      <Autocomplete
                            multiple
                            id="departmentId"
                            options={labData !== undefined ? labData : []}
                            getOptionLabel={(option: any) => option.label}
                            isOptionEqualToValue={(option: any, value: any) =>
                              value.id == option.id
                            }
                            disableCloseOnSelect
                            value={laboratory}
                            renderInput={(params) => <TextField {...params} />}
                            fullWidth
                            placeholder="Laboratory"
                            size="medium"
                            renderOption={(
                              props,
                              option: any,
                              { selected },
                            ) => (
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
                            onChange={(_, selectedOptions: any) =>
                              setLaboratory(selectedOptions)
                            }
                          />
                      {formik.touched.laboratoryId &&
                        formik.errors.laboratoryId && (
                          <Typography className="error-field">
                            {formik.errors.laboratoryId}
                          </Typography>
                        )}
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className="asset-popup">
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box>
                      <label style={{ display: 'block' }}>
                        Procedure name
                        <span style={{ color: '#E2445C' }}>*</span>
                      </label>
                      <TextField
                        margin="normal"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        size="small"
                        // required
                        fullWidth
                        id="name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        InputLabelProps={{ shrink: false }}
                        placeholder="The simple pendulum"
                        value={formik.values.name}
                        error={
                          formik.touched.name && Boolean(formik.errors.name)
                        }
                      />
                      {formik.touched.name && formik.errors.name && (
                        <Typography className="error-field">
                          {formik.errors.name}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
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
                  className="cancel-btn"
                  onClick={() => {
                    confirmationPopupRef.current.open(true);
                  }}
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
        <SuccessPopup ref={successPopupRef} type={type} />
        <Confirmationpopup
          ref={confirmationPopupRef}
          confirmationState={handleConfirmationState}
          type={type}
        />
      </div>
    );
  },
);
export default ProcedureForm;
