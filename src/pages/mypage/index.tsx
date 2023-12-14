import React from 'react';
import PrivateRoute from '../../components/PrivateRoute';
import {
  Box,
  Divider,
  FormControl,
  Grid,
  Chip,
  Select,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import MenuItem from '@mui/material/MenuItem';
import Avatars from '../../assets/images/Avatars.svg';
import image_holder from '../../assets/images/image-holder.svg';
import viewarrow from '../../assets/images/chevrondown-gray.svg';
import { useState } from 'react';
import Calendar from 'react-calendar';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Emptystate from '../../assets/images/Emptystate.svg';
import Moment from 'moment';
import { fetchNotificationData } from '../../api/notification.API';
import { fetchNotificationMessageData, fetchReadSingleMessageData } from '../../api/notificationMessageAPI';
import { fetchMyPageRunsData } from '../../api/myPageAPI'
import {
    fetchCalendarEventData,
} from '../../api/myPageAPI';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import data from '../../assets/images/profile/user.jpg';
export const mypageRows = [
  {
    is_checked: false,
    id: '1',
    name: 'Username',
    mypageNumber: 'ID1002',
    status: 1,
    availability: 'AVAILABLE',
    userId: '101',
    departmentId: 'DEPT1001',
    laboratoryId: 'LAB1001',
    isActive: 1,
    expiryDate: '1',
    extraData: 'Thickness of a paper by vernier calliperse',
    createdAt: '02/10/2023',
    purchasedDate: '02/10/2023',
    updatedAt: 'Requester name has assigned you a task ID09876',
    deletedAt: 'Thickness of a paper by vernier calliperse',
  },
  {
    is_checked: false,
    id: '2',
    name: 'Username',
    mypageNumber: 'ID1001',
    status: 1,
    availability: 'AVAILABLE',
    userId: '101',
    departmentId: 'DEPT1001',
    laboratoryId: 'LAB1001',
    isActive: 1,
    expiryDate: '1',
    extraData: 'Qualitative analysis for Cu, Zn, Fe, Al',
    createdAt: '02/10/2023',
    purchasedDate: '02/10/2023',
    updatedAt: 'Requester name has assigned you a task ID09876',
    deletedAt: 'Thickness of a paper by vernier calliperse',
  },
  {
    is_checked: false,
    id: '3',
    name: 'Username',
    mypageNumber: 'ID1001',
    status: 1,
    availability: 'AVAILABLE',
    userId: '101',
    departmentId: 'DEPT1001',
    laboratoryId: 'LAB1001',
    isActive: 1,
    expiryDate: '02/10/2023',
    extraData: 'Qualitative analysis for Cu, Zn, Fe, Al',
    createdAt: '02/10/2023',
    purchasedDate: '02/10/2023',
    updatedAt: 'Requester name has assigned you a task ID09876',
    deletedAt: 'Thickness of a paper by vernier calliperse',
  },
  {
    is_checked: false,
    id: '4',
    name: 'Username',
    mypageNumber: 'ID1001',
    status: 2,
    availability: 'AVAILABLE',
    userId: '101',
    departmentId: 'DEPT1001',
    laboratoryId: 'LAB1001',
    isActive: 1,
    expiryDate: '02/10/2023',
    extraData: 'Qualitative analysis for Cu, Zn, Fe, Al',
    createdAt: '02/10/2023',
    purchasedDate: '02/10/2023',
    updatedAt: 'Requester name has assigned you a task ID09876',
    deletedAt: 'Thickness of a paper by vernier calliperse',
  },
  {
    is_checked: false,
    id: '5',
    name: 'Username',
    mypageNumber: 'ID1001',
    status: 3,
    availability: 'AVAILABLE',
    userId: '101',
    departmentId: 'DEPT1001',
    laboratoryId: 'LAB1001',
    isActive: 1,
    expiryDate: '02/10/2023',
    extraData: 'Qualitative analysis for Cu, Zn, Fe, Al',
    createdAt: '02/10/2023',
    purchasedDate: '02/10/2023',
    updatedAt: 'Requester name has assigned you a task ID09876',
    deletedAt: 'Thickness of a paper by vernier calliperse',
  },
  {
    is_checked: false,
    id: '6',
    name: 'Username',
    mypageNumber: 'ID1001',
    status: 3,
    availability: 'AVAILABLE',
    userId: '101',
    departmentId: 'DEPT1001',
    laboratoryId: 'LAB1001',
    isActive: 1,
    expiryDate: '02/10/2023',
    extraData: 'Qualitative analysis for Cu, Zn, Fe, Al',
    createdAt: '02/10/2023',
    purchasedDate: '02/10/2023',
    updatedAt: 'Requester name has assigned you a task ID09876',
    deletedAt: 'Thickness of a paper by vernier calliperse',
  },
  {
    is_checked: false,
    id: '7',
    name: 'Username',
    mypageNumber: 'ID1002',
    status: 3,
    availability: 'AVAILABLE',
    userId: '101',
    departmentId: 'DEPT1001',
    laboratoryId: 'LAB1001',
    isActive: 1,
    expiryDate: '02/10/2023',
    extraData: 'Thickness of a paper by vernier calliperse',
    createdAt: '02/10/2023',
    purchasedDate: '02/10/2023',
    updatedAt: 'Requester name has assigned you a task ID09876',
    deletedAt: 'Thickness of a paper by vernier calliperse',
  },
  {
    is_checked: false,
    id: '8',
    name: 'Username',
    mypageNumber: 'ID1003',
    status: 3,
    availability: 'AVAILABLE',
    userId: '101',
    departmentId: 'DEPT1001',
    laboratoryId: 'LAB1001',
    isActive: 1,
    expiryDate: '02/10/2023',
    extraData: 'Thickness of a paper by vernier calliperse',
    createdAt: '02/10/2023',
    purchasedDate: '02/10/2023',
    updatedAt: 'Requester name has assigned you a task ID09876',
    deletedAt: 'Thickness of a paper by vernier calliperse',
  },
  {
    is_checked: false,
    id: '9',
    name: 'Username',
    mypageNumber: 'ID1001',
    status: 3,
    availability: 'AVAILABLE',
    userId: '101',
    departmentId: 'DEPT1001',
    laboratoryId: 'LAB1001',
    isActive: 1,
    expiryDate: '02/10/2023',
    extraData: 'Qualitative analysis for Cu, Zn, Fe, Al',
    createdAt: '02/10/2023',
    purchasedDate: '02/10/2023',
    updatedAt: 'Requester name has assigned you a task ID09876',
    deletedAt: 'Thickness of a paper by vernier calliperse',
  },
  {
    is_checked: false,
    id: '10',
    name: 'Username',
    mypageNumber: 'ID1001',
    status: 3,
    availability: 'AVAILABLE',
    userId: '101',
    departmentId: 'DEPT1001',
    laboratoryId: 'LAB1001',
    isActive: 1,
    expiryDate: '02/10/2023',
    extraData: 'Thickness of a paper by vernier calliperse',
    createdAt: '02/10/2023',
    purchasedDate: '02/10/2023',
    updatedAt: 'Requester name has assigned you a task ID09876',
    deletedAt: 'Thickness of a paper by vernier calliperse',
  },
];

import { MypageRowData } from '../../modals/mypage.modal';
import TablePopup from '../../components/table/TablePopup';
import { fetchSingleUserData } from '../../api/userAPI';
import moment from 'moment';

// function createData(
//   name: string,
//   description: string,
//   calories: string,
// ) {
//   return { name, description, calories };
// }
const rows: MypageRowData[] = mypageRows;

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const customDayStyle = {
  borderBottom: '2px solid yellow',
};

export default function MyPage() {
  const dispatch: any = useDispatch();
  const [viewAllNotifications, setViewAllNotifications] = useState(false);
  const [queryStrings, setQueryString] = React.useState({
    page: 1,
    perPage: 10,
    searchBy: null,
    search: null,
    sortBy: null,
    sortOrder: 'desc',
  });

  const [notificationQueryStrings, setNotificationQueryString] = React.useState({
    userId: ""
  });
  const [clickedDate, setClickedDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [value, onChange] = useState<Value>(
    moment(new Date()).format('MM-DD-YYYY'),
  );
  const [viewAll, setViewAll] = useState(false);
  const [viewAlls, setViewAlls] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [localRowsPerPage, setLocalRowsPerPage] = useState(5);
  const [CalendarContent, setCalendarContent] = useState([]);
  const [calendarEventData, setCalendarEventData] = useState([]);
  const [CalendarMark, setCalendarMark] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = React.useState('');
  const [notifications, setNotifications] = useState([
    // Your notification data goes here
  ]);

  const tablePopupRef: any = React.useRef(null);

  // const NotificationSliceData = useSelector(
  //   (state: any) => state.notification.data?.get_all_notifications,
  // );

  const NotificationMessageSliceData = useSelector(

    (state: any) => {
      return state.notificationMessage.data?.get_notification_message

    }

  )
  const calendar_eventData = useSelector(
    (state: any) => state.calendar_event.data,
  );
  const MyPageRunsData = useSelector(
    (state: any) => state.myPageSlice.data?.get_all_runs,
  );
  const loginUserSliceData=  useSelector(
    (state: any) => state.userLogin.data, 
  );
    // console.log('wwwww',loginUserSliceData);
  const[userData, setUserData]=React.useState<any>({})
 console.log(loginUserSliceData);
 
  React.useEffect(()=> {
    let temp = { _id: loginUserSliceData?.verifyToken?._id };
    // if (row?._id) {
    dispatch(fetchSingleUserData(temp))
      .then((isSucess:any) => {
        setUserData(isSucess?.get_user)
        setNotificationQueryString(isSucess?.get_user?._id)
        })
      
      .catch((err:any) => {
        console.log(err);
      });
    // }
  },[loginUserSliceData]);
  React.useEffect(() => {
    let pay = {
      month: `${new Date().getMonth() + 1}`,
      year: `${new Date().getFullYear()}`,
    };
    let payload={
     userId: userData?._id
    }
    dispatch(fetchNotificationData());
    dispatch(fetchCalendarEventData(pay));
    dispatch(fetchMyPageRunsData(queryStrings));
    dispatch(fetchNotificationMessageData(payload));
  }, [userData]);

  React.useEffect(() => {
    const calendarMarkSet = new Set();
    const calendar = calendar_eventData?.runs_calender_data.map((item) => {
      const date = new Date(parseInt(item.createdAt));
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear();
      const formattedDate = `${month}-${day}-${year}`;
      const temp = { ...item, createdAt: formattedDate };
      calendarMarkSet.add(formattedDate);
      return temp;
    });
    const calendarMark = Array.from(calendarMarkSet);
    setCalendarMark(calendarMark);
    setCalendarEventData(calendar);
  }, [calendar_eventData]);

  const getTimeDifference = (notificationTime: any) => {
    const currentTime: any = Moment().format('YYYY-MM-DD');
    const minutesTime = Moment(notificationTime).diff(currentTime, 'minutes');
    const hoursDifference = moment(notificationTime).diff(currentTime, 'hours');

    if (minutesTime >= 60){
      return `${hoursDifference}h ago`;
    }

    if (hoursDifference > 24) {
      const daysDifference: number = Math.floor(hoursDifference / 24);
      return `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
    }
 

    return `${minutesTime}min ago`;
  };

  const handleDateClick = (date: any) => {
    const filCalendarContent = calendarEventData.filter(
      (item) => item.createdAt === moment(date).format('MM-DD-YYYY'),
    );
    setCalendarContent(filCalendarContent);
    setSelectedDate(moment(date).format('MM-DD-YYYY'));
  };

  const Placeholder = ({ children }: any) => {
    return <div>{children}</div>;
  };

  const toggleView = () => {
    setViewAll((prev) => !prev);
  };
  const toggleViews = () => {
    setViewAlls((prev) => !prev);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(event.target.value);
  };

  const totalRows = rows.length;

  const firstRowIndex = (currentPage - 1) * rowsPerPage + 1;
  const lastRowIndex = Math.min(currentPage * rowsPerPage, totalRows);
  const rowIndex = (currentPage - 1) * localRowsPerPage + 1;
  const lastIndex = Math.min(currentPage * localRowsPerPage, totalRows);

  const toggleViewNotifications = () => {
    setViewAllNotifications((prev) => !prev);
  };
  const handleReadSingleNotification=async(id:any)=>{
    let payload={
      _id:id,
      isRead:true
    }
   await dispatch(fetchReadSingleMessageData(payload))
   await dispatch(fetchNotificationMessageData(notificationQueryStrings));

  }
  return (
    <PrivateRoute>
      <Box className="main-padding mypage-page">
        <Box
          className="table-outer"
          sx={{ width: '100%', marginTop: '0rem !important' }}
        >
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Current tasks</TableCell>
                  <TableCell align="right">Department</TableCell>

                  <TableCell align="right">Lab</TableCell>
                  <TableCell align="right">Assigned by</TableCell>
                  <TableCell align="right">Created on</TableCell>

                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MyPageRunsData?.Runs.slice(
                  0,
                  viewAll ? MyPageRunsData?.Runs.length : rowsPerPage,
                ).map((row: any, index: any) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell scope="row">
                      <Box>
                        <Box>{row.runNumber}</Box>
                      </Box>
                    </TableCell>
                    <TableCell>{row.objective}</TableCell>
                    <TableCell>
                      {row.departmentId[0] !== null ? (
                        <Box
                          onClick={(_event) => {
                            _event.preventDefault();
                            _event.stopPropagation();
                            tablePopupRef.current?.open(
                              true,
                              'departments',
                              row.departmentId,
                            );
                          }}
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <>
                            <Chip
                              key={index}
                              label={row.departmentId[0].name}
                              sx={{
                                m: 0.5,
                                padding: '0px 3px',
                              }}
                              onClick={(_event) => {
                                _event.preventDefault();
                                _event.stopPropagation();
                                tablePopupRef.current.open(
                                  true,
                                  'departments',
                                  row.departmentId,
                                );
                              }}
                            />
                            {row.departmentId.length > 1 && (
                              <span
                                style={{
                                  fontWeight: 500,
                                  color: '#9F9F9F',
                                  fontSize: '12px',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                +{row.departmentId.length - 1} More
                              </span>
                            )}
                          </>
                        </Box>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell style={{ whiteSpace: 'nowrap' }}>
                      {row.laboratoryId[0] !== null ? (
                        <Box
                          onClick={(_event) => {
                            _event.preventDefault();
                            _event.stopPropagation();
                            tablePopupRef.current?.open(
                              true,
                              'lab',
                              row.laboratoryId,
                            );
                          }}
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <>
                            <Chip
                              key={index}
                              label={row.laboratoryId[0].name}
                              sx={{
                                m: 0.5,
                                padding: '0px 3px',
                              }}
                              onClick={(_event) => {
                                _event.preventDefault();
                                _event.stopPropagation();
                                tablePopupRef.current.open(
                                  true,
                                  'lab',
                                  row.laboratoryId,
                                );
                              }}
                            />
                            {row.laboratoryId.length > 1 && (
                              <span
                                style={{
                                  fontWeight: 500,
                                  color: '#9F9F9F',
                                  fontSize: '12px',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                +{row.laboratoryId.length - 1} More
                              </span>
                            )}
                          </>
                        </Box>
                      ) : (
                        <span style={{ textAlign: 'center' }}>-</span>
                      )}
                    </TableCell>
                    <TableCell align="center">Super Admin</TableCell>
                    <TableCell component="th" scope="row">
                      <Box>
                        {row.createdAt === null
                          ? '-'
                          : moment(row.createdAt).isValid()
                          ? moment(row.createdAt).local().format('MM/DD/YYYY')
                          : moment().format('MM/DD/YYYY')}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        className={
                          row.status === 'Created'
                            ? 'create-select td-select'
                            : row.status === 'Started'
                            ? 'start-select td-select'
                            : row.status === 'Complete'
                            ? 'active-select td-select'
                            : 'inactive-select td-select'
                        }
                        style={{
                          background:
                            row.status === 'Created'
                              ? '#8d8d8d'
                              : row.status === 'Started'
                              ? '#faaa49'
                              : row.status === 'Stopped'
                              ? '#e2445c'
                              : '#00bf70',
                          padding: '6px',
                          width: '140px',
                          borderRadius: '20px',
                          height: '26px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {row?.status}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box className="show-page">
            <Typography>
              {totalRows > rowsPerPage
                ? viewAll
                  ? `Showing 1 - ${totalRows} out of ${totalRows}`
                  : `Showing ${firstRowIndex} - ${lastRowIndex} out of ${totalRows}`
                : `Showing ${totalRows} out of ${totalRows}`}
            </Typography>
            {totalRows > rowsPerPage && (
              <Typography
                onClick={toggleView}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                {viewAll ? 'View less' : 'View all'}{' '}
                {viewAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </Typography>
            )}
          </Box>
        </Box>
        <Grid
          container
          spacing={2}
          sx={{ width: '100%', marginLeft: '0rem', marginTop: '1rem' }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={8}
            xl={8}
            sx={{
              paddingLeft: '0px !important',
              paddingRight: { xs: '0px', lg: '16px' },
              paddingBottom: { xs: '16px', lg: '0px' },
            }}
          >
            <Box className="notification-mypage">
              <Box className="notification-title">
                <Typography>Notifications</Typography>
              </Box>
              <Box
                sx={{
                  overflowY: 'scroll',
                  paddingBottom: '0rem',
                  height: 'calc(100vh - 31vh)',
                }}
              >

                {NotificationMessageSliceData?.message.length!==0? NotificationMessageSliceData?.message?.map((notification: any, index: any) => (
                  <Box
                    className="notifications"
                    key={index}
                    style={{
                      backgroundColor: notification?.isRead == false ? '#F3F3F3' : 'white', // Apply different background for the first notification
                    }}
                    onClick={()=>handleReadSingleNotification(notification?._id)}
                  >
                    <Box className="image-container">
                      <Avatar
                        alt="User Avatar"
                        src={data} // Assuming `data` contains the image source
                        sx={{ width: 56, height: 56, borderRadius: '50%' }}
                      />
                      <Box className="text-container">
                        <Box className="heading">{notification.title}</Box>
                        <Box className="content">{notification.message}</Box>
                      </Box>
                    </Box>
                    <Box className="time">
                      {getTimeDifference(notification.createdAt)}
                    </Box>
                  </Box>
                ))
                :
                <Box sx={{ textAlign: 'center', padding:"15%" }}>
                <img src={Emptystate} alt="" />
                <Typography className="no-remainder">
                  No notifications yet!
                </Typography>
                </Box>}
                {/* // : */}
                
                {/* <Box className="show-page">
                  <Typography>
                    {viewAlls ? `Showing 1 - ${totalRows} out of ${totalRows}` : `Showing ${rowIndex} - ${lastIndex} out of ${totalRows}`}
                  </Typography>
                  <Typography onClick={toggleViews} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    {viewAlls ? 'View Less' : 'View All'} <img src={viewarrow} alt="arrow" style={{ marginLeft: '0.5rem', transform: viewAlls ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                  </Typography> 
                </Box> */}
              </Box>
              <Box className="show-page">
                <Typography>
                  {totalRows > localRowsPerPage
                    ? viewAlls
                      ? `Showing 1 - ${totalRows} out of ${totalRows}`
                      : `Showing ${rowIndex} - ${lastIndex} out of ${totalRows}`
                    : `Showing ${totalRows} out of ${totalRows}`}
                </Typography>
                {totalRows > localRowsPerPage && (
                  <Typography
                    onClick={toggleViews}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    {viewAlls ? 'View less' : 'View all'}{' '}
                    {viewAlls ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={4}
            xl={4}
            sx={{
              paddingLeft: { xs: '0px !important', lg: '16px !important' },
            }}
          >
            <Box className="calender-rightside">
              <Calendar
                onChange={handleDateClick}
                value={value}
                tileClassName={({ date, view }) => {
                  if (
                    CalendarMark.includes(moment(date).format('MM-DD-YYYY'))
                  ) {
                    return 'events';
                  }
                }}
              />
              <Divider className="hr-calender" />
              <Box
                sx={{
                  overflowY: 'scroll',
                  paddingBottom: '0rem',
                  height: 'calc(100vh - 79vh)',
                }}
              >
                {CalendarMark.includes(selectedDate) ? (
                  <>
                    {CalendarContent.map((item, index) => (
                      <>
                        <Box sx={{ textAlign: 'left' }}>
                          <Box className="hover-calender">
                            <Typography
                              className="id-detail"
                              style={{ textDecoration: 'underline' }}
                            >
                              {item.runNumber}/{item.createdAt}
                            </Typography>
                            <Typography className="id-detail-title">
                              {item.objective}{' '}
                            </Typography>
                          </Box>
                          {index < CalendarContent.length - 1 && (
                            <hr
                              style={{
                                border: '1px solid #f5f5f5',
                                margin: '0.5rem 0rem',
                              }}
                            />
                          )}
                        </Box>
                      </>
                    ))}
                  </>
                ) : (
                  <Box sx={{ textAlign: 'center' }}>
                    <img src={Emptystate} alt="" />
                    <Typography className="no-remainder">
                      No reminders yet!
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <TablePopup ref={tablePopupRef} />
    </PrivateRoute>
  );
}
