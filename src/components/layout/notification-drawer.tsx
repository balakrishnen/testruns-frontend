import { Box, Drawer, Toolbar, Typography } from '@mui/material';
import React from 'react';
import '../../assets/styles/App.scss';
import Avatars from '../../assets/images/Avatars.svg';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { fetchNotificationData } from '../../api/notification.API';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import data from '../../assets/images/profile/user.jpg';

export default function AppNotificationDrawer({
  openDrawer,
  toggleNotificationDrawer,
}: any) {
  const NotificationSliceData = useSelector(
    (state: any) => state.notification.data?.get_all_notifications,
  );
  const dispatch: any = useDispatch();

  React.useEffect(() => {
    dispatch(fetchNotificationData());
  }, []);

  const getTimeDifference = (notificationTime: any) => {
    const currentTime: Date = new Date();
    const postedTime: Date = new Date('2023-11-03T12:00:00');
    const timeDifference: number = Math.abs(
      currentTime.getTime() - postedTime.getTime(),
    );
    const hoursDifference: number = Math.floor(
      timeDifference / (1000 * 60 * 60),
    );

    if (hoursDifference >= 24) {
      const daysDifference: number = Math.floor(hoursDifference / 24);
      return `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
    }

    return `${hoursDifference}h ago`;
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
      onClose={toggleNotificationDrawer}
    >
      <Toolbar />
      <Box className="notification-header">
        <Box className="notification-title">
          <Typography>Notifications</Typography>
          <Typography className="mark-read">
            <span style={{ cursor: 'pointer' }}>Mark all as read</span>{' '}
            <span
              style={{
                width: '24px',
                height: '24px',
                marginLeft: '2rem',
                cursor: 'pointer',
              }}
            >
              <OpenInNewIcon style={{ width: '24px', height: '24px' }} />
            </span>
          </Typography>
        </Box>
        <Box sx={{ height: 'calc(100vh - 150px)', overflowY: 'auto' }}>
          {NotificationSliceData?.map((row: any, index: any) => (
            <Box className="notifications" key={index}>
              <Box className="image-container">
                <Avatar
                  alt="User Avatar"
                  src={data}
                  sx={{ width: 56, height: 56, borderRadius: '50%' }}
                />
                <Box className="text-container">
                  <Box className="heading">{row.title}</Box>
                  <Box className="content">{row.message}</Box>
                </Box>
              </Box>
              <Box className="time">{getTimeDifference(row.postedTime)}</Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
}
