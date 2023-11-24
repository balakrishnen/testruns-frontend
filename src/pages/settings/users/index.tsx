import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TablePagination from '../../../components/table/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import AddIcon from '@mui/icons-material/Add';
import { withSettingsLayout } from '../../../components/settings';
import TableHeader from '../../../components/table/TableHeader';
import { StatusList, UserHeaders, UserRows } from '../../../utils/data';
import { UserRowData } from '../../../modals/user.modal';
import TableFilters from '../../../components/table/TableFilters';
import DeletePopup from '../../../components/DeletePopup';
import UserForm from './UserForm';
import Confirmationpopup from '../../../components/ConfirmationPopup';
import SuccessPopup from '../../../components/SuccessPopup';
import {
  fetchUserData,
  deleteUserData
} from '../../../api/userAPI';
import { useDispatch, useSelector } from 'react-redux';

import {
  handleCheckboxChange,
  handleDeCheckboxChange,
  handledAllSelected,
} from '../../../utils/common-services';
import moment from 'moment';
// table start

const users: UserRowData[] = UserRows;
const userStatus = StatusList;

// table end
const Users = () => {
  const dispatch: any = useDispatch();
  // const [openDlg1Dialog, setDialog1Open] = React.useState(false);
  const [headers, setHeaders] = React.useState(UserHeaders);
  // const [deletePopup, setDeletePopup] = React.useState(false);
  const [Rows, setSelectedRows] = React.useState(users);
  const [isDeselectAllChecked, setIsDeselectAllChecked] = React.useState(false);
  const [isselectAllChecked, setIsselectAllChecked] = React.useState(false);
  const [isTableHeaderVisible, setTableHeaderVisible] = React.useState(false);
  const handleRequestSort = () => { };
  const formPopupRef: any = React.useRef(null);
  const confirmationPopupRef: any = React.useRef(null);
  const successPopupRef: any = React.useRef(null);
  const deletePopupRef: any = React.useRef(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(Rows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [queryStrings, setQueryString] = React.useState({
    page: 1,
    perPage: 5,
    searchBy: null,
    search: null,
    sortBy: null,
    sortOrder: 'desc',
  });
  const [pageInfo, setPageInfo] = React.useState({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const userSliceData = useSelector(
    (state: any) => state.user.data?.get_all_users,
  );
  React.useEffect(() => {
    const page: any = { ...pageInfo };
    page['currentPage'] = userSliceData?.pageInfo.currentPage;
    page['totalPages'] = userSliceData?.pageInfo.totalPages;
    page['hasNextPage'] = userSliceData?.pageInfo.hasNextPage;
    page['hasPreviousPage'] = userSliceData?.pageInfo.hasPreviousPage;
    page['totalCount'] = userSliceData?.pageInfo.totalCount;
    setPageInfo(page);
    setSelectedRows(userSliceData?.Identity);
  }, [userSliceData]);
  const Data = Rows.slice(startIndex, endIndex);
  const [rowId, setRowId] = React.useState<any>([]);

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
    setRowId,
  );
  const handledAllchange = handledAllSelected(
    isselectAllChecked,
    Rows,
    setSelectedRows,
    setIsDeselectAllChecked,
    setIsselectAllChecked,
    setVisibleRow,
    setRowId,
  );

  React.useEffect(() => {
    dispatch(fetchUserData(queryStrings));
  }, [queryStrings]);

  React.useEffect(() => {
    setSelectedRows(Rows);
  }, [Rows]);

  const handleTableSorting = () => { };

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

  const reload = () => {
    const payload: any = {
      page: 1,
      perPage: 5,
      sortOrder: 'desc',
    };
    setQueryString(payload)
    dispatch(fetchUserData(queryStrings));
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
  const handleCloseFormPopup = (state: any) => {
    formPopupRef.current.open(state);
  };

  const handleSubmitFormPopup = () => {
    formPopupRef.current.open(false);
    successPopupRef.current.open(true, 'User');
    setTimeout(() => {
      successPopupRef.current.open(false, 'User');
    }, 3000);
  };

  const handleOpenConfirmationPopup = (state: any) => {
    confirmationPopupRef.current.open(state);
  };

  const handleConfirmationDone = (state: any) => {
    if (state === 1) {
      formPopupRef.current.open(false);
    }
    confirmationPopupRef.current.open(false);
  };
  const assetVal: any = { _id: rowId };

  const handleDeleteConfirmation = (state: any) => {
    dispatch(deleteUserData(assetVal))
    reload()
    setTableHeaderVisible(false);
    // if (state === 1) {
    //   deletePopupRef.current.open(false);
    // }
    deletePopupRef.current.open(false);
  };

  const handleOpenDeletePopup = () => {
    deletePopupRef.current.open(true, 'User');
  };

  const applyFilters = (field: any, value: any) => {
    // const payload: any = { ...queryStrings };
    // payload['searchBy'] = field;
    // payload['search'] = value;
    // setQueryString(payload);
  };
  const clickHandler = (e: MouseEvent) => {
    e.stopPropagation();
  };
  const roleSliceData = useSelector(
    (state: any) => state.role.data?.get_all_roles,
  );
  const organizationSliceData = useSelector(
    (state: any) => state.organization.data?.get_all_organisations,
  );
  console.log(roleSliceData?.find(obj => obj._id == "6548eabeaeb1160012a51125"))
  
  // table end
  return (
    <Box
      className="user-setting-page"
      style={{ padding: '24px', paddingTop: '15px' }}
    >
      <Box
        className="title-main"
        sx={{ borderBottom: '1px solid #F3F3F3', paddingBottom: '8px' }}
      >
        <Box>
          <Typography>User settings</Typography>
          <Typography className="sub-text">
            Create, edit and delete users.
          </Typography>
        </Box>
        <Button
          style={{ marginBottom: '8px', marginTop: '16px' }}
          type="submit"
          variant="contained"
          onClick={() => {
            formPopupRef.current.open(true, 'create', {});
          }}
        >
          <AddIcon sx={{ mr: 1 }} />
          Create User
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
        module="users"
        applyFilters={applyFilters}
        status={userStatus}
      />

      <Box className="table-outer" sx={{ width: '100%' }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
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
              handleTableSorting={handleTableSorting}
            />
            <TableBody>
              {userSliceData?.Identity && userSliceData.Identity.map((row: any, index: number) => {
                return (
                  <TableRow
                    hover
                    // onClick={(event) => handleClick(event, row.name)}
                    // aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    // selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                    onClick={(e: any) =>
                      formPopupRef.current.open(true, 'edit', row)
                    }
                  >
                    {headers[0].is_show && (
                      <TableCell scope="row">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ mt: 0, mr: 1 }}>
                          <Checkbox
                                  color="primary"
                                  checked={
                                    row.is_checked == true ? true : false
                                  }
                                  onClick={(e: any) => clickHandler(e)}
                                  onChange={(event) => {
                                    (row.is_checked==true && setRowId([...rowId, row._id])),
                                      handleChange(event, row._id);
                                  }}
                                />
                          </Box>

                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ ml: 2 }}>
                              <Box>{row._id}</Box>
                            </Box>
                          </Box>
                        </Box>
                      </TableCell>
                    )}
                    {headers[1].is_show && (
                      <TableCell align="center">{row.firstName} {row.lastName}</TableCell>
                    )}
                    {/* {headers[2].is_show && (
                      <TableCell align="center">
                        {row.providerDetails==null?"-":row.providerDetails}
                      </TableCell>
                    )} */}
                    {headers[2].is_show && (
                      
                      <TableCell align="center">{organizationSliceData?.find(obj => obj._id == row.organisationId)?.name}</TableCell>
                    )}
                    {headers[3].is_show && (
                      <TableCell align="center">
                      {moment(parseInt(row.createdAt)).format(
                        'MM/DD/YYYY',
                      )}
                    </TableCell>
                    )}
                    {headers[4].is_show && (
                      <TableCell align="center">{roleSliceData?.find(obj => obj._id == row.role)?.name}</TableCell>
                    )}
                    {headers[5].is_show && (
                      <TableCell>
                        <Select
                          className={
                            row.status !== 'Active'
                              ? 'active-select td-select'
                              : 'inactive-select td-select'
                          }
                          value={"Active"}
                          displayEmpty
                          IconComponent={ExpandMoreOutlinedIcon}
                        >
                          {userStatus.map((element) => (
                            <MenuItem value={element.value} key={element.value}>
                              {element.name}
                            </MenuItem>
                          ))}
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
          perPage={queryStrings.perPage}
          handlePageChange={handlePageChange}
          currentPageNumber={queryStrings.page}
          totalRecords={Rows?.length}
          page={pageInfo}
        />
      </Box>
      <Box>
        <UserForm
          ref={formPopupRef}
          reload={reload}
          closeFormPopup={handleCloseFormPopup}
          submitFormPopup={handleSubmitFormPopup}
        />
      </Box>
      <Box>
        <DeletePopup
          rowId={rowId}
          ref={deletePopupRef}
          closeDeletePopup={() => deletePopupRef.current.open(false, 'User')}
          deleteConfirmation={handleDeleteConfirmation}
          reload={reload}
        />
      </Box>
    </Box>
  );
};

const UsersPage = withSettingsLayout(Users);

export default UsersPage;
