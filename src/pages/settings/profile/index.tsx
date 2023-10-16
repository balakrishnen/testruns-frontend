import React from "react";
import {  Box,  Button,  Grid,  IconButton,  InputAdornment,  InputLabel,  TextField,  Typography,} from "@mui/material";
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

const Profile = () => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box className="profile-setting-page">
      <Box
        className="title-main"
        sx={{
          borderBottom: "3px solid #F3F3F3",
          padding: "24px 0px",
          paddingBottom: "1rem",
          margin:"0px 24px"
        }}
      >
        <Box>
          <Typography>Profile settings</Typography>
          <Typography className="sub-text">
            Edit your profile appearance / name / contact info etc.
          </Typography>
        </Box>
        <Box className="search-field-inner setting-search">
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
        </Box>
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
                      }}
                    >
                      <Box>
                        <label>
                          First name<span style={{ color: "#E2445C" }}>*</span>
                        </label>
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
                      <Box>
                        <label>
                          Last name<span style={{ color: "#E2445C" }}>*</span>
                        </label>
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
                      }}
                    >
                      <Box>
                        <label>
                          Email<span style={{ color: "#E2445C" }}>*</span>
                        </label>
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
                      <Box>
                        <label>
                          Mobile<span style={{ color: "#E2445C" }}>*</span>
                        </label>
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
                  <Grid container spacing={2} className="profile-inner">
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
                          className="Organisation"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} className="profile-inner">
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Box>
                        <label>Department/s</label>
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
                  <Grid container spacing={2} className="profile-inner">
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Box>
                        <label>Labs assigned</label>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="Department"
                          name="Department"
                          autoComplete="Department"
                          autoFocus
                          InputLabelProps={{ shrink: false }}
                          placeholder="Labs assigned"
                        />
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
                          className="Organisation"
                          sx={{ background: "#F3F3F3" }}
                        />
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
                          className="Organisation"
                          sx={{ background: "#F3F3F3" }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
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
                <Box className="auth-inner">
                  <Box style={{ position: "relative" }}>
                    <InputLabel>Enter old password</InputLabel>
                    <TextField
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                              sx={{ mr: 0 }}
                            >
                              {!showPassword ? (
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
                      variant="outlined"
                      placeholder="Password"
                    />
                  </Box>
                  <Box style={{ position: "relative" }}>
                    <InputLabel>Enter new Password</InputLabel>
                    <TextField
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                              sx={{ mr: 0 }}
                            >
                              {!showPassword ? (
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
                      variant="outlined"
                      placeholder="Password"
                    />
                  </Box>
                  <Box style={{ position: "relative" }}>
                    <InputLabel>Confirm new password</InputLabel>
                    <TextField
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                              sx={{ mr: 0 }}
                            >
                              {!showPassword ? (
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
                      variant="outlined"
                      placeholder="Password"
                    />
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Box>
      <Box className="edit-details">
        <Button type="submit" variant="contained" className="cancel-btn">
          Back
        </Button>
        <Button type="submit" variant="contained" className="add-btn">
          Save
        </Button>
      </Box>
    </Box>
  );
};

const ProfilePage = withSettingsLayout(Profile);

export default ProfilePage;
