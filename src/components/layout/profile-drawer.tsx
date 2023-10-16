import React from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Box, Drawer, Toolbar, Typography,Button } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import logout from '../../assets/images/profile/logout.svg';
import camera from '../../assets/images/profile/camera.svg';
import profile from '../../assets/images/profile/profile.svg';
import organisation from '../../assets/images/profile/organisation.svg';
import document from '../../assets/images/profile/document.svg';
import profile2 from '../../assets/images/profile/profile2.svg';
import "../../assets/styles/profile.scss";

export default function AppProfileDrawer({ openDrawer }: any) {
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={openDrawer}
      sx={{
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 600,
          boxSizing: "border-box",
        },
        boxShadow: "-12px 4px 19px 0px #0000001A",
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto"}}>
        <Box className='profile-page'>
          <Box className='profile-section1'>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <CloseOutlinedIcon />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography className='logout-text'>Logout</Typography>
                <img src={logout} alt='logout' />
              </Box>
            </Box>
            <Box className='profile-camera'>
              <img src={profile} alt='profile' className='profile-user' />
              <img src={camera} alt='camera' className='upload-img' />
            </Box>
          </Box>
          <Box className='edit-profile-btn'>
            <Button>Edit profile</Button>
          </Box>
          <Box className='profile-section2'>
            <Grid container spacing={2} className='profile-inner'>
              <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingRight: { xs: '0rem !important', sm: '1rem !important' } }}>
                <Box>
                  <label>First name<span style={{ color: '#E2445C' }}>*</span></label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    InputLabelProps={{ shrink: false }}
                    placeholder="First name"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingLeft: { xs: '0rem !important', sm: '1rem !important' } }}>
                <Box>
                  <label>Last name<span style={{ color: '#E2445C' }}>*</span></label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="last"
                    name="last"
                    autoComplete="last"
                    autoFocus
                    InputLabelProps={{ shrink: false }}
                    placeholder="Last Name"
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2} className='profile-inner'>
              <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingRight: { xs: '0rem !important', sm: '1rem !important' } }}>
                <Box>
                  <label>Email<span style={{ color: '#E2445C' }}>*</span></label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Email"
                    name="Email"
                    autoComplete="Email"
                    autoFocus
                    InputLabelProps={{ shrink: false }}
                    placeholder="Email"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingLeft: { xs: '0rem !important', sm: '1rem !important' } }}>
                <Box>
                  <label>Mobile</label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="last"
                    name="last"
                    autoComplete="last"
                    autoFocus
                    InputLabelProps={{ shrink: false }}
                    placeholder="v +91     |  000000023"
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2} className='profile-inner'>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box>
                  <label>Organisation</label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Organisation"
                    name="Organisation"
                    autoComplete="Organisation"
                    autoFocus
                    InputLabelProps={{ shrink: false }}
                    placeholder="Organisation name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={organisation} />
                        </InputAdornment>
                      ),
                    }}
                    className='Organisation'
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2} className='profile-inner'>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box>
                  <label>Department</label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Department"
                    name="Department"
                    autoComplete="Department"
                    autoFocus
                    InputLabelProps={{ shrink: false }}
                    placeholder="Department name"
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2} className='profile-inner'>
              <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingRight: { xs: '0rem !important', sm: '1rem !important' } }}>
                <Box>
                  <label>Designation</label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Designation"
                    name="Designation"
                    autoComplete="Designation"
                    autoFocus
                    InputLabelProps={{ shrink: false }}
                    placeholder="Designation"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={document} />
                        </InputAdornment>
                      ),
                    }}
                    className='Organisation'
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingLeft: { xs: '0rem !important', sm: '1rem !important' } }}>
                <Box>
                  <label>Requestor ID/Tester ID</label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Organisation"
                    name="Organisation"
                    autoComplete="Organisation"
                    autoFocus
                    InputLabelProps={{ shrink: false }}
                    placeholder="Requestor ID/Tester ID"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={profile2} />
                        </InputAdornment>
                      ),
                    }}
                    className='Organisation'
                  />
                </Box>
              </Grid>
            </Grid>
            <Box>
              <label>Labs assigned</label>
              <Box className='lab-list'>
                <span>Mechanical</span>
                <span>Electronics</span>
                <span>Chemical</span>
                <span>Zoology</span>
                <span>Biotechnology</span>
                <span>Botany</span>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}