/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import PrivateRoute from '../../components/PrivateRoute';
import TableFilters from '../../components/table/TableFilters';
import TablePagination from '../../components/table/TablePagination';
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

  const itemsPerPage = 5;
  const totalPages = Math.ceil(Rows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const Data = Rows.slice(startIndex, endIndex);

  const handlePageChange = (even: any, page: number) => {
    setCurrentPage(page);
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
    const updatedRows = Rows.map((row: any) => ({
      ...row,
      is_checked: false,
    }));
    setSelectedRows(updatedRows);
    setIsDeselectAllChecked(true);
    setIsselectAllChecked(false);
  };
  const handleDeleteConfirmation = (state: any) => {
    if (state === 1) {
      deletePopupRef.current.open(false);
    }
    deletePopupRef.current.open(false);
  };

  const handleOpenDeletePopup = () => {
    deletePopupRef.current.open(true, 'Runs');
  };

  const clickHandler = (e: MouseEvent) => {
    e.stopPropagation();
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
          handleDeCheckboxChange={handleDeChange}
          handledAllSelected={handledAllchange}
          isDeselectAllChecked={isDeselectAllChecked}
          isselectAllChecked={isselectAllChecked}
          handleMenuCheckboxChange={handleMenuCheckboxChange}
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
                filters={() => {
                  console.log('runz');
                }}
              />

              <TableBody>
                {Data.map((row: any, index: number) => {
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
                              <Box style={{ width: '45px', height: '41px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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
                        <TableCell>{getDepartment(row.departmentId)}</TableCell>
                      )}
                      {headers[3].is_show && (
                        <TableCell>{getLaboratory(row.laboratoryId)}</TableCell>
                      )}
                      {headers[4].is_show && (
                        <TableCell align="center">{row.createdAt}</TableCell>
                      )}
                      {headers[5].is_show && (
                        <TableCell align="center">{row.dueDate}</TableCell>
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
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            currentPageData={Data}
            Rows={Rows}
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
      </Box>
    </PrivateRoute>
  );
}
