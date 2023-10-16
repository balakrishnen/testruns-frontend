import React from "react";
import PrivateRoute from "../../components/PrivateRoute";
import TableFilters from "../../components/table/TableFilters";
import TablePagination from "../../components/table/TablePagination";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
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
import search from "../../../assets/images/search.svg";
import RunzForm from "./RunzForm";
import { DepartmentList, LaboratoryList, RunzHeaders } from "../../utils/data";
import TableHeader from "../../components/table/TableHeader";
import { RunzRowData } from "../../modals/runz.modal";
import {
  handleCheckboxChange,
  handleDeCheckboxChange,
  handledAllSelected,
} from "../../utils/commonServices";
import { navigate } from "gatsby";
import Confirmationpopup from "../../components/ConfirmationPopup";
import SuccessPopup from "../../components/SuccessPopup";

// table start
function createData(
  is_checked: boolean,
  id: string,
  objective: string,
  runNumber: string,
  availability: string,
  departmentId: string,
  laboratoryId: string,
  extraData: string,
  isActive: number,
  dueDate: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string
): RunzRowData {
  return {
    is_checked,
    id,
    objective,
    runNumber,
    availability,
    departmentId,
    laboratoryId,
    extraData,
    isActive,
    dueDate,
    createdAt,
    updatedAt,
    deletedAt,
  };
}

const rows = [
  createData(
    false,
    "1",
    "Procedure Title",
    "1003",
    "AVAILABLE",
    "DEPT-1003",
    "LAB-1003",
    "",
    1,
    "02/10/2023",
    "02/10/2023",
    "02/10/2023",
    "02/10/2023"
  ),
  createData(
    false,
    "2",
    "Procedure Title",
    "1004",
    "AVAILABLE",
    "DEPT-1003",
    "LAB-1003",
    "",
    1,
    "02/10/2023",
    "02/10/2023",
    "02/10/2023",
    "02/10/2023"
  ),
  createData(
    false,
    "3",
    "Procedure Title",
    "1005",
    "AVAILABLE",
    "DEPT-1003",
    "LAB-1003",
    "AVAILABLE",
    1,
    "02/10/2023",
    "02/10/2023",
    "02/10/2023",
    "02/10/2023"
  ),
  createData(
    false,
    "4",
    "Procedure Title",
    "1006",
    "AVAILABLE",
    "DEPT-1003",
    "LAB-1003",
    "",
    1,
    "02/10/2023",
    "02/10/2023",
    "02/10/2023",
    "02/10/2023"
  ),
  createData(
    false,
    "5",
    "Procedure Title",
    "1007",
    "AVAILABLE",
    "DEPT-1003",
    "LAB-1003",
    "",
    1,
    "02/10/2023",
    "02/10/2023",
    "02/10/2023",
    "02/10/2023"
  ),
];

export default function Runz() {
  const [runzOpen, setRunzOpen] = React.useState(false);
  const [headers, setHeaders] = React.useState<any>(RunzHeaders);
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

 const handleChange = (event:any, id:any) => {
    handleCheckboxChange(
      Rows,
      setSelectedRows,
      setIsDeselectAllChecked,
      setIsselectAllChecked,
      setTableHeaderVisible,
    )(event, id); 
  };
  
  const handleCloseFormPopup = (state: any) => {
    formPopupRef.current.open(state);
  };

  const handleConfirmationDone = (state: any) => {
    if (state === 1) {
      formPopupRef.current.open(false);
    }
    confirmationPopupRef.current.open(false);
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

  const handlePageChange = (even: any, page: number) => {
    setCurrentPage(page);
  };

  const handleCloseTableHeader = (status: boolean) => {
    setTableHeaderVisible(status);
    const updatedRows = Rows.map((row:any) => ({
      ...row,
      is_checked: false,
    }));
    setSelectedRows(updatedRows);
    setIsDeselectAllChecked(true); 
    setIsselectAllChecked(false);
  };
  
  
  return (
    <PrivateRoute>
      <Box className="main-padding runz-page">
        <Box className="title-main">
          <Typography>Runz</Typography>
          <Button
            type="submit"
            variant="contained"
            onClick={() => {
              formPopupRef.current.open(true);
            }}
          >
            <AddIcon sx={{ mr: 1 }} />
            Create runz
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
        />

        <Box className="table-outer" sx={{ width: "100%" }}>
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
                      sx={{ cursor: "pointer" }}
                    >
                      {headers[0].is_show && (
                        <TableCell scope="row">
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ mt: 0, mr: 1 }}>
                            <Checkbox
                                color="primary"
                                checked={row.is_checked}
                                onChange={(event) =>
                                  handleChange(event, row.id)
                                }
                              />
                            </Box>
                            <Box
                              onClick={() =>
                                navigate(`/runz/details/${row.runNumber}`)
                              }
                            >
                              {row.runNumber}
                            </Box>
                            {/* <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box>
                              <img src={image_holder} alt="no_image" />
                            </Box>
                            <Box sx={{ ml: 2 }}>
                              <Box>{row.assetNumber}</Box>
                            </Box>
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
                          className={
                            row.isActive === 1
                              ? "active-select td-select"
                              : "inactive-select td-select"
                          }
                          value={row.isActive}
                          displayEmpty
                          IconComponent={ExpandMoreOutlinedIcon}
                        >
                          <MenuItem value={1}>Fully Working</MenuItem>
                          <MenuItem value={2}>Issues</MenuItem>
                        </Select>
                      </TableCell>
                      )}
                      {headers[7].is_show && (
                        <TableCell>
                          <Select
                            className={
                              row.availability === "AVAILABLE"
                                ? "active-select td-select"
                                : "inactive-select td-select"
                            }
                            value={row.availability}
                            displayEmpty
                            IconComponent={ExpandMoreOutlinedIcon}
                          >
                            <MenuItem value={"AVAILABLE"}>Available</MenuItem>
                            <MenuItem value={"NOTAVAILABLE"}>
                              Not available
                            </MenuItem>
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
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            currentPageData={Data}
            Rows={Rows}
          />
        </Box>
        <Box>
          <RunzForm
          ref={formPopupRef}
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
      </Box>
    </PrivateRoute>
  );
}
