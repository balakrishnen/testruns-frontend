import React from "react";
import { Box, Button, Checkbox, FormControlLabel, InputAdornment, TextField, Typography, } from "@mui/material";
import search from "../../../assets/images/search.svg";
import { withSettingsLayout } from "../../../components/settings";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import { fetchSingleRoleData, fetchUpdateRoleData } from "../../../api/roleApi";

const Roles = () => {

  const [roleData, setRoleData] = React.useState({});
  const dispatch: any = useDispatch();

  const roleSliceData = useSelector(
    (state: any) => state.role.data?.get_role,
  );
  React.useEffect(() => {
    setFormValues(roleSliceData)
  }, [roleSliceData]);

  React.useEffect(() => {
 dispatch(fetchSingleRoleData())
  }, []);
  console.log(roleData);

  const initailState={
    procedure_management:[{
      assign : false,
      create : false,
      delete : false,
      edit   : false,
      share  : false,
      view   : false,
    }],
    profile_management:[{
      changePassword : false,
      editContact    : false,
      editDepartment : false,
      editLab   : false,
      editOrganisation : false,
      editUserName     : false,
    }],
    role_management:[{
      edit : false
    }],
    user_management:[{

      create  : false,
      delete  : false,
      edit    : false,
    }]
  }
  const [formValues, setFormValues]=React.useState(initailState)
  console.log(formValues);
  
  const handleChange=(e:any,val:boolean)=>{
console.log(e.target.name);
setFormValues((prevValues) => ({
  ...prevValues,
  procedure_management: [
    {
      ...prevValues.procedure_management[0],
      [e.target.name]: val,
    },
  ],
}));
  }
  const handleChangeUser=(e:any,val:boolean)=>{
    console.log(e.target.name);
    setFormValues((prevValues) => ({
      ...prevValues,
      user_management: [
        {
          ...prevValues.user_management[0],
          [e.target.name]: val,
        },
      ],
    }));
      }
      const handleChangeProfile=(e:any,val:boolean)=>{
        console.log(e.target.name);
        setFormValues((prevValues) => ({
          ...prevValues,
          profile_management: [
            {
              ...prevValues.profile_management[0],
              [e.target.name]: val,
            },
          ],
        }));
          }
          const handleChangeRole=(e:any,val:boolean)=>{
            console.log(e.target.name);
            setFormValues((prevValues) => ({
              ...prevValues,
              role_management: [
                {
                  ...prevValues.role_management[0],
                  [e.target.name]: val,
                },
              ],
            }));
          }
  const handleSave=()=>{
    console.log('submited');
    var payload={
      _id: '65487c60fe14a40012118efe',
      procedure_management:[{
        assign : formValues.procedure_management[0].assign,
        create : formValues.procedure_management[0].create,
        delete : formValues.procedure_management[0].delete,
        edit   : formValues.procedure_management[0].edit,
        share  : formValues.procedure_management[0].share,
        view   : formValues.procedure_management[0].view,
      }],
      profile_management:[{
        changePassword : formValues.profile_management[0].changePassword,
        editContact    : formValues.profile_management[0].editContact,
        editDepartment : formValues.profile_management[0].editDepartment,
        editLab   : formValues.profile_management[0].editLab,
        editOrganisation : formValues.profile_management[0].editOrganisation,
        editUserName     : formValues.profile_management[0].editUserName,
      }],
      role_management:[{
        edit : formValues.role_management[0].edit
      }],
      user_management:[{
  
        create  : formValues.user_management[0].create,
        delete  : formValues.user_management[0].delete,
        edit    : formValues.user_management[0].edit,
      }]
    }
    dispatch(fetchUpdateRoleData(payload))
    
  }
  return (
    <Box className="role-setting-page">
      <Box
        className="title-main"
        sx={{
          borderBottom: "1px solid #F3F3F3",
          padding: "15px 0px",
          paddingBottom: "8px",
          margin: "0px 24px"
        }}
      >
        <Box>
          <Typography>Role management</Typography>
          <Typography className="sub-text">
            Control the access of actions an user can have.
          </Typography>
        </Box>
        {/* <Box className="search-field-inner setting-search">
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
          />
        </Box> */}
      </Box>
      <Box
        sx={{
          width: "100%", m: 0,
          padding: "24px",
        }}
      >
        <Typography className="Access-control">Access control</Typography>
        <Box>
          <Box className="role-table" sx={{ width: "100%" }}>
            <TableContainer sx={{ height: 515 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Actions</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>Requester</TableCell>
                    <TableCell>Tester</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={12} className="procedure-profile">
                      <Typography>Procedure</Typography>
                      <Typography>Control the actions of users under procedure section.</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>Can create</TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checked={formValues?.procedure_management[0].create}
                            onChange={(e)=>handleChange(e,!formValues?.procedure_management[0].create)}
                            name="create"
                            // checked={true}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>Can delete</TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checked={formValues?.procedure_management[0].delete}
                            onChange={(e)=>handleChange(e,!formValues?.procedure_management[0].delete)}
                            name="delete"
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>Can edit</TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checked={formValues?.procedure_management[0].edit}
                            onChange={(e)=>handleChange(e,!formValues?.procedure_management[0].edit)}
                            name="edit"
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>Can view</TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checked={formValues?.procedure_management[0].view}
                            onChange={(e)=>handleChange(e,!formValues?.procedure_management[0].view)}
                            name="view"
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>Can assign</TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checked={formValues?.procedure_management[0].assign}
                            onChange={(e)=>handleChange(e,!formValues?.procedure_management[0].assign)}
                            name="assign"
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>Can share</TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checked={formValues?.procedure_management[0].share}
                            onChange={(e)=>handleChange(e,!formValues?.procedure_management[0].share)}
                            name="share"
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={12} className="procedure-profile" style={{ paddingTop: '50px' }}>
                      <Typography>Profile</Typography>
                      <Typography>Control the actions of users under profile section.</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>Can edit username</TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checked={formValues?.profile_management[0].editUserName}
                            onChange={(e)=>handleChangeProfile(e,!formValues?.profile_management[0].editUserName)}
                            name="editUserName"
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>Can change password</TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checked={formValues?.profile_management[0].changePassword}
                            onChange={(e)=>handleChangeProfile(e,!formValues?.profile_management[0].changePassword)}
                            name="changePassword"
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>Can edit organisation</TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checked={formValues?.profile_management[0].editOrganisation}
                            onChange={(e)=>handleChangeProfile(e,!formValues?.profile_management[0].editOrganisation)}
                            name="editOrganisation"
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>Can change department</TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checked={formValues?.profile_management[0].editDepartment}
                            onChange={(e)=>handleChangeProfile(e,!formValues?.profile_management[0].editDepartment)}
                            name="editDepartment"
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>Can change laboratory</TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checked={formValues?.profile_management[0].editLab}
                            onChange={(e)=>handleChangeProfile(e,!formValues?.profile_management[0].editLab)}
                            name="editLab"
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>Can change contact info</TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checked={formValues?.profile_management[0].editContact}
                            onChange={(e)=>handleChangeProfile(e,!formValues?.profile_management[0].editContact)}
                            name="editContact"
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={12} className="procedure-profile" style={{ paddingTop: '50px' }}>
                      <Typography>Role Management</Typography>
                      <Typography>Control the actions of users under role management section.</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>Can edit access control</TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checked={formValues?.role_management[0].edit}
                            onChange={(e)=>handleChangeRole(e,!formValues?.role_management[0].edit)}
                            name="edit"
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={12} className="procedure-profile" style={{ paddingTop: '50px' }}>
                      <Typography>User Management</Typography>
                      <Typography>Control the actions of users under user management section.</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>Can add user</TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checked={formValues?.user_management[0].create}
                            onChange={(e)=>handleChangeUser(e,!formValues?.user_management[0].create)}
                            name="create"
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>Can delete user </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checked={formValues?.user_management[0].delete}
                            onChange={(e)=>handleChangeUser(e,!formValues?.user_management[0].delete)}
                            name="delete"
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>Can edit user</TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checked={formValues?.user_management[0].edit}
                            onChange={(e)=>handleChangeUser(e,!formValues?.user_management[0].edit)}
                            name="edit"
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                    <TableCell>
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
                              width: '30px',
                              height: '30px'
                            }}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                        label=""
                        className="common-radio"
                        style={{ margin: "0rem" }}
                      />
                    </TableCell>
                  </TableRow>

                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
      <Box className="edit-details" sx={{ p: 2 }}>
        <Button type="submit" variant="contained" className="cancel-btn">
          Reset
        </Button>
        <Button type="submit" variant="contained" className="add-btn" onClick={()=>handleSave()}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

const RolesPage = withSettingsLayout(Roles);

export default RolesPage;