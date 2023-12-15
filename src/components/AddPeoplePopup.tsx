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
import { fetchbulkRunz } from '../api/bulkRunz';
import { toast } from 'react-toastify';

const AddPeople = ({ open, close,runzId,runzRow,typePopup }: any) => {
  const dispatch : any =useDispatch()
  const [allUserData, setAlluserData] = React.useState<any>([]);
  const [userList, setuserList]=React.useState<any>([])
  console.log('userList',userList);
  
  const allUser=  useSelector(
    (state: any) => state.user.data?.find_users, 
  );

  console.log("allUser",allUser);
  
console.log(runzRow);
React.useEffect(()=>{
  setAlluserData(allUserData)
 },[allUserData])

  React.useEffect(()=>{
    dispatch(fetchAllUser())
  },[])
  const userSliceData = useSelector(
    (state: any) => state.userLogin?.data?.verifyToken,
  );

  React.useEffect(()=>{
   setAlluserData(allUser?.map((item: any) => ({
    label: item.email,
    value: item.email,
    id: item._id,
  })))          
  },[allUser])

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
    console.log("newArray",newArray);
    
    const output = newArray.flatMap((aItem:any) =>
    allIds.map((bItem:any) => ({ ...aItem, "userId": bItem , assignedTo: bItem ,}))
    );

    let payload={
      runs:output
    }
   await dispatch(fetchbulkRunz(payload))
   await close()
   setuserList([])
     //  Assigned
   await toast(`Runs ${typePopup === "assign" ? "Assigned" : "shared"} successfully !`, {
    style: {
      background: '#00bf70',
      color: '#fff',
    },
  });
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
                multiple
                style={{borderRadius: '15px !importnant'}}
                limitTags={3}
                options={allUserData !== undefined ? allUserData: []}
                getOptionLabel={(option:any) => option?.value}
                // defaultValue={[
                //   top100Films[13],
                //   top100Films[12],
                //   top100Films[11],
                // ]}
                renderInput={(params) => (
                  <TextField  {...params} placeholder="Assignee" />
                )}
                value={userList}
                onChange={(_, selectedOptions: any) => {setuserList(selectedOptions) }}
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
            disabled={userList.length > 0? false : true}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
export default AddPeople;
