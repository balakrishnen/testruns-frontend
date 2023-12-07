import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {
  Box, Drawer, Toolbar, Typography, Checkbox,
  Autocomplete, Button, Select, MenuItem
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import logout from '../../assets/images/profile/logout.svg';
import camera from '../../assets/images/profile/camera.svg';
import profile from '../../assets/images/profile/profile.svg';
import organisation from '../../assets/images/profile/organisation.svg';
import document from '../../assets/images/profile/document.svg';
import profile2 from '../../assets/images/profile/profile2.svg';
import '../../assets/styles/profile.scss';
import { navigate } from 'gatsby';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartmentData } from '../../api/departmentAPI';
import { fetchLabData } from '../../api/labAPI';
import { OrganizationList } from '../../utils/data';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { fetchOrganizationData } from '../../api/organizationAPI';
import { fetchGetUser, fetchSingleUserData, fetchUpdateUserData, fetchUserData } from '../../api/userAPI';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { fetchRoleData } from '../../api/roleApi';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import AWS from 'aws-sdk';


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Lase name is required"),
  email: Yup.string().required("Email is required").email("Invalid email").matches(emailRegex, "In-correct email"),
  phoneNumber: Yup.string().notRequired(),
  // .matches(phoneRegExp, 'Phone number is not valid')
  //   .min(10, "Enter valid number")
  //   .max(10, "too long").required("Mobile number is required"),
  organisationId: Yup.string().required("Organistation is required"),
  // institution: Yup.string().required("Institution is required"),
  departmentId: Yup.array().min(1, 'Please select at least one Department').required('Department is required'),
  // laboratoryId: Yup.array().min(1, 'Please select at least one Laboratory').required('Laboratory is required'),
  // user_id: Yup.string().required(),
  role: Yup.string().required("Role is required"),
});

export default function AppProfileDrawer({
  openDrawer,
  toggleProfileDrawer,
}: any) {
  const [departmentData, setDepartmentData] = React.useState([]);
  const [edit, setEdit] = React.useState(false)
  const [organizationData, setOrganizationData] = React.useState([]);
  const [userDetail, setUserDetail] = React.useState([]);
  const [labData, setLabData] = React.useState([]);
  const [departments, setDepartments] = React.useState([])
  const [laboratory, setLaboratory] = React.useState([])
  const [roleData, setRoleData] = React.useState([]);
  const fileUploadField = React.useRef<any>(null);
  const [uploadedFile, setUploadedFile] = React.useState(null);
  const triggerFileUploadField = () => {
    fileUploadField.current?.click();
  };

  const dispatch: any = useDispatch();
  const departmentSliceData = useSelector(
    (state: any) => state.department.data?.get_all_departments,
  );
  const labSliceData = useSelector(
    (state: any) => state.lab.data?.get_all_labs,
  );
  const organizationSliceData = useSelector(
    (state: any) => state.organization.data?.get_all_organisations,
  );
  const userSliceData = useSelector(
    (state: any) => state.user.data?.get_user,
  );
  const roleSliceData = useSelector(
    (state: any) => state.role.data?.get_all_roles,
  );
  React.useEffect(() => {
    setDepartmentData(departmentSliceData?.map((item: any) => ({
      label: item.name,
      value: item.name,
      id: item._id,
    })))
    setLabData(labSliceData?.map((item: any) => ({
      label: item.name,
      value: item._id
    })))
    setOrganizationData(
      organizationSliceData?.map((item: any) => ({
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
    setUserDetail(userSliceData)

  }, [departmentSliceData, labSliceData, organizationSliceData, userSliceData, roleSliceData])

  console.log(userDetail);

  const Placeholder = ({ children }: any) => {
    return <div>{children}</div>;
  };
  // console.log(departmentData);

  // console.log(DepartmentList);
  const loginUserSliceData=  useSelector(
    (state: any) => state.userLogin?.data?.verifyToken, 
  );
  
  React.useEffect(()=>{
    let temp = { '_id': loginUserSliceData?._id}
    // if (row?._id) {
    dispatch(fetchSingleUserData(temp)).then((isSucess: { get_user: { firstName: any; lastName: any; email: any; phoneNumber: any; organisationId: any; departmentId: any[]; role: any; }; }) => {
      if (isSucess.get_user) {
        formik.setFieldValue('firstName', isSucess.get_user.firstName || '');
        formik.setFieldValue('lastName', isSucess.get_user.lastName || '');
        formik.setFieldValue('email', isSucess.get_user.email || '');
        formik.setFieldValue('phoneNumber', isSucess.get_user.phoneNumber || '');
        formik.setFieldValue('organisationId', isSucess.get_user.organisationId || '');
        formik.setFieldValue('departmentId', isSucess.get_user?.departmentId?.map((item: any) => (departmentData?.find(obj => (obj.id == item)))) || []);
        // formik.setFieldValue('laboratoryId', isSucess.get_user?.laboratoryId?.map((item: any) => (labData?.find(obj => (obj.id == item) ))) || []);
        formik.setFieldValue('role', isSucess.get_user.role || '');
        formik.setFieldValue('institution', isSucess.get_user.instituteId || "");

        setUploadedFile(isSucess.get_user.imageUrl)
      }
    })
      .catch((err: any) => {
        console.log(err);
      });
    // }    
  }, [departmentData, labData])
  React.useEffect(() => {
    let payload = {
      _id:  loginUserSliceData?._id
    }
    dispatch(fetchDepartmentData());
    dispatch(fetchLabData());
    dispatch(fetchOrganizationData());
    dispatch(fetchRoleData())
    dispatch(fetchSingleUserData(payload))
    setEdit(true)
    // setUploadedFile(null)
  }, []);
  const checkCredentialsProfile = (
    firstName: any,
  ) => {
    return true
  };
  const onSubmitProfile = async(values: any) => {
    const isMatch = checkCredentialsProfile(
      values.firstName,
      // values.lastName,
      // values.email,
      // values.mobile,
      // values.organisation,
      // values.lab,
      // values.password,
      // values.designation,
      // values.reqstId
    );

    if (isMatch) {
      var deptArray: any = []
      formik.values.departmentId?.map((item: any) => (deptArray.push(item?.id)))
      var labArray: any = []
      formik.values.laboratoryId?.map((item: any) => (labArray.push(item?.id)))
      let userValues: any = {
        // uid:"",
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber.toString(),
        organisationId: values.organisationId,
        imageUrl:uploadedFile,
        instituteId: "6548f51edf956b3b14ca00e0",
        departmentId: deptArray,
        laboratoryId: labArray,
        role: values.role,
        _id:loginUserSliceData?._id
      }
      // debugger
      // userValues['_id'] = userData?._id
      console.log(userValues);
      
      await dispatch(fetchUpdateUserData(userValues))
      await toast(`User Details updated successful !`, {
        style: {
          background: '#00bf70', color: '#fff'
        }
      });
      // setUploadedFile(null)
      // alert("User Details updated successful!");

    }
    window.location.reload()
  }
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      organisationId: '',
      institution:  '',
      departmentId: [],
      laboratoryId: [],
      role: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmitProfile,
  });
  console.log(formik);
  
  const handleLogout=()=>{
    signOut(auth).then(() => {
      // dispatch(fetchLogoutUser())
        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem('isLoggedIn', 'false');
          navigate('/login');
        }

    }).catch((error) => {
     console.log(error);
     
    });
  }
  const handleImageUpload = async () => {
    const selectedFile = fileUploadField.current.files[0];
    // const formData = new FormData();
    // formData.append('file', selectedFile);
    // const payload = {
    //   file: formData,
    //   type: 'profile'
    // }
    // dispatch(fileUploadData(payload));

    const s3 = new AWS.S3({
      // params: { Bucket: S3_BUCKET, folderName: "profile" },
      region: 'us-east-1',
      accessKeyId: 'AKIAUVVYVBYI2GJ3ENMQ',
      secretAccessKey: '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',
    });
    const keyPath = `profile/${Date.now()}`;
    const params = {
      Bucket: 'test-run-v2',
      Key: keyPath,
      Body: selectedFile,
      ACL: 'public-read',
      // ContentType: selectedFile.type
    };

    const result = s3.upload(params).promise();
    await result.then((res: any) => {
      setUploadedFile(res.Location);
      toast(`Image uploaded successfully !`, {
        style: {
          background: '#00bf70',
          color: '#fff',
        },
      });
    });
    await result.catch((err) => {
      console.error('Failed to upload');
      toast(`Failed to upload !`, {
        style: {
          background: '#e2445c',
          color: '#fff',
        },
      });
    });
  };
  
  return (
    <Drawer
      className="profile-head"
      variant="temporary"
      anchor="right"
      open={openDrawer}
      sx={{
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 600,
          boxSizing: 'border-box',
        },
        boxShadow: '-12px 4px 19px 0px #0000001A',
      }}
      onClose={() => { toggleProfileDrawer(), setEdit(true) }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <Box className="profile-page" sx={{ py: 2 }}>
          <Box className="profile-section1">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <CloseOutlinedIcon
                sx={{ cursor: 'pointer' }}
                onClick={() => { toggleProfileDrawer(), setEdit(true) }}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={handleLogout}
              >
                <Typography className="logout-text">Logout</Typography>
                <img src={logout} alt="logout" />
              </Box>
            </Box>
            <Box className="profile-camera">
              <img src={uploadedFile == null ? profile : uploadedFile} alt="profile" className="profile-user" style={{width:"200px", height:"200px",padding: uploadedFile == null ? '0px' : '16px',}} />
              <img src={camera} alt="camera" className="upload-img" onClick={triggerFileUploadField} />
              <input
            style={{ display: 'none' }}
            type="file"
            disabled={edit}
            ref={fileUploadField}
            accept="image/*, image/jpeg, image/png"
            onChange={handleImageUpload}
          />
            </Box>
          </Box>
          <Box className="edit-profile-btn">
            <Button onClick={() => setEdit(false)}>Edit profile</Button>
          </Box>
          <form onSubmit={formik.handleSubmit} autoComplete="off">

            <Box className="profile-section2">
              <Grid container spacing={2} className="profile-inner">
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  sx={{
                    paddingRight: {
                      xs: '0rem !important',
                      sm: '1rem !important',
                    },
                  }}
                >
                  <Box>
                    <label>
                      First name<span style={{ color: '#E2445C' }}>*</span>
                    </label>
                    <TextField
                      className={edit ? "bg-gray-input" : ""}
                      disabled={edit}
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
                    paddingLeft: { xs: '0rem !important', sm: '1rem !important' },
                  }}
                >
                  <Box>
                    <label>
                      Last name<span style={{ color: '#E2445C' }}>*</span>
                    </label>
                    <TextField
                      className={edit ? "bg-gray-input" : ""}
                      disabled={edit}
                      margin="normal"
                      fullWidth
                      id="lastName"
                      name="lastName"
                      type="text"
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
              <Grid container spacing={2} className="profile-inner">
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  sx={{
                    paddingRight: {
                      xs: '0rem !important',
                      sm: '1rem !important',
                    },
                  }}
                >
                  <Box>
                    <label>
                      Email<span style={{ color: '#E2445C' }}>*</span>
                    </label>
                    <TextField
                      className={"bg-gray-input"}
                      disabled={true}
                      inputProps={{ maxLength: 50 }}
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
                    paddingLeft: { xs: '0rem !important', sm: '1rem !important' },
                  }}
                >
                  <Box>
                    <label>Mobile</label>
                    <TextField

                      onInput={(e: any) => {
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                      }}
                      className={edit ? "bg-gray-input" : ""}
                      inputProps={{ maxLength: 10 }}
                      disabled={edit}
                      margin="none"
                      fullWidth
                      id="phoneNumber"
                      name="phoneNumber"
                      type="number"
                      InputLabelProps={{ shrink: false }}
                      placeholder="Mobile number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phoneNumber}
                      size="small"
                      // error={
                      //   formik.touched.phoneNumber &&
                      //   Boolean(formik.errors.phoneNumber)
                      // }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment sx={{ mx: 2 }} position="start">
                            +91{' '}
                          </InputAdornment>
                        ),
                      }}
                    />
                    {/* {formik.touched.phoneNumber &&
                      formik.errors.phoneNumber && (
                        <Typography className="error-field">
                          {formik.errors.phoneNumber}
                        </Typography>
                      )} */}
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2} className="profile-inner multi-selection">
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Box>
                    <label>Organisation</label>
                    <Select
                      className={edit ? "bg-gray-input" : ""}
                      disabled={edit}
                      style={{ color: "black", backgroundColor: edit ? '#f3f3f3' : 'white' }}
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
              </Grid>
              <Grid container spacing={2} className="profile-inner multi-selection">
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Box>
                    <label>Department</label>
                    <Autocomplete
                      multiple
                      id="department"
                      className={edit ? "bg-gray-input" : ""}
                      disabled={edit}
                      disableCloseOnSelect
                      value={formik.values.departmentId}
                      options={
                        departmentData !== undefined
                          ? departmentData
                          : []
                      }
                      getOptionLabel={(option: any) => option?.label}
                      isOptionEqualToValue={(option: any, value: any) =>
                        value?.id == option?.id
                      }
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Department/s" />
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
                      onChange={(_, selectedOptions: any) => {
                        setDepartments(selectedOptions); formik.setValues({ ...formik.values, 'departmentId': selectedOptions })
                      }
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2} className="profile-inner">
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  sx={{
                    paddingRight: {
                      xs: '0rem !important',
                      sm: '1rem !important',
                    },
                  }}
                >
                  <Box>
                    <label>Role</label>
                    <Select
                      // MenuProps={{
                      //   PaperProps: {
                      //     style: {
                      //       maxHeight: '150px',
                      //       overflowY: 'auto',
                      //     },
                      //   },
                      // }}
                      style={{ color: "black", backgroundColor: edit ? '#f3f3f3' : 'white', marginTop: "10px" }}
                      displayEmpty
                      IconComponent={ExpandMoreOutlinedIcon}
                      renderValue={
                        formik.values.role !== ''
                          ? undefined
                          : () => <Placeholder>Select Role</Placeholder>
                      }
                      margin="none"
                      className={edit ? "bg-gray-input" : ""}
                      disabled={edit}
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
                    >  {roleData &&
                      roleData.map((item: any) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}</Select>
                    {formik.touched.role && formik.errors.role && (
                      <Typography className="error-field">
                        {formik.errors.role}
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
                    paddingLeft: { xs: '0rem !important', sm: '1rem !important' },
                  }}
                >
                  <Box>
                    <label>Requestor ID/Tester ID</label>
                    <TextField
                      margin="normal"
                      // required
                      fullWidth
                      id="Organisation"
                      inputProps={{ maxLength: 20 }}
                      className={"bg-gray-input"}
                      disabled={true}
                      name="Organisation"
                      autoComplete="off"
                      InputLabelProps={{ shrink: false }}
                      placeholder="Requestor ID/Tester ID"
                    // InputProps={{
                    //   startAdornment: (
                    //     <InputAdornment position="start">
                    //       <img src={profile2} />
                    //     </InputAdornment>
                    //   ),
                    // }}
                    />
                  </Box>
                </Grid>
              </Grid>
              {/* <Box  >
              <Box style={{ height: "150px" }}>

              </Box> */}
              {/* </Box> */}
              {/* <Box>
              <label>Labs assigned</label>
              <Box className="lab-list">
                <span>Mechanical</span>
                <span>Electronics</span>
                <span>Chemical</span>
                <span>Zoology</span>
                <span>Biotechnology</span>
                <span>Botany</span>
              </Box>
            </Box> */}
            </Box>
            <Box className="edit-details-profile" sx={{padding: '15px 32px'}}>
              <Button  variant="contained" onClick={() => { toggleProfileDrawer()}}  className="cancel-btn" >
                Cancel
              </Button>
              <Button type="submit" variant="contained" onClick={() => {toggleProfileDrawer(), setEdit(true) }} className="add-btn">
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Drawer>
  );
}
