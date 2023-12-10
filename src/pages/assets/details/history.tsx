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
    Select,Chip,
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
import TablePopup from '../../../components/table/TablePopup';
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
    const tablePopupRef: any = React.useRef(null);

    const itemsPerPage = 5;
    const totalPages = Math.ceil(Rows.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const Data = Rows.slice(startIndex, endIndex);

    // const handlePageChange = (even: any, page: number) => {
    //     setCurrentPage(page);
    // };
    const [runzData, setRunzData] = React.useState<any>([]);

    const RunsSliceData = useSelector(
        (state: any) => state.runs.data?.get_all_runs,
    );
    const dispatch: any = useDispatch();
    React.useEffect(() => {
        setRunzData(runzData);
      }, [runzData]);

    const [pageInfo, setPageInfo] = React.useState({
        currentPage: 1,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      });
      const [queryStrings, setQueryString] = React.useState({
        page: 1,
        perPage: 5,
        searchBy: null,
        search: null,
        sortBy: null,
        sortOrder: null,
      });
      const filters = () => {
        dispatch(fetchRunsData(queryStrings));
      };
  const handleRequestSort = () => {};

    React.useEffect(() => {
        // console.log("runSliceData before dispatch:", RunsSliceData);
        dispatch(fetchRunsData(queryStrings));
    }, [pageInfo, queryStrings]);

      React.useEffect(() => {
        const page: any = { ...pageInfo };
        page['currentPage'] = RunsSliceData?.pageInfo.currentPage;
        page['totalPages'] = RunsSliceData?.pageInfo.totalPages;
        page['hasNextPage'] = RunsSliceData?.pageInfo.hasNextPage;
        page['hasPreviousPage'] = RunsSliceData?.pageInfo.hasPreviousPage;
        page['totalCount'] = RunsSliceData?.pageInfo.totalCount;
        setRunzData(RunsSliceData?.Runs);
        setPageInfo(page);
      }, [RunsSliceData]);
      
      React.useEffect(() => {
        return () => {
          const headersList: any = [...headers];
          headersList.map((item) => {
            return (item.sort = 'asc');
          });
          setHeaders(headersList);
        };
      }, []);
    
      const handlePageChange = (even: any, page_no: number) => {
        const payload: any = { ...queryStrings };
        const page: any = { ...pageInfo };
        payload['page'] = page_no;
        page['currentPage'] = page_no;
        setPageInfo(page);
        setQueryString(payload);
        setCurrentPage(page_no);
      };
    
      const handleTableSorting = (_event: any, _data: any, _index: any) => {
        const payload: any = { ...queryStrings };
        const headersList: any = [...headers];
        payload['sortBy'] = headersList[_index].id;
        payload['sortOrder'] = headersList[_index].sort === 'asc' ? 'desc' : 'asc';
        headersList[_index].sort =
          headersList[_index].sort === 'asc' ? 'desc' : 'asc';
        setHeaders(headersList);
        setQueryString(payload);
      };
    
    // console.log("runSliceData after dispatch:", RunsSliceData);
    return (

        <Box className="runz-page" sx={{ padding: '24px 0px' }}>


            <Box className="table-outer" sx={{ width: '100%' }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    // size={dense ? "small" : "medium"}
                    >
                        <TableHeader
                numSelected={0}
                onRequestSort={handleRequestSort}
                onSelectAllClick={function (
                  event: React.ChangeEvent<HTMLInputElement>,
                ): void {
                  throw new Error('Function not implemented.');
                }}
                order={'asc'}
                orderBy={''}
                rowCount={0}
                columns={headers}
                filters={filters}
                handleTableSorting={handleTableSorting}
              />
                        <TableBody>
                            {runzData?.map((row: any, index: number) => {

                                // console.log('row', row.laboratoryId)
                                return (
                                    <TableRow
                                        hover
                                        // onClick={(event) => handleClick(event, row.name)}
                                        // aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        // selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                        // onClick={(e: any) => {
                                        //     //  (e.target.tagName!=="INPUT" && e.target.tagName!=="LI" && 
                                        //     navigate(`/runs/details/${row.runNumber}`)
                                        //     // console.log(e.target.tagName)

                                        // }
                                        // }
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
                                            
                                            <TableCell align="center">{row.objective}</TableCell>
                                            
                                        )}
                                        {headers[2].is_show && (
                                             <TableCell>
                                             {row.departmentId[0] !== null ?
                                               (
                                                 <Box
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
                                                     />
                                                     {row.departmentId.length > 1 && (
                                                       <span
                                                         style={{
                                                           fontWeight: 500,
                                                           color: '#9F9F9F',
                                                           fontSize: '12px',
                                                           whiteSpace: 'nowrap',
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
                                                       >
                                                         +{row.departmentId.length - 1} More
                                                       </span>
                                                     )}
                                                   </>
                                                 </Box>
                                               ) :
                                               '-'
                                             }
                                           </TableCell>
                                        )}

                                        {headers[3].is_show && (
                                           <TableCell>
                                           {row.laboratoryId[0] !== null ?
                                             (
                                               <Box
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
               
                                                   />
                                                   {row.laboratoryId.length > 1 && (
                                                     <span
                                                       style={{
                                                         fontWeight: 500,
                                                         color: '#9F9F9F',
                                                         fontSize: '12px',
                                                         whiteSpace: 'nowrap',
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
                                                     >
                                                       +{row.laboratoryId.length - 1} More
                                                     </span>
                                                   )}
                                                 </>
                                               </Box>
               
                                             ) :
                                             <span style={{textAlign:"center"}}>-</span>
                                           }
                                         </TableCell>
                                        )}
                                        {headers[4].is_show && (
                        <TableCell align="center">{row.dueDate}</TableCell>
                      )}
                                        {/* {headers[5].is_show && (
                        <TableCell align="center">{row.dueDate}</TableCell>
                        // <TableCell align="center">{row.userId}</TableCell>
                      )} */}
                                        {headers[5].is_show && (
                                            <TableCell align="center">User Name</TableCell>

                                        )}
                                        {headers[6].is_show && (
                                            <TableCell>
                                               {/* <FormControl className="Status-info" style={{ marginTop: '7px'}}> */}
                  <Box
                          style={{
                            borderRadius: '20px',
                            color: 'white',
                            width: '110px',
                            padding: '9px 0px',
                            alignItems: 'center',
                            textAlign: 'center',
                            height: '24px',
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: '12px',
                            backgroundColor:
                            row?.status == 'Created'
                                ? '#8d8d8d'
                                : row?.status == 'Started'
                                ? '#faaa49'
                                : row?.status == 'Complete'
                                ? '#00bf70'
                                : '#e2445c',
                          }}
                        >
                          {row?.status == 'Created'
                            ? 'Created'
                            : row?.status == 'Started'
                            ? 'Started'
                            : row?.status == 'Complete'
                            ? 'Completed'
                            : 'Stopped'}
                        </Box>
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
            perPage={queryStrings.perPage}
            handlePageChange={handlePageChange}
            currentPageNumber={queryStrings.page}
            totalRecords={runzData?.length}
            page={pageInfo}
          />
            </Box>
            <TablePopup ref={tablePopupRef} />

        </Box>

    );
}
