import React from "react";
import {  Box,Autocomplete, Checkbox,  Button,  Grid, MenuItem, IconButton,Select,  InputAdornment,  InputLabel,  TextField,  Typography,} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import search from "../../../assets/images/search.svg";
import camera from "../../../assets/images/profile/camera.svg";
import profile from "../../../assets/images/profile/profile.svg";
import organisation from "../../../assets/images/profile/organisation.svg";
import document from "../../../assets/images/profile/document.svg";
import profile2 from "../../../assets/images/profile/profile2.svg";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { withSettingsLayout } from "../../../components/settings";
import { useFormik } from "formik";
import * as Yup from "yup";
import {navigate} from 'gatsby'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartmentData } from '../../../api/departmentAPI';
import { fetchLabData } from '../../../api/labAPI';

import { DepartmentList, LaboratoryList ,OrganizationList} from "../../../utils/data";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  password:Yup.string()
  .required("Password is required"),
  newpassword: Yup.string()
    .required("New Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Weak password"
    ),
    confirmpassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newpassword"), ""], "Password mismatch"),
    firstName: Yup.string()
    .notRequired(),
    lastName: Yup.string()
    .notRequired(),
    email: Yup.string()
    .notRequired(),
    mobile:Yup.string()
    .notRequired(),
    organisation:Yup.string()
    .notRequired(),
    lab: Yup.array()
    .notRequired(),
    department:Yup.array()
    .notRequired(),
    designation: Yup.string()
    .notRequired(),
    reqstId: Yup.string()
    .notRequired(),
});

const Profile = () => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [departmentData, setDepartmentData] = React.useState([]);
  const [labData, setLabData] = React.useState([]);
  const dispatch: any = useDispatch();
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
    interface FormValidation {
      password: boolean;
      newpassword: boolean;
      confirmpassword: boolean;
    }
    
    const [initalStatus,setInitalStatus] = React.useState<FormValidation>({
      password: false,
      newpassword: false,
      confirmpassword: false,
    });
    const departments: any = [];
    const laboratory: any = [];
    const Placeholder = ({ children }: any) => {
      return <div>{children}</div>;
    };
  const handleClickShowPassword = (key: keyof FormValidation, newValue: boolean) => {
    const updatedValidation = { ...initalStatus };
    updatedValidation[key] = newValue;
    setInitalStatus(updatedValidation);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = (values: any) => {
    const isMatch = checkCredentials(
      values.password,
      values.newpassword,
      values.confirmpassword
    );

    if (isMatch) {
      toast(`Password Reset successful !`, {
        style: {
          background: '#00bf70', color: '#fff'
        }
      });
      setTimeout(()=>{
        navigate('/login')
      },2000)
      // alert("password updated successful!");
      // navigate('/login')
    } else {
      formik.setFieldError("password", "Invalid password");
       }
  };

  const checkCredentials = (
    password: any,
    newpassword: any,
    confirmpassword:any
  ) => {
    if(newpassword!=="" && confirmpassword!=="" && password!== ""){
      return true
    }
    else{
    return false;
    }
  };
  const checkCredentialsProfile = (
    firstName: any,
    lastName: any,
    email: any,
    mobile: any,
    organisation: any,
    lab: any,
    department: any,
    designation: any,
    reqstId: any,
  ) => {
    // if(newpassword!=="" && confirmpassword!=="" && password!== ""){
      return true
    // }
    // else{
    // return false;
    // }
  };
  const onSubmitProfile = (values: any) => {
    const isMatch = checkCredentialsProfile(
      values.firstName,
      values.lastName,
      values.email,
      values.mobile,
      values.organisation,
      values.lab,
      values.password,
      values.designation,
      values.reqstId
    );

    if (isMatch) {
      toast(`User Details updated successful !`, {
        style: {
          background: '#00bf70', color: '#fff'
        }
      });
      // alert("User Details updated successful!");
     
  };
}
  const formik = useFormik({
    initialValues: {
      password: '',
      newpassword: '',
      confirmpassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });
  const formikProfile = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      organisation: '',
      lab: '',
      department: '',
      designation: '',
      reqstId: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmitProfile,
  });

  const departmentSliceData = useSelector(
    (state: any) => state.department.data?.get_all_departments,
  );
  const labSliceData = useSelector(
    (state: any) => state.lab.data?.get_all_labs,
  );
  React.useEffect(() => {
    setDepartmentData(departmentSliceData?.map((item:any) => ({
      label: item.name,
      value: item._id
    })))
    setLabData(labSliceData?.map((item:any) => ({
      label: item.name,
      value: item._id
    })))
  }, [departmentSliceData,labSliceData])

  console.log(departmentData);

console.log(DepartmentList);

  React.useEffect(() => {
    dispatch(fetchDepartmentData());
    dispatch(fetchLabData());
  }, []);

  return (
    <Box className="profile-setting-page">
      <Box
        className="title-main"
        sx={{
          borderBottom: "1px solid #F3F3F3",
          padding: "15px 0px",
          paddingBottom: "8px",
          margin:"0px 24px"
        }}
      >
        <Box>
          <Typography>Profile settings</Typography>
          <Typography className="sub-text">
            Edit your profile appearance / name / contact info etc.
          </Typography>
        </Box>
        {/* <Box className="search-field-inner setting-search">
          <TextField
            margin="normal"
            required
            fullWidth
            name="Search"
            id="Search"
            InputLabelProps={{ shrink: false }}
            placeholder="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <img src={search} />
                </InputAdornment>
              ),
            }}
          />
        </Box> */}
      </Box>
      <Box
        sx={{
          width: "100%",
          m: 0,
          padding: "24px",
          display: { xs: "block", lg: "flex" },
        }}
      >
        <Box sx={{ paddingLeft: "0rem !important" }}>
          <Box className="profile-camera">
            <img src={profile} alt="profile" className="profile-user" />
            <img src={camera} alt="camera" className="upload-img" />
          </Box>
        </Box>
        <Box
          sx={{ paddingLeft: { xs: "0px!important", lg: "16px !important" } }}
        >
          <Box className="accordion-section">
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className="accordion-title">
                  General settings
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
              <form onSubmit={formikProfile.handleSubmit}  autoComplete="off">
                <Box className="setting-section2">
                  <Grid container spacing={2} className="profile-inner">
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      sx={{
                        paddingRight: {
                          xs: "0rem !important",
                          md: "1rem !important",
                        },
                        paddingBottom: {
                          xs: "1rem !important",
                          md: "0rem !important",
                        },
                      }}
                    >
                      <Box  style={{ position: "relative" }}>
                        <label>
                          First name<span style={{ color: "#E2445C" }}>*</span>
                        </label>
                        <TextField
                        margin="none"
                        fullWidth
                        id="firstName"
                        name="firstName"
                        autoComplete="firstName"
                        InputLabelProps={{ shrink: false }}
                        placeholder="First name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formikProfile.values.firstName}
                        size="small"
                        error={
                          formikProfile.touched.firstName &&
                          Boolean(formikProfile.errors.firstName)
                        }
                      />
                      {formikProfile.touched.firstName &&
                        formikProfile.errors.firstName && (
                          <Typography className="error-field">
                            {formikProfile.errors.firstName}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      sx={{
                        paddingLeft: {
                          xs: "0rem !important",
                          md: "1rem !important",
                        },
                      }}
                    >
                      <Box  style={{ position: "relative" }}>
                        <label>
                          Last name<span style={{ color: "#E2445C" }}>*</span>
                        </label>
                        <TextField
                        margin="normal"
                        fullWidth
                        id="last_name"
                        name="lastName"
                        autoComplete="lastName"
                        InputLabelProps={{ shrink: false }}
                        placeholder="Last name"
                        onChange={formikProfile.handleChange}
                        onBlur={formikProfile.handleBlur}
                        value={formikProfile.values.lastName}
                        size="small"
                        error={
                          formikProfile.touched.lastName &&
                          Boolean(formikProfile.errors.lastName)
                        }
                      />
                      {formikProfile.touched.lastName && formikProfile.errors.lastName && (
                        <Typography className="error-field">
                          {formikProfile.errors.lastName}
                        </Typography>
                      )}
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} className="profile-inner">
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      sx={{
                        paddingRight: {
                          xs: "0rem !important",
                          md: "1rem !important",
                        },
                        paddingBottom: {
                          xs: "1rem !important",
                          md: "0rem !important",
                        },
                      }}
                    >
                      <Box  style={{ position: "relative" }}>
                        <label>
                          Email<span style={{ color: "#E2445C" }}>*</span>
                        </label>
                        <TextField
                        margin="normal"
                        fullWidth
                        id="email_id"
                        name="email_id"
                        autoComplete="email_id"
                        InputLabelProps={{ shrink: false }}
                        placeholder="Email"
                        onChange={formikProfile.handleChange}
                        onBlur={formikProfile.handleBlur}
                        value={formikProfile.values.email}
                        size="small"
                        error={
                          formikProfile.touched.email &&
                          Boolean(formikProfile.errors.email)
                        }
                      />
                      {formikProfile.touched.email && formikProfile.errors.email && (
                        <Typography className="error-field">
                          {formikProfile.errors.email}
                        </Typography>
                      )}
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      sx={{
                        paddingLeft: {
                          xs: "0rem !important",
                          md: "1rem !important",
                        },
                      }}
                    >
                      <Box  style={{ position: "relative" }}>
                        <label>
                          Mobile<span style={{ color: "#E2445C" }}>*</span>
                        </label>
                        <TextField
                        margin="none"
                        fullWidth
                        id="mobile_number"
                        name="mobile_number"
                        autoComplete="mobile_number"
                        InputLabelProps={{ shrink: false }}
                        placeholder="Mobile number"
                        onChange={formikProfile.handleChange}
                        onBlur={formikProfile.handleBlur}
                        value={formikProfile.values.mobile}
                        size="small"
                        error={
                          formikProfile.touched.mobile &&
                          Boolean(formikProfile.errors.mobile)
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment sx={{ mx: 2 }} position="start">
                              +91{' '}
                            </InputAdornment>
                          ),
                        }}
                      />
                      {formikProfile.touched.mobile &&
                        formikProfile.errors.mobile && (
                          <Typography className="error-field">
                            {formikProfile.errors.mobile}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} className="profile-inner">
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Box style={{ position: "relative" }}>
                        <label>Organisation</label>
                        <Select                        
                        displayEmpty
                        IconComponent={ExpandMoreOutlinedIcon}
                        renderValue={
                          formikProfile.values.organisation !== ''
                            ? undefined
                            : () => (
                                <Placeholder>Select Organization</Placeholder>
                              )
                        }
                        margin="none"
                        fullWidth
                        id="organization"
                        name="organisation"
                        autoComplete="organization"
                        placeholder="Organization"
                        onChange={formikProfile.handleChange}
                        onBlur={formikProfile.handleBlur}
                        value={formikProfile.values.organisation}
                        size="small"
                        error={
                          formikProfile.touched.organisation &&
                          Boolean(formikProfile.errors.organisation)
                        }
                        style={{marginTop:'10px'}}
                      >
                        {OrganizationList.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>

                      {formikProfile.touched.organisation &&
                        formikProfile.errors.organisation && (
                          <Typography className="error-field">
                            {formikProfile.errors.organisation}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} className="profile-inner multi-selection">
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Box style={{ position: "relative" }}>
                        <label>Department/s</label>
                        <Autocomplete
                        multiple
                        id="department"
                        options={departmentData!==undefined ? departmentData:[]}
                        disableCloseOnSelect
                        getOptionLabel={(option:any) => option.label}
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>
                            <Checkbox
                              style={{ marginRight: 0 }}
                              checked={selected}
                            />
                            {option.label}
                          </li>
                        )}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                        placeholder="Department"
                        size="medium"
                        onChange={(e, f) => {
                          f.forEach((element) => departments.push(element.id));
                          formikProfile.setFieldValue('department', departments);
                        }}
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        // value={formik.values.department}
                        // error={
                        //   formik.touched.department &&
                        //   Boolean(formik.errors.department)
                        // }
                      />
                      {formikProfile.touched.department &&
                        formikProfile.errors.department && (
                          <Typography className="error-field">
                            {formikProfile.errors.department}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} className="profile-inner multi-selection">
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Box style={{ position: "relative" }}>
                        <label>Labs assigned</label>
                        <Autocomplete
                        multiple
                        id="lab"
                        options={labData!==undefined ?labData:[]}
                        disableCloseOnSelect
                        getOptionLabel={(option:any) => option.label}
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>
                            <Checkbox
                              style={{ marginRight: 0 }}
                              checked={selected}
                            />
                            {option.label}
                          </li>
                        )}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                        placeholder="Laboratory"
                        size="medium"
                        onChange={(e, f) => {
                          f.forEach((element) => laboratory.push(element.id));
                          formikProfile.setFieldValue('laboratory', laboratory);
                        }}
                      />
                      {formikProfile.touched.lab &&
                        formikProfile.errors.lab && (
                          <Typography className="error-field">
                            {formikProfile.errors.lab}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} className="profile-inner">
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={6}
                      sx={{
                        paddingRight: {
                          xs: "0rem !important",
                          lg: "1rem !important",
                        },
                      }}
                    >
                      <Box style={{ position: "relative" }}>
                        <label>Designation</label>
                        <TextField
                          margin="normal"
                          // required
                          fullWidth
                          id="Designation"
                          name="designation"
                          autoComplete="Designation"
                          // autoFocus
                          InputLabelProps={{ shrink: false }}
                          placeholder="Designation"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <img src={document} />
                              </InputAdornment>
                            ),
                          }}
                          className="Organisation"
                          sx={{ background: "#F3F3F3" }}
                          onChange={formikProfile.handleChange}
                          onBlur={formikProfile.handleBlur}
                          value={formikProfile.values.designation}
                          size="small"
                          error={
                            formikProfile.touched.designation &&
                            Boolean(formikProfile.errors.designation)
                          }
                        />
                        {formikProfile.touched.designation && formikProfile.errors.designation && (
                          <Typography className="error-field">
                            {formikProfile.errors.designation}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={6}
                      sx={{
                        paddingLeft: {
                          xs: "0rem !important",
                          lg: "1rem !important",
                        },
                        paddingTop: {
                          xs: "1rem !important",
                          lg: "0rem !important",
                        },
                      }}
                    >
                      <Box style={{ position: "relative" }}>
                        <label>Requestor ID/Tester ID</label>
                        <TextField
                          margin="normal"
                          // required
                          fullWidth
                          id="Organisation"
                          name="reqstId"
                          autoComplete="Organisation"
                          // autoFocus
                          InputLabelProps={{ shrink: false }}
                          placeholder="Requestor ID/Tester ID"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <img src={profile2} />
                              </InputAdornment>
                            ),
                          }}
                          className="Organisation"
                          sx={{ background: "#F3F3F3" }}
                          onChange={formikProfile.handleChange}
                          onBlur={formikProfile.handleBlur}
                          value={formikProfile.values.reqstId}
                          size="small"
                          error={
                            formikProfile.touched.reqstId &&
                            Boolean(formikProfile.errors.reqstId)
                          }
                        />
                        {formikProfile.touched.reqstId && formikProfile.errors.reqstId && (
                          <Typography className="error-field">
                            {formikProfile.errors.reqstId}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                </form>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography className="accordion-title">
                  Change password
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
              <form onSubmit={formik.handleSubmit}  autoComplete="off">
                <Box className="auth-inner">
                  <Box style={{ position: "relative" }}>
                    <InputLabel>Enter old password</InputLabel>
                    <TextField
                      type={initalStatus.password ? "text" : "password"}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={(e)=>handleClickShowPassword("password",!initalStatus.password)}
                              edge="end"
                              sx={{ mr: 0 }}
                            >
                              {!initalStatus.password ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      name="password"
                      id="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      variant="outlined"
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      placeholder="Password"
                    />
                      {formik.touched.password && formik.errors.password && (
              <Typography className="error-field">
                {formik.errors.password}
              </Typography>
            )}
                  </Box>
                  <Box style={{ position: "relative" }}>
                    <InputLabel>Enter new Password</InputLabel>
                    <TextField
                      type={initalStatus.newpassword ? "text" : "password"}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={(e)=>handleClickShowPassword("newpassword",!initalStatus.newpassword)}
                              onMouseDown={handleMouseDownPassword} 
                              edge="end"
                              sx={{ mr: 0 }}
                            >
                              {!initalStatus.newpassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      name="newpassword"
                      id="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.newpassword}
                      variant="outlined"
                      error={formik.touched.newpassword && Boolean(formik.errors.newpassword)}
                      placeholder="New Password"
                    />
                      {formik.touched.newpassword && formik.errors.newpassword && (
              <Typography className="error-field">
                {formik.errors.newpassword}
              </Typography>
            )}
            {formik.touched.newpassword && !formik.errors.newpassword && (
              <Typography className="valid-field">Strong password</Typography>
            )}
                  </Box>
                  <Box style={{ position: "relative" }}>
                    <InputLabel>Confirm new password</InputLabel>
                    <TextField
                      type={initalStatus.confirmpassword ? "text" : "password"}
                      fullWidth
                      onPaste={(event) => {
                        event.preventDefault()}}
                        style={{userSelect:'none'}}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={(e)=>handleClickShowPassword("confirmpassword",!initalStatus.confirmpassword)}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              sx={{ mr: 0 }}
                            >
                              {!initalStatus.confirmpassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      name="confirmpassword"
                      id="password"
                      onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmpassword}
              variant="outlined"
              error={
                formik.touched.confirmpassword &&
                Boolean(formik.errors.confirmpassword)
              }
              placeholder="Confirm Password"
            />
            {formik.touched.confirmpassword &&
              formik.errors.confirmpassword && (
                <Typography className="error-field">
                  {formik.errors.confirmpassword}
                </Typography>
              )}
            {formik.touched.confirmpassword &&
              !formik.errors.confirmpassword && (
                <Typography className="valid-field">
                  Password matched
                </Typography>
              )}
                  </Box>
                </Box>
                </form>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Box>
      <Box className="edit-details">
        <Button type="submit" variant="contained" className="cancel-btn" style={{visibility:'hidden'}}>
          Back
        </Button>
        <Button type="submit" onClick={()=>{expanded=='panel2'
        ?formik.handleSubmit():formikProfile.handleSubmit()}} variant="contained" className="add-btn">
          Save
        </Button>
      </Box>
    </Box>
  );
};

const ProfilePage = withSettingsLayout(Profile);

export default ProfilePage;
