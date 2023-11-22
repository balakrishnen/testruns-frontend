import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {
  Box, Drawer, Toolbar, Typography, Checkbox,
  Autocomplete, Button , Select, MenuItem
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


export default function AppProfileDrawer({
  openDrawer,
  toggleProfileDrawer,
}: any) {
  const [departmentData, setDepartmentData] = React.useState([]);
  const [edit, setEdit]=React.useState(false)
  const [organizationData, setOrganizationData] = React.useState([]);
  const [labData, setLabData] = React.useState([]);
  const departments: any = [];
  const laboratory: any = [];
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
  React.useEffect(() => {
    setDepartmentData(departmentSliceData?.map((item: any) => ({
      label: item.name,
      value: item._id
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
  }, [departmentSliceData, labSliceData,organizationSliceData])

  const Placeholder = ({ children }: any) => {
    return <div>{children}</div>;
  };
  // console.log(departmentData);

  // console.log(DepartmentList);

  React.useEffect(() => {
    dispatch(fetchDepartmentData());
    dispatch(fetchLabData());
    dispatch(fetchOrganizationData());
   setEdit(true)
  }, []);

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
      onClose={()=>{toggleProfileDrawer(), setEdit(true)}}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto'  }}>
        <Box className="profile-page" sx={{py: 2}}>
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
                onClick={()=>{toggleProfileDrawer(), setEdit(true)}}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.sessionStorage.setItem('isLoggedIn', 'false');
                    navigate('/login');
                  }
                }}
              >
                <Typography className="logout-text">Logout</Typography>
                <img src={logout} alt="logout" />
              </Box>
            </Box>
            <Box className="profile-camera">
              <img src={profile} alt="profile" className="profile-user" />
              <img src={camera} alt="camera" className="upload-img" />
            </Box>
          </Box>
          <Box className="edit-profile-btn">
            <Button onClick={()=>setEdit(false)}>Edit profile</Button>
          </Box>
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
                    margin="normal"
                    // disabled
                    // disabled={edit}
                    // style={{backgroundColor:"red"}}
                    required
                    fullWidth
                    id="name"
                    inputProps={{ maxLength: 20 }}
                    name="name"
                    className={edit?"bg-gray-input":""}
                    disabled={edit}
                    autoComplete="name"
                    InputLabelProps={{ shrink: false }}
                    placeholder="First name"
                  />
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
                    margin="normal"
                    required
                    fullWidth
                    inputProps={{ maxLength: 20 }}
                    id="last"
                    name="last"
                    className={edit?"bg-gray-input":""}
                    disabled={edit}
                    autoComplete="last"
                    InputLabelProps={{ shrink: false }}
                    placeholder="Last name"
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
                  <label>
                    Email<span style={{ color: '#E2445C' }}>*</span>
                  </label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Email"
                    name="Email"
                    className={edit?"bg-gray-input":""}
                    disabled={edit}
                    autoComplete="Email"
                    InputLabelProps={{ shrink: false }}
                    placeholder="Email"
                    inputProps={{ maxLength: 50 }}
                  />
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
                    margin="normal"
                    required
                    fullWidth
                    id="mobile"
                    onInput={(e:any)=>{ 
                      e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                  }}
                    name="mobile"
                    className={edit?"bg-gray-input":""}
                    inputProps={{ maxLength: 10 }}
                    disabled={edit}
                    InputLabelProps={{ shrink: false }}
                    placeholder="Mobile number"
                    type='number'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment sx={{ mx: 2 }} position="start">
                          +91{' '}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="profile-inner multi-selection">
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box>
                  <label>Organisation</label>
                  <Autocomplete
                    // multiple
                    id="Organisation"
                    className={edit?"bg-gray-input":""}
                    disabled={edit}
                    options={organizationData !== undefined ? organizationData : []}
                    disableCloseOnSelect
                    getOptionLabel={(option: any) => option.label}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                       
                        {option.label}
                      </li>
                    )}
                    renderInput={(params) => <TextField {...params} placeholder="Organisation" />}
                    fullWidth
                    placeholder="Organisation"
                    size="medium"
                    // onChange={(e, f) => {
                    //   f.forEach((element) =>
                    //     departments.push(element.id),
                    //   );
                    // }}

                  />
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
                    className={edit?"bg-gray-input":""}
                    disabled={edit}
                    options={departmentData !== undefined ? departmentData : []}
                    disableCloseOnSelect
                    getOptionLabel={(option: any) => option.label}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          style={{ marginRight: 0 }}
                          checked={selected}
                        />
                        {option.label}
                      </li>
                    )}
                    renderInput={(params) => <TextField {...params} placeholder="Department/s" />}
                    fullWidth
                    placeholder="Department"
                    size="medium"
                    onChange={(e, f) => {
                      f.forEach((element) =>
                        departments.push(element.id),
                      );
                    }}

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
                  <label>Designation</label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    inputProps={{ maxLength: 20 }}
                    id="Designation"
                    name="Designation"
                    className={edit?"bg-gray-input":""}
                    disabled={edit}
                    autoComplete="Designation"
                    InputLabelProps={{ shrink: false }}
                    placeholder="Designation"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={document} />
                        </InputAdornment>
                      ),
                    }}
                  />
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
                    required
                    fullWidth
                    id="Organisation"
                    inputProps={{ maxLength: 20 }}
                    className={edit?"bg-gray-input":""}
                    disabled={edit}
                    name="Organisation"
                    autoComplete="Organisation"
                    InputLabelProps={{ shrink: false }}
                    placeholder="Requestor ID/Tester ID"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={profile2} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Box  >
              <Box style={{ height: "150px" }}>

              </Box>
            </Box>
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
        </Box>
      </Box>
    </Drawer>
  );
}
