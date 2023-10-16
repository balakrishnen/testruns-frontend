import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
  InputLabel,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../../assets/styles/App.scss";
import { Filter } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import search from "../../assets/images/search.svg";
import Autocomplete from "@mui/material/Autocomplete";

type Order = "asc" | "desc";

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  columns: object;
}

interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

function TableHeader(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort, columns }: any = props;
  // const createSortHandler =
  //   (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
  //     onRequestSort(event, property);
  //   };

  const [answer, setAnswer] = React.useState<any>({});
  {
    console.log("headCell", props);
  }

  const Placeholder = ({ children }: any) => {
    return <div style={{ fontSize: "12px" }}>{children}</div>;
  };
  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell: any, index: number) => (
          <>
            {headCell.is_show && (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? "center" : "left"}
                padding={headCell.disablePadding ? "normal" : "normal"}
                sortDirection={orderBy === headCell.id ? order : false}
                draggable={headCell.draggable}
                // colSpan={index === 0 ? 4 : 1}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  // onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
                <TableRow sx={{ width: "100%", display: "block" }}>
                  <TableCell
                    padding="none"
                    sx={{ border: "0px", width: "100%", display: "block" }}
                    colSpan={headCell.colSpan}
                  >
                    <Box sx={{ width: "100%", display: "flex" }}>
                      {headCell.filters.map((filter: any, index: any) => {
                        if (filter.type === "select") {
                          return (
                            <FormControl key={index}>
                              <Select
                                style={{ width: "140px" }}
                                labelId="table-select-label"
                                id="table-select"
                                value={answer[filter.id] || ""}
                                displayEmpty
                                IconComponent={ExpandMoreOutlinedIcon}
                                onChange={(event) => {
                                  setAnswer({
                                    ...answer,
                                    [filter.id]: event.target.value,
                                  });
                                }}
                                renderValue={(selected) =>
                                  selected ? (
                                    selected
                                  ) : (
                                    <Placeholder>{filter.label}</Placeholder>
                                  )
                                }
                              >
                                {filter.options &&
                                  filter.options.map(
                                    (option: any, index: any) => (
                                      <MenuItem
                                        key={index}
                                        value={option.value}
                                      >
                                        {option.value}
                                      </MenuItem>
                                    )
                                  )}
                              </Select>
                            </FormControl>
                          );
                        } else if (filter.type === "textfield") {
                          return (
                            <FormControl key={index}>
                              <TextField
                                style={{ width: "160px" }}
                                required
                                fullWidth
                                name="Search"
                                id="Search"
                                placeholder={filter.label}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <img src={search} />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </FormControl>
                          );
                        } else if (filter.type === "autocomplete") {
                          return (
                            <FormControl key={index}>
                              <Autocomplete
                                options={filter.options}
                                getOptionLabel={(option: any) => option.label}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    required
                                    fullWidth
                                    name="Search"
                                    placeholder={filter.label}
                                    InputProps={{
                                      ...params.InputProps,
                                      endAdornment: (
                                        <>
                                          <img
                                            style={{
                                              marginRight: "-31px",
                                              marginTop: "-5px",
                                            }}
                                            src={search}
                                          />
                                        </>
                                      ),
                                    }}
                                    inputProps={{
                                      ...params.inputProps,
                                      style: {
                                        padding: "0px 0 5px",
                                        margin: -3,
                                        alignSelf: "start",
                                        display: "block",
                                        minWidth: 0,
                                        width: "100%",
                                        fontSize: "12px",
                                      },
                                    }}
                                  />
                                )}
                              />
                            </FormControl>
                          );
                        } else if (filter.type === "date") {
                          return (
                            <FormControl key={index} className="calender-sec">
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker format="DD/MM/YYYY" />
                              </LocalizationProvider>
                            </FormControl>
                          );
                        }
                        return null;
                      })}
                    </Box>
                  </TableCell>
                </TableRow>
              </TableCell>
            )}
          </>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
