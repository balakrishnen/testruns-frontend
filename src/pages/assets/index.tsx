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
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import {
  AssetsHeaders,
  DepartmentList,
  LaboratoryList,
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
import test from '../../assets/images/Noimage.png';
import filterIcon from '../../assets/images/filter-icon1.svg';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Popover from '@mui/material/Popover';
import TableSkeleton from '../../components/table/TableSkeleton';

const assetsStatus = StatusList;
const assetsAvailability = AvailabilityList;

export default function Assets() {
  const [openDlg1Dialog, setDialog1Open] = React.useState(false);
  const [headers, setHeaders] = React.useState<any>(AssetsHeaders);
  const [isDeselectAllChecked, setIsDeselectAllChecked] = React.useState(false);
  const [isselectAllChecked, setIsselectAllChecked] = React.useState(false);
  const [isTableHeaderVisible, setTableHeaderVisible] = React.useState(false);
  const formPopupRef: any = React.useRef(null);
  const confirmationPopupRef: any = React.useRef(null);
  const deletePopupRef: any = React.useRef(null);
  const successPopupRef: any = React.useRef(null);
  const tablePopupRef: any = React.useRef(null);
  const [filterKey, setFilterKey] = React.useState<any>(null);
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
  const [filterOptions, setFilterOptions] = React.useState<any>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const dispatch: any = useDispatch();
  const [filterAvailability, setFilterAvailability] = React.useState(null);
  const [assetsData, setAssetsData] = React.useState<any>([]);
  const [rowId, setRowId] = React.useState<any>([]);
  console.log(rowId);
  const [visibleRow, setVisibleRow] = React.useState<any>(assetsData);
  const [loader, setLoader] = React.useState(false);
  const [filter, setFilter] = React.useState(false);
  const [pageInfo, setPageInfo] = React.useState({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [queryStrings, setQueryString] = React.useState({
    page: 1,
    perPage: 10,
    searchBy: null,
    search: null,
    sortBy: null,
    sortOrder: 'desc',
  });
  const assetsSliceData = useSelector(
    (state: any) => state.assets.data?.get_all_assets,
  );
  const departmentSliceData = useSelector(
    (state: any) => state.department.data?.get_all_departments,
  );
  const labSliceData = useSelector(
    (state: any) => state.lab.data?.get_all_labs,
  );
  const assetsIdSliceData = useSelector(
    (state: any) => state.assets.data?.get_all_assets,
  );

  React.useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
    setAssetsData(assetsData);
  }, [assetsData]);

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
    dispatch(fetchAssetsData(queryStrings));
    setTableHeaderVisible(false);
    setRowId([]);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
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
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, [assetsSliceData]);

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
    setFilterSearchBy((prevState) => null);
    setFilterSearchValue((prevState) => null);
    setFilterOptions([]);
    setFilterType(null);
    applyFilters(null, null);
    handleFilterPopoverClose();
    setFilterKey(null);
    setFilter(false);
  };

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
    const payload: any = { page: 1, perPage: 10, sortOrder: 'desc' };
    dispatch(fetchAssetsData(payload));
  };

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
    dispatch(fetchUpdateAssetsData(assetsChange));
    toast(
      `Assets ${
        e.target.name == 'availability' ? 'availability' : 'status'
      } updated !`,
      {
        style: {
          background: '#00bf70',
          color: '#fff',
        },
      },
    );
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
  const handleCheckboxValues = (id: any) => {
    if (rowId.includes(id)) {
      setRowId(rowId.filter((rowId: any) => rowId !== id));
    } else {
      setRowId([...rowId, id]);
    }
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

  const assetVal: any = { _id: rowId };

  const handleDeleteConfirmation = (state: any) => {
    if (state === 1) {
      dispatch(deleteAssetsData(assetVal));
      toast(`Assets deleted !`, {
        style: {
          background: '#00bf70',
          color: '#fff',
        },
      });
      reload();
      setTableHeaderVisible(false);
    }
    deletePopupRef.current.open(false);
  };

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

  const applyFilters = (key: any, value: any) => {
    const payload: any = { ...queryStrings };
    payload['searchBy'] = key;
    payload['search'] = value;
    setQueryString(payload);
    setFilter(true);
  };

  const Placeholder = ({ children }: any) => {
    return <div>{children}</div>;
  };

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

  return (
    <PrivateRoute>
      <Box className="main-padding">
        <Box className="title-main">
          <Typography>Assets</Typography>
          <div className="buttonFilter">
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
                        autoComplete="off"
                        fullWidth
                        displayEmpty
                        IconComponent={ExpandMoreOutlinedIcon}
                        onChange={(event: any, data: any) => {
                          setFilterSearchValue(null);
                          setFilterSearchBy(event.target?.value);
                          setFilterFieldName(data.props.children);
                          if (event.target?.value === 'laboratoryId') {
                            setFilterOptions(getFilterOptions(labSliceData));
                          }
                          if (event.target?.value === 'departmentId') {
                            setFilterOptions(
                              getFilterOptions(departmentSliceData),
                            );
                          }
                          if (event.target?.value === 'assetNumber') {
                            const data: any = [];
                            assetsIdSliceData.Assets.forEach((element) => {
                              data.push({
                                id: element.assetNumber,
                                name: element.assetNumber,
                                value: element.assetNumber,
                              });
                            });
                            setFilterOptions(data);
                          }
                          if (event.target?.value === 'status') {
                            setFilterOptions(assetsStatus);
                          }
                          if (event.target?.value === 'availability') {
                            setFilterOptions(AvailabilityList);
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
                          autoComplete="off"
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
                          onChange={(event: any) => {
                            setFilterSearchValue(event.target?.value);
                          }}
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
          module="assets"
          applyFilters={applyFilters}
          status={assetsStatus}
          availability={assetsAvailability}
        />

        <Box className="table-outer" sx={{ width: '100%' }}>
          <TableContainer className="tableHeight">
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
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
                  {assetsData?.map((row: any, index: number) => {
                    return (
                      row?.isDeleted !== true && (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={index}
                          sx={{ cursor: 'pointer' }}
                          onClick={(e: any) => {
                            navigate(`/assets/details/${row._id}`, {
                              state: { props: row, func: reload() },
                            });
                          }}
                        >
                          {headers[0].is_show && (
                            <TableCell scope="row">
                              <Box
                                sx={{ display: 'flex', alignItems: 'center' }}
                              >
                                <Box sx={{ mt: 0, mr: 1 }}>
                                  <Checkbox
                                    color="primary"
                                    checked={
                                      row.is_checked == true ? true : false
                                    }
                                    onClick={(e: any) => clickHandler(e)}
                                    onChange={(event) => {
                                      handleCheckboxValues(row._id),
                                        handleChange(event, row._id);
                                    }}
                                  />
                                </Box>

                                <Box
                                  sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                  <Box>
                                    <img
                                      src={
                                        row?.assetImageUrl == null
                                          ? test
                                          : row?.assetImageUrl
                                      }
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
              )}
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
