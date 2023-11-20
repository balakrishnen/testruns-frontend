/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import PrivateRoute from '../../components/PrivateRoute';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import DeletePopup from '../../components/DeletePopup';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import TablePagination from '../../components/table/TablePagination';
import {
  handleCheckboxChange,
  handleDeCheckboxChange,
  handledAllSelected,
} from '../../utils/common-services';
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputAdornment,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
  Checkbox,
  Badge,
} from '@mui/material';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import AddIcon from '@mui/icons-material/Add';
import search from '../../assets/images/search.svg';
import Addnewpopup from './AssetsForm';
import { navigate } from 'gatsby';
import TableHeader from '../../components/table/TableHeader';
import image_holder from '../../assets/images/image-holder.svg';
import { LocalizationProvider,DatePicker } from '@mui/x-date-pickers';
import {
  AssetsHeaders,
  DepartmentList,
  LaboratoryList,
  AssetsRows,
  StatusList,
  AvailabilityList,
} from '../../utils/data';
import { AssetsRowData } from '../../modals/assets.modal';
import TableFilters from '../../components/table/TableFilters';
import Confirmationpopup from '../../components/ConfirmationPopup';
import SuccessPopup from '../../components/SuccessPopup';
import {
  deleteAssetsData,
  fetchAssetsData,
  fetchUpdateAssetsData,
} from '../../api/assetsAPI';
import { useDispatch, useSelector } from 'react-redux';
import DeleteSuccessPopup from '../../components/DeleteSuccessPopup';
import { Value } from 'sass';
import { bool } from 'yup';
import moment from 'moment';
import TablePopup from '../../components/table/TablePopup';
import test from '../../assets/images/test.svg';
import filterIcon from '../../assets/images/filter-icon1.svg';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Popover from '@mui/material/Popover';

const rows: AssetsRowData[] = AssetsRows;
const assetsStatus = StatusList;
const assetsAvailability = AvailabilityList;

export default function Assets() {
  const [openDlg1Dialog, setDialog1Open] = React.useState(false);
  const [headers, setHeaders] = React.useState<any>(AssetsHeaders);
  // const [assetsData, setAssetsData] = React.useState(rows);
  const [isDeselectAllChecked, setIsDeselectAllChecked] = React.useState(false);
  const [isselectAllChecked, setIsselectAllChecked] = React.useState(false);
  const [isTableHeaderVisible, setTableHeaderVisible] = React.useState(false);
  const formPopupRef: any = React.useRef(null);
  const confirmationPopupRef: any = React.useRef(null);
  const [deletePopup, setDeletePopup] = React.useState(false);
  const deletePopupRef: any = React.useRef(null);
  const successPopupRef: any = React.useRef(null);
  const tablePopupRef: any = React.useRef(null);
  const [filterKey, setFilterKey] = React.useState(null);
  const deleteSuccessPopupRef: any = React.useRef(null);
  const [columnAnchorEl, setColumnAnchorEl] =
  React.useState<null | HTMLElement>(null);
const [filterPopoverEl, setFilterPopoverEl] =
  React.useState<null | HTMLElement>(null);
const columnAnchorOpen = Boolean(columnAnchorEl);
const filterAnchorOpen = Boolean(filterPopoverEl);
  const [filterStatus, setFilterStatus] = React.useState(null);
  const [filterSearchBy, setFilterSearchBy] = React.useState(null);
  const [filterSearchValue, setFilterSearchValue] = React.useState(null);
  const [filterFieldName, setFilterFieldName] = React.useState('');
  const [filterType, setFilterType] = React.useState(null);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  // const totalPages = Math.ceil(assetsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const Data = assetsData.slice(startIndex, endIndex);
  const dispatch: any = useDispatch();
  const [filterAvailability, setFilterAvailability] = React.useState(null);
  const [assetsData, setAssetsData] = React.useState<any>([]);
  const [rowId, setRowId] = React.useState<any>([]);
  console.log(rowId);

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

  const assetsSliceData = useSelector(
    (state: any) => state.assets.data?.get_all_assets,
  );
  const handleFilterPopoverClose = () => {
    setFilterPopoverEl(null);
  };
  const Placeholder = ({ children }: any) => {
    return <div>{children}</div>;
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
    setFilterKey(null)
  };
  React.useEffect(() => {
    setAssetsData(assetsData);
  }, [assetsData]);

  React.useEffect(() => {
    dispatch(fetchAssetsData(queryStrings));
    // setAssetsData(assetsData);
  }, [pageInfo, queryStrings]);

  React.useEffect(() => {
    const page: any = { ...pageInfo };
    page['currentPage'] = assetsSliceData?.pageInfo.currentPage;
    page['totalPages'] = assetsSliceData?.pageInfo.totalPages;
    page['hasNextPage'] = assetsSliceData?.pageInfo.hasNextPage;
    page['hasPreviousPage'] = assetsSliceData?.pageInfo.hasPreviousPage;
    page['totalCount'] = assetsSliceData?.pageInfo.totalCount;
    setAssetsData(assetsSliceData?.Assets);
    setPageInfo(page);
  }, [assetsSliceData]);

  const handlePageChange = (even: any, page_no: number) => {
    const payload: any = { ...queryStrings };
    const page: any = { ...pageInfo };
    payload['page'] = page_no;
    page['currentPage'] = page_no;
    setPageInfo(page);
    setQueryString(payload);
    setCurrentPage(page_no);
  };
  const reload = () => {
    const payload: any = { page: 1, perPage: 5, sortOrder: 'desc' };
    dispatch(fetchAssetsData(payload));
  };
  // const filters = () => {
  //   dispatch(fetchAssetsData(queryStrings));
  // };

  const [visibleRow, setVisibleRow] = React.useState<any>(assetsData);

  const handleOnChange = (e: any, row: any) => {
    console.log(e.target.value);

    console.log('change', row.departmentId, row.laboratoryId);
    var assetsChange: any = {
      _id: row._id,
    };
    if (e.target.name == 'status') {
      assetsChange['status'] = e.target.value;
    }
    if (e.target.name == 'availability') {
      assetsChange['availability'] = e.target.value;
    }
    console.log(assetsChange);
    dispatch(fetchUpdateAssetsData(assetsChange));
    toast(`Assets ${e.target.name == 'availability'?'availability':'status'} updated !`, {
      style: {
        background: '#00bf70', color: '#fff'
      }
    });
    reload();
  };

  const handleChange = (event: any, id: any) => {
    handleCheckboxChange(
      assetsData,
      setAssetsData,
      setIsDeselectAllChecked,
      setIsselectAllChecked,
      setTableHeaderVisible,
      setVisibleRow,
    )(event, id);
  };

  const handleDeChange = handleDeCheckboxChange(
    isDeselectAllChecked,
    assetsData,
    setAssetsData,
    setIsDeselectAllChecked,
    setIsselectAllChecked,
    setTableHeaderVisible,
    setRowId,
    // setVisibleRow,
  );
  const handledAllchange = handledAllSelected(
    isselectAllChecked,
    assetsData,
    setAssetsData,
    setIsDeselectAllChecked,
    setIsselectAllChecked,
    setVisibleRow,
    setRowId,
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

  const handleMenuCheckboxChange = (event: any, index: any) => {
    setHeaders((prevColumns: any) => {
      return prevColumns.map((column: any, i: any) => {
        if (i === index) {
          return { ...column, is_show: !headers[index].is_show };
        }
        return column;
      });
    });
  };
  const [isAnyCheckboxSelected, setIsAnyCheckboxSelected] =
    React.useState(false);

  const handleCloseFormPopup = (state: any) => {
    formPopupRef.current.open(state);
  };

  const handleSubmitFormPopup = () => {
    formPopupRef.current.open(false);
    successPopupRef.current.open(true, 'Assets');
    setTimeout(() => {
      successPopupRef.current.open(false, 'Assets');
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

  const handleCloseTableHeader = (status: boolean) => {
    setTableHeaderVisible(status);
    const updatedRows = assetsData.map((row: any) => ({
      ...row,
      is_checked: false,
    }));

    setAssetsData(updatedRows);
    setIsDeselectAllChecked(true);
    setIsselectAllChecked(false);
  };
  const asset: any = [];

  const assetVal: any = { _id: rowId };

  const handleDeleteConfirmation = (state: any) => {
    if (state === 1) {
      // deletePopupRef.current.open(false);
      dispatch(deleteAssetsData(assetVal));
      toast(`Assets deleted !`, {
        style: {
          background: '#00bf70', color: '#fff'
        }
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
  console.log(assetsData);

  const handleOpenDeletePopup = () => {
    deletePopupRef.current.open(true, 'Assest');
  };

  const clickHandler = (e: MouseEvent) => {
    e.stopPropagation();
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

  const applyFilters = (field: any, value: any) => {
    const payload: any = { ...queryStrings };
    payload['searchBy'] = field;
    payload['search'] = value;
    setQueryString(payload);
  };

  return (
    <PrivateRoute>
      <Box className="main-padding">
        <Box className="title-main">
          <Typography>Assets</Typography>
          <div className='buttonFilter'>
          <Button
            type="submit"
            variant="contained"
            onClick={() => {
              formPopupRef.current.open(true);
            }}
          >
            <AddIcon sx={{ mr: 1 }} />
            Create Asset
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
                className='filterButton'
              >
                {/* <FilterAltOutlinedIcon style={{ fontSize: '2rem' }} /> */}
                <Badge color="secondary" variant={filterKey === null ? "standard" : "dot"} invisible={false}>
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
                        {assetsStatus?.map((element: any) => (
                          <MenuItem value={element.value} key={element.value}>
                            {element.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                    {/* {module === 'assets' && ( */}
                      <Box sx={{ my: 1 }}>
                        <Typography variant="body2" paddingY={1}>
                          Availability
                        </Typography>

                        <Select
                          labelId="table-select-label"
                          id="table-select"
                          value={filterAvailability}
                          displayEmpty
                          fullWidth
                          size="small"
                          IconComponent={ExpandMoreOutlinedIcon}
                          onChange={(event: any) =>
                            setFilterAvailability(event.target.value)
                          }
                          renderValue={
                            filterAvailability !== null
                              ? undefined
                              : () => (
                                  <Placeholder>Select Availability</Placeholder>
                                )
                          }
                        >
                          {assetsAvailability?.map((element: any) => (
                            <MenuItem value={element.value} key={element.value}>
                              {element.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    {/* )} */}
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
                            <DatePicker
                              format="DD/MM/YYYY"
                              value={filterSearchValue}
                              onChange={(event:any) =>
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
                          {filterOptions.map((element:any, index) => (
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
          module="assets"
          applyFilters={applyFilters}
          status={assetsStatus}
          availability={assetsAvailability}
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
                // filters={filters}
                handleTableSorting={handleTableSorting}
              />

              <TableBody>
                {assetsData?.map((row: any, index: number) => {
                  return (
                    row?.isDeleted !== true && (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={index}
                        // selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                        onClick={(e: any) => {
                          // e.target.tagName !== 'INPUT' &&
                          //   e.target.tagName !== 'LI' &&
                          navigate(`/assets/details/${row._id}`, {
                            state: { props: row, func: reload() },
                          });
                        }}
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
                                    setRowId([...rowId, row._id]),
                                      handleChange(event, row._id);
                                  }}
                                />
                              </Box>

                              <Box
                                sx={{ display: 'flex', alignItems: 'center' }}
                              >
                                <Box>
                                  <img
                                    src={test}
                                    alt="no_image"
                                    style={{ width: '50px', height: '50px' }}
                                  />
                                </Box>
                                <Box sx={{ ml: 2 }}>
                                  <Box>{row.assetNumber}</Box>
                                </Box>
                              </Box>
                            </Box>
                          </TableCell>
                        )}
                        {headers[1].is_show && (
                          <TableCell>
                            <Box>{row.name}</Box>
                          </TableCell>
                        )}
                        {headers[2].is_show && (
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
                                    label={row.departmentId[0]?.name}
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
                        )}
                        {headers[3].is_show && (
                          <TableCell>
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
                                    label={row.laboratoryId[0]?.name}
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
                        )}

                        {headers[4].is_show && (
                          <TableCell>
                            {row.perchasedDate === null
                              ? '-'
                              : moment(row.perchasedDate).isValid()
                              ? moment(row.perchasedDate)
                                  .local()
                                  .format('MM/DD/YYYY')
                              : moment().format('MM/DD/YYYY')}
                          </TableCell>
                        )}
                        {headers[5].is_show && (
                          <TableCell>
                            {row.lastUsedDate === null
                              ? '-'
                              : moment(row.lastUsedDate).isValid()
                              ? moment(row.lastUsedDate)
                                  .local()
                                  .format('MM/DD/YYYY')
                              : moment().format('MM/DD/YYYY')}
                          </TableCell>
                        )}
                        {headers[6].is_show && (
                          <TableCell>
                            <Select
                              name="status"
                              className={
                                row.status == 'Active'
                                  ? 'active-select td-select'
                                  : 'inactive-select td-select'
                              }
                              value={row.status}
                              displayEmpty
                              onChange={(e) => handleOnChange(e, row)}
                              onClick={(e: any) => clickHandler(e)}
                              IconComponent={ExpandMoreOutlinedIcon}
                            >
                              {assetsStatus.map((element) => (
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
                        {headers[7].is_show && (
                          <TableCell>
                            <Select
                              name="availability"
                              className={
                                row.availability === 'Available'
                                  ? 'active-select td-select'
                                  : row.availability === 'In_Use'
                                  ? 'inuse-select td-select'
                                  : 'inactive-select td-select'
                              }
                              value={
                                row.availability
                                  ? row.availability
                                  : 'Not_Available'
                              }
                              displayEmpty
                              onChange={(e) => handleOnChange(e, row)}
                              IconComponent={ExpandMoreOutlinedIcon}
                              onClick={(e: any) => clickHandler(e)}
                            >
                              {assetsAvailability.map((element) => (
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
                    )
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
            totalRecords={assetsData?.length}
            page={pageInfo}
          />
        </Box>
        <Box>
          <Addnewpopup
            ref={formPopupRef}
            closeFormPopup={handleCloseFormPopup}
            submitFormPopup={handleSubmitFormPopup}
            // openConfirmationPopup={handleOpenConfirmationPopup}
            type="create"
            reload={reload}
          />
          <Box>
            <DeletePopup
              rowId={rowId}
              ref={deletePopupRef}
              closeDeletePopup={() =>
                deletePopupRef.current.open(false, 'Assests', rowId)
              }
              deleteConfirmation={handleDeleteConfirmation}
            />
          </Box>

          <DeleteSuccessPopup ref={deleteSuccessPopupRef} />
          <TablePopup ref={tablePopupRef} />
        </Box>
      </Box>
    </PrivateRoute>
  );
}
