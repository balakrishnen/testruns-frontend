import React from 'react';
import PrivateRoute from '../../components/PrivateRoute';
import { Box, Button, Checkbox, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TablePagination from '../../components/table/TablePagination';
import TableBody from '@mui/material/TableBody';
import DeletePopup from '../../components/DeletePopup';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import '../../assets/styles/procedure.scss';
// import Deleteconfirmationpopup from "../../components/deleteconfirmationpopup";
import ProcedureForm from './ProcedureForm';
import TableFilters from '../../components/table/TableFilters';
import {
  handleCheckboxChange,
  handleDeCheckboxChange,
  handledAllSelected,
} from '../../utils/common-services';
import {
  ProceduresHeaders,
  DepartmentList,
  LaboratoryList,
  ProcedureRows,
} from '../../utils/data';
import { ProceduresRowData } from '../../modals/Procedures.modal';
import TableHeader from '../../components/table/TableHeader';
import Confirmationpopup from '../../components/ConfirmationPopup';
import SuccessPopup from '../../components/SuccessPopup';
import { navigate } from 'gatsby';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProcedureData,deleteProcedureData } from '../../api/procedureAPI';
import DeleteSuccessPopup from '../../components/DeleteSuccessPopup';
const rows: ProceduresRowData[] = ProcedureRows;

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const getDepartment = (id: any) => {
  let data = DepartmentList.find((item) => item.id === id);
  return data?.name;
};

const getLaboratory = (id: any) => {
  let data = LaboratoryList.find((item) => item.id === id);
  return data?.name;
};

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function Procedures() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof ProceduresRowData>('id');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const [deletePopup, setDeletePopup] = React.useState(false);
  const deletePopupRef: any = React.useRef(null);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ProceduresRowData,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n: any) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
 
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

  const procedureSliceData = useSelector(
    (state: any) => state.procedure.data?.get_all_procedures,
  );
  console.log('procedureSliceData',procedureSliceData);
  
  const dispatch: any = useDispatch();
  const [procedureData, setProcedureData] = React.useState<any>([]);
  const [rowId,setRowId]=React.useState<any>([])
  React.useEffect(() => {
    setProcedureData(procedureData);
  }, [procedureData]);

  React.useEffect(() => {
    dispatch(fetchProcedureData(queryStrings));
  }, [pageInfo]);
  // console.log('procedureData',procedureData[0].departmentId.length);

  React.useEffect(() => {
    const page: any = { ...pageInfo };
    page['currentPage'] = procedureSliceData?.pageInfo.currentPage;
    page['totalPages'] = procedureSliceData?.pageInfo.totalPages;
    page['hasNextPage'] = procedureSliceData?.pageInfo.hasNextPage;
    page['hasPreviousPage'] = procedureSliceData?.pageInfo.hasPreviousPage;
    setProcedureData(procedureSliceData?.Procedures);
    setPageInfo(page);
  }, [procedureSliceData]);

  const handlePageChange = (even: any, page_no: number) => {
    const payload: any = { ...queryStrings };
    const page: any = { ...pageInfo };
    payload['page'] = page_no;
    payload['perPage'] = 5;
    page['currentPage'] = page_no;
    setPageInfo(page);
    setQueryString(payload);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDense(event.target.checked);
  // };

  // const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const [Rows, setSelectedRows] = React.useState(rows);
  const [isDeselectAllChecked, setIsDeselectAllChecked] = React.useState(false);
  const [isselectAllChecked, setIsselectAllChecked] = React.useState(false);
  const [isTableHeaderVisible, setTableHeaderVisible] = React.useState(false);
  const formPopupRef: any = React.useRef(null);
  const confirmationPopupRef: any = React.useRef(null);
  const successPopupRef: any = React.useRef(null);
  const deleteSuccessPopupRef:any = React.useRef(null);
  const handleCloseFormPopup = (state: any) => {
    formPopupRef.current.open(state);
  };

  const handleSubmitFormPopup = () => {
    formPopupRef.current.open(false);
    successPopupRef.current.open(true, 'Procedure');
    setTimeout(() => {
      successPopupRef.current.open(false, 'Procedure');
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
    const updatedRows = Rows.map((row: any) => ({
      ...row,
      is_checked: false,
    }));

    setSelectedRows(updatedRows);
    setIsDeselectAllChecked(true);
    setIsselectAllChecked(false);
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
  const [headers, setHeaders] = React.useState<any>(ProceduresHeaders);
  const [currentPage, setCurrentPage] = React.useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(Rows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const Data = Rows.slice(startIndex, endIndex);

  const [visibleRow, setVisibleRow] = React.useState<any>(procedureData);

  React.useEffect(() => {
    const sortedRows = stableSort(rows, getComparator(order, orderBy));
    const newVisibleRows = sortedRows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );

    setVisibleRow(newVisibleRows);
  }, [order, orderBy, page, rowsPerPage]);
  // const handlePageChange = (even: any, page: number) => {
  //   setCurrentPage(page);
  // };
  const handleChange = (event: any, id: any) => {
    handleCheckboxChange(
      procedureData,
      setProcedureData,
      setSelectedRows,
      setIsDeselectAllChecked,
      setIsselectAllChecked,
      setTableHeaderVisible,
      setVisibleRow,
    )(event, id);
    // setVisibleRow(Data)
  };
  const handleDeChange = handleDeCheckboxChange(
    isDeselectAllChecked,
    procedureData,
    setProcedureData,
    setSelectedRows,
    setIsDeselectAllChecked,
    setIsselectAllChecked,
    setTableHeaderVisible,
    setVisibleRow,
  );
  const handledAllchange = handledAllSelected(
    isselectAllChecked,
    procedureData,
    setProcedureData,
    setSelectedRows,
    setIsDeselectAllChecked,
    setIsselectAllChecked,
    setVisibleRow,
  );
  const filters = (idVaule: any) => {
    if (Object.keys(idVaule).length !== 0) {
      const filteredRows = procedureData.filter(function (el: any) {
        if (el.procedureNumber == idVaule.assetNumber) {
          return true;
        }
        if (idVaule.search !== '') {
          if (el.name == idVaule.search) {
            return true;
          }
        } else {
          return true;
        }
      });
      console.log(filteredRows);
      setVisibleRow(filteredRows);
    } else {
      setVisibleRow(procedureData);
    }
  };

  const data = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    // ... more objects
  ];
  function getObjectBySearchString(searchString: any) {
    const foundObject = data.find((item) => item.name === searchString);

    return foundObject;
  }

  const searchString = 'B';
  const foundItem = getObjectBySearchString(searchString);
  console.log(visibleRow);
  const Procedure:any=[]
  console.log(rowId);
  const ProcedureVal:any={_id:rowId}
  const handleDeleteConfirmation = (state: any) => {
    if (state === 1) {
      dispatch(deleteProcedureData(ProcedureVal));
      deleteSuccessPopupRef.current.open(true);
      setTimeout(() => {
      deleteSuccessPopupRef.current.open(false);
    }, 3000);
      // deletePopupRef.current.open(false);
    }
    deletePopupRef.current.open(false);
  };

  const handleOpenDeletePopup = () => {
    deletePopupRef.current.open(true, 'procedures');
  };

  const clickHandler=(e:MouseEvent)=>{
    e.stopPropagation();
  }
  return (
    <PrivateRoute>
      <Box className="main-padding">
        <Box className="title-main">
          <Typography>Procedures</Typography>
          <Button
          variant="contained"
          onClick={() => {
            formPopupRef.current.open(true);
          }}
        >
          <AddIcon sx={{ mr: 1 }} />
          Create Procedure
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
        />
        <Box className="table-outer" sx={{ width: '100%' }}>
          {/* <Grid container mt={4}>
            <Grid item lg={6} xs={11} margin="auto">
              <EnhancedTable columns={headers} />
            </Grid>
          </Grid> */}
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              // size={dense ? "small" : "medium"}
            >
              <TableHeader
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                columns={headers}
                filters={filters}
              />
              <TableBody>
                {procedureData?.map((row: any, index: number) => {
                  // const isItemSelected = isSelected(row.name);
                  // const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    row.isDeleted!==true &&  <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.name, index)}
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      // selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                      onClick={(e:any) =>
                        // (e.target.name==undefined && 
                          navigate(
                           `/procedures/details/${row._id}`
                         )
                       }
                    >
                      {headers[0].is_show && (
                        <TableCell scope="row">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ mt: 0, mr: 1 }}>
                              <Checkbox
                                color="primary"
                                checked={row.is_checked}
                                onClick={(e:any)=>clickHandler(e)}
                                onChange={(event) =>{
                                  // Procedure.push(row._id)
                                setRowId([...rowId,row._id]),
                                  handleChange(event, row._id)}
                                }
                              />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box>
                                <Box>{row.procedureNumber}</Box>
                              </Box>
                            </Box>
                          </Box>
                        </TableCell>
                      )}
  
                      {console.log('procedureData',row.departmentId.length)}
                      {headers[1].is_show && (
                        <TableCell>
                          <Box>{row.name}</Box>
                        </TableCell>
                      )}
                      {headers[2].is_show && (
                        <TableCell> {(row.departmentId[0]?.id==undefined || row.departmentId[0] === null)
                          ? '-'
                          : row.departmentId.length==0 && row.departmentId.map((item: any) => (
                              <Box key={item.id}>{item.name}</Box>
                            ))}</TableCell>
                      )}
                      {headers[3].is_show && (
                        <TableCell> {(row.laboratoryId[0]?.id==undefined || row.laboratoryId[0] === null)
                          ? '-'
                          : row.departmentId.map((item: any) => (
                              <Box key={item.id}>{item.name}</Box>
                            ))}</TableCell>
                      )}
                      {headers[4].is_show && (
                        <TableCell>{row.updatedAt}</TableCell>
                      )}
                      {headers[5].is_show && (
                        <TableCell>{row.createdAt}</TableCell>
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
            totalRecords={procedureData?.length}
            page={pageInfo}
          />
        </Box>
        <ProcedureForm
          ref={formPopupRef}
          closeFormPopup={handleCloseFormPopup}
          submitFormPopup={handleSubmitFormPopup}
          openConfirmationPopup={handleOpenConfirmationPopup}
        />
        <Box>
          <DeletePopup
            rowId={rowId}
            ref={deletePopupRef}
            closeDeletePopup={() =>
              deletePopupRef.current.open(false, 'procedures',rowId)
            }
            deleteConfirmation={handleDeleteConfirmation}
          />
        </Box>
        <Confirmationpopup
          ref={confirmationPopupRef}
          confirmationDone={handleConfirmationDone}
        />
        <SuccessPopup ref={successPopupRef} />
        <DeleteSuccessPopup ref={deleteSuccessPopupRef}/>
      </Box>
    </PrivateRoute>
  );
}
