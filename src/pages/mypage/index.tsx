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
import viewarrow from "../../assets/images/chevrondown-gray.svg";
import { useState } from 'react';
import Calendar from 'react-calendar';
import Emptystate from '../../assets/images/Emptystate.svg';


function createData(
  name: string,
  user: string,
  date: string,
  status:number
) {
  return { name, user,date,status };
}

const rows = [
  createData('Thickness of a paper by vernier calliperse', 'username','02/05/2023',2),
  createData('Demonstrate that carbon dioxide is released during the process of respiration', 'username','02/05/2023',1),
  createData('Qualitative analysis for Cu, Zn, Fe, Al',  'username','02/05/2023',3),
  createData('Thickness of a paper by vernier calliperse', 'username','02/05/2023',2),
  // createData('Cupcake', 305),
  // createData('Gingerbread', 356,),
];
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function MyPage() {
  const [answers, setAnswers] = React.useState("");
  const Placeholder = ({ children }: any) => {
    return <div>{children}</div>;
  };
  const [value, onChange] = useState<Value>(new Date());
  return (
    <PrivateRoute>
      <Box className="main-padding mypage-page">
        <Box className="table-outer mypage-table" sx={{ width: "100%", marginTop: "0rem !important" }}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Current tasks</TableCell>
                  <TableCell align="right" className='tableCellRow'>
                  <p >All tasks</p>
                  <p >New tasks</p>
                  <p >Submitted</p>
                  <p >Due</p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <Box className="text-container" sx={{ marginLeft: '0rem' }}>
                        <Box className="content">
                          <Typography className="id-detail">
                            ID023659ADN&ensp;/&ensp;Dept-Computer
                            science&ensp;/&ensp;Lab-Data structure
                          </Typography>
                        </Box>
                        <Box className="heading" sx={{ marginBottom: '0rem' }}>Requester name has assigned you a task ID09876</Box>
                      </Box>
                    </TableCell>
                  
                    <TableCell className='tableCellcurrentTask'>
                    <p style={{textAlign:'right'}}>{row.user}</p>
                    <p style={{textAlign:'right'}}>{row.date}</p>
                    <p style={{textAlign:'right'}}>
                          <Select
                          name="select"
                            className={
                              row.status === 1
                                ? 'active-select td-select'
                                : 'inactive-select td-select'
                            }
                            value={row.status}
                            displayEmpty
                            // onChange={(e)=>handleChange(e, row.id)}
                            IconComponent={ExpandMoreOutlinedIcon}
                          >
                            <MenuItem value={1}>New Task</MenuItem>
                            <MenuItem value={2}>Completed</MenuItem>
                            <MenuItem value={3}>Not Started</MenuItem>

                          </Select>
                        </p>
                        </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box className="show-page">
            <Typography>Showing 1 - 10 out of 200</Typography>
            {/* <FormControl className="view-all">
              <Select
                labelId="view-all-label"
                id="view-all"
                value={answers}
                displayEmpty
                IconComponent={ExpandMoreOutlinedIcon}
                onChange={(event) => setAnswers(event.target.value)}
                renderValue={
                  answers !== ""
                    ? undefined
                    : () => <Placeholder>View all</Placeholder>
                }
              >
                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>
                <MenuItem value={"3"}>3</MenuItem>
              </Select>
            </FormControl> */}
            <Typography style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>View all <img src={viewarrow} alt="arrow" style={{ marginLeft: '0.5rem' }} /></Typography>
          </Box>
        </Box>
        <Grid container spacing={2} sx={{ width: '100%', marginLeft: '0rem', marginTop: '1rem' }}>
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8} sx={{ paddingLeft: '0px !important' }}>
            <Box className="notification-mypage">
              <Box className="notification-title"><Typography>Notifications</Typography></Box>
              <Box sx={{ overflowY: 'auto', maxHeight: '800px', paddingBottom: '3rem' }}>
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
              </Box>
              <Box className="show-page">
                <Typography>Showing 1 - 10 out of 200</Typography>
                {/* <FormControl className="view-all">
                  <Select
                    labelId="view-all-label"
                    id="view-all"
                    value={answers}
                    displayEmpty
                    IconComponent={ExpandMoreOutlinedIcon}
                    onChange={(event) => setAnswers(event.target.value)}
                    renderValue={
                      answers !== ""
                        ? undefined
                        : () => <Placeholder>View all</Placeholder>
                    }
                  >
                    <MenuItem value={"1"}>1</MenuItem>
                    <MenuItem value={"2"}>2</MenuItem>
                    <MenuItem value={"3"}>3</MenuItem>
                  </Select>
                </FormControl> */}
                <Typography style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>View all <img src={viewarrow} alt="arrow" style={{ marginLeft: '0.5rem' }} /></Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4} sx={{ paddingLeft: { xs: '0px !important', lg: '16px !important' } }}>
            <Box className="calender-rightside">
              <Calendar onChange={onChange} value={value} />
              <Box>
                <Divider className="hr-calender" />
                <Box sx={{ textAlign: 'center' }}>
                  <img src={Emptystate} alt='' />
                  <Typography className="no-remainder">No remainders yet!</Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Typography className="id-detail">Submission / ID023659ADN</Typography>
                  <Typography className="id-detail-title">
                    Bubble sort
                  </Typography>
                  <hr style={{ border: '1px solid #f5f5f5', margin: '1rem 0rem' }} />
                  <Typography className="id-detail">Test / 08:30 AM</Typography>
                  <Typography className="id-detail-title">
                    Department:<br />
                    Lab
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PrivateRoute>
  )
}