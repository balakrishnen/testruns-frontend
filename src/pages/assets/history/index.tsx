/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
// import PrivateRoute from '../../components/PrivateRoute';
import TableFilters from '../../../components/table/TableFilters';
import TablePagination from '../../../components/table/TablePagination';
import {
  Box,
  Button,
  Checkbox,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRunsData } from '../../../api/RunsAPI';
import search from '../../../assets/images/search.svg';
import {
  DepartmentList,
  HistoryHeaders,
  HistoryRows,
  LaboratoryList,
  RunsHeaders,
  RunsRows,
} from '../../../utils/data';
import TableHeader from '../../../components/table/TableHeader';
import { HistoryRowData } from '../../../modals/history.modal';
import { RunsRowData } from '../../../modals/runs.modal';
import {
  handleCheckboxChange,
  handleDeCheckboxChange,
  handledAllSelected,
} from '../../../utils/common-services';
import DeletePopup from '../../../components/DeletePopup';
import { navigate } from 'gatsby';
import Confirmationpopup from '../../../components/ConfirmationPopup';
import SuccessPopup from '../../../components/SuccessPopup';
// import RunsForm from './RunsForm';

// table start

const rows = HistoryRows;

export default function HistoryTable() {
    
  const [runsOpen, setRunsOpen] = React.useState(false);
  const [headers, setHeaders] = React.useState<any>(HistoryHeaders);
  const [Rows, setSelectedRows] = React.useState(rows);
  const [isDeselectAllChecked, setIsDeselectAllChecked] = React.useState(false);
  const [isselectAllChecked, setIsselectAllChecked] = React.useState(false);
  const [isTableHeaderVisible, setTableHeaderVisible] = React.useState(false);
  const formPopupRef: any = React.useRef(null);
  const confirmationPopupRef: any = React.useRef(null);
  const successPopupRef: any = React.useRef(null);
  // const [deletePopup, setDeletePopup] = React.useState(false);
  const deletePopupRef: any = React.useRef(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(Rows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const Data = Rows.slice(startIndex, endIndex);

  const handlePageChange = (even: any, page: number) => {
    setCurrentPage(page);
  };
  const [visibleRow, setVisibleRow] = React.useState<any>(Data);
  
  
  


  const RunsSliceData = useSelector(
    (state: any) => state.runs.data?.get_all_runs.Runs,
);
const dispatch: any = useDispatch();



React.useEffect(() => {
  console.log("runSliceData before dispatch:", RunsSliceData);
  dispatch(fetchRunsData());
}, []);

console.log("runSliceData after dispatch:", RunsSliceData);
  return (
    
      <Box className="runz-page" sx={{padding:'24px 0px'}}>
        

        <Box className="table-outer" sx={{ width: '100%' }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              // size={dense ? "small" : "medium"}
            >
              <TableHeader
                numSelected={0}
                onSelectAllClick={function (
                  event: React.ChangeEvent<HTMLInputElement>,
                ): void {
                  throw new Error('Function not implemented.');
                }}
                order={'asc'}
                orderBy={''}
                rowCount={0}
                columns={headers}
                filters={() => {
                  console.log('runz');
                }}
              />

              <TableBody>
                {RunsSliceData?.map((row: any, index: number) => {
                  
console.log('row',row.laboratoryId.name)
                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.name)}
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      // selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                      onClick={(e: any) =>{
                      //  (e.target.tagName!=="INPUT" && e.target.tagName!=="LI" && 
                        navigate(`/runs/details/${row.runNumber}`)
                        // console.log(e.target.tagName)
                        
                        }
                      }
                    >
                      {headers[0].is_show && (
                        <TableCell scope="row">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            
                            {/* <Box 
                              onClick={() =>
                                navigate(`/runs/details/${row.runNumber}`)
                              }
                            >
                              {row.runNumber}
                            </Box> */}
                            {/* <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box>
                              <img src={image_holder} alt="no_image" />
                            </Box>
                          </Box> */}
                            <Box    >
                              <Box>{row.runNumber}</Box>
                            </Box>
                          
                          </Box>
                        </TableCell>
                      )}
                      {headers[1].is_show && (
                        // <TableCell>{row.objective}</TableCell>
                        <TableCell>{row.procedureId}</TableCell>
                      )}
                      {headers[2].is_show && (
                        <TableCell>-</TableCell>
                      )}
                      {headers[3].is_show && (
                        <TableCell>-</TableCell>
                      )}
                      {headers[4].is_show && (
                        <TableCell align="center">{row.createdAt}</TableCell>
                      )}
                      {headers[5].is_show && (
                        // <TableCell align="center">{row.dueDate}</TableCell>
                        <TableCell align="center">{row.userId}</TableCell>
                      )}
                      {headers[6].is_show && (
                         <TableCell align="center">User Name</TableCell>
                          
                      )}
                      {headers[7].is_show && (
                        <TableCell>
                          <Select
                          name="select"
                            className={
                              row.status === 1
                                ? 'active-select td-select'
                                : 'inactive-select td-select'
                            }
                            value={row.status}
                            displayEmpty 
                            
                            
                            IconComponent={ExpandMoreOutlinedIcon}
                          >
                            <MenuItem value={1}>New Task</MenuItem>
                            <MenuItem value={2}>Completed</MenuItem>
                            <MenuItem value={3}>Not Started</MenuItem>

                          </Select>
                        </TableCell>
                      )}
                      
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            currentPageData={Data}
            Rows={Rows}
          />
        </Box>
        
      </Box>
    
  );
}
