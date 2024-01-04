import React from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Box,
  Typography,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { MoreVertOutlined } from '@mui/icons-material';
import help from '../../assets/images/help.svg';
import notification from '../../assets/images/notification.svg';
import dark from '../../assets/images/Darkmode.svg';
import account from '../../assets/images/account.svg';
import '../../assets/styles/App.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchSingleUserData } from '../../api/userAPI';
import { fetchNotificationMessageData } from '../../api/notificationMessageAPI';

const mobileMenuId = 'primary-search-account-menu-mobile';

function AppHeader(props: any) {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // const NotificationMessageSliceData = useSelector(

  //   (state: any) => {
  //     return state.notificationMessage.data?.get_notification_message

  //   }

  // )
  // let data = NotificationMessageSliceData?.message?.some((item) => !item.isRead)
  // console.log(data);
  
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="help icon" color="inherit">
          <img src={help} alt="help_icon" className="app-bar-images" />
        </IconButton>
        <p>Help</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="notification icon" color="inherit">
          <img
            src={notification}
            alt="notification_icon"
            className="app-bar-images"
          />
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account"
          aria-haspopup="true"
          color="inherit"
        >
          <img src={account} alt="account_icon" className="app-bar-images" />
        </IconButton>
        <p>Account</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="dark"
          aria-haspopup="true"
          color="inherit"
        >
          <img src={dark} alt="dark_icon" className="app-bar-images" />
        </IconButton>
        <p>Dark Mode</p>
      </MenuItem>
    </Menu>
  );

  const openEditProfile = () => {
    props.toggleProfileDrawer();
  };

  const openNotificationList = () => {
    props.toggleNotificationDrawer();
  };
  // const loginUserSliceData=  useSelector(
  //   (state: any) => state.userLogin?.verifyToken, 
  // );
  const loginUserSliceData=  useSelector(
    (state: any) => state.userLogin.data, 
  );
    // console.log('wwwww',loginUserSliceData);
  const dispatch: any = useDispatch();
  const[userData, setUserData]=React.useState<any>({})
  const[isAnyRead,setisAnyRead]=React.useState<boolean>(false)
 console.log(loginUserSliceData);
 const singleUserData= useSelector((state:any)=> state.user.data)
  React.useEffect(()=> {
    let temp = { _id: loginUserSliceData?.verifyToken?._id };
    // if (row?._id) {
    dispatch(fetchSingleUserData(temp))
      .then((isSucess:any) => {
        setUserData(isSucess?.get_user)
        })
      
      .catch((err:any) => {
        console.log(err);
      });
    // }
  },[loginUserSliceData,singleUserData]);
  const NotificationMessageSliceData = useSelector((state: any) => {
    return state.notificationMessage.data?.get_notification_message;
  });

  React.useEffect(() => {
    // dispatch(fetchNotificationData());
    // console.log("notification2", loginUserSliceData?.verifyToken?._id,"==",NotificationMessageSliceData);
    
    let payload={
      userId: loginUserSliceData?.verifyToken?._id
    }
    console.log(payload);
    
    dispatch(fetchNotificationMessageData(payload)).then((res)=>{
      // setNotificationMesssage(res?.data?.get_notification_message)
      console.log(res?.data?.get_notification_message)
      // const notifications = [
      //   {
      //     "_id": "6576bd5ad1f88bacee008528",
      //     "title": "procedure",
      //     "userId": "657938c0619b9200129b1145",
      //     "message": "procedure created",
      //     "isRead": true,
      //     "notificationRuleId": "null",
      //     "isActive": "true",
      //     "isDeleted": "false",
      //     "createdAt": "1702280538228",
      //     "__typename": "NotificationMessage"
      //   },
      //   {
      //     "_id": "6576bd5ad1f88bacee008528",
      //     "title": "procedure",
      //     "userId": "657938c0619b9200129b1145",
      //     "message": "procedure created",
      //     "isRead": true,
      //     "notificationRuleId": "null",
      //     "isActive": "true",
      //     "isDeleted": "false",
      //     "createdAt": "1702280538228",
      //     "__typename": "NotificationMessage"
      //   },
      //   {
      //     "_id": "6576bd5ad1f88bacee008528",
      //     "title": "procedure",
      //     "userId": "657938c0619b9200129b1145",
      //     "message": "procedure created",
      //     "isRead": true,
      //     "notificationRuleId": "null",
      //     "isActive": "true",
      //     "isDeleted": "false",
      //     "createdAt": "1702280538228",
      //     "__typename": "NotificationMessage"
      //   }
      //   // ... (other notification objects)
      // ]
      const notifications:any = NotificationMessageSliceData?.message
      // Check if at least one notification has isRead set to true
      setisAnyRead(notifications?.some((notification:any) => notification.isRead === false))
      
      // console.log(isAnyRead);
    //   const notifications:any = res?.data?.get_notification_message?.message
      
    //   // Check if at least one notification has isRead set to true
    //  setisAnyRead(notifications?.some((notification:any) => {console.log("isAnyRead",notification.isRead === false);
    //  (notification.isRead === false)}))
      
    });
  }, [NotificationMessageSliceData]);
  console.log("isAnyRead2",isAnyRead);
  return (
    <Box className="app-bar-block">
      <AppBar
        position="fixed"
        // open={true}
        className="app-bar"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{
              marginRight: 5,
            }}
            onClick={() => props.toggleDrawer()}
          >
            <MenuIcon className="app-bar-icons" />
          </IconButton>
          <Box>
            <Typography variant="h6" className="app-bar-title">
              Test <span className="app-bar-label">Runs</span>
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            className="header-right-side"
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {/* {typeof window !== 'undefined' &&
              window.location.pathname.split('/')[1] == 'mypage' && (
                <Box className="search-field">
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
              )} */}
            <IconButton size="large" aria-label="help icon" color="inherit">
              <img src={help} alt="help_icon" className="app-bar-images" />
            </IconButton>
            <IconButton
              size="large"
              aria-label="notification icon"
              color="inherit"
              onClick={openNotificationList}
            >
              <Badge
                color="secondary"
                // variant={isAnyRead==true?"dot":"standard"}
                variant={isAnyRead==true?"dot":"standard"}
                // invisible={isAnyRead==true?false:true}
                className="red-badge"
              >
                <img
                  src={notification}
                  alt="help_icon"
                  className="app-bar-images"
                />
              </Badge>
            </IconButton>
            <IconButton 
              size="large"
              aria-label="account icon"
              color="inherit"
              onClick={openEditProfile}
            >
              <Typography variant="inherit" className="app-bar-username">
                Hi {userData?.firstName}
              </Typography>
              <div >
              <img style={{cursor:'pointer'}} src={(userData?.imageUrl!=="" && userData?.imageUrl!==null)?userData?.imageUrl:account} className="app-bar-images" style={{borderRadius: "13px"}}/>
              </div>
            </IconButton>
            {/* <IconButton
              size="large"
              aria-label="dark icon"
              color="inherit"
              onClick={changeTheme}
            >
              <img src={dark} alt="help_icon" className="app-bar-images" />
            </IconButton> */}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreVertOutlined className="app-bar-icons" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}

export default React.memo(AppHeader);
