import React from 'react';
import {
  Badge,
  Box,
  Button,
  Checkbox,
  MenuItem,
  Popover,
  Select,
  TextField,
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
import { fetchUserData, deleteUserData } from '../../../api/userAPI';
import { useDispatch, useSelector } from 'react-redux';

import {
  handleCheckboxChange,
  handleDeCheckboxChange,
  handledAllSelected,
} from '../../../utils/common-services';
import moment from 'moment';
import TableSkeleton from '../../../components/table/TableSkeleton';
// table start
import filterIcon from '../../../assets/images/filter-icon1.svg';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import user from '../../../assets/images/profile/profile.svg';
import { toast } from 'react-toastify';

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
  const handleRequestSort = () => {};
  const formPopupRef: any = React.useRef(null);
  const confirmationPopupRef: any = React.useRef(null);
  const successPopupRef: any = React.useRef(null);
  const deletePopupRef: any = React.useRef(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(Rows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [userData, setUserData] = React.useState<any>([]);
  const [loader, setLoader] = React.useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [filterStatus, setFilterStatus] = React.useState(null);
  const [filterSearchBy, setFilterSearchBy] = React.useState(null);
  const [filterSearchValue, setFilterSearchValue] = React.useState(null);
  const [filterFieldName, setFilterFieldName] = React.useState('');
  const [filterType, setFilterType] = React.useState(null);
  const [filterAvailability, setFilterAvailability] = React.useState(null);
  const [filterKey, setFilterKey] = React.useState(null);

  const [columnAnchorEl, setColumnAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [filterPopoverEl, setFilterPopoverEl] =
    React.useState<null | HTMLElement>(null);
  const filterAnchorOpen = Boolean(filterPopoverEl);
  const [queryStrings, setQueryString] = React.useState({
    page: 1,
    perPage: 10,
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
    setTimeout(() => {
      setLoader(false);
    }, 1000);
    setUserData(userData);
  }, [userData]);

  React.useEffect(() => {
    setLoader(true);
    dispatch(fetchUserData(queryStrings));
  }, [pageInfo, queryStrings]);

  React.useEffect(() => {
    const page: any = { ...pageInfo };
    page['currentPage'] = userSliceData?.pageInfo.currentPage;
    page['totalPages'] = userSliceData?.pageInfo.totalPages;
    page['hasNextPage'] = userSliceData?.pageInfo.hasNextPage;
    page['hasPreviousPage'] = userSliceData?.pageInfo.hasPreviousPage;
    page['totalCount'] = userSliceData?.pageInfo.totalCount;
    setUserData(userSliceData?.Identity);
    setPageInfo(page);
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
      userData,
      setUserData,
      setIsDeselectAllChecked,
      setIsselectAllChecked,
      setTableHeaderVisible,
      setVisibleRow,
    )(event, id);
   
  };
  const handleCheckboxValues = (id:any) => {
    // Check if the ID is already in the selectedIds
    if (rowId.includes(id)) {
      // If it is, remove it
      setRowId(rowId.filter((rowId:any) => rowId !== id));
    } else {
      // If it's not, add it
      setRowId([...rowId, id]);
    }
  };
  const handleDeChange = handleDeCheckboxChange(
    isDeselectAllChecked,
    userData,
    setUserData,
    setIsDeselectAllChecked,
    setIsselectAllChecked,
    setTableHeaderVisible,
    setVisibleRow,
  );
  const handledAllchange = handledAllSelected(
    isselectAllChecked,
    userData,
    setUserData,
    setIsDeselectAllChecked,
    setIsselectAllChecked,
    setVisibleRow,
    setRowId,
  );

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
      perPage: 10,
      sortOrder: 'desc',
    };
    dispatch(fetchUserData(payload));
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
    if (state === 1) {
      // deletePopupRef.current.open(false);
      dispatch(deleteUserData(assetVal));
      toast(`Assets deleted !`, {
        style: {
          background: '#00bf70',
          color: '#fff',
        },
      });
      // deleteSuccessPopupRef.current.open(true);
      // setTimeout(() => {
      //   deleteSuccessPopupRef.current.open(false);
      // }, 3000);
      reload();
      setTableHeaderVisible(false);
    }
    deletePopupRef.current.open(false);
  };
  const handleOpenDeletePopup = () => {
    deletePopupRef.current.open(true, 'User');
  };

  const applyFilters = (field: any, value: any) => {
    const payload: any = { ...queryStrings };
    payload['searchBy'] = field;
    payload['search'] = value;
    setQueryString(payload);
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
  console.log(
    roleSliceData?.find((obj) => obj._id == '6548eabeaeb1160012a51125'),
  );

  const handleFilterPopoverClose = () => {
    setFilterPopoverEl(null);
  };

  const handleFilterPopoverClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setFilterPopoverEl(event.currentTarget);
  };

  const handleClearFilter = () => {
    setFilterStatus(null);
    setFilterAvailability(null);
    setFilterSearchBy(null);
    setFilterSearchValue(null);
    setFilterOptions([]);
    setFilterType(null);
    applyFilters('search', null);
    handleFilterPopoverClose();
    setFilterKey(null);
  };

  const Placeholder = ({ children }: any) => {
    return <div>{children}</div>;
  };
  const inputValue = "someValue";

  // Assuming dataArray is your array of values
  const dataArray = ["value1", "value2", "someValue", "value3"];
  
  // Use the filter method to create a new array excluding the inputValue
  const filteredArray = dataArray.filter(value => value !== inputValue);
  
  // Now, filteredArray does not contain the inputValue
  console.log(rowId);
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
        <div className="buttonFilter">
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
          <Box sx={{ position: 'relative' }}>
            <Button
              // aria-describedby={id}
              variant="contained"
              onClick={handleFilterPopoverClick}
              style={{
                boxShadow: 'none',
                backgroundColor: 'white',
                padding: '0px',
                justifyContent: 'center',
              }}
              className="filterButton"
            >
              {/* <FilterAltOutlinedIcon style={{ fontSize: '2rem' }} /> */}
              <Badge
                color="secondary"
                variant={filterKey === null ? 'standard' : 'dot'}
                invisible={false}
                className="red-badge-filter"
              >
                <img
                  src={filterIcon}
                  alt="no_image"
                  style={{
                    width: '25px',
                    height: '25px',
                    opacity: 0.9,
                    cursor: 'pointer',
                  }}
                />
              </Badge>
            </Button>
            <Popover
              className="filter-dropdown"
              open={filterAnchorOpen}
              anchorEl={filterPopoverEl}
              onClose={handleFilterPopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #d0d0d0',
                    alignContent: 'center',
                    padding: '1rem',
                  }}
                >
                  <Typography fontWeight={600} variant="body1">
                    Filters
                  </Typography>
                  <CloseIcon
                    sx={{ cursor: 'pointer' }}
                    onClick={handleFilterPopoverClose}
                  />
                </Box>
                <Box sx={{ padding: '0rem 1rem 1rem 1rem' }}>
                  <Box sx={{ my: 1 }}>
                    <Typography variant="body2" paddingY={1}>
                      Status
                    </Typography>

                    <Select
                      labelId="table-select-label"
                      id="table-select"
                      value={filterStatus}
                      displayEmpty
                      fullWidth
                      size="small"
                      IconComponent={ExpandMoreOutlinedIcon}
                      onChange={(event: any) =>
                        setFilterStatus(event.target.value)
                      }
                      renderValue={
                        filterStatus !== null
                          ? undefined
                          : () => <Placeholder>Select Status</Placeholder>
                      }
                    >
                      {userStatus?.map((element: any) => (
                        <MenuItem value={element.value} key={element.value}>
                          {element.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box sx={{ my: 1 }}>
                    <Typography variant="body2" paddingY={1}>
                      Search by
                    </Typography>

                    <Select
                      labelId="table-select-label"
                      id="table-select"
                      value={filterSearchBy}
                      size="small"
                      fullWidth
                      displayEmpty
                      IconComponent={ExpandMoreOutlinedIcon}
                      onChange={(event: any, data: any) => {
                        //   debugger;
                        setFilterSearchValue(null);
                        setFilterSearchBy(event.target?.value);
                        setFilterFieldName(data.props.children);
                      }}
                      renderValue={
                        filterSearchBy !== null
                          ? undefined
                          : () => <Placeholder>Search by</Placeholder>
                      }
                    >
                      {headers.map((element: any) => (
                        <MenuItem
                          value={element.id}
                          key={element.id}
                          onClick={() => {
                            setFilterType(element.type);
                            setFilterOptions(element.filters[0]?.options);
                            setFilterKey(element.id);
                          }}
                        >
                          {element.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box sx={{ my: 1 }}>
                    {filterType !== null && (
                      <Typography variant="body2" paddingY={1}>
                        {filterType === 'text'
                          ? 'Search'
                          : filterType === 'date'
                          ? `Date ${filterFieldName}`
                          : `Select ${filterFieldName}`}
                      </Typography>
                    )}

                    {filterType === null ? null : filterType === 'text' ? (
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="Search"
                        id="Search"
                        style={{ margin: '0px' }}
                        InputLabelProps={{ shrink: false }}
                        placeholder="Search"
                        size="small"
                        value={filterSearchValue}
                        onChange={(event: any) =>
                          setFilterSearchValue(event.target.value)
                        }
                      />
                    ) : filterType === 'date' ? (
                      <Box id="filterDatePicker">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker disablePast
                            format="DD/MM/YYYY"
                            value={filterSearchValue}
                            onChange={(event: any) =>
                              setFilterSearchValue(event.$d)
                            }
                          />
                        </LocalizationProvider>
                      </Box>
                    ) : (
                      <Select
                        value={filterSearchValue}
                        labelId="table-select-label2"
                        id="table-select2"
                        size="small"
                        fullWidth
                        displayEmpty
                        IconComponent={ExpandMoreOutlinedIcon}
                        onChange={(event: any) =>
                          setFilterSearchValue(event.target?.value)
                        }
                        renderValue={
                          filterSearchValue !== null
                            ? undefined
                            : () => <Placeholder>Select</Placeholder>
                        }
                      >
                        {filterOptions.map((element: any, index) => (
                          <MenuItem key={index} value={element.value}>
                            {element.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: '1px solid #d0d0d0',
                    alignContent: 'center',
                    padding: '1rem',
                  }}
                >
                  <Button
                    style={{
                      border: '1px solid #d3d3d3',
                      color: '#181818',
                      textTransform: 'capitalize',
                    }}
                    onClick={handleClearFilter}
                  >
                    Clear
                  </Button>
                  <Button
                    style={{
                      border: '1px solid #d3d3d3',
                      background: '#FFC60B',
                      color: '#181818',
                      textTransform: 'capitalize',
                    }}
                    onClick={() => {
                      handleFilterPopoverClose();
                      applyFilters(filterKey, filterSearchValue);
                    }}
                  >
                    Show results
                  </Button>
                </Box>
              </Box>
            </Popover>
          </Box>
        </div>
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
        <TableContainer className="userTableHeight">
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
            stickyHeader
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
              handleTableSorting={handleTableSorting}
            />
            {loader ? (
              <TableBody>
                <TableSkeleton
                  columns={headers}
                  image={true}
                  rows={queryStrings.perPage}
                />
              </TableBody>
            ) : (
              <TableBody>
                {userData?.map((row: any, index: number) => {
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
                                checked={row.is_checked == true ? true : false}
                                onClick={(e: any) => clickHandler(e)}
                                onChange={(event) => {
                                  handleCheckboxValues( row._id),
                                  handleChange(event, row._id);
                                }}
                              />
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box>
                                <img
                                  src={user}
                                  alt="no_image"
                                  style={{ width: '45px', height: '45px' }}
                                />
                              </Box>
                              <Box sx={{ ml: 1 }}>
                                <Box sx={{textTransform: 'uppercase'}}>user{row._id.substring(0, 5)}</Box>
                              </Box>
                            </Box>
                          </Box>
                        </TableCell>
                      )}
                      {headers[1].is_show && (
                        <TableCell align="center">
                          {row.firstName} {row.lastName}
                        </TableCell>
                      )}
                      {/* {headers[2].is_show && (
                      <TableCell align="center">
                        {row.providerDetails==null?"-":row.providerDetails}
                      </TableCell>
                    )} */}
                      {headers[2].is_show && (
                        <TableCell align="center">
                          {
                            organizationSliceData?.find(
                              (obj) => obj._id == row.organisationId,
                            )?.name
                          }
                        </TableCell>
                      )}
                      {headers[3].is_show && (
                        <TableCell align="center">
                          {moment(parseInt(row.createdAt)).format('MM/DD/YYYY')}
                        </TableCell>
                      )}
                      {headers[4].is_show && (
                        <TableCell align="center">
                          {
                            roleSliceData?.find((obj) => obj._id == row.role)
                              ?.name
                          }
                        </TableCell>
                      )}
                      {headers[5].is_show && (
                        <TableCell>
                          <Select
                            className={
                              row.status !== 'Active'
                                ? 'active-select td-select'
                                : 'inactive-select td-select'
                            }
                            value={'Active'}
                            displayEmpty
                            onClick={(e: any) => clickHandler(e)}
                            IconComponent={ExpandMoreOutlinedIcon}
                          >
                            {userStatus.map((element) => (
                              <MenuItem
                                value={element.value}
                                key={element.value}
                              >
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
            )}
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