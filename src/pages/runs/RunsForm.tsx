/* eslint-disable react/display-name */
import React from 'react'
import Dialog from "@mui/material/Dialog";
import { Box, Typography, Grid, TextField, FormControl, Checkbox,
    Autocomplete, Select, MenuItem, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import Avatars from "../../assets/images/Avatars.svg";
import AddIcon from '@mui/icons-material/Add';
import AddPeoplePopup from "../../components/AddPeoplePopup";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { DepartmentList ,LaboratoryList} from '../../utils/data';
import { fetchDepartmentData } from '../../api/departmentAPI';
import { fetchLabData } from '../../api/labAPI';

const validationSchema = Yup.object().shape({
    procedureId: Yup.string().notRequired(),
    created_on: Yup.string().notRequired(),
    dept: Yup.array().notRequired(),
    lab: Yup.array().notRequired(),
    procedure_name: Yup.string().notRequired(),
    testObjective: Yup.string().notRequired(),
  });

const RunsForm = React.forwardRef(({ closeFormPopup, openConfirmationPopup, submitFormPopup }: any, ref) => {
    // const [openDlg2Dialog, setDialog2Open] = React.useState(false);
    // const [openSuccess, setSuccessOpen] = React.useState(false);
    const [answers, setAnswers] = React.useState("");
    const [departmentData, setDepartmentData] = React.useState([]);
    const [labData, setLabData] = React.useState([]);
    const dispatch: any = useDispatch();

    const Placeholder = ({ children }: any) => {
        return <div>{children}</div>;
    };
    const [runsOpen, setRunsOpen] = React.useState(false);
    const [runCreate, setRunsCreate] = React.useState(false)
    React.useImperativeHandle(ref, () => ({
        open(state: any) {
            setRunsCreate(state);
        },
    }));
    const departments: any = [];
    const laboratory: any = [];
    const checkCredentials = (values: any) => {
        return true;
      };
    const onSubmit = (values: any) => {
      const isMatch = checkCredentials(values);
      if(isMatch){
        submitFormPopup()
      }
 
    };
    const formik = useFormik({
        initialValues: {
            procedureId: '',
            created_on: new Date(),
          dept: [],
          lab: [],
          procedure_name: '',
          testObjective: '',
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
          value: item.name
        })))
        setLabData(labSliceData?.map((item:any) => ({
          label: item.name,
          value: item.name
        })))
      }, [departmentSliceData,labSliceData])
    
      console.log(departmentData);
    
    console.log(DepartmentList);
    
      React.useEffect(() => {
        dispatch(fetchDepartmentData());
        dispatch(fetchLabData());
      }, []);
    
    // const handleAddButtonClick = () => {
    //     setSuccessOpen(true);
    //     closeFormPopup(false) 
    //     setTimeout(() => {
    //       setSuccessOpen(false);
    //     }, 3000);
    //   };
    //   const handleConfirmationYes = () => {
    //     setDialog2Open(false);
    //     closeFormPopup(false)
    //   };

    return (
        <div>
            {/* <Confirmationpopup
              ref={confirmationPopupRef}
              confirmationDone={handleConfirmationDone}
                // open={openDlg2Dialog}
                // close={() => setDialog2Open(false)}
                // handleConfirmationYes={handleConfirmationYes}
            />
            <Successpopup open={openSuccess} type={"Runs"} close={() => setSuccessOpen(false)} /> */}
            <Dialog
                open={runCreate}
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
                        <Typography>Create new Runs</Typography>
                        <CloseIcon onClick={() => closeFormPopup(false)} />
                    </Box>
                    <Box>
                        <Grid container spacing={2} className='asset-popup calender-sec'>
                            <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingRight: { sm: '1rem !important' } }}>
                                <Box style={{ position: "relative" }}>
                                    <label style={{ display: 'block' }}>Procedure ID (autogenerated)</label>
                                    <TextField
                                        margin="normal"
                                        // required
                                        fullWidth
                                        id="name"
                                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                                        name="procedureId"
                                        autoComplete="name"
                                        autoFocus
                                        InputLabelProps={{ shrink: false }}
                                        placeholder="ID023659ADN"
                                        className="bg-gray-input"
                                        size="small"
                                        value={formik.values.procedureId}
                                        error={formik.touched.procedureId && Boolean(formik.errors.procedureId)}
                                      />
                                      {formik.touched.procedureId && formik.errors.procedureId && (
                                        <Typography className="error-field">
                                          {formik.errors.procedureId}
                                        </Typography>
                                      )}
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingLeft: { sm: '1rem !important' }, paddingTop: { xs: '0rem !important', sm: '1rem !important' } }}>
                                <Box className="bg-gray-input" style={{ position: "relative" }}>
                                    <label style={{ display: 'block' }}>Created on</label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker format="DD/MM/YYYY"  />
                                    </LocalizationProvider>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className='asset-popup'>
                            <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingRight: { sm: '1rem !important' } }}>
                                <Box style={{ position: "relative" }}>
                                    <label style={{ display: 'block' }}>Department</label>
                                    <Autocomplete
                            multiple
                            id="department"
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
                                departments.push(element.id),
                              );
                              formik.setFieldValue('department', departments);
                            }}
                            
                          />
                          {formik.touched.dept &&
                            formik.errors.dept && (
                              <Typography className="error-field">
                                {formik.errors.dept}
                              </Typography>
                            )}
                        </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingLeft: { sm: '1rem !important' }, paddingTop: { xs: '0rem !important', sm: '1rem !important' } }}>
                                <Box style={{ position: "relative" }}>
                                    <label style={{ display: 'block' }}>Laboratory</label>
                                    <Autocomplete
                            multiple
                            id="laboratory"
                            options={labData!==undefined ?labData:[] }
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
                            placeholder="Laboratory"
                            size="medium"
                            onChange={(e, f) => {
                              f.forEach((element) =>
                                laboratory.push(element.id),
                              );
                              formik.setFieldValue('laboratory', laboratory);
                            }}
                          />
                          {formik.touched.lab &&
                            formik.errors.lab && (
                              <Typography className="error-field">
                                {formik.errors.lab}
                              </Typography>
                            )}
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className='asset-popup'>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Box style={{ position: "relative" }}>
                                    <label style={{ display: 'block' }}>Procedure name<span style={{ color: '#E2445C' }}>*</span></label>
                                    {/* <FormControl sx={{ width: "100%" }}> */}
                                    <TextField
                                        margin="normal"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        size="small"
                                        // required
                                        fullWidth
                                        id="name"
                                        name="procedure_name"
                                        autoComplete="name"
                                        autoFocus
                                        InputLabelProps={{ shrink: false }}
                                        placeholder="The simple pendulum"
                                        value={formik.values.procedure_name}
                                        error={
                                          formik.touched.procedure_name && Boolean(formik.errors.procedure_name)
                                        }
                                      />
                                       {formik.touched.procedure_name && formik.errors.procedure_name && (
                                        <Typography className="error-field">
                                          {formik.errors.procedure_name}
                                        </Typography>
                                      )}
                                    {/* </FormControl> */}
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className='asset-popup'>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Box style={{ position: "relative" }}>
                                    <label style={{ display: 'block' }}>Test objective</label>
                                    <TextField
                                    size="small"
                                        margin="normal"
                                        // required
                                        fullWidth
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        id="name"
                                        name="testObjective"
                                        autoComplete="name"
                                        autoFocus
                                        InputLabelProps={{ shrink: false }}
                                        placeholder="Test objective"
                                        value={formik.values.testObjective}
                                        error={formik.touched.testObjective && Boolean(formik.errors.testObjective)}
                                      />
                                      {formik.touched.testObjective && formik.errors.testObjective && (
                                        <Typography className="error-field">
                                          {formik.errors.testObjective}
                                        </Typography>
                                      )}
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className='asset-popup calender-sec'>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Box style={{ position: "relative" }}>
                                    <label style={{ display: 'block' }}>Set due date</label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker format="DD/MM/YYYY" />
                                    </LocalizationProvider>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className='asset-popup'>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Box>
                                    <label style={{ display: 'block', marginBottom: '0.8rem' }}>Assign to</label>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={Avatars} alt='Avatars' />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            className="avatar-add"
                                            onClick={() => {
                                                setRunsOpen(true);
                                            }}
                                        >
                                            <AddIcon sx={{ mr: 1 }} />
                                            Add
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ display: { xs: "block", sm: 'flex' }, justifyContent: 'flex-end', mt: 3 }}>
                        <Button type="submit" variant="contained" onClick={() => { openConfirmationPopup(true) }} className="cancel-btn">Cancel</Button>
                        <Button type="submit" variant="contained" className="add-btn">Create</Button>
                    </Box>
                </Box>
                </form>
            </Dialog>
            <Box>
                <AddPeoplePopup
                    open={runsOpen}
                    close={() => setRunsOpen(false)}
                />
            </Box>
        </div>
    )
}
);
export default RunsForm;