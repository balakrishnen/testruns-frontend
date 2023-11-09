
import React from 'react';
import PrivateRoute from '../../components/PrivateRoute';
import { Box, Divider, FormControl, Grid, Select, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined"
import MenuItem from '@mui/material/MenuItem';
import Avatars from "../../assets/images/Avatars.svg";
import image_holder from "../../assets/images/image-holder.svg";
import viewarrow from "../../assets/images/chevrondown-gray.svg";
import { useState } from 'react';
import Calendar from 'react-calendar';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Emptystate from '../../assets/images/Emptystate.svg';
import { fetchNotificationData } from '../../api/notification.API';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import data from 'assets/images/common/notification.png'
export const mypageRows = [
  {
    is_checked: false,
    id: '1',
    name: 'Username',
    mypageNumber: 'ID1002',
    status: 1,
    availability: 'AVAILABLE',
    userId: '101',
    departmentId: 'DEPT-1001',
    laboratoryId: 'LAB-1001',
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
    departmentId: 'DEPT-1001',
    laboratoryId: 'LAB-1001',
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
    departmentId: 'DEPT-1001',
    laboratoryId: 'LAB-1001',
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
    departmentId: 'DEPT-1001',
    laboratoryId: 'LAB-1001',
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
    departmentId: 'DEPT-1001',
    laboratoryId: 'LAB-1001',
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
    departmentId: 'DEPT-1001',
    laboratoryId: 'LAB-1001',
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
    departmentId: 'DEPT-1001',
    laboratoryId: 'LAB-1001',
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
    departmentId: 'DEPT-1001',
    laboratoryId: 'LAB-1001',
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
    departmentId: 'DEPT-1001',
    laboratoryId: 'LAB-1001',
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
    departmentId: 'DEPT-1001',
    laboratoryId: 'LAB-1001',
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

// function createData(
//   name: string,
//   description: string,
//   calories: string,
// ) {
//   return { name, description, calories };
// }
const rows: MypageRowData[] = mypageRows;
// const rows = [
//   createData('Dept-physics/Lab-Mechanical/ID05828ADN', 'Thickness of a paper by vernier calliperse', "02/05/2022"),
//   createData('Dept- Biology/Lab- Botany/ID023659ADN', 'Demonstrate that carbon dioxide is released during the process of respiration.', "02/05/2022"),
//   createData('Dept- Chemistry/Lab- Chemical kinematics/ID065359ADN', 'Qualitative analysis for Cu, Zn, Fe, Al', "02/05/2022"),
//   createData('Dept- Biology/Lab- Botany/ID023659ADN', 'Demonstrate that carbon dioxide is released during the process of respiration.', "02/05/2022"),
//   createData('Dept-physics/Lab-Mechanical/ID05828ADN', 'Demonstrate that carbon dioxide is released during the process of respiration.', "02/05/2022"),
// ];

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const customDayStyle = {
  borderBottom: '2px solid yellow',
};

export default function MyPage() {

  const getTimeDifference = (notificationTime: any) => {
    const currentTime: Date = new Date();
    const postedTime: Date = new Date("2023-11-01T12:00:00");
    const timeDifference: number = Math.abs(currentTime.getTime() - postedTime.getTime());
    const hoursDifference: number = Math.floor(timeDifference / (1000 * 60 * 60));

    if (hoursDifference >= 24) {
      const daysDifference: number = Math.floor(hoursDifference / 24);
      return `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
    }

    return `${hoursDifference}h ago`;
  };

  const NotificationSliceData = useSelector(

    (state: any) => state.notification.data?.get_all_notifications,
  );
  const dispatch: any = useDispatch();

  React.useEffect(() => {
    dispatch(fetchNotificationData());
  }, []);

  const [clickedDate, setClickedDate] = useState(null);
  const handleDateClick = (date: any) => {
    setClickedDate(date);
  };
  const [answers, setAnswers] = React.useState("");
  const Placeholder = ({ children }: any) => {
    return <div>{children}</div>;
  };
  const [value, onChange] = useState<Value>(new Date());
  const [viewAll, setViewAll] = useState(false);
  const [viewAlls, setViewAlls] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [localRowsPerPage, setLocalRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
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
  const [notifications, setNotifications] = useState([
    // Your notification data goes here
  ]);
  const [viewAllNotifications, setViewAllNotifications] = useState(false);

  const toggleViewNotifications = () => {
    setViewAllNotifications((prev) => !prev);
  };
  return (
    <PrivateRoute>
      <Box className="main-padding mypage-page">
        <Box className="table-outer" sx={{ width: "100%", marginTop: "0rem !important" }}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Current Tasks</TableCell>
                  <TableCell align="right">Department</TableCell>

                  <TableCell align="right">Lab</TableCell>
                  <TableCell align="right">Assigned By</TableCell>
                  <TableCell align="right">Created On</TableCell>

                  <TableCell align="right">Status</TableCell>


                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(0, viewAll ? rows.length : rowsPerPage).map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell scope="row">
                      <Box >
                        <Box>{row.mypageNumber}</Box>
                      </Box>

                    </TableCell>
                    <TableCell>{(row.extraData)}</TableCell>
                    <TableCell>{(row.departmentId)}</TableCell>
                    <TableCell style={{whiteSpace:'nowrap'}}>{(row.laboratoryId)}</TableCell>
                    <TableCell>{(row.createdAt)}</TableCell>

                    <TableCell component="th" scope="row">
                      <Box>{row.name}</Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        style={{
                          borderRadius: '20px',
                          color: 'white',
                          width: '110px',
                          padding: '9px 0px',
                          alignItems: "center",
                          textAlign: 'center',
                          height: '24px',
                          display: 'flex',
                          justifyContent: 'center',
                          fontSize: '12px',
                          backgroundColor: row.status === 1
                            ? '#F8A83C'
                            : row.status === 2
                              ? '#E2445C'
                              : '#00bf70',
                        }}
                      >
                        {index + 1 === 1 ? 'Created' : index + 1 === 2 ? 'Started' : index + 1 === 3 ? 'Stopped' : 'Completed'}
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
                ? (viewAll ? `Showing 1 - ${totalRows} out of ${totalRows}` : `Showing ${firstRowIndex} - ${lastRowIndex} out of ${totalRows}`)
                : `Showing ${totalRows} out of ${totalRows}`
              }
            </Typography>
            {totalRows > rowsPerPage && (
              <Typography
                onClick={toggleView}
                style={{ display: 'flex', alignItems: 'center', cursor: "pointer" }}
              >
                {viewAll ? 'View Less' : 'View All'}{' '}
                {viewAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </Typography>
            )}
          </Box>
        </Box>
        <Grid container spacing={2} sx={{ width: '100%', marginLeft: '0rem', marginTop: '1rem' }}>
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8} sx={{ paddingLeft: '0px !important' , paddingRight:{xs:'0px',lg:'16px'} , paddingBottom:{xs:'16px',lg:'0px'}}}>

            <Box className="notification-mypage">
               <Box className="notification-title"><Typography>Notifications</Typography></Box>
              <Box sx={{ overflowY: 'scroll', paddingBottom: '0rem' ,height: 'calc(100vh - 48vh)'}}>
                {NotificationSliceData?.slice(0, viewAlls ? NotificationSliceData.length : localRowsPerPage).map((row: any, index: any) => (
                  <Box className="notifications" key={index} style={{ backgroundColor: row.i === "1" ? '#F3F3F3' : 'white' }}>
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
                    ? (viewAlls ? `Showing 1 - ${totalRows} out of ${totalRows}` : `Showing ${rowIndex} - ${lastIndex} out of ${totalRows}`)
                    : `Showing ${totalRows} out of ${totalRows}`
                  }
                </Typography>
                {totalRows > localRowsPerPage && (
                  <Typography
                    onClick={toggleViews}
                    style={{ display: 'flex', alignItems: 'center', cursor: "pointer" }}
                  >
                    {viewAlls ? 'View Less' : 'View All'}{' '}
                    {viewAlls ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4} sx={{ paddingLeft: { xs: '0px !important', lg: '16px !important' } }}>
            <Box className="calender-rightside">
              <Calendar
                onChange={handleDateClick}
                value={'2023-11-05'}
              />
              <Divider className="hr-calender" />
              <Box>
                {clickedDate && clickedDate.toISOString().split('T')[0] === '2023-11-04' ? (
                  <Box sx={{ textAlign: 'left' }} >
                    <Box className="hover-calender">
                      <Typography className="id-detail" style={{ textDecoration: 'underline' }}>Submission / ID023659ADN</Typography>
                      <Typography className="id-detail-title">Bubble sort</Typography>
                    </Box>
                    <hr style={{ border: '1px solid #f5f5f5', margin: '0.5rem 0rem' }} />
                    <Box className="hover-calender">
                      <Typography className="id-detail" style={{ textDecoration: 'underline' }}>Test / 08:30 AM</Typography>
                      <Typography className="id-detail-title">
                        Department:<br />
                        Lab
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ textAlign: 'center' }}>
                    <img src={Emptystate} alt='' />
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
    </PrivateRoute>
  )
}