import React, { useEffect } from "react";
import { navigate } from "gatsby";
import { darkTheme, lightTheme } from "../utils/theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import AppHeader from "./layout/header";
import AppMenu from "./layout/menu";
import AppProfileDrawer from "./layout/profile-drawer";
import AppNotificationDrawer from "./layout/notification-drawer";
// import AppProfileDrawer from "./layout/profile-drawer";
// import AppNotificationDrawer from "./layout/notification-drawer";

const isLoggedIn = true;

const PrivateRoute = ({ children }: any) => {
  const [width, setWidth] = React.useState(290);
  const [editProfile, setEditProfile] = React.useState(false);
  const [notificationList, setNotificationList] = React.useState(false);
  const [theme, setTheme] = React.useState(lightTheme);

  const toggleDrawer = () => {
    setWidth(width === 290 ? 95 : 290);
  };

  const toggleProfileDrawer = () => {
    setEditProfile(!editProfile);
  };

  const toggleNotificationDrawer = () => {
    setNotificationList(!notificationList);
  };

  const toggleTheme = () => {
    setTheme((prevTheme: any) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  useEffect(() => {
    console.log('ROUTE INIT')
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppHeader
          toggleDrawer={toggleDrawer}
          toggleProfileDrawer={toggleProfileDrawer}
          toggleNotificationDrawer={toggleNotificationDrawer}
          toggleTheme={toggleTheme}
        />
        <AppMenu width={width} />

        <AppProfileDrawer openDrawer={editProfile} />
        <AppNotificationDrawer openDrawer={notificationList} />

        <Box
          component="main"
          sx={{       
            width: "100%",            
            position:'relative',
            top:'65px'
          }}
          className={`${width === 290 ? 'wide-class' : 'narrow-class'}`}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PrivateRoute;
