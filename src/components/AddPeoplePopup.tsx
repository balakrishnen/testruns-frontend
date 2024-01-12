import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloseRed from '../assets/images/close-red.svg';
import search from '../assets/images/search.svg';
import { CloseOutlined } from '@mui/icons-material';
import { fetchAllUser } from '../api/userAPI';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchShareRunz, fetchbulkRunz } from '../api/bulkRunz';
import { toast } from 'react-toastify';

const AddPeople = ({ open, close,runzId,runzRow,typePopup ,formValue,handleAssign}: any) => {
  const dispatch : any =useDispatch()
  const [allUserData, setAlluserData] = React.useState<any>([]);
  const [userList, setuserList]=React.useState<any>([])
  console.log('userList',userList);
  
  // const allUser=  useSelector(
  //   (state: any) => state.user.data?.find_users, 
  // );

  
console.log("formValue",formValue);
React.useEffect(()=>{
  setAlluserData(allUserData)
 },[allUserData])

 React.useEffect(() => {
  if (typePopup === 'assign' || typePopup==="share") {
    
    dispatch(fetchAllUser()).then((res)=>{
      setAlluserData(res?.find_users.map((item: any) => ({
        label: item.email,
        value: item.email,
        id: item._id,
      })))  
    }).catch((err)=>{
      console.log(err);
    })
  
  }
}, [typePopup]);
  const userSliceData = useSelector(
    (state: any) => state.userLogin?.data?.verifyToken,
  );
console.log(userList,"userList");

  // console.log("newArray",allUser);
  const handleSave=async()=>{
    console.log("save",runzRow);
    const allIds = userList.map((item:any) => item.id);
    const newArray = runzRow?.map((item:any) => ({ 
      objective: item?.objective,
      shared: typePopup=='share'?true:false,
      procedureId: item?.procedureId._id==undefined?item?.procedureId[0]?._id :item?.procedureId._id,
      departmentId: item?.departmentId.map(((item:any)=>item?._id)) ,
      laboratoryId:  item?.laboratoryId.map(((item:any)=>item?._id)) ,
      // assignedTo: item?.assignedTo ,
      assignedBy: userSliceData?._id ,
      dueDate: item?.dueDate ,
      status: item?.status ,
    }));
    
    
console.log("procedureId",formValue?.procedureId[0]==undefined?formValue?.procedureId:formValue?.procedureId[0],formValue?.procedureId._id==undefined?formValue?.procedureId[0]==undefined?formValue?.procedureId:formValue?.procedureId[0]?._id :formValue?.procedureId._id,);

    if(typePopup!=='share'){
      //single asign
      handleAssign(userList)
      // for multiple assign

    //   if(newArray!==undefined){
    //   const output = newArray?.flatMap((aItem:any) =>
    //   allIds.map((bItem:any) => ({ ...aItem, "userId": bItem , assignedTo: bItem ,}))
    //   );
  
    //   let payload={
    //     runs:output
    //   }
    //   await dispatch(fetchbulkRunz(payload))
    // }
    // else{
    //   console.log(formValue?.departmentId?.map(((item:any)=>item?.id)));
      
    //   let output=[{
    //     objective: formValue?.objective,
    //   shared: typePopup=='share'?true:false,
    //   procedureId: formValue?.procedureId,
    //   departmentId: formValue?.departmentId?.map(((item:any)=>item?.id)) ,
    //   laboratoryId:  formValue?.laboratoryId?.map(((item:any)=>item?.id)) ,
    //   // assignedTo:  ,
    //   assignedBy: userSliceData?._id ,
    //   dueDate: formValue?.dueDate ,
    //   status: "Created" ,
    //   }]
    //   const output1 = output?.flatMap((aItem:any) =>
    //   allIds.map((bItem:any) => ({ ...aItem, "userId": bItem , assignedTo: bItem ,}))
    //   );
    //   let payload={
    //     runs:output1
    //   }
    //   console.log(payload);
      
    //   await dispatch(fetchbulkRunz(payload))
    // }
    }
    else{
      const allIds = userList.map((item:any) => item.id);
      const newArray = runzRow?.map((item:any) => item._id)
      console.log(allIds);
      
      let payload1={
        shareUserId: allIds, 
        runId: newArray,
      }
       await dispatch(fetchShareRunz(payload1))
       await toast(`Runs ${typePopup === "assign" ? "Assigned" : "shared"} successfully !`, {
        style: {
          background: '#00bf70',
          color: '#fff',
        },
      });
    }
   await close()
   setuserList([])
     //  Assigned
  
}
  
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={close}
      aria-labelledby="confirmation-title"
      aria-describedby="confirmation"
      fullWidth
      maxWidth="md"
      className="popup-outer"
      disableScrollLock={ true }      
    >
      <Box className="popup-section">
        <Box className="title-popup">
          <Typography>Add people</Typography>
          <CloseIcon onClick={close} />
        </Box>
        <Box>
          <Typography className="follow-people">
            You have selected following people.
          </Typography>
          <Box
            style={{
              borderRadius: '20px',
              border: '1px solid #9F9F9F',
              padding: '30px',
              margin: '15px 0px'
            }}
          >
            <Box>
              {userList?.map((item:any, index:any) => (
                <Chip key={index} label={item.value} sx={{ m: 0.5 }} />
              ))}
            </Box>
            <Box sx={{ mt: 3 }}>
               <Autocomplete
              // multiple={false}
                style={{borderRadius: '15px !importnant'}}
                limitTags={3}
                options={allUserData !== undefined ? allUserData: []}
                getOptionLabel={(option:any) => option?.value}
                // disableCloseOnSelect
                // defaultValue={[
                //   top100Films[13],
                //   top100Films[12],
                //   top100Films[11],
                // ]}
                renderInput={(params) => (
                  <TextField  {...params} placeholder="Assignee" />
                )}
                value={userList[0]}
                onChange={(_, selectedOptions: any) => {setuserList([selectedOptions]) }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'block', sm: 'flex' },
            justifyContent: 'flex-end',
            mt: 3,
          }}
        >
          <Button
            type="submit"
            onClick={()=>{close(),setuserList([])}}
            variant="contained"
            className="cancel-btn"
            
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={()=>handleSave()}
            variant="contained"
            className="add-btn"
            disabled={userList?.length > 0? false : true}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
export default AddPeople;
