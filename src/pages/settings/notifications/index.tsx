import React from "react";
import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Switch, { } from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import search from "../../../assets/images/search.svg";
import { withSettingsLayout } from "../../../components/settings";
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 43,
  height: 20,
  borderRadius: 99,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(24px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#FFC60B",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 16,
    height: 16,
    borderRadius: 99,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#181818" : "#9f9f9f ",
    boxSizing: "border-box",
  },
}));

const Notification = () => {
  return (
    <Box className="notification-page" style={{ padding: "24px" , paddingTop:"15px"}}>
      <Box
        className="title-main"
        sx={{ borderBottom: "3px solid #F3F3F3", paddingBottom: "8px" }}
      >
        <Box>
          <Typography>Notification settings</Typography>
          <Typography className="sub-text">
            Select the kinds of notifications you get about your activities and
            recommendations.
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
      <Box className="alerts-text">
        <Typography>Alerts</Typography>
        <Typography className="sub-text">
          Select the options you want to get alerted via email and notification.
        </Typography>
      </Box>
      <Box >
        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
            m: 0,
            borderBottom: "2px solid #F3F3F3",
            paddingBottom: "12px",
            paddingTop: "12px",
          }}
        >
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8} className="p-top">
            <Box className="notific-inner">
              <Typography>New procedure created</Typography>
              <Typography className="sub-text">
                You will receive notifications whenever a new procedure is
                created.
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={4}
            xl={4}
            sx={{ pr: 2 }}
            className="p-top"
          >
            <Box>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="flex-end"
                style={{ marginBottom: "0.8rem" }}
              >
                <Typography style={{ fontWeight: "500", fontSize:"12px" }}>
                  Notification
                </Typography>
                <AntSwitch
                  defaultChecked
                  inputProps={{ "aria-label": "ant design" }}
                />
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="flex-end"
              >
                <Typography style={{ fontWeight: "500", fontSize:"12px"  }}>
                  Email
                </Typography>
                <AntSwitch
                  defaultChecked
                  inputProps={{ "aria-label": "ant design" }}
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
            m: 0,
            borderBottom: "2px solid #F3F3F3",
            paddingBottom: "12px",
            paddingTop: "12px",
          }}
        >
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8} className="p-top">
            <Box className="notific-inner">
              <Typography>Task submitted</Typography>
              <Typography className="sub-text">
                You will receive notifications whenever an assigned task is
                submitted.
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={4}
            xl={4}
            sx={{ pr: 2 }}
            className="p-top"
          >
            <Box>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="flex-end"
                style={{ marginBottom: "0.8rem" }}
              >
                <Typography style={{ fontWeight: "500" , fontSize:"12px" }}>
                  Notification
                </Typography>
                <AntSwitch
                  defaultChecked
                  inputProps={{ "aria-label": "ant design" }}
                />
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="flex-end"
              >
                <Typography style={{ fontWeight: "500", fontSize:"12px"  }}>
                  Email
                </Typography>
                <AntSwitch
                  defaultChecked
                  inputProps={{ "aria-label": "ant design" }}
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
            m: 0,
            borderBottom: "2px solid #F3F3F3",
            paddingBottom: "12px",
            paddingTop: "12px",
          }}
        >
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8} className="p-top">
            <Box className="notific-inner">
              <Typography>Messages</Typography>
              <Typography className="sub-text">
                You will receive notifications whenever a new message or comment
                is received on runs.
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={4}
            xl={4}
            sx={{ pr: 2 }}
            className="p-top"
          >
            <Box>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="flex-end"
                style={{ marginBottom: "0.8rem" }}
              >
                <Typography style={{ fontWeight: "500" , fontSize:"12px" }}>
                  Notification
                </Typography>
                <AntSwitch
                  defaultChecked
                  inputProps={{ "aria-label": "ant design" }}
                />
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="flex-end"
              >
                <Typography style={{ fontWeight: "500", fontSize:"12px"  }}>
                  Email
                </Typography>
                <AntSwitch
                  defaultChecked
                  inputProps={{ "aria-label": "ant design" }}
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const NotificationPage = withSettingsLayout(Notification);

export default NotificationPage;
