import React from 'react';
import PrivateRoute from '../../components/PrivateRoute';
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
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { visuallyHidden } from '@mui/utils';
import { Pagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import search from '../../assets/images/search.svg';
import '../../assets/styles/procedure.scss';
import bin from '../../assets/images/bin.svg';
import share from '../../assets/images/Share.svg';
import assign from '../../assets/images/share-arrow.svg';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import { AssetsHeaders } from '../../utils/data';
import {
  Filter1Outlined,
  FilterAlt,
  FilterAltRounded,
  FilterCenterFocusOutlined,
  FilterListOffOutlined,
  FilterListOutlined,
  MoreVertOutlined,
  SearchOutlined,
} from '@mui/icons-material';
import AssignPopup from '../../components/AssignPopup';
import AddPeoplePopup from '../../components/AddPeoplePopup';
import DeletePopup from '../../components/DeletePopup';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Popover from '@mui/material/Popover';

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
  deleteRecord,
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

  const [answer, setAnswer] = React.useState('');
  const Placeholder = ({ children }: any) => {
    return <div>{children}</div>;
  };

  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <AssignPopup open={openAssign} close={() => setAssignOpen(false)} />
      <Grid
        container
        sx={{ mb: 2 }}
        alignItems="center"
        justifyContent={isTableHeaderVisible ? 'space-between' : 'flex-end'}
      >
        <Grid item xs={12} sm={12} md={12} lg={6} xl={9}>
          {isTableHeaderVisible && (
            <Box className="search-action">
              <Button
                type="submit"
                onClick={() => handleDeCheckboxChange(false)}
                variant="contained"
                className="close-actions"
              >
                <CloseIcon sx={{ fontSize: '20px', marginRight: '5px' }} />
                Close actions
              </Button>
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    sx={{
                      color: '#9F9F9F',
                      '&.Mui-checked': {
                        color: '#FFC60B',
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
                style={{ marginBottom: '0rem' }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    sx={{
                      color: '#9F9F9F',
                      '&.Mui-checked': {
                        color: '#FFC60B',
                      },
                      '& .MuiFormControlLabel-label': {
                        fontSize: '10px', // Adjust the font size as per your preference
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
                style={{ marginBottom: '0rem' }}
              />
              {/* <DeletePopup open={isDeletePopupOpen} close={handleCloseDeletePopup} /> */}
              <Button className="delete-actions" onClick={deleteRecord}>
                <img src={bin} alt="Delete" className="Image-actions" />
                Delete
              </Button>
              <Button className="delete-actions" onClick={handleAssignClick}>
                <img src={assign} alt="assign" className="Image-actions" />
                Assign
              </Button>

              <AddPeoplePopup
                open={runsOpen}
                close={() => setRunsOpen(false)}
              />

              <Button className="delete-actions" onClick={handleAssignClick}>
                <img src={share} alt="Share" className="Image-actions" />
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
                  'aria-labelledby': 'basic-button',
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
          )}
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
              style={{ margin: '0px' }}
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
            <Box sx={{ position: 'relative' }}>
              <Button
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
                style={{
                  boxShadow: 'none',
                  backgroundColor: '#fff',
                  padding: '0px',
                  justifyContent: 'flex-end',
                }}
              >
                <FilterAltRounded style={{ fontSize: '30px' }} />
              </Button>
              <Popover
                className="filter-dropdown"
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
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
                    <Typography>Filters</Typography>
                    <CloseIcon />
                  </Box>
                  <Box sx={{ padding: '1rem' }}>
                    <Box>
                      <Typography>Sort By</Typography>
                      <FormControl
                        style={{ width: '100%', marginTop: '0.5rem' }}
                        size="small"
                      >
                        <Select
                          labelId="table-select-label"
                          id="table-select"
                          value={answer}
                          displayEmpty
                          IconComponent={ExpandMoreOutlinedIcon}
                          onChange={(event) => setAnswer(event.target.value)}
                          renderValue={
                            answer !== ''
                              ? undefined
                              : () => <Placeholder>Sort By</Placeholder>
                          }
                        >
                          <MenuItem value={'1'}>Ascending</MenuItem>
                          <MenuItem value={'2'}>Descending</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ my: 1.5 }}>
                      <Typography>Status</Typography>
                      <FormControl
                        style={{ width: '100%', marginTop: '0.5rem' }}
                        size="small"
                      >
                        <Select
                          labelId="table-select-label"
                          id="table-select"
                          value={answer}
                          displayEmpty
                          IconComponent={ExpandMoreOutlinedIcon}
                          onChange={(event) => setAnswer(event.target.value)}
                          renderValue={
                            answer !== ''
                              ? undefined
                              : () => <Placeholder>Status</Placeholder>
                          }
                        >
                          <MenuItem value={'1'}>Active</MenuItem>
                          <MenuItem value={'2'}>Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ my: 1.5 }}>
                      <Typography>Search By</Typography>
                      <FormControl
                        style={{ width: '100%', marginTop: '0.5rem' }}
                        size="small"
                      >
                        <Select
                          labelId="table-select-label"
                          id="table-select"
                          value={answer}
                          displayEmpty
                          IconComponent={ExpandMoreOutlinedIcon}
                          onChange={(event) => setAnswer(event.target.value)}
                          renderValue={
                            answer !== ''
                              ? undefined
                              : () => <Placeholder>Search By</Placeholder>
                          }
                        >
                          <MenuItem value={'1'}>Name</MenuItem>
                          <MenuItem value={'2'}>Department</MenuItem>
                          <MenuItem value={'2'}>Lab</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ my: 1.5 }}>
                      <Typography>Search</Typography>
                      <FormControl
                        style={{ width: '100%', marginTop: '0.5rem' }}
                        size="small"
                      >
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="Search"
                          id="Search"
                          style={{ margin: '0px' }}
                          InputLabelProps={{ shrink: false }}
                          placeholder="Search"
                          size='small'
                        />
                      </FormControl>
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
                    >
                      Show results
                    </Button>
                  </Box>
                </Box>
              </Popover>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
