/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import PrivateRoute from '../../components/PrivateRoute';
import TableFilters from '../../components/table/TableFilters';
import TablePagination from '../../components/table/TablePagination';
import {
  Box,
  Button,
  Checkbox,
  Chip,
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
import search from '../../../assets/images/search.svg';
import {
  DepartmentList,
  LaboratoryList,
  RunsHeaders,
  RunsRows,
} from '../../utils/data';
import TableHeader from '../../components/table/TableHeader';
import { RunsRowData } from '../../modals/runs.modal';
import {
  handleCheckboxChange,
  handleDeCheckboxChange,
  handledAllSelected,
} from '../../utils/common-services';
import DeletePopup from '../../components/DeletePopup';
import { navigate } from 'gatsby';
import Confirmationpopup from '../../components/ConfirmationPopup';
import SuccessPopup from '../../components/SuccessPopup';
import RunsForm from './RunsForm';
import runCreated from '../../assets/images/run-created.svg';
import runStarted from '../../assets/images/run-started.svg';
import runStopped from '../../assets/images/run-stopped.svg';
import runCompleted from '../../assets/images/run-completed.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRunsData } from '../../api/RunsAPI';
import moment from 'moment';
import DeleteSuccessPopup from '../../components/DeleteSuccessPopup';
import TablePopup from '../../components/table/TablePopup';

// table start

const rows: RunsRowData[] = RunsRows;

export default function Runs() {
  const [runsOpen, setRunsOpen] = React.useState(false);
  const [headers, setHeaders] = React.useState<any>(RunsHeaders);
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
  const deleteSuccessPopupRef: any = React.useRef(null);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(Rows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [runsData, setRunsData] = React.useState<any>([]);
  const dispatch: any = useDispatch();

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
    sortOrder: 'desc',
  });

  const runsSliceData = useSelector(
    (state: any) => state.runs.data?.get_all_runs,
  );

  const Data = Rows.slice(startIndex, endIndex);

  React.useEffect(() => {
    setRunsData(runsData);
  }, [runsData]);

  React.useEffect(() => {
    dispatch(fetchRunsData(queryStrings));
    // setRunsData(runsData);
  }, [pageInfo, queryStrings]);

  React.useEffect(() => {
    const page: any = { ...pageInfo };
    page['currentPage'] = runsSliceData?.pageInfo.currentPage;
    page['totalPages'] = runsSliceData?.pageInfo.totalPages;
    page['hasNextPage'] = runsSliceData?.pageInfo.hasNextPage;
    page['hasPreviousPage'] = runsSliceData?.pageInfo.hasPreviousPage;
    page['totalCount'] = runsSliceData?.pageInfo.totalCount;
    setRunsData(runsSliceData?.Runs);
    setPageInfo(page);
  }, [runsSliceData]);

  const handlePageChange = (even: any, page_no: number) => {
    const payload: any = { ...queryStrings };
    const page: any = { ...pageInfo };
    payload['page'] = page_no;
    page['currentPage'] = page_no;
    setPageInfo(page);
    setQueryString(payload);
    setCurrentPage(page_no);
  };
  const [visibleRow, setVisibleRow] = React.useState<any>(Data);
  const handleChange = (event: any, id: any) => {
    handleCheckboxChange(
      Rows,
      setSelectedRows,
      setIsDeselectAllChecked,
      setIsselectAllChecked,
      setTableHeaderVisible,
      setVisibleRow,
    )(event, id);
  };
  const handleDeChange = handleDeCheckboxChange(
    isDeselectAllChecked,
    Rows,
    setSelectedRows,
    setIsDeselectAllChecked,
    setIsselectAllChecked,
    setTableHeaderVisible,
    setVisibleRow,
  );
  const handledAllchange = handledAllSelected(
    isselectAllChecked,
    Rows,
    setSelectedRows,
    setIsDeselectAllChecked,
    setIsselectAllChecked,
    setVisibleRow,
  );

  const handleRequestSort = () => {};

  const getDepartment = (id: any) => {
    let data = DepartmentList.find((item) => item.id === id);
    return data?.name;
  };

  const getLaboratory = (id: any) => {
    let data = LaboratoryList.find((item) => item.id === id);
    return data?.name;
  };

  const handleMenuCheckboxChange = (e: any, index: any) => {
    setHeaders((prevColumns: any) => {
      return prevColumns.map((column: any, i: any) => {
        if (i === index) {
          return { ...column, is_show: !headers[index].is_show };
        }
        return column;
      });
    });
  };

  const handleCloseFormPopup = (state: any) => {
    formPopupRef.current.open(state);
  };

  // const handleSubmitFormPopup = () => {
  //   formPopupRef.current.open(false);
  //   successPopupRef.current.open(true, 'Run');
  //   setTimeout(() => {
  //     successPopupRef.current.open(false, 'Run');
  //   }, 3000);
  // };

  const handleOpenConfirmationPopup = (state: any) => {
    confirmationPopupRef.current.open(state);
  };

  const handleCloseTableHeader = (status: boolean) => {
    setTableHeaderVisible(status);
    const updatedRows = runsData.map((row: any) => ({
      ...row,
      is_checked: false,
    }));
    setSelectedRows(updatedRows);
    setIsDeselectAllChecked(true);
    setIsselectAllChecked(false);
  };
  const handleDeleteConfirmation = (state: any) => {
    if (state === 1) {
      // deletePopupRef.current.open(false);
      // dispatch(deleteAssetsData(assetVal));
      deleteSuccessPopupRef.current.open(true);
      setTimeout(() => {
        deleteSuccessPopupRef.current.open(false);
      }, 3000);
    }
    deletePopupRef.current.open(false);
  };

  const handleOpenDeletePopup = () => {
    deletePopupRef.current.open(true, 'Runs');
  };

  const clickHandler = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const filters = () => {
    dispatch(fetchRunsData(queryStrings));
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

  return (
    <PrivateRoute>
      <Box className="main-padding runz-page">
        <Box className="title-main">
          <Typography>Runs</Typography>
          <Button
            variant="contained"
            onClick={() => {
              formPopupRef.current.open(true);
            }}
          >
            <AddIcon sx={{ mr: 1 }} />
            Create Run
          </Button>
        </Box>
        <TableFilters
          columns={headers}
          handleMenuCheckboxChange={handleMenuCheckboxChange}
          handleDeCheckboxChange={handleDeChange}
          handledAllSelected={handledAllchange}
          isDeselectAllChecked={isDeselectAllChecked}
          isselectAllChecked={isselectAllChecked}
          isTableHeaderVisible={isTableHeaderVisible}
          closeTableHeader={handleCloseTableHeader}
          deleteRecord={handleOpenDeletePopup}
          module="runs"
        />

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
                {runsData?.map((row: any, index: number) => {
                  // const isItemSelected = isSelected(row.name);
                  // const isItemSelected = isSelected(row.name);
                  // const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.name)}
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      // selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                      onClick={(e: any) => {
                        //  (e.target.tagName!=="INPUT" && e.target.tagName!=="LI" &&
                        navigate(`/runs/details/${row.runNumber}`);
                        // console.log(e.target.tagName)
                      }}
                    >
                      {headers[0].is_show && (
                        <TableCell scope="row">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ mt: 0, mr: 1 }}>
                              <Checkbox
                                color="primary"
                                checked={row.is_checked}
                                onClick={(e: any) => clickHandler(e)}
                                onChange={(event) =>
                                  handleChange(event, row.id)
                                }
                              />
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box
                                style={{
                                  width: '45px',
                                  height: '41px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <img
                                  src={
                                    index + 1 === 1
                                      ? runCreated
                                      : index + 1 === 2
                                      ? runStarted
                                      : index + 1 === 3
                                      ? runStopped
                                      : runCompleted
                                  }
                                  alt="no_image"
                                  style={{ width: '35px', height: '35px' }}
                                />
                              </Box>
                              <Box sx={{ ml: 1 }}>
                                <Box>{row.runNumber}</Box>
                              </Box>
                            </Box>

                            {/* <Box
                              onClick={() =>
                                navigate(`/runs/details/${row.runNumber}`)
                              }
                            >
                              <img
                                src={index + 1 === 1 ? runCreated : index + 1 === 2 ? runStarted : index + 1 === 3 ? runStopped : runCompleted}
                                alt="no_image"
                                style={{ width: '35px', height: '35px' }}
                              />
                              {row.runNumber}
                            </Box> */}
                          </Box>
                        </TableCell>
                      )}

                      {headers[1].is_show && (
                        <TableCell>{row.objective}</TableCell>
                      )}
                      {headers[2].is_show && (
                        <TableCell>
                          {row.departmentId[0] !== null ? (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                          ) : (
                            '-'
                          )}
                        </TableCell>
                      )}
                      {headers[3].is_show && (
                        <TableCell>
                          {row.laboratoryId[0] !== null ? (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                          ) : (
                            <span style={{ textAlign: 'center' }}>-</span>
                          )}
                        </TableCell>
                      )}
                      {headers[4].is_show && (
                        <TableCell>
                          {row.createdAt === null
                            ? '-'
                            : moment(row.createdAt).isValid()
                            ? moment(row.createdAt).local().format('MM/DD/YYYY')
                            : moment().format('MM/DD/YYYY')}
                        </TableCell>
                      )}
                      {headers[5].is_show && (
                        <TableCell>
                          {row.dueDate === null
                            ? '-'
                            : moment(row.dueDate).isValid()
                            ? moment(row.dueDate).local().format('MM/DD/YYYY')
                            : moment().format('MM/DD/YYYY')}
                        </TableCell>
                      )}
                      {headers[6].is_show && (
                        <TableCell>
                          <Select
                            name="select"
                            className={
                              row.isActive === 1
                                ? 'active-select td-select'
                                : 'inactive-select td-select'
                            }
                            value={index < 4 ? index + 1 : 4}
                            displayEmpty
                            onClick={(e: any) => clickHandler(e)}
                            onChange={(e) => handleChange(e, row.id)}
                            IconComponent={ExpandMoreOutlinedIcon}
                          >
                            <MenuItem value={1}>&nbsp;Created</MenuItem>
                            <MenuItem value={2}>Started</MenuItem>
                            <MenuItem value={3}>Stopped</MenuItem>
                            <MenuItem value={4}>Completed</MenuItem>
                          </Select>
                        </TableCell>
                      )}
                      {headers[7].is_show && (
                        <TableCell align="center">Username</TableCell>
                        //</TableRow>{/* <Select
                        //   className={
                        //     row.availability === 'AVAILABLE'
                        //       ? 'active-select td-select'
                        //       : 'inactive-select td-select'
                        //   }
                        //   value={row.availability}
                        //   displayEmpty
                        //   IconComponent={ExpandMoreOutlinedIcon}
                        // >
                        //   <MenuItem value={'AVAILABLE'}>Available</MenuItem>
                        //   <MenuItem value={'NOTAVAILABLE'}>
                        //     Not available
                        //   </MenuItem>
                        // </Select> */}
                        // </TableCell>
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
            totalRecords={runsData?.length}
            page={pageInfo}
          />
        </Box>
        <Box>
          <DeletePopup
            ref={deletePopupRef}
            closeDeletePopup={() => deletePopupRef.current.open(false, 'Runs')}
            deleteConfirmation={handleDeleteConfirmation}
          />
        </Box>
        <Box>
          <RunsForm
            ref={formPopupRef}
            closeFormPopup={handleCloseFormPopup}
            openConfirmationPopup={handleOpenConfirmationPopup}
            type="create"
          />
        </Box>
        <DeleteSuccessPopup ref={deleteSuccessPopupRef} />
        <TablePopup ref={tablePopupRef} />
      </Box>
    </PrivateRoute>
  );
}
