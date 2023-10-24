import React from "react";
import PrivateRoute from "../../components/PrivateRoute";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
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
import search from "../../assets/images/search.svg";
import "../../assets/styles/procedure.scss";
import bin from "../../assets/images/bin.svg";
import share from "../../assets/images/Share.svg";
import assign from "../../assets/images/share-arrow.svg";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import { AssetsHeaders } from "../../utils/data";
import { MoreVertOutlined } from "@mui/icons-material";
import AssignPopup from "../../components/AssignPopup";
import AddPeoplePopup from "../../components/AddPeoplePopup";
import DeletePopup from '../../components/DeletePopup';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function TableFilters({
  columns,
  handleMenuCheckboxChange,
  handleDeCheckboxChange,
  handledAllSelected,
  isDeselectAllChecked,
  isselectAllChecked,
  isTableHeaderVisible, 
  closeTableHeader,
  deleteRecord
}: any) {
  const [personName, setPersonName] = React.useState<any>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [options, setOptions] = React.useState(columns);
  const [openAssign, setAssignOpen] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [runsOpen, setRunsOpen] = React.useState(false);
  const handleAssignClick = () => {
    setRunsOpen(true);
  };
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);

  // const handleDeleteIconClick = () => {
  //   setIsDeletePopupOpen(true);
  // };

  const handleCloseDeletePopup = () => {
    setIsDeletePopupOpen(false);
  };
  

  
  return (
    <>
      <AssignPopup open={openAssign} close={() => setAssignOpen(false)} />
      {isTableHeaderVisible && (
      <Grid container spacing={2} sx={{ mt: 0 }}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={9}>
          <Box className="search-action">
            <Button type="submit" onClick={()=>handleDeCheckboxChange(false)} variant="contained" className="close-actions">
              <CloseIcon sx={{ mr: 1 }} />
              Close actions
            </Button>
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  sx={{
                    color: "#9F9F9F",
                    "&.Mui-checked": {
                      color: "#FFC60B",
                    },
                  }}
                  checked={isselectAllChecked}
                  checkedIcon={<CheckCircleOutlineOutlinedIcon />}
                  icon={<HighlightOffOutlinedIcon />}
                  onChange={(event) => handledAllSelected(event, true)}
                />
              }
              label="Select all"
              className="common-checkbox"
              style={{ marginBottom: "0rem" }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  sx={{
                    color: "#9F9F9F",
                    "&.Mui-checked": {
                      color: "#FFC60B",
                    },
                  }}
                  checkedIcon={<CheckCircleOutlineOutlinedIcon />}
                  icon={<HighlightOffOutlinedIcon />}
                  onChange={(event) => handleDeCheckboxChange(event, false)}
                  checked={isDeselectAllChecked}
                />
              }
              label="Deselect all"
              className="common-checkbox"
              style={{ marginBottom: "0rem" }}
            />
            {/* <DeletePopup open={isDeletePopupOpen} close={handleCloseDeletePopup} /> */}
            <Button
              className="delete-actions"
              onClick={deleteRecord}
            >
              <img src={bin} alt="Delete" />
              Delete
            </Button>
            <Button className="delete-actions" onClick={handleAssignClick}>
        <img src={assign} alt="assign" />
        Assign
      </Button>
      
        <AddPeoplePopup open={runsOpen} close={() => setRunsOpen(false)} />
      
        <Button className="delete-actions" onClick={handleAssignClick}>
              <img src={share} alt="Share" />
              Share
            </Button>
            <IconButton onClick={handleClick}>
              <MoreVertOutlined />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {columns.map((item: any, index: number) => (
                <MenuItem key={item.id} value={item.label}>
                  <Checkbox
                    checked={item.is_show ? true : false}
                    onChange={(e) => handleMenuCheckboxChange(e, index)}
                  />
                  <ListItemText primary={item.label} />
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={3}>
          <Box className="filter-search">
            <FormControl>
              {/* <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              IconComponent={ExpandMoreOutlinedIcon}
              placeholder="Select"
            >
              {AssetsHeaders.map((name) => (
                <MenuItem key={name.id} value={name.label}>
                  <Checkbox checked={name.is_show} />
                  <ListItemText primary={name.label} />
                </MenuItem>
              ))}
            </Select> */}
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              name="Search"
              id="Search"
              InputLabelProps={{ shrink: false }}
              placeholder="Search"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img src={search} />
                  </InputAdornment>
                ),
              }}
              className="search-field-inner"
            />
          </Box>
        </Grid>
      </Grid>
      )}
    </>
  );
}
