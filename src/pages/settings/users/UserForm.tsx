/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import React from 'react';
import Dialog from '@mui/material/Dialog';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CheckBoxOutlineBlank } from '@mui/icons-material';
import { fetchSingleUserData, fetchUpdateUserData, postUserData } from '../../../api/userAPI';
import {
  DepartmentList,
  InstitutionList,
  LaboratoryList,
  OrganizationList,
  RoleList,
  StatusList,
} from '../../../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartmentData } from '../../../api/departmentAPI';
import { fetchRoleData } from '../../../api/roleApi';
import { fetchLabData } from '../../../api/labAPI';
import SuccessPopup from '../../../components/SuccessPopup';
import Confirmationpopup from '../../../components/ConfirmationPopup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase.config';
import { toast } from 'react-toastify';
import { fetchinstitutionData } from '../../../api/institutionAPI';

const phoneRegExp= /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Lase name is required"),
  email: Yup.string().required("Email is required").email("Invalid email").matches(emailRegex, "In-correct email"),
  phoneNumber: Yup.string().notRequired(),
  // .matches(phoneRegExp, 'Phone number is not valid')
  // .min(10, "Enter valid number")
  // .max(10, "too long").required("Mobile number is required"),
  organisationId: Yup.string().required("Organistation is required"),
  institution: Yup.string().required("Institution is required"),
  departmentId: Yup.array().min(1, 'Please select at least one Department').required('Department is required'),
  laboratoryId: Yup.array().min(1, 'Please select at least one Laboratory').required('Laboratory is required'),
  // user_id: Yup.string().required(),
  role: Yup.string().required("Role is required"),
  // status: Yup.string().required("Status is required"),
});

const UserForm = React.forwardRef(
  ({ closeFormPopup, openConfirmationPopup, reload, rowVal}: any, ref) => {
    const [departments, setDepartments] = React.useState(
      rowVal?.departmentId?.map((item: any) => (departmentSliceData?.find(obj => (obj._id == item) ?{
        label: item?.name,
        value: item?.name,
        id: item?._id,
      }:"")),
    ));
    const [laboratory, setLaboratory] = React.useState(
      rowVal?.laboratoryId?.map((item: any) => ({
        label: item?.name,
        value: item?.name,
        id: item?._id,
      })),
    );
    const [formPopup, setFormPopup] = React.useState(false);
    const [departmentData, setDepartmentData] = React.useState([]);
    const [roleData, setRoleData] = React.useState([]);
    const [labData, setLabData] = React.useState([]);
    const dispatch: any = useDispatch();
    const [type, setType] = React.useState(null);
    const successPopupRef: any = React.useRef();
    const confirmationPopupRef: any = React.useRef();
    const [organizationData, setOrganizationData] = React.useState([]);
    const [institutionData, setInstitutionData] = React.useState([]);
    const[userData, setUserData]=React.useState({})
    const Placeholder = ({ children }: any) => {
      return <div>{children}</div>;
    };
    console.log(userData);

    React.useImperativeHandle(ref, () => ({
      open(state: any, type: any,row: any) {
        setFormPopup(state);
        setType(type);
        let temp = { '_id': row?._id }
        if (row?._id) {
          dispatch(fetchSingleUserData(temp)).then((isSucess) => {
            if (isSucess.get_user) {
              console.log(row, 'isSucess', isSucess.get_user)
              setUserData(isSucess.get_user)
              setDepartments(  isSucess.get_user?.departmentId?.map((item: any) => (departmentData?.find(obj => (obj.id == item) ))))
              formik.setFieldValue('firstName', isSucess.get_user.firstName || '');
              formik.setFieldValue('lastName', isSucess.get_user.lastName || '');
              formik.setFieldValue('email', isSucess.get_user.email || '');
              formik.setFieldValue('phoneNumber', isSucess.get_user.phoneNumber || '');
              formik.setFieldValue('organisationId', isSucess.get_user.organisationId || '');
              formik.setFieldValue('institution', isSucess.get_user.instituteId || '');
              formik.setFieldValue('departmentId', isSucess.get_user?.departmentId?.map((item: any) => (departmentData?.find(obj => (obj.id == item) ))) || []);
              formik.setFieldValue('laboratoryId', isSucess.get_user?.laboratoryId?.map((item: any) => (labData?.find(obj => (obj.id == item) ))) || []);
              formik.setFieldValue('user_id', isSucess.get_user.user_id || '');
              formik.setFieldValue('role', isSucess.get_user.role || '');
              formik.setFieldValue('status', isSucess.get_user.status || '');
              // setRowValue(isSucess.get_uesr)
              setFormPopup(state);
            }
          })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setFormPopup(state);
        }
      },
    }));

    const checkCredentials = (first_name: any) => {
      return true;
    };

    const onSubmit = (values: any) => {
      const isMatch = checkCredentials(values.firstName);
      if (isMatch) {
        var deptArray: any = []
        departments?.map((item: any) => (deptArray.push(item?.id)))
        var labArray: any = []
        laboratory?.map((item: any) => (labArray.push(item?.id)))
        let userValues: any = {
          // uid:"",
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber.toString(),
          organisationId: values.organisationId,
          instituteId: values.instituteId,
          departmentId: deptArray,
          laboratoryId: labArray,
          role: values.role,
        }
        // debugger
        console.log(userValues);
        
        if (type == 'edit') {
          userValues['_id'] = userData?._id
          dispatch(fetchUpdateUserData(userValues))
          submitFormPopup();
          reload()
        }
        else {
          console.log(userValues);
          try {
         createUserWithEmailAndPassword(auth, values.email, "Test@123").then((res)=>{
          userValues['uid'] = res.user.uid,
          dispatch(postUserData(userValues));
          submitFormPopup();
          reload()
        });
        }catch (err){
          console.error(err);
        }
        }
        // clearForm()
      } else {
        formik.setFieldError('first_name', 'Invalid first name');
      }
    };
    const clearForm = () => {
      formik.resetForm();
    };
    const submitFormPopup = () => {
      setFormPopup(false);
      toast(`User ${type=='edit'?"updated" : "created"}  !`, {
        style: {
          background: '#00bf70', color: '#fff'
        }
      });
      // successPopupRef.current.open(true, 'User');
      // setTimeout(() => {
      //   successPopupRef.current.open(false, 'User');
      // }, 3000);
      clearForm()
    };

    const handleConfirmationState = (state: any) => {
      if (state === 0) {
        confirmationPopupRef.current.open(false);
      } else {
        confirmationPopupRef.current.open(false);
        setFormPopup(false);
        clearForm()
      }
    };

    const formik = useFormik({
      initialValues: {
        firstName: rowVal?.firstName ? rowVal?.firstName : '',
        lastName: rowVal?.lastName ? rowVal?.lastName : '',
        email: rowVal?.email ? rowVal?.email : '',
        phoneNumber: rowVal?.phoneNumber ? rowVal?.phoneNumber : '',
        organisationId: rowVal?.organisationId ? rowVal?.organisationId : '',
        institution: rowVal?.instituteId ? rowVal?.instituteId : '',
        departmentId: rowVal?.departmentId ? rowVal?.departmentId : [],
        laboratoryId: rowVal?.laboratoryId ? rowVal?.laboratoryId : [],
        user_id: 'USER_12345678',
        role: rowVal?.role ? rowVal?.role : '',
        status: rowVal?.status ? rowVal?.status : '',
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
    const roleSliceData = useSelector(
      (state: any) => state.role.data?.get_all_roles,
    );
    const organizationSliceData = useSelector(
      (state: any) => state.organization.data?.get_all_organisations,
    );
    const institutionSliceData = useSelector(
      (state: any) => state.institution.data?.get_all_institute,
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
      setRoleData(
        roleSliceData?.map((item: any) => ({
          label: item.name,
          value: item._id,
        })),
      );
      setOrganizationData(
        organizationSliceData?.map((item: any) => ({
          label: item.name,
          value: item.name,
          id: item._id,
        })),
      );
      // setInstitutionData(institutionSliceData.map((item: any) => ({
      //   label: item.name,
      //   value: item.name,
      //   id: item._id,
      // })))
    }, [departmentSliceData, labSliceData, roleSliceData, organizationSliceData,institutionSliceData]);



    console.log(departmentData);

    console.log(DepartmentList);

    React.useEffect(() => {
      dispatch(fetchDepartmentData());
      dispatch(fetchLabData());
      dispatch(fetchRoleData());
      dispatch(fetchinstitutionData())
    }, []);

    return (
      <div>
        <Dialog
          open={formPopup}
          keepMounted
          onClose={() => closeFormPopup(false)}
          aria-labelledby="add-new-asset-title"
          aria-describedby="add-new-asset"
          fullWidth
          maxWidth="md"
          className="popup-outer"
        >
          <form onSubmit={formik.handleSubmit}>
            <Box className="popup-section">
              <Box className="title-popup">
                <Typography>{type} user</Typography>
                <CloseIcon onClick={() => {closeFormPopup(false) , clearForm()}}/>
              </Box>
              <Box>
                <Grid container spacing={2} className="asset-popup">
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingRight: { sm: '1rem !important' } }}
                  >
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>First name</label>
                      <TextField
                        margin="none"
                        fullWidth
                        id="firstName"
                        name="firstName"
                        autoComplete="off"
                        InputLabelProps={{ shrink: false }}
                        placeholder="First name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                        size="small"
                        error={
                          formik.touched.firstName &&
                          Boolean(formik.errors.firstName)
                        }
                      />
                      {formik.touched.firstName &&
                        formik.errors.firstName && (
                          <Typography className="error-field">
                            {formik.errors.firstName}
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
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Last name</label>
                      <TextField
                        margin="normal"
                        fullWidth
                        id="lastName"
                        name="lastName"
                        autoComplete="off"
                        InputLabelProps={{ shrink: false }}
                        placeholder="Last name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                        size="small"
                        error={
                          formik.touched.lastName &&
                          Boolean(formik.errors.lastName)
                        }
                      />
                      {formik.touched.lastName && formik.errors.lastName && (
                        <Typography className="error-field">
                          {formik.errors.lastName}
                        </Typography> 
                      )}
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className="asset-popup">
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingRight: { sm: '1rem !important' } }}
                  >
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Email ID</label>

                      <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        name="email"
                        autoComplete="off"
                        InputLabelProps={{ shrink: false }}
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        size="small"
                        error={
                          formik.touched.email &&
                          Boolean(formik.errors.email)
                        }
                      />
                      {formik.touched.email && formik.errors.email && (
                        <Typography className="error-field">
                          {formik.errors.email}
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
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Mobile number</label>
                      <TextField
                        margin="none"
                        fullWidth
                        id="phoneNumber"
                        type='number'
                        name="phoneNumber"
                        autoComplete="off"
                        onInput={(e:any)=>{ 
                          e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                      }}
                        InputLabelProps={{ shrink: false }}
                        placeholder="Mobile number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phoneNumber}
                        size="small"
                        error={
                          formik.touched.phoneNumber &&
                          Boolean(formik.errors.phoneNumber)
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment sx={{ mx: 2 }} position="start">
                              +91{' '}
                            </InputAdornment>
                          ),
                        }}
                      />
                      {formik.touched.phoneNumber &&
                        formik.errors.phoneNumber && (
                          <Typography className="error-field">
                            {formik.errors.phoneNumber}
                          </Typography>
                        )}
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className="asset-popup">
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingRight: { sm: '1rem !important' } }}
                  >
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Organisation</label>

                      <Select
                        className="placeholder-color"
                        displayEmpty
                        IconComponent={ExpandMoreOutlinedIcon}
                        renderValue={
                          formik.values.organisationId !== ''
                            ? undefined
                            : () => (
                              <Placeholder>
                                Select Organization
                              </Placeholder>
                            )
                        }
                        margin="none"
                        fullWidth
                        id="organisationId"
                        name="organisationId"
                        autoComplete="off"
                        placeholder="Organization"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.organisationId}
                        size="small"
                        error={
                          formik.touched.organisationId &&
                          Boolean(formik.errors.organisationId)
                        }
                      >
                        {organizationData?.map((item: any, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>

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
                    sx={{
                      paddingLeft: { sm: '1rem !important' },
                      paddingTop: {
                        xs: '0rem !important',
                        sm: '1rem !important',
                      },
                    }}
                  >
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Institution</label>

                      <Select
                        className="placeholder-color"
                        displayEmpty
                        IconComponent={ExpandMoreOutlinedIcon}
                        renderValue={
                          formik.values.institution !== ''
                            ? undefined
                            : () => (
                              <Placeholder>Select Institution</Placeholder>
                            )
                        }
                        margin="none"
                        fullWidth
                        id="institution"
                        name="institution"
                        autoComplete="off"
                        placeholder="Institution"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.institution}
                        size="small"
                        error={
                          formik.touched.institution &&
                          Boolean(formik.errors.institution)
                        }
                      >
                        {institutionSliceData?.map((item:any) => (
                          <MenuItem key={item._id} value={item._id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>

                      {formik.touched.institution &&
                        formik.errors.institution && (
                          <Typography className="error-field">
                            {formik.errors.institution}
                          </Typography>
                        )}
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
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Department/s</label>
                      {console.log(formik.values.departmentId)}
                      <Autocomplete
                              multiple
                              id="departmentId"
                              disableCloseOnSelect
                              value={formik.values.departmentId}
                              options={
                                departmentData !== undefined
                                  ? departmentData
                                  : []
                              }
                              getOptionLabel={(option: any) =>option.label }
                              isOptionEqualToValue={(option: any, value: any) =>
                              value.id == option.id
                              }
                              renderInput={(params) => (
                                <TextField {...params} placeholder="Department/s"/>
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
                              onChange={(_, selectedOptions: any) =>{
                                setDepartments(selectedOptions);formik.setValues({...formik.values,'departmentId':selectedOptions})}
                              }
                            />
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
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Laboratory/ies</label>

                      <Autocomplete
                                multiple
                                id="departmentId"
                                value={formik.values.laboratoryId}
                                options={labData !== undefined ? labData : []}
                                getOptionLabel={(option: any) => option?.label}
                                isOptionEqualToValue={(option: any, value: any) =>
                                  value?.id == option?.id
                                }
                                disableCloseOnSelect
                               
                                renderInput={(params) => <TextField {...params} placeholder="Laboratory/ies"/>}
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
                                onChange={(_, selectedOptions: any) =>{
                                  setLaboratory(selectedOptions);formik.setValues({...formik.values,'laboratoryId':selectedOptions}) }
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
                  {/* <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingRight: { sm: '1rem !important' } }}
                  >
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>
                        User ID (autogenerated)
                      </label>
                      <TextField
                        margin="none"
                        fullWidth
                        id="user_id"
                        name="user_id"
                        autoComplete="user_id"
                        InputLabelProps={{ shrink: false }}
                        placeholder="User ID"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.user_id}
                        size="small"
                        error={
                          formik.touched.user_id &&
                          Boolean(formik.errors.user_id)
                        }
                        disabled
                      />
                      {formik.touched.user_id && formik.errors.user_id && (
                        <Typography className="error-field">
                          {formik.errors.user_id}
                        </Typography>
                      )}
                    </Box>
                  </Grid> */}
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
                      paddingRight: { sm: '1rem !important' }
                    }}
                  >
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Select role</label>
                      <Select
                        // MenuProps={{
                        //   PaperProps: {
                        //     style: {
                        //       maxHeight: '150px',
                        //       overflowY: 'auto',
                        //     },
                        //   },
                        // }}
                        className="placeholder-color"
                        displayEmpty
                        IconComponent={ExpandMoreOutlinedIcon}
                        renderValue={
                          formik.values.role !== ''
                            ? undefined
                            : () => <Placeholder>Select Role</Placeholder>
                        }
                        margin="none"
                        fullWidth
                        id="role"
                        name="role"
                        autoComplete="off"
                        placeholder="Role"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.role}
                        size="small"
                        error={
                          formik.touched.role && Boolean(formik.errors.role)
                        }
                      >
                        {roleData &&
                          roleData.map((item: any) => (
                            <MenuItem key={item.value} value={item.value}>
                              {item.label}
                            </MenuItem>
                          ))}
                      </Select>

                      {formik.touched.role && formik.errors.role && (
                        <Typography className="error-field">
                          {formik.errors.role}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className="asset-popup">
                  {/* <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingRight: { sm: '1rem !important' } }}
                  >
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Current status</label>

                      <Select
                        className="placeholder-color"
                        displayEmpty
                        IconComponent={ExpandMoreOutlinedIcon}
                        renderValue={
                          formik.values.status !== ''
                            ? undefined
                            : () => <Placeholder>Select Status</Placeholder>
                        }
                        margin="none"
                        fullWidth
                        id="status"
                        name="status"
                        autoComplete="status"
                        placeholder="Laboratory"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.status}
                        size="small"
                        error={
                          formik.touched.status && Boolean(formik.errors.status)
                        }
                      >
                        {StatusList.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched.status && formik.errors.status && (
                        <Typography className="error-field">
                          {formik.errors.status}
                        </Typography>
                      )}
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
                <Button
                  type="submit"
                  variant="contained"
                  disabled={type=='edit'?!formik.dirty:!formik.isValid}
                  // onClick={submitFormPopup}
                  className="add-btn"
                >
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

export default UserForm;
