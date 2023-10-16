import { Box, Drawer, Toolbar, Typography } from "@mui/material";
import React from "react";
import "../../assets/styles/App.scss";
import Avatars from "../../assets/images/Avatars.svg";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
export default function AppNotificationDrawer({ openDrawer }: any) {
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
      <Box className="notification-header">
        <Box className="notification-title">
          <Typography>Notifications</Typography>
          <Typography className="mark-read">Mark all as read <span style={{width:"24px",height:"24px",marginLeft: "2rem"}}><OpenInNewIcon style={{width:"24px",height:"24px"}}/></span></Typography>
        </Box>
        <Box sx={{ height: 'calc(100vh - 150px)', overflowY: 'auto' }}>
          <Box className="notifications">
            <Box className="image-container">
              <img src={Avatars} className="dp-iamge" />
              <Box className="text-container">
                <Box className="heading">Requester name has assigned you a task ID09876</Box>
                <Box className="content">Thickness of a paper by vernier calliperse</Box>
              </Box>
            </Box>
            <Box className="time">2h ago</Box>
          </Box>
          <Box className="notifications">
            <Box className="image-container">
              <img src={Avatars} className="dp-iamge" />
              <Box className="text-container">
                <Box className="heading">Requester name has assigned you a task ID09876</Box>
                <Box className="content">Thickness of a paper by vernier calliperse</Box>
              </Box>
            </Box>
            <Box className="time">2h ago</Box>
          </Box>
          <Box className="notifications">
            <Box className="image-container">
              <img src={Avatars} className="dp-iamge" />
              <Box className="text-container">
                <Box className="heading">Requester name has assigned you a task ID09876</Box>
                <Box className="content">Thickness of a paper by vernier calliperse</Box>
              </Box>
            </Box>
            <Box className="time">2h ago</Box>
          </Box>
          <Box className="notifications">
            <Box className="image-container">
              <img src={Avatars} className="dp-iamge" />
              <Box className="text-container">
                <Box className="heading">Tester B had commented on task ID05828ADN.</Box>
                <Box className="content">Thickness of a paper by vernier calliperse</Box>
              </Box>
            </Box>
            <Box className="time">2h ago</Box>
          </Box>
          <Box className="notifications">
            <Box className="image-container">
              <img src={Avatars} className="dp-iamge" />
              <Box className="text-container">
                <Box className="heading">Tester B had commented on task ID05828ADN.</Box>
                <Box className="content">Thickness of a paper by vernier calliperse</Box>
              </Box>
            </Box>
            <Box className="time">2h ago</Box>
          </Box>
          <Box className="notifications read-notification">
            <Box className="image-container">
              <img src={Avatars} className="dp-iamge" />
              <Box className="text-container">
                <Box className="heading">Tester B had commented on task ID05828ADN.</Box>
                <Box className="content">Thickness of a paper by vernier calliperse</Box>
              </Box>
            </Box>
            <Box className="time">2h ago</Box>
          </Box>
          <Box className="notifications read-notification">
            <Box className="image-container">
              <img src={Avatars} className="dp-iamge" />
              <Box className="text-container">
                <Box className="heading">Tester B had commented on task ID05828ADN.</Box>
                <Box className="content">Thickness of a paper by vernier calliperse</Box>
              </Box>
            </Box>
            <Box className="time">2h ago</Box>
          </Box>
          <Box className="notifications read-notification">
            <Box className="image-container">
              <img src={Avatars} className="dp-iamge" />
              <Box className="text-container">
                <Box className="heading">Tester B had commented on task ID05828ADN.</Box>
                <Box className="content">Thickness of a paper by vernier calliperse</Box>
              </Box>
            </Box>
            <Box className="time">2h ago</Box>
          </Box>
          <Box className="notifications read-notification">
            <Box className="image-container">
              <img src={Avatars} className="dp-iamge" />
              <Box className="text-container">
                <Box className="heading">Tester B had commented on task ID05828ADN.</Box>
                <Box className="content">Thickness of a paper by vernier calliperse</Box>
              </Box>
            </Box>
            <Box className="time">2h ago</Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}