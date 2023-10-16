import React from "react";
import PrivateRoute from "../../components/PrivateRoute";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import Table from "@mui/material/Table";
import TablePagination from "../../components/table/TablePagination";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { visuallyHidden } from "@mui/utils";
import { Pagination } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import search from "../../assets/images/search.svg";
import "../../assets/styles/procedure.scss";
import bin from "../../assets/images/bin.svg";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
// import Deleteconfirmationpopup from "../../components/deleteconfirmationpopup";
import ProcedureForm from "./ProcedureForm";
import TableFilters from "../../components/table/TableFilters";
import {
  handleCheckboxChange,
  handleDeCheckboxChange,
  handledAllSelected,
} from "../../utils/commonServices";
import {
  ProceduresHeaders,
  DepartmentList,
  LaboratoryList,
} from "../../utils/data";
import { ProceduresRowData } from "../../modals/Procedures.modal";
import TableHeader from "../../components/table/TableHeader";
import EnhancedTable from "./MuixTable";
import Confirmationpopup from "../../components/ConfirmationPopup";
import SuccessPopup from "../../components/SuccessPopup";

function createData(
  is_checked: boolean,
  id: string,
  name: string,
  procedureNumber: string,
  procedureDetials: string,
  departmentId: string,
  laboratoryID: string,
  assestId: string,
  userID: string,
  extraData: string,
  isActive: number,
  createdAt: string,
  updatedAt: string,
  deletedAt: string
): ProceduresRowData {
  return {
    is_checked,
    id,
    name,
    procedureNumber,
    procedureDetials,
    departmentId,
    laboratoryID,
    assestId,
    userID,
    extraData,
    isActive,
    createdAt,
    updatedAt,
    deletedAt,
  };
}

const rows: any = [
  createData(
    false,
    "1",
    "MD5 Algorithm",
    "ID1001",
    "",
    "DEPT-1001",
    "LAB-1001",
    "",
    "",
    "",
    1,
    "Username",
    "02/10/2023",
    ""
  ),
  createData(
    false,
    "2",
    "MD5 Algorithm",
    "ID1002",
    "",
    "DEPT-1002",
    "LAB-1001",
    "",
    "",
    "",
    1,
    "Username",
    "02/10/2023",
    ""
  ),
  createData(
    false,
    "3",
    "SHA256 Algorithm",
    "ID1002",
    "",
    "DEPT-1003",
    "LAB-1002",
    "",
    "",
    "",
    1,
    "Username",
    "02/10/2023",
    ""
  ),
  createData(
    false,
    "4",
    "Crypto Algorithm",
    "ID1003",
    "",
    "DEPT-1003",
    "LAB-1004",
    "",
    "",
    "",
    2,
    "Username",
    "02/10/2023",
    ""
  ),
  createData(
    false,
    "5",
    "Data Mining",
    "ID1003",
    "",
    "DEPT-1002",
    "LAB-1003",
    "",
    "",
    "",
    2,
    "Username",
    "02/10/2023",
    ""
  ),
];
export default function Procedures() {
  const [openDlg1Dialog, setDialog1Open] = React.useState(false);
  const [headers, setHeaders] = React.useState<any>(ProceduresHeaders);
  const [Rows, setSelectedRows] = React.useState(rows);
  const [isDeselectAllChecked, setIsDeselectAllChecked] = React.useState(false);
  const [isselectAllChecked, setIsselectAllChecked] = React.useState(false);
  const [isTableHeaderVisible, setTableHeaderVisible] = React.useState(false);
  const formPopupRef: any = React.useRef(null);
  const confirmationPopupRef: any = React.useRef(null);
  const successPopupRef: any = React.useRef(null);

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

  const handleChange = (event: any, id: any) => {
    handleCheckboxChange(
      Rows,
      setSelectedRows,
      setIsDeselectAllChecked,
      setIsselectAllChecked,
      setTableHeaderVisible
    )(event, id);
  };

  const handleDeChange = handleDeCheckboxChange(
    isDeselectAllChecked,
    Rows,
    setSelectedRows,
    setIsDeselectAllChecked,
    setIsselectAllChecked,
    setTableHeaderVisible
  );
  const handledAllchange = handledAllSelected(
    isselectAllChecked,
    Rows,
    setSelectedRows,
    setIsDeselectAllChecked,
    setIsselectAllChecked
  );
  const [currentPage, setCurrentPage] = React.useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(Rows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const Data = Rows.slice(startIndex, endIndex);

  // const handleCloseTables = () => {
  //   setDialog1Open(true);
  // };

  const handleCloseFormPopup = (state: any) => {
    formPopupRef.current.open(state);
  };

  const handleSubmitFormPopup = () => {
    formPopupRef.current.open(false);
    successPopupRef.current.open(true, "Field");
    setTimeout(() => {
      successPopupRef.current.open(false, "Field");
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

  return (
    <PrivateRoute>
      <Box className="main-padding">
        <Box className="title-main">
          <Typography>Procedures</Typography>
          <Button type="submit" variant="contained" onClick={()=>formPopupRef.current.open(true)}>
            <AddIcon sx={{ mr: 1 }} />
            Add
          </Button>
        </Box>
        <TableFilters
          columns={headers}
          handleMenuCheckboxChange={handleMenuCheckboxChange}
          handleDeCheckboxChange={handleDeChange}
          handledAllSelected={handledAllchange}
          isDeselectAllChecked={isDeselectAllChecked}
          isselectAllChecked={isselectAllChecked}
        />
        <Box className="table-outer" sx={{ width: "100%" }}>
          <Grid container mt={4}>
            <Grid item lg={6} xs={11} margin="auto">
              <EnhancedTable columns={headers} />
            </Grid>
          </Grid>
          {/* <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              // size={dense ? "small" : "medium"}
            >
              <TableHeader
                numSelected={0}
                onRequestSort={handleRequestSort}
                onSelectAllClick={function (
                  event: React.ChangeEvent<HTMLInputElement>
                ): void {
                  throw new Error("Function not implemented.");
                }}
                order={"asc"}
                orderBy={""}
                rowCount={0}
                columns={headers}
              />

              <TableBody>
                {Data.map((row: any, index: number) => {
                  // const isItemSelected = isSelected(row.name);
                  // const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.name, index)}
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      // selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                     { headers[0].is_show&& <TableCell scope="row">
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box sx={{ mt: 0, mr: 1 }}>
                            <Checkbox
                              color="primary"
                              checked={row.is_checked}
                              onChange={(event) => handleChange(event, row.id)}
                            />
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ ml: 2 }}>
                              <Box>{row.procedureNumber}</Box>
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
                        <TableCell>{getDepartment(row.departmentId)}</TableCell>
                      )}
                      {headers[3].is_show && (
                        <TableCell>{getLaboratory(row.laboratoryID)}</TableCell>
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
          <Box className="show-page">
            <Typography>Showing 09 out of 100</Typography>
            <Pagination
              count={9}
              siblingCount={0}
              boundaryCount={1}
              variant="outlined"
              shape="rounded"
            />
          </Box>*/}
        </Box>
        {/* <Box>
        <Addnew open={openDlg1Dialog} close={() => setDialog1Open(false)} />
      </Box> */}

      <ProcedureForm  ref={formPopupRef}
        closeFormPopup={handleCloseFormPopup}
        submitFormPopup={handleSubmitFormPopup}
        openConfirmationPopup={handleOpenConfirmationPopup} 
         />
       <Confirmationpopup
        ref={confirmationPopupRef}
        confirmationDone={handleConfirmationDone}
      />
      <SuccessPopup ref={successPopupRef} />
      </Box>
    </PrivateRoute>
  );
}
