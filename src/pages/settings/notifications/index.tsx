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
import { fetchUpdateNotification, fetchUserNotificationData } from "../../../api/notification.API";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
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
  const dispatch : any = useDispatch()
 const initialValues :any =[
    {
      createProcedure:[{email:false,notification:false}],
      runAssiged:[{email:false,notification:false}],
      runsCommend:[{email:false,notification:false}],
    }
  ]
    
  
  const [notificationList, setNotificationList]=React.useState<any>([
    {
      createProcedure: [{ email: false, notification: false }],
      runAssiged: [{ email: false, notification: false }],
      runsCommend: [{ email: false, notification: false }],
    }
  ])
  const NotificationSliceData = useSelector(
    (state: any) => state.notification.data?.get_notification,
  );
  const userSliceData = useSelector(
    (state: any) => state.userLogin?.data?.verifyToken,
  );
  React.useEffect(()=>{
    setNotificationList(notificationList)
  },[notificationList])

  React.useEffect(()=>{
    let payload={
      userId:userSliceData?._id
    }
  dispatch(fetchUserNotificationData(payload))
  setNotificationList(NotificationSliceData)
 
  },[NotificationSliceData])
  console.log(notificationList);
  const handleChange = (category, subCategory, val) => {
    // Create a deep copy of the state to avoid directly mutating state
    const updatedValues = JSON.parse(JSON.stringify(notificationList));
  
    // Toggle between true and false for email and notification
    updatedValues[0][category][0][subCategory] = val;
  
    // Set the state with the updated values
    setNotificationList(updatedValues);
    let payload={
      _id: notificationList?._id,
      createProcedure: notificationList!==undefined && notificationList[0]?.createProcedure,
      runsCommend: notificationList!==undefined && notificationList[0]?.runsCommend,
      runAssiged: notificationList!==undefined && notificationList[0]?.runAssiged,
    }
    dispatch(fetchUpdateNotification(payload))
  };

    return (
    <Box className="notification-page" style={{ padding: "24px" , paddingTop:"15px"}}>
      <Box
        className="title-main"
        sx={{ borderBottom: "1px solid #F3F3F3", paddingBottom: "8px" }}
      >
        <Box>
          <Typography>Notification settings</Typography>
          <Typography className="sub-text">
            Select the kinds of notifications you get about your activities and
            recommendations.
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
            className="p-top notification-email"
          >
            <Box>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="flex-end"
                style={{ marginBottom: "0.8rem" }}
              >
                <Typography style={{ fontWeight: "500", fontSize:"14px", color:"#767676" }}>
                  Notification
                </Typography>
                <AntSwitch
                  checked={notificationList!==undefined && notificationList[0]?.createProcedure[0]?.notification?true:false}
                  onChange={()=>handleChange('createProcedure', 'notification',!notificationList[0]?.createProcedure[0]?.notification)}
                  inputProps={{ "aria-label": "ant design" }}
                  name="notification"
                />
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="flex-end"
              >
                <Typography style={{ fontWeight: "500", fontSize:"14px", color:"#767676" }}>
                  Email
                </Typography>
                <AntSwitch
                  checked={notificationList!==undefined && notificationList[0]?.createProcedure[0]?.email?true:false}
                  onChange={()=>handleChange('createProcedure', 'email', !notificationList[0]?.createProcedure[0]?.email)}
                  inputProps={{ "aria-label": "ant design" }}
                  name="email"
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
            className="p-top notification-email"
          >
            <Box>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="flex-end"
                style={{ marginBottom: "0.8rem" }}
              >
                <Typography style={{ fontWeight: "500", fontSize:"14px", color:"#767676" }}>
                  Notification
                </Typography>
                <AntSwitch
                checked={notificationList!==undefined && notificationList[0]?.runsCommend[0]?.notification?true:false}
                onChange={()=>handleChange('runsCommend', 'notification',!notificationList[0]?.runsCommend[0]?.notification)}
                inputProps={{ "aria-label": "ant design" }}
                name="notification"
                />
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="flex-end"
              >
                <Typography style={{ fontWeight: "500", fontSize:"14px", color:"#767676" }}>
                  Email
                </Typography>
                <AntSwitch
                   checked={notificationList!==undefined && notificationList[0]?.runsCommend[0]?.email?true:false}
                   onChange={()=>handleChange('runsCommend', 'email', !notificationList[0]?.runsCommend[0]?.email)}
                  inputProps={{ "aria-label": "ant design" }}
                  name="email"
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
            className="p-top notification-email"
          >
            <Box>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="flex-end"
                style={{ marginBottom: "0.8rem" }}
              >
                <Typography style={{ fontWeight: "500", fontSize:"14px", color:"#767676" }}>
                  Notification
                </Typography>
                <AntSwitch
                checked={notificationList!==undefined && notificationList[0]?.runAssiged[0]?.notification?true:false}
                onChange={()=>handleChange('runAssiged', 'notification', !notificationList[0]?.runAssiged[0]?.notification)}
                inputProps={{ "aria-label": "ant design" }}
                name="notification"
                />
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="flex-end"
              >
                <Typography style={{ fontWeight: "500", fontSize:"14px", color:"#767676" }}>
                  Email
                </Typography>
                <AntSwitch
                  checked={notificationList!==undefined && notificationList[0]?.runAssiged[0]?.email?true:false}
                  onChange={()=>handleChange('runAssiged', 'email', notificationList[0]?.runAssiged[0]?.email)}
                  inputProps={{ "aria-label": "ant design" }}
                  name="email"
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
