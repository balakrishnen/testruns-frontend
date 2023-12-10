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
    setFormValues(roleSliceData[0])
    setFormValues1(roleSliceData[1])
    setFormValues2(roleSliceData[2])
  }, [roleSliceData]);

  React.useEffect(() => {
    let payload={
      instituteId:loginUserSliceData?.instituteId
    }
    dispatch(fetchSingleRoleData(payload))
  }, []);
  console.log("roleData",roleData);
  const initailState : any={
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
  }
  const initailState1 : any={
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
  }
  const initailState2 : any={
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
  }
  const [formValues, setFormValues]=React.useState<any>(initailState)
  const [formValues1, setFormValues1]=React.useState(initailState1)
  const [formValues2, setFormValues2]=React.useState(initailState2)

  console.log(formValues);
  
//   const handleChange=(e:any,val:boolean)=>{
// console.log(e.target.name);
// const handleChange = (index, fieldName, nestedFieldName, value) => {
//   setFormValues((prevFormValues) => {
//     const newFormValues = [...prevFormValues];

//     // Get the specific object at the given index
//     const targetObject = newFormValues[index];

//     // Update the nested field with the new value
//     updateNestedField(targetObject, fieldName, nestedFieldName, value);

//     // Create a new array with the updated state
//     return [...newFormValues];
//   });
// };
const handleChange = (category, field, value) => {
  setFormValues((prevValues) => ({
    ...prevValues,
    [category]: {
      ...prevValues[category],
      [field]: value,
    },
  }));
};
const handleChange1 = (category, field, value) => {
  setFormValues1((prevValues) => ({
    ...prevValues,
    [category]: {
      ...prevValues[category],
      [field]: value,
    },
  }));
};
const handleChange2 = (category, field, value) => {
  setFormValues2((prevValues) => ({
    ...prevValues,
    [category]: {
      ...prevValues[category],
      [field]: value,
    },
  }));
};
console.log(formValues);

  const handleSave=()=>{
    console.log('submited');
    var payload={
      _id: loginUserSliceData?._id,
      asset_management:[{
        assign : formValues.asset_management.assign,
        create : formValues.asset_management.create,
        delete : formValues.asset_management.delete,
        edit   : formValues.asset_management.edit,
        share  : formValues.asset_management.share,
        view   : formValues.asset_management.view,
      }],
      procedure_management:[{
        assign : formValues.procedure_management.assign,
        create : formValues.procedure_management.create,
        delete : formValues.procedure_management.delete,
        edit   : formValues.procedure_management.edit,
        share  : formValues.procedure_management.share,
        view   : formValues.procedure_management.view,
      }],
      profile_management:[{
        changePassword : formValues.profile_management.changePassword,
        editContact    : formValues.profile_management.editContact,
        editDepartment : formValues.profile_management.editDepartment,
        editLab   : formValues.profile_management.editLab,
        editOrganisation : formValues.profile_management.editOrganisation,
        editUserName     : formValues.profile_management.editUserName,
      }],
      runs_management:[{
        assign : formValues.runs_management.assign,
        create : formValues.runs_management.create,
        delete : formValues.runs_management.delete,
        edit   : formValues.runs_management.edit,
        share  : formValues.runs_management.share,
        view   : formValues.runs_management.view,
      }],
      role_management:[{
        edit : formValues.role_management.edit
      }],
      user_management:[{
  
        create  : formValues.user_management.create,
        delete  : formValues.user_management.delete,
        edit    : formValues.user_management.edit,
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
                            checked={formValues?.procedure_management.create? true:false}
                            onChange={(e)=>handleChange('procedure_management','create', !formValues?.procedure_management.create)}
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
                            checked={formValues1?.procedure_management.create? true:false}
                            onChange={(e)=>handleChange1('procedure_management','create', !formValues1?.procedure_management.create)}
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
                            checked={formValues2?.procedure_management.create? true:false}
                            onChange={(e)=>handleChange2('procedure_management','create', !formValues2?.procedure_management.create)}
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
                            checked={formValues?.procedure_management.delete}
                            onChange={(e)=>handleChange('procedure_management','delete', !formValues?.procedure_management.delete)}
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
                            checked={formValues1?.procedure_management.delete}
                            onChange={(e)=>handleChange1('procedure_management','delete', !formValues1?.procedure_management.delete)}
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
                            checked={formValues2?.procedure_management.delete}
                            onChange={(e)=>handleChange2('procedure_management','delete', !formValues2?.procedure_management.delete)}
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
                            checked={formValues?.procedure_management.edit}
                            onChange={(e)=>handleChange('procedure_management','edit', !formValues?.procedure_management.edit)}
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
                            checked={formValues1?.procedure_management.edit}
                            onChange={(e)=>handleChange1('procedure_management','edit', !formValues1?.procedure_management.edit)}
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
                            checked={formValues2?.procedure_management.edit}
                            onChange={(e)=>handleChange2('procedure_management','edit', !formValues2?.procedure_management.edit)}
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
                            checked={formValues?.procedure_management.view}
                            onChange={(e)=>handleChange('procedure_management','view', !formValues?.procedure_management.view)}
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
                            checked={formValues1?.procedure_management.view}
                            onChange={(e)=>handleChange1('procedure_management','view', !formValues1?.procedure_management.view)}
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
                            checked={formValues2?.procedure_management.view}
                            onChange={(e)=>handleChange2('procedure_management','view', !formValues2?.procedure_management.view)}
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
                            checked={formValues?.procedure_management.assign}
                            onChange={(e)=>handleChange('procedure_management','assign', !formValues?.procedure_management.assign)}
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
                            checked={formValues1?.procedure_management.assign}
                            onChange={(e)=>handleChange1('procedure_management','assign', !formValues1?.procedure_management.assign)}
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
                        checked={formValues2?.procedure_management.assign}
                        onChange={(e)=>handleChange2('procedure_management','assign', !formValues2?.procedure_management.assign)}
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
                            checked={formValues?.procedure_management.share}
                            onChange={(e)=>handleChange('procedure_management','share', !formValues?.procedure_management.share)}
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
                            checked={formValues1?.procedure_management.share}
                            onChange={(e)=>handleChange1('procedure_management','share', !formValues1?.procedure_management.share)}
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
                            checked={formValues2?.procedure_management.share}
                            onChange={(e)=>handleChange2('procedure_management','share', !formValues2?.procedure_management.share)}
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
                            checked={formValues?.runs_management.create}
                            onChange={(e)=>handleChange("runs_management","create",!formValues?.runs_management.create)}
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
                            checked={formValues?.runs_management.create}
                            onChange={(e)=>handleChange("runs_management","create",!formValues1?.runs_management.create)}
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
                            checked={formValues2?.runs_management.create}
                            onChange={(e)=>handleChange("runs_management","create",!formValues2?.runs_management.create)}
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
                            checked={formValues?.runs_management.delete}
                            onChange={(e)=>handleChange("runs_management","create",!formValues?.runs_management.delete)}
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
                            checked={formValues1?.runs_management.delete}
                            onChange={(e)=>handleChange("runs_management","create",!formValues1?.runs_management.delete)}
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
                            checked={formValues2?.runs_management.delete}
                            onChange={(e)=>handleChange("runs_management","create",!formValues2?.runs_management.delete)}
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
                            checked={formValues?.runs_management.edit}
                            onChange={(e)=>handleChange("runs_management","create",!formValues?.runs_management.edit)}
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
                            checked={formValues1?.runs_management.delete}
                            onChange={(e)=>handleChange("runs_management","create",!formValues1?.runs_management.delete)}
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
                            checked={formValues2?.runs_management.delete}
                            onChange={(e)=>handleChange("runs_management","create",!formValues2?.runs_management.delete)}
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
                            checked={formValues?.runs_management.view}
                            onChange={(e)=>handleChange("runs_management","view",!formValues?.runs_management.view)}
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
                            checked={formValues1?.runs_management.delete}
                            onChange={(e)=>handleChange("runs_management","create",!formValues1?.runs_management.delete)}
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
                            checked={formValues2?.runs_management.delete}
                            onChange={(e)=>handleChange("runs_management","create",!formValues2?.runs_management.delete)}
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
                            checked={formValues?.runs_management.assign}
                            onChange={(e)=>handleChange("runs_management","assign",!formValues?.runs_management.assign)}
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
                            checked={formValues1?.runs_management.assign}
                            onChange={(e)=>handleChange("runs_management","assign",!formValues1?.runs_management.assign)}
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
                            checked={formValues2?.runs_management.assign}
                            onChange={(e)=>handleChange2("runs_management","create",!formValues2?.runs_management.assign)}
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
                            checked={formValues?.runs_management.share}
                            onChange={(e)=>handleChange("runs_management","create",!formValues?.runs_management.share)}
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
                            checked={formValues1?.runs_management.share}
                            onChange={(e)=>handleChange("runs_management","share",!formValues1?.runs_management.share)}
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
                            checked={formValues2?.runs_management.share}
                            onChange={(e)=>handleChange2("runs_management","share",!formValues2?.runs_management.share)}
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

{/* AssetRole Access */}

 <TableRow>
                    <TableCell colSpan={12} className="procedure-profile">
                      <Typography>Assert</Typography>
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
                            checked={formValues?.asset_management.create}
                            onChange={(e)=>handleChange("asset_management","create",!formValues?.asset_management.create)}
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
                            checked={formValues1?.runs_management.create}
                            onChange={(e)=>handleChange1("asset_management","create",!formValues1?.runs_management.create)}
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
                            checked={formValues2?.runs_management.create}
                            onChange={(e)=>handleChange2("asset_management","create",!formValues2?.runs_management.create)}
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
                            checked={formValues?.asset_management.delete}
                            onChange={(e)=>handleChange("asset_management","delete",!formValues?.asset_management.delete)}
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
                            checked={formValues1?.asset_management.delete}
                            onChange={(e)=>handleChange1("asset_management","delete",!formValues1?.asset_management.delete)}
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
                            checked={formValues2?.asset_management.delete}
                            onChange={(e)=>handleChange2("asset_management","delete",!formValues2?.asset_management.delete)}
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
                            checked={formValues?.asset_management.edit}
                            onChange={(e)=>handleChange("asset_management","edit",!formValues?.asset_management.edit)}
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
                            checked={formValues1?.asset_management.edit}
                            onChange={(e)=>handleChange1("asset_management","edit",!formValues1?.asset_management.edit)}
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
                            checked={formValues2?.asset_management.edit}
                            onChange={(e)=>handleChange2("asset_management","edit",!formValues2?.asset_management.edit)}
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
                            checked={formValues?.asset_management.view}
                            onChange={(e)=>handleChange("asset_management","view",!formValues?.asset_management.view)}
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
                            checked={formValues1?.asset_management.view}
                            onChange={(e)=>handleChange1("asset_management","view",!formValues1?.asset_management.view)}
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
                            checked={formValues2?.asset_management.view}
                            onChange={(e)=>handleChange2("asset_management","view",!formValues2?.asset_management.view)}
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
                            checked={formValues?.asset_management.assign}
                            onChange={(e)=>handleChange("asset_management","assign",!formValues?.asset_management.assign)}
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
                            checked={formValues1?.asset_management.assign}
                            onChange={(e)=>handleChange1("asset_management","assign",!formValues1?.asset_management.assign)}
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
                            checked={formValues2?.asset_management.assign}
                            onChange={(e)=>handleChange2("asset_management","assign",!formValues2?.asset_management.assign)}
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
                            checked={formValues?.asset_management.share}
                            onChange={(e)=>handleChange("asset_management","share",!formValues?.asset_management.share)}
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
                            checked={formValues1?.asset_management.share}
                            onChange={(e)=>handleChange1("asset_management","share",!formValues1?.asset_management.share)}
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
                            checked={formValues2?.asset_management.share}
                            onChange={(e)=>handleChange2("asset_management","share",!formValues2?.asset_management.share)}
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
                            checked={formValues?.profile_management.editUserName}
                            onChange={(e)=>handleChange("profile_management","editUserName",!formValues?.profile_management.editUserName)}
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
                            checked={formValues1?.profile_management.editUserName}
                            onChange={(e)=>handleChange1("profile_management","editUserName",!formValues1?.profile_management.editUserName)}
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
                            checked={formValues2?.profile_management.editUserName}
                            onChange={(e)=>handleChange2("profile_management","editUserName",!formValues2?.profile_management.editUserName)}
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
                            checked={formValues?.profile_management.changePassword}
                            onChange={(e)=>handleChange("profile_management","changePassword",!formValues?.profile_management.changePassword)}
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
                            checked={formValues1?.profile_management.changePassword}
                            onChange={(e)=>handleChange1("profile_management","changePassword",!formValues1?.profile_management.changePassword)}
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
                            checked={formValues2?.profile_management.changePassword}
                            onChange={(e)=>handleChange2("profile_management","changePassword",!formValues2?.profile_management.changePassword)}
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
                            checked={formValues?.profile_management.editOrganisation}
                            onChange={(e)=>handleChange("profile_management","editOrganisation",!formValues?.profile_management.editOrganisation)}
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
                            checked={formValues1?.profile_management.editOrganisation}
                            onChange={(e)=>handleChange1("profile_management","editOrganisation",!formValues1?.profile_management.editOrganisation)}
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
                            checked={formValues2?.profile_management.editOrganisation}
                            onChange={(e)=>handleChange2("profile_management","editOrganisation",!formValues2?.profile_management.editOrganisation)}
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
                            checked={formValues?.profile_management.editDepartment}
                            onChange={(e)=>handleChange("profile_management","editDepartment",!formValues?.profile_management.editDepartment)}
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
                            checked={formValues1?.profile_management.editDepartment}
                            onChange={(e)=>handleChange1("profile_management","editDepartment",!formValues1?.profile_management.editDepartment)}
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
                            checked={formValues2?.profile_management.editDepartment}
                            onChange={(e)=>handleChange2("profile_management","editDepartment",!formValues2?.profile_management.editDepartment)}
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
                            checked={formValues?.profile_management.editLab}
                            onChange={(e)=>handleChange("profile_management","editLab",!formValues?.profile_management.editLab)}
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
                            checked={formValues1?.profile_management.editLab}
                            onChange={(e)=>handleChange1("profile_management","editLab",!formValues1?.profile_management.editLab)}
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
                            checked={formValues2?.profile_management.editLab}
                            onChange={(e)=>handleChange2("profile_management","editLab",!formValues2?.profile_management.editLab)}
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
                            checked={formValues?.profile_management.editContact}
                            onChange={(e)=>handleChange("profile_management","editContact",!formValues?.profile_management.editContact)}
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
                            checked={formValues1?.profile_management.editContact}
                            onChange={(e)=>handleChange1("profile_management","editContact",!formValues1?.profile_management.editContact)}
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
                            checked={formValues2?.profile_management.editContact}
                            onChange={(e)=>handleChange2("profile_management","editContact",!formValues2?.profile_management.editContact)}
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
                            checked={formValues?.role_management.edit}
                            onChange={(e)=>handleChange("role_management","edit",!formValues?.role_management.edit)}
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
                            checked={formValues1?.role_management.edit}
                            onChange={(e)=>handleChange1("role_management","edit",!formValues1?.role_management.edit)}
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
                            checked={formValues2?.role_management.edit}
                            onChange={(e)=>handleChange2("role_management","edit",!formValues2?.role_management.edit)}
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
                            checked={formValues?.user_management.create}
                            onChange={(e)=>handleChange("user_management","create",!formValues?.user_management.create)}
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
                            checked={formValues1?.user_management.create}
                            onChange={(e)=>handleChange1("user_management","create",!formValues1?.user_management.create)}
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
                            checked={formValues2?.user_management.create}
                            onChange={(e)=>handleChange2("user_management","create",!formValues2?.user_management.create)}
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
                            checked={formValues?.user_management.delete}
                            onChange={(e)=>handleChange("user_management","delete",!formValues?.user_management.delete)}
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
                            checked={formValues1?.user_management.delete}
                            onChange={(e)=>handleChange1("user_management","delete",!formValues1?.user_management.delete)}
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
                            checked={formValues2?.user_management.delete}
                            onChange={(e)=>handleChange("user_management","delete",!formValues2?.user_management.delete)}
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
                            checked={formValues?.user_management.edit}
                            onChange={(e)=>handleChange("user_management","edit",!formValues?.user_management.edit)}
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
                            checked={formValues1?.user_management.edit}
                            onChange={(e)=>handleChange1("user_management","edit",!formValues1?.user_management.edit)}
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
                            checked={formValues2?.user_management.edit}
                            onChange={(e)=>handleChange2("user_management","edit",!formValues2?.user_management.edit)}
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