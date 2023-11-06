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
  TextField,Grid,
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
import { ProceduresRowData } from "../../modals/Procedures.modal";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartmentData } from "../../api/departmentAPI";
import { fetchLabData } from "../../api/labAPI";
import { log } from "console";
import { fetchAssetsData } from '../../api/assetsAPI';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type Order = 'asc' | 'desc';

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ProceduresRowData) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  columns: []
  filters: (answer : React.MouseEvent<unknown>) => void;
}
export default function TableHeader(props: any) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, columns, filters } =
    props;
  const createSortHandler =
    (property: keyof ProceduresRowData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const [answer, setAnswer] = React.useState<any>([]);
  const [filterProps,setFilterProps]=React.useState<any>({})
  {
    console.log("headCell", answer);
  }
  const [departmentData, setDepartmentData] = React.useState([]);
  const [labData, setLabData] = React.useState([]);


  const Placeholder = ({ children }: any) => {
    return <div style={{ fontSize: "12px" }}>{children}</div>;
  };
  const dispatch: any = useDispatch();

  // React.useEffect(() => {
  // //  if(Object.keys(answer).length !== 0){
  // //   console.log('answer',answer);
  //   filters()
  // //  }
  //   // filters(answer)
  // },[answer])

  const departmentSliceData = useSelector(
    (state: any) => state.department.data?.get_all_departments,
  );
  const labSliceData = useSelector(
    (state: any) => state.lab.data?.get_all_labs,
  );
  React.useEffect(() => {
    setDepartmentData(departmentSliceData?.map((item:any) => ({
      label: item.name,
      value: item._id
    })))
    setLabData(labSliceData?.map((item:any) => ({
      label: item.name,
      value: item._id
    })))
  }, [departmentSliceData,labSliceData])

  console.log(departmentData);

console.log(labData);

  React.useEffect(() => {
    dispatch(fetchDepartmentData());
    dispatch(fetchLabData());
  }, []);
  const departments: any = [];
  return (
    <TableHead>
      <TableRow>

        {columns.map((headCell: any) => (
          <>
            {headCell.is_show && (<TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
                              // className="table-search"
                              name={filter.id}
                              IconComponent={ExpandMoreOutlinedIcon}
                              onChange={(event) => {
                                setAnswer({
                                  ...answer,
                                  [event.target.name]: event.target.value,
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
                              required
                              fullWidth
                              className="table-search"
                              name={filter.id}
                              value={answer[filter.id] || ""}
                              id="Search"
                              placeholder={filter.label}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <img src={search} />
                                  </InputAdornment>
                                ),
                              }}
                              onChange={(event) => {filters(),
                                setAnswer({
                                  ...answer,
                                  [event.target.name]: event.target.value,
                                });
                                setFilterProps({
                                    ...answer,
                                    [filter.id]: event.target.value,
                                  });
                              }}
                            />
                          </FormControl>
                        );
                      } else if (filter.type === "autocomplete") {
                        // console.log(assetsData!==undefined && assetsData.map((item:any)=>item.name));
                        // console.log(filter.options);
                        
                        
                        return (
                          // <Grid item xs={12} sm={12} md={12} lg={12} className="multi-selection">
                           <Box key={index}>
                            <Autocomplete
                            multiple
                            limitTags={1}
                            id="Search"
                            className="multiselect-chip multi-selection"
                            classes={{
                              option: 'menuItem',
                              listbox: 'menuList',
                              noOptions: 'noOptions',
                              groupLabel: 'headerItem',
                            }}
                           options={filter.options}
                            disableCloseOnSelect
                            getOptionLabel={(option:any) => option.label}
                            renderOption={(props, option, { selected }) => (
                              <li {...props}>
                                <Checkbox
                                  style={{ marginRight: 0 }}
                                  checked={selected}
                                />
                                {option.label}
                              </li>
                            )}
                            renderInput={(params) => <TextField {...params} />}
                            // fullWidth
                            placeholder="Department"
                            size="small"
                            onChange={(e, f) => {
                              f.forEach((element) =>
                                departments.push(element.id),
                              );
                            }}
                            
                          />
                          </Box> 
                          // </Grid>
                        );
                      } else if (filter.type === "date") {
                        return (
                          <FormControl key={index} className="calender-sec theadCalender">
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
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
            </TableCell>)}    </>
        ))}
      </TableRow>
    </TableHead>
  );
}