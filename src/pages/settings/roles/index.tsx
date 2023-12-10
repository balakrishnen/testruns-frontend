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
    (state: any) => state.role.data?.find_roles,
  );
  const loginUserSliceData=  useSelector(
    (state: any) => state.userLogin?.data?.verifyToken, 
  );
  console.log("loginUserSliceData",loginUserSliceData);
  
  console.log(roleSliceData);
 
  React.useEffect(() => {
    setFormValues(roleSliceData)
  }, [roleSliceData]);

  React.useEffect(() => {
    let payload={
      instituteId:loginUserSliceData?.instituteId
    }
    dispatch(fetchSingleRoleData(payload))
  }, []);
  console.log("roleData",roleData);
  const initailState : any=[{
    "procedure_management":{
      assign : false,
      create : false,
      delete : false,
      edit   : false,
      share  : false,
      view   : false,
    },
    "asset_management":{
      assign : false,
      create : false,
      delete : false,
      edit   : false,
      share  : false,
      view   : false,
    },
    "profile_management":{
      changePassword : false,
      editContact    : false,
      editDepartment : false,
      editLab   : false,
      editOrganisation : false,
      editUserName     : false,
    },
    "role_management":{
      edit : false
    },
    "runs_management":{
      assign : false,
      create : false,
      delete : false,
      edit   : false,
      share  : false,
      view   : false,
    },
    "user_management":{

      create  : false,
      delete  : false,
      edit    : false,
      view    :false
    },
  },{
    "procedure_management":{
      assign : false,
      create : false,
      delete : false,
      edit   : false,
      share  : false,
      view   : false,
    },
    "asset_management":{
      assign : false,
      create : false,
      delete : false,
      edit   : false,
      share  : false,
      view   : false,
    },
    "profile_management":{
      changePassword : false,
      editContact    : false,
      editDepartment : false,
      editLab   : false,
      editOrganisation : false,
      editUserName     : false,
    },
    "role_management":{
      edit : false
    },
    "runs_management":{
      assign : false,
      create : false,
      delete : false,
      edit   : false,
      share  : false,
      view   : false,
    },
    "user_management":{

      create  : false,
      delete  : false,
      edit    : false,
      view    :false
    },
  },{
    "procedure_management":{
      assign : false,
      create : false,
      delete : false,
      edit   : false,
      share  : false,
      view   : false,
    },
    "asset_management":{
      assign : false,
      create : false,
      delete : false,
      edit   : false,
      share  : false,
      view   : false,
    },
    "profile_management":{
      changePassword : false,
      editContact    : false,
      editDepartment : false,
      editLab   : false,
      editOrganisation : false,
      editUserName     : false,
    },
    "role_management":{
      edit : false
    },
    "runs_management":{
      assign : false,
      create : false,
      delete : false,
      edit   : false,
      share  : false,
      view   : false,
    },
    "user_management":{

      create  : false,
      delete  : false,
      edit    : false,
      view    :false
    },
  }]
  const [formValues, setFormValues]=React.useState(initailState)
  console.log(formValues);
  
  const handleChange=(e:any,val:boolean)=>{
console.log(e.target.name);
// setFormValues((prevValues: { procedure_management: any[]; }) => ({
//   ...prevValues,
//   procedure_management: [
//     {
//       ...prevValues.procedure_management[0],
//       [e.target.name]: val,
//     },
//   ],
// }));
  }
  const handleChangeUser=(e:any,val:boolean)=>{
    console.log(e.target.name);
    // setFormValues((prevValues: { user_management: any[]; }) => ({
    //   ...prevValues,
    //   user_management: [
    //     {
    //       ...prevValues.user_management[0],
    //       [e.target.name]: val,
    //     },
    //   ],
    // }));
      }
      const handleChangeProfile=(e:any,val:boolean)=>{
        console.log(e.target.name);
        // setFormValues((prevValues: { profile_management: any[]; }) => ({
        //   ...prevValues,
        //   profile_management: [
        //     {
        //       ...prevValues.profile_management[0],
        //       [e.target.name]: val,
        //     },
        //   ],
        // }));
          }
          const handleChangeRole=(e:any,val:boolean)=>{
            console.log(e.target.name);
            // setFormValues((prevValues: { role_management: any[]; }) => ({
            //   ...prevValues,
            //   role_management: [
            //     {
            //       ...prevValues.role_management[0],
            //       [e.target.name]: val,
            //     },
            //   ],
            // }));
          }
  const handleSave=()=>{
    console.log('submited');
    var payload={
      _id: loginUserSliceData?._id,
      asset_management:[{
        assign : formValues[0].asset_management.assign,
        create : formValues[0].asset_management.create,
        delete : formValues[0].asset_management.delete,
        edit   : formValues[0].asset_management.edit,
        share  : formValues[0].asset_management.share,
        view   : formValues[0].asset_management.view,
      }],
      procedure_management:[{
        assign : formValues[0].procedure_management.assign,
        create : formValues[0].procedure_management.create,
        delete : formValues[0].procedure_management.delete,
        edit   : formValues[0].procedure_management.edit,
        share  : formValues[0].procedure_management.share,
        view   : formValues[0].procedure_management.view,
      }],
      profile_management:[{
        changePassword : formValues[0].profile_management.changePassword,
        editContact    : formValues[0].profile_management.editContact,
        editDepartment : formValues[0].profile_management.editDepartment,
        editLab   : formValues[0].profile_management.editLab,
        editOrganisation : formValues[0].profile_management.editOrganisation,
        editUserName     : formValues[0].profile_management.editUserName,
      }],
      runs_management:[{
        assign : formValues[0].runs_management.assign,
        create : formValues[0].runs_management.create,
        delete : formValues[0].runs_management.delete,
        edit   : formValues[0].runs_management.edit,
        share  : formValues[0].runs_management.share,
        view   : formValues[0].runs_management.view,
      }],
      role_management:[{
        edit : formValues[0].role_management.edit
      }],
      user_management:[{
  
        create  : formValues[0].user_management.create,
        delete  : formValues[0].user_management.delete,
        edit    : formValues[0].user_management.edit,
      }]
    }
    // dispatch(fetchUpdateRoleData(payload))
    
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
                            checked={formValues[0]?.procedure_management.create? true:false}
                            onChange={(e)=>handleChange(e,!formValues[0]?.procedure_management.create)}
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
                            checked={formValues[1]?.procedure_management.create? true:false}
                            onChange={(e)=>handleChange(e,!formValues[1]?.procedure_management.create)}
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
                            checked={formValues[2]?.procedure_management.create? true:false}
                            onChange={(e)=>handleChange(e,!formValues[2]?.procedure_management.create)}
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
                            checked={formValues[0]?.procedure_management.delete}
                            onChange={(e)=>handleChange(e,!formValues[0]?.procedure_management.delete)}
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
                            checked={formValues[1]?.procedure_management.delete}
                            onChange={(e)=>handleChange(e,!formValues[1]?.procedure_management.delete)}
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
                            checked={formValues[2]?.procedure_management.delete}
                            onChange={(e)=>handleChange(e,!formValues[2]?.procedure_management.delete)}
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
                            checked={formValues[0]?.procedure_management.edit}
                            onChange={(e)=>handleChange(e,!formValues[0]?.procedure_management.edit)}
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
                            checked={formValues[1]?.procedure_management.edit}
                            onChange={(e)=>handleChange(e,!formValues[1]?.procedure_management.edit)}
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
                            checked={formValues[2]?.procedure_management.edit}
                            onChange={(e)=>handleChange(e,!formValues[2]?.procedure_management.edit)}
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
                            checked={formValues[0]?.procedure_management.view}
                            onChange={(e)=>handleChange(e,!formValues[0]?.procedure_management.view)}
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
                            checked={formValues[1]?.procedure_management.view}
                            onChange={(e)=>handleChange(e,!formValues[1]?.procedure_management.view)}
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
                            checked={formValues[2]?.procedure_management.view}
                            onChange={(e)=>handleChange(e,!formValues[2]?.procedure_management.view)}
                            checkedIcon={< RadioButtonCheckedOutlinedIcon />}
                            icon={< RadioButtonUncheckedOutlinedIcon />}
                          />
                        }
                       
                        name="view"
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
                            checked={formValues[0]?.procedure_management.assign}
                            onChange={(e)=>handleChange(e,!formValues[0]?.procedure_management.assign)}
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
                            checked={formValues[1]?.procedure_management.assign}
                            onChange={(e)=>handleChange(e,!formValues[1]?.procedure_management.assign)}
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
                        checked={formValues[2]?.procedure_management.assign}
                        onChange={(e)=>handleChange(e,!formValues[2]?.procedure_management.assign)}
                        name="assign"
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
                            checked={formValues[0]?.procedure_management.share}
                            onChange={(e)=>handleChange(e,!formValues[0]?.procedure_management.share)}
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
                            checked={formValues[1]?.procedure_management.assign}
                            onChange={(e)=>handleChange(e,!formValues[1]?.procedure_management.assign)}
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
                            checked={formValues[2]?.procedure_management.assign}
                            onChange={(e)=>handleChange(e,!formValues[2]?.procedure_management.assign)}
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
                  </TableRow>
{/* RunsRole Access  */}

<TableRow>
                    <TableCell colSpan={12} className="procedure-profile">
                      <Typography>Runs</Typography>
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
                            checked={formValues[0]?.runs_management.create}
                            onChange={(e)=>handleChange(e,!formValues[0]?.runs_management.create)}
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
                            checked={formValues[1]?.runs_management.create}
                            onChange={(e)=>handleChange(e,!formValues[1]?.runs_management.create)}
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
                            checked={formValues[2]?.runs_management.create}
                            onChange={(e)=>handleChange(e,!formValues[2]?.runs_management.create)}
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
                            checked={formValues[0]?.runs_management.delete}
                            onChange={(e)=>handleChange(e,!formValues[0]?.runs_management.delete)}
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
                            checked={formValues[1]?.runs_management.delete}
                            onChange={(e)=>handleChange(e,!formValues[1]?.runs_management.delete)}
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
                            checked={formValues[2]?.runs_management.delete}
                            onChange={(e)=>handleChange(e,!formValues[2]?.runs_management.delete)}
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
                            checked={formValues[0]?.runs_management.edit}
                            onChange={(e)=>handleChange(e,!formValues[0]?.runs_management.edit)}
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
                            checked={formValues[1]?.runs_management.delete}
                            onChange={(e)=>handleChange(e,!formValues[1]?.runs_management.delete)}
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
                            checked={formValues[2]?.runs_management.delete}
                            onChange={(e)=>handleChange(e,!formValues[2]?.runs_management.delete)}
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
                            checked={formValues[0]?.runs_management.view}
                            onChange={(e)=>handleChange(e,!formValues[0]?.runs_management.view)}
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
                            checked={formValues[1]?.runs_management.delete}
                            onChange={(e)=>handleChange(e,!formValues[1]?.runs_management.delete)}
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
                            checked={formValues[2]?.runs_management.delete}
                            onChange={(e)=>handleChange(e,!formValues[2]?.runs_management.delete)}
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
                            checked={formValues[0]?.runs_management.assign}
                            onChange={(e)=>handleChange(e,!formValues[0]?.runs_management.assign)}
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
                            checked={formValues[1]?.runs_management.delete}
                            onChange={(e)=>handleChange(e,!formValues[1]?.runs_management.delete)}
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
                            checked={formValues[2]?.runs_management.delete}
                            onChange={(e)=>handleChange(e,!formValues[2]?.runs_management.delete)}
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
                            checked={formValues[0]?.runs_management.share}
                            onChange={(e)=>handleChange(e,!formValues[0]?.runs_management.share)}
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
                            checked={formValues[1]?.runs_management.delete}
                            onChange={(e)=>handleChange(e,!formValues[1]?.runs_management.delete)}
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
                            checked={formValues[2]?.runs_management.delete}
                            onChange={(e)=>handleChange(e,!formValues[2]?.runs_management.delete)}
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
                  </TableRow>

{/* AssetRole Access */}

<TableRow>
                    <TableCell colSpan={12} className="procedure-profile">
                      <Typography>Assets</Typography>
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
                            checked={formValues[0]?.asset_management.create}
                            onChange={(e)=>handleChange(e,!formValues[0]?.asset_management.create)}
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
                            checked={formValues[1]?.runs_management.delete}
                            onChange={(e)=>handleChange(e,!formValues[1]?.runs_management.delete)}
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
                            checked={formValues[2]?.runs_management.delete}
                            onChange={(e)=>handleChange(e,!formValues[2]?.runs_management.delete)}
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
                            checked={formValues[0]?.asset_management.delete}
                            onChange={(e)=>handleChange(e,!formValues[0]?.asset_management.delete)}
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
                            checked={formValues[1]?.asset_management.delete}
                            onChange={(e)=>handleChange(e,!formValues[1]?.asset_management.delete)}
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
                            checked={formValues[2]?.asset_management.delete}
                            onChange={(e)=>handleChange(e,!formValues[2]?.asset_management.delete)}
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
                            checked={formValues[0]?.asset_management.edit}
                            onChange={(e)=>handleChange(e,!formValues[0]?.asset_management.edit)}
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
                            checked={formValues[1]?.asset_management.edit}
                            onChange={(e)=>handleChange(e,!formValues[1]?.asset_management.edit)}
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
                            checked={formValues[2]?.asset_management.edit}
                            onChange={(e)=>handleChange(e,!formValues[2]?.asset_management.edit)}
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
                            checked={formValues[0]?.asset_management.view}
                            onChange={(e)=>handleChange(e,!formValues[0]?.asset_management.view)}
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
                            checked={formValues[1]?.asset_management.view}
                            onChange={(e)=>handleChange(e,!formValues[1]?.asset_management.view)}
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
                            checked={formValues[2]?.asset_management.view}
                            onChange={(e)=>handleChange(e,!formValues[2]?.asset_management.view)}
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
                            checked={formValues[0]?.asset_management.assign}
                            onChange={(e)=>handleChange(e,!formValues[0]?.asset_management.assign)}
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
                            checked={formValues[1]?.asset_management.assign}
                            onChange={(e)=>handleChange(e,!formValues[1]?.asset_management.assign)}
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
                            checked={formValues[2]?.asset_management.assign}
                            onChange={(e)=>handleChange(e,!formValues[2]?.asset_management.assign)}
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
                            checked={formValues[0]?.asset_management.share}
                            onChange={(e)=>handleChange(e,!formValues[0]?.asset_management.share)}
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
                            checked={formValues[1]?.asset_management.share}
                            onChange={(e)=>handleChange(e,!formValues[1]?.asset_management.share)}
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
                            checked={formValues[2]?.asset_management.share}
                            onChange={(e)=>handleChange(e,!formValues[2]?.asset_management.share)}
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
                            checked={formValues[0]?.profile_management.editUserName}
                            onChange={(e)=>handleChangeProfile(e,!formValues[0]?.profile_management.editUserName)}
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
                            checked={formValues[1]?.profile_management.editUserName}
                            onChange={(e)=>handleChangeProfile(e,!formValues[1]?.profile_management.editUserName)}
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
                            checked={formValues[2]?.profile_management.editUserName}
                            onChange={(e)=>handleChangeProfile(e,!formValues[2]?.profile_management.editUserName)}
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
                            checked={formValues[0]?.profile_management.changePassword}
                            onChange={(e)=>handleChangeProfile(e,!formValues[0]?.profile_management.changePassword)}
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
                            checked={formValues[1]?.profile_management.changePassword}
                            onChange={(e)=>handleChangeProfile(e,!formValues[1]?.profile_management.changePassword)}
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
                            checked={formValues[2]?.profile_management.changePassword}
                            onChange={(e)=>handleChangeProfile(e,!formValues[2]?.profile_management.changePassword)}
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
                            checked={formValues[0]?.profile_management.editOrganisation}
                            onChange={(e)=>handleChangeProfile(e,!formValues[0]?.profile_management.editOrganisation)}
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
                            checked={formValues[1]?.profile_management.editOrganisation}
                            onChange={(e)=>handleChangeProfile(e,!formValues[1]?.profile_management.editOrganisation)}
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
                            checked={formValues[2]?.profile_management.editOrganisation}
                            onChange={(e)=>handleChangeProfile(e,!formValues[2]?.profile_management.editOrganisation)}
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
                            checked={formValues[0]?.profile_management.editDepartment}
                            onChange={(e)=>handleChangeProfile(e,!formValues[0]?.profile_management.editDepartment)}
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
                            checked={formValues[1]?.profile_management.editDepartment}
                            onChange={(e)=>handleChangeProfile(e,!formValues[1]?.profile_management.editDepartment)}
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
                            checked={formValues[2]?.profile_management.editDepartment}
                            onChange={(e)=>handleChangeProfile(e,!formValues[2]?.profile_management.editDepartment)}
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
                            checked={formValues[0]?.profile_management.editLab}
                            onChange={(e)=>handleChangeProfile(e,!formValues[0]?.profile_management.editLab)}
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
                            checked={formValues[1]?.profile_management.editLab}
                            onChange={(e)=>handleChangeProfile(e,!formValues[1]?.profile_management.editLab)}
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
                            checked={formValues[2]?.profile_management.editLab}
                            onChange={(e)=>handleChangeProfile(e,!formValues[2]?.profile_management.editLab)}
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
                            checked={formValues[0]?.profile_management.editContact}
                            onChange={(e)=>handleChangeProfile(e,!formValues[0]?.profile_management.editContact)}
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
                            checked={formValues[1]?.profile_management.editContact}
                            onChange={(e)=>handleChangeProfile(e,!formValues[1]?.profile_management.editContact)}
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
                            checked={formValues[2]?.profile_management.editContact}
                            onChange={(e)=>handleChangeProfile(e,!formValues[2]?.profile_management.editContact)}
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
                            checked={formValues[0]?.role_management.edit}
                            onChange={(e)=>handleChangeRole(e,!formValues[0]?.role_management.edit)}
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
                            checked={formValues[1]?.role_management.edit}
                            onChange={(e)=>handleChangeRole(e,!formValues[1]?.role_management.edit)}
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
                            checked={formValues[2]?.role_management.edit}
                            onChange={(e)=>handleChangeRole(e,!formValues[2]?.role_management.edit)}
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
                            checked={formValues[0]?.user_management.create}
                            onChange={(e)=>handleChangeUser(e,!formValues[0]?.user_management.create)}
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
                            checked={formValues[1]?.user_management.create}
                            onChange={(e)=>handleChangeUser(e,!formValues[1]?.user_management.create)}
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
                            checked={formValues[2]?.user_management.create}
                            onChange={(e)=>handleChangeUser(e,!formValues[2]?.user_management.create)}
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
                            checked={formValues[0]?.user_management.delete}
                            onChange={(e)=>handleChangeUser(e,!formValues[0]?.user_management.delete)}
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
                            checked={formValues[1]?.user_management.delete}
                            onChange={(e)=>handleChangeUser(e,!formValues[1]?.user_management.delete)}
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
                            checked={formValues[2]?.user_management.delete}
                            onChange={(e)=>handleChangeUser(e,!formValues[2]?.user_management.delete)}
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
                            checked={formValues[0]?.user_management.edit}
                            onChange={(e)=>handleChangeUser(e,!formValues[0]?.user_management.edit)}
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
                            checked={formValues[1]?.user_management.edit}
                            onChange={(e)=>handleChangeUser(e,!formValues[1]?.user_management.edit)}
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
                            checked={formValues[2]?.user_management.edit}
                            onChange={(e)=>handleChangeUser(e,!formValues[2]?.user_management.edit)}
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