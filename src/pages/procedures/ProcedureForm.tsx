import React from 'react'
import Dialog from "@mui/material/Dialog";
import { Box, Typography, Grid, TextField,Checkbox,
    Autocomplete, FormControl, Select, MenuItem, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LaboratoryList, DepartmentList } from '../../utils/data';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDepartmentData } from '../../api/departmentAPI';
import { fetchLabData } from '../../api/labAPI';
import { postProcedureData } from '../../api/procedureAPI';
// import Confirmationpopup from "../../components/ConfirmationPopup";
// import Successpopup from "../../components/SuccessPopup";
const validationSchema = Yup.object().shape({
    procedure_id: Yup.string().notRequired(),
    created_on: Yup.string().notRequired(),
    dept: Yup.array().notRequired(),
    lab: Yup.array().notRequired(),
    procedure_name: Yup.string().notRequired(),
  });

const ProcedureForm= React.forwardRef(({ open, close,closeFormPopup, openConfirmationPopup, submitFormPopup }: any,ref) =>{
    // const [openDlg2Dialog, setDialog2Open] = React.useState(false);
    // const [openSuccess, setSuccessOpen] = React.useState(false);
    const [openForm , setFormOpen]=React.useState(false)
    const departments: any = [];
    const laboratory: any = [];
    const [departmentData, setDepartmentData] = React.useState([]);
    const [labData, setLabData] = React.useState([]);
    const dispatch: any = useDispatch();
    // const handleAddButtonClick = () => {
    //     setSuccessOpen(true);
    //     closeFormPopup();
    //     setTimeout(() => {
    //       setSuccessOpen(false);
    //     }, 2000);
    //   };
    //   const handleConfirmationYes = () => {
    //     setDialog2Open(false);
    //     closeFormPopup();
    //   };
    const checkCredentials = (values: any) => {
        return true;
    }
    const onSubmit = (values: any) => {
      console.log(values);
      
        const isMatch = checkCredentials(values);
        // const procedures: any = {
        //   name: 'Stenography2',
        //   assectId: 'ASSET_1002',
        //   departmentId: '653b80a0301e33001265a64a',
        //   laboratoryId: '653b7fd4301e33001265a646',
        //   userId: 'USER_1001',
        //   procedureDetials:"Stenography2"
        
        // };
        if(isMatch){
         dispatch(postProcedureData(values))
        }
   
      };
    React.useImperativeHandle(ref, () => ({
        open(state: any) {
            setFormOpen(state);
        },
      }));

      const formik = useFormik({
        initialValues: {
          name:"",
          procedureDetials: '',
          departmentId: [],
          laboratoryId: [],
          assectId: 'ASSE-1000',
          userId: 'USER_1001',
         
        },
        validationSchema: validationSchema,
        onSubmit: onSubmit,
      });

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
    
    console.log(laboratory);
   
      React.useEffect(() => {
        dispatch(fetchDepartmentData());
        dispatch(fetchLabData());
      }, []);
    
    return (
        <div>
            {/* <Confirmationpopup
                open={openDlg2Dialog}
                close={() => setDialog2Open(false)}
                handleConfirmationYes={handleConfirmationYes}
            />
            <Successpopup open={openSuccess} type={"Procedures"} close={() => setSuccessOpen(false)} /> */}
            <Dialog
                open={openForm}
                keepMounted
                onClose={() => closeFormPopup(false)}
                aria-labelledby="add-new-asset-title"
                aria-describedby="add-new-asset"
                fullWidth
                maxWidth="md"
                className="popup-outer"
            >
                <form onSubmit={formik.handleSubmit}>
                <Box className="popup-section">
                    <Box className="title-popup">
                        <Typography>Create new Procedure</Typography>
                        <CloseIcon onClick={() => closeFormPopup(false)} />
                    </Box>
                  
                    <Box>
                        <Grid container spacing={2} className='asset-popup calender-sec'>
                            <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingRight: { sm: '1rem !important' } }}>
                                <Box>
                                    <label style={{ display: 'block' }}>Procedure ID (autogenerated)</label>
                                    <TextField
                                        margin="normal"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        // required
                                        fullWidth
                                        id="name"
                                        name="procedureDetials"
                                        autoComplete="name"
                                        autoFocus
                                        InputLabelProps={{ shrink: false }}
                                        placeholder="ID023659ADN"
                                        className="bg-gray-input"
                                        value={formik.values.procedureDetials}
                                        size="small"
                                        error={
                                          formik.touched.procedureDetials && Boolean(formik.errors.procedureDetials)
                                        }
                                      />
                                      {formik.touched.procedureDetials && formik.errors.procedureDetials && (
                                        <Typography className="error-field">
                                          {formik.errors.procedureDetials}
                                        </Typography>
                                      )}
                                 
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingLeft: { sm: '1rem !important' }, paddingTop: { xs: '0rem !important', sm: '1rem !important' } }}>
                                <Box className="bg-gray-input">
                                    <label style={{ display: 'block' }}>Created on</label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker format="DD/MM/YYYY" />
                                    </LocalizationProvider>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className='asset-popup multi-selection'>
                            <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingRight: { sm: '1rem !important' } }}>
                                <Box>
                                    <label style={{ display: 'block' }}>Department</label>
                                    <Autocomplete
                            multiple
                            id="departmentId"
                            options={departmentData!==undefined ? departmentData:[]}
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
                            fullWidth
                            placeholder="Department"
                            size="medium"
                            onChange={(e, f) => {
                              f.forEach((element) =>
                                departments.push(element.value),
                              );
                              formik.setFieldValue('departmentId', departments);
                            }}
                            
                          />
                                      {formik.touched.departmentId && formik.errors.departmentId && (
                                        <Typography className="error-field">
                                          {formik.errors.departmentId}
                                        </Typography>
                                      )}
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingLeft: { sm: '1rem !important' }, paddingTop: { xs: '0rem !important', sm: '1rem !important' } }}>
                                <Box>
                                    <label style={{ display: 'block' }}>Laboratory</label>
                                    <Autocomplete
                            multiple
                            id="laboratoryId"
                            // name='laboratoryId'
                            options={labData!==undefined ?labData:[]}
                            disableCloseOnSelect
                            getOptionLabel={(option:any) => option.label}
                            renderOption={(props, option, { selected }) => (
                              <li {...props}>
                                <Checkbox
                                 name='laboratoryId'
                                  style={{ marginRight: 0 }}
                                  checked={selected}
                                />
                                {option.label}
                              </li>
                            )}
                            renderInput={(params) => <TextField {...params} />}
                            fullWidth
                            placeholder="Laboratory"
                            size="medium"
                           
                            onChange={(e, f) => {
                              f.forEach((element) =>
                                laboratory.push(element.value)
                              );
                              formik.setFieldValue('laboratoryId', laboratory);
                            }}
                          />
                                      {formik.touched.laboratoryId && formik.errors.laboratoryId && (
                                        <Typography className="error-field">
                                          {formik.errors.laboratoryId}
                                        </Typography>
                                      )}
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className='asset-popup'>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Box>
                                    <label style={{ display: 'block' }}>Procedure name<span style={{ color: '#E2445C' }}>*</span></label>
                                    <TextField
                                        margin="normal"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        size="small"
                                        // required
                                        fullWidth
                                        id="name"
                                        name="name"
                                        autoComplete="name"
                                        autoFocus
                                        InputLabelProps={{ shrink: false }}
                                        placeholder="The simple pendulum"
                                        value={formik.values.name}
                                        error={
                                          formik.touched.name && Boolean(formik.errors.name)
                                        }
                                      />
                                      {formik.touched.name && formik.errors.name && (
                                        <Typography className="error-field">
                                          {formik.errors.name}
                                        </Typography>
                                      )}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ display: { xs: "block", sm: 'flex' }, justifyContent: 'flex-end', mt: 3 }}>
                        <Button  variant="contained" onClick={() => openConfirmationPopup(true)} className="cancel-btn">Cancel</Button>
                        <Button type="submit" variant="contained"  className="add-btn">Create</Button>
                    </Box>
                  
                   
                </Box>
                </form>
            </Dialog>
        </div>
    )
}
)
export default ProcedureForm