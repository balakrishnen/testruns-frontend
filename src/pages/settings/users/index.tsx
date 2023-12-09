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
import {
  fetchUserData,
  deleteUserData,
  fetchUpdateUserData,
} from '../../../api/userAPI';
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
  // const totalPages = Math.ceil(Rows.length / itemsPerPage);
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
  const [filterKey, setFilterKey] = React.useState<any>(null);
  const [filter, setFilter] = React.useState<any>(false);

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
  const userSliceData = useSelector((state: any) => state.user.data);

  const Data = Rows.slice(startIndex, endIndex);
  const [rowId, setRowId] = React.useState<any>([]);

  const [visibleRow, setVisibleRow] = React.useState<any>(userData);

  const roleSliceData = useSelector(
    (state: any) => state.role.data?.find_roles,
  );
  const organizationSliceData = useSelector(
    (state: any) => state.organization.data?.get_all_organisations,
  );

  React.useEffect(() => {
    // setTimeout(() => {
    //   setLoader(false);
    // }, 1000);
    userData && setUserData(userData);
  }, [userData]);

  React.useEffect(() => {
    return () => {
      const headersList: any = [...headers];
      headersList.map((item) => {
        return (item.sort = 'asc');
      });
      setHeaders(headersList);
    };
  }, []);
  
  React.useEffect(() => {
    setLoader(true);
    dispatch(fetchUserData(queryStrings));
    setTableHeaderVisible(false);
    setRowId([]);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, [queryStrings]);

  React.useEffect(() => {
    const page: any = { ...pageInfo };
    page['currentPage'] = userSliceData?.get_all_users?.pageInfo.currentPage;
    page['totalPages'] = userSliceData?.get_all_users?.pageInfo.totalPages;
    page['hasNextPage'] = userSliceData?.get_all_users?.pageInfo.hasNextPage;
    page['hasPreviousPage'] =
      userSliceData?.get_all_users?.pageInfo.hasPreviousPage;
    page['totalCount'] = userSliceData?.get_all_users?.pageInfo.totalCount;
    userSliceData?.get_all_users?.Identity &&
      setUserData(userSliceData?.get_all_users?.Identity);
    setPageInfo(page);
    // setTimeout(() => {
    //   setLoader(false);
    // }, 1000);
  }, [userSliceData]);

  const handlePageChange = (even: any, page_no: number) => {
    const payload: any = { ...queryStrings };
    const page: any = { ...pageInfo };
    payload['page'] = page_no;
    page['currentPage'] = page_no;
    setPageInfo(page);
    setQueryString(payload);
    setCurrentPage(page_no);
  };

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

  const handleCheckboxValues = (id: any) => {
    // Check if the ID is already in the selectedIds
    if (rowId.includes(id)) {
      // If it is, remove it
      setRowId(rowId.filter((rowId: any) => rowId !== id));
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
    const updatedRows = userData.map((row: any) => ({
      ...row,
      is_checked: false,
    }));
    setUserData(updatedRows);
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
    setFilter(true);
  };
  const clickHandler = (e: MouseEvent) => {
    e.stopPropagation();
  };
  const handleOnChange = (e: any, row: any) => {
    console.log(e.target.value);

    var assetsChange: any = {
      _id: row._id,
    };
    assetsChange['isActive'] = e.target.value;

    dispatch(fetchUpdateUserData(assetsChange));
    toast(`Assets status updated !`, {
      style: {
        background: '#00bf70',
        color: '#fff',
      },
    });
    reload();
  };
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
    setFilter(false);
  };

  const Placeholder = ({ children }: any) => {
    return <div>{children}</div>;
  };
  const inputValue = 'someValue';

  // Assuming dataArray is your array of values
  const dataArray = ['value1', 'value2', 'someValue', 'value3'];

  // Use the filter method to create a new array excluding the inputValue
  const filteredArray = dataArray.filter((value) => value !== inputValue);

  // Now, filteredArray does not contain the inputValue
  console.log(rowId);

  const getFilterOptions = (data) => {
    const result: any = [];
    data.forEach((element) => {
      result.push({
        id: element.name,
        name: element.name,
        value: element._id,
      });
    });
    return result;
  };

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
                variant={filter ? 'dot' : 'standard'}
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
                      Search by
                    </Typography>

                    <Select
                      labelId="table-select-label"
                      id="table-select"
                      value={filterSearchBy}
                      size="small"
                      fullWidth
                      displayEmpty
                      autoComplete="off"
                      IconComponent={ExpandMoreOutlinedIcon}
                      onChange={(event: any, data: any) => {
                        setFilterSearchValue(null);
                        setFilterSearchBy(event.target?.value);
                        setFilterFieldName(data.props.children);
                        // if (event.target?.value === 'firstName') {
                        //   setFilterOptions(getFilterOptions(roleSliceData));
                        // }
                        if (event.target?.value === 'role') {
                          setFilterOptions(getFilterOptions(roleSliceData));
                        }
                        if (event.target?.value === 'organisationId') {
                          setFilterOptions(
                            getFilterOptions(organizationSliceData),
                          );
                        }
                        if (event.target?.value === 'status') {
                          setFilterOptions(StatusList);
                        }
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
                        autoComplete="off"
                        onChange={(event: any) =>
                          setFilterSearchValue(event.target.value)
                        }
                      />
                    ) : filterType === 'date' ? (
                      <Box id="filterDatePicker">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
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
                            {element.name}
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
                      {/* {headers[0].is_show && (
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
                      )} */}
                      {headers[0].is_show && (
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ mt: 0, mr: 1 }}>
                              <Checkbox
                                color="primary"
                                checked={row.is_checked == true ? true : false}
                                onClick={(e: any) => clickHandler(e)}
                                onChange={(event) => {
                                  handleCheckboxValues(row._id),
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
                                <Box>
                                  {row.firstName} {row.lastName}
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </TableCell>
                      )}
                      {headers[1].is_show && (
                        <TableCell align="center">{row.email}</TableCell>
                      )}
                      {headers[2].is_show && (
                        <TableCell align="center">
                          {
                            organizationSliceData?.find(
                              (obj:any) => obj._id == row.organisationId,
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
                            roleSliceData?.find((obj:any) => obj._id == row.role)
                              ?.name
                          }
                        </TableCell>
                      )}
                      {headers[5].is_show && (
                        <TableCell>
                          <Select
                            className={
                              row.isActive == true
                                ? 'active-select td-select'
                                : 'inactive-select td-select'
                            }
                            value={row.isActive}
                            displayEmpty
                            onChange={(e) => handleOnChange(e, row)}
                            onClick={(e: any) => clickHandler(e)}
                            IconComponent={ExpandMoreOutlinedIcon}
                          >
                            <MenuItem value={true} key={true}>
                              Active
                            </MenuItem>
                            <MenuItem value={false} key={false}>
                              In-active
                            </MenuItem>
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
          totalRecords={userData?.length}
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
          closeDeletePopup={() =>
            deletePopupRef.current.open(false, 'User', rowId)
          }
          deleteConfirmation={handleDeleteConfirmation}
          // reload={reload}
        />
      </Box>
    </Box>
  );
};

const UsersPage = withSettingsLayout(Users);

export default UsersPage;
