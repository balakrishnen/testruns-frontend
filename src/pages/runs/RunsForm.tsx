/* eslint-disable react/display-name */
import React from 'react';
import Dialog from '@mui/material/Dialog';
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  Checkbox,
  Autocomplete,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import Avatars from '../../assets/images/Avatars.svg';
import AddIcon from '@mui/icons-material/Add';
import AddPeoplePopup from '../../components/AddPeoplePopup';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  DepartmentList,
  LaboratoryList,
  OrganizationList,
} from '../../utils/data';
import { fetchDepartmentData } from '../../api/departmentAPI';
import { fetchLabData } from '../../api/labAPI';

const validationSchema = Yup.object().shape({
  procedureId: Yup.string().notRequired(),
  createdAt: Yup.string().notRequired(),
  departmentId: Yup.string().notRequired(),
  laboratoryId: Yup.string().notRequired(),
  objective: Yup.string().notRequired(),
  dueDate: Yup.string().notRequired(),
  assignedTo: Yup.string().notRequired(),
});

const RunsForm = React.forwardRef(
  ({ closeFormPopup, openConfirmationPopup, submitFormPopup }: any, ref) => {
    // const [openDlg2Dialog, setDialog2Open] = React.useState(false);
    // const [openSuccess, setSuccessOpen] = React.useState(false);
    const [answers, setAnswers] = React.useState('');
    const [departmentData, setDepartmentData] = React.useState([]);
    const [labData, setLabData] = React.useState([]);
    const dispatch: any = useDispatch();

    const Placeholder = ({ children }: any) => {
      return <div>{children}</div>;
    };
    const [runsOpen, setRunsOpen] = React.useState(false);
    const [runCreate, setRunsCreate] = React.useState(false);
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
      if (isMatch) {
        submitFormPopup();
      }
    };
    const formik = useFormik({
      initialValues: {
        procedureId: '',
        createdAt: '',
        departmentId: '',
        laboratoryId: '',
        objective: '',
        dueDate: '',
        assignedTo: '',
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
      setDepartmentData(
        departmentSliceData?.map((item: any) => ({
          label: item.name,
          value: item.name,
        })),
      );
      setLabData(
        labSliceData?.map((item: any) => ({
          label: item.name,
          value: item.name,
        })),
      );
    }, [departmentSliceData, labSliceData]);

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
                <Typography>Create Run</Typography>
                <CloseIcon onClick={() => closeFormPopup(false)} />
              </Box>
              <Box>
                <Grid container className="asset-popup" spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Procedure name</label>
                      <Autocomplete
                        id="procedureId"
                        options={
                          departmentData !== undefined ? departmentData : []
                        }
                        // disableCloseOnSelect
                        getOptionLabel={(option: any) => option.label}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                        placeholder="Department"
                        size="medium"
                        // onChange={(e, f) => {
                        //   f.forEach((element) => departments.push(element.id));
                        //   formik.setFieldValue('procedureId', departments);
                        // }}
                      />
                      {formik.touched.procedureId &&
                        formik.errors.procedureId && (
                          <Typography className="error-field">
                            {formik.errors.procedureId}
                          </Typography>
                        )}
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingRight: { sm: '1rem !important' } }}
                  >
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>
                        Procedure Id (autogenerated)
                      </label>
                      <TextField
                        margin="none"
                        fullWidth
                        id="procedureId"
                        name="procedureId"
                        autoComplete="procedureId"
                        InputLabelProps={{ shrink: false }}
                        placeholder="Procedure Id"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.procedureId}
                        size="small"
                        error={
                          formik.touched.procedureId &&
                          Boolean(formik.errors.procedureId)
                        }
                        disabled
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    className="asset-popup calender-sec"
                  >
                    <Box>
                      <label>Created on</label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker format="DD/MM/YYYY" disabled />
                      </LocalizationProvider>
                      {formik.touched.createdAt && formik.errors.createdAt && (
                        <Typography className="error-field">
                          Date required
                        </Typography>
                      )}
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingRight: { sm: '1rem !important' } }}
                  >
                    <Box>
                      <label style={{ display: 'block' }}>Department/s</label>

                      <Autocomplete
                        multiple
                        id="departmentId"
                        options={
                          departmentData !== undefined ? departmentData : []
                        }
                        disableCloseOnSelect
                        getOptionLabel={(option: any) => option.label}
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
                          f.forEach((element) => departments.push(element.id));
                          formik.setFieldValue('departmentId', departments);
                        }}
                        disabled
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        // value={formik.values.department}
                        // error={
                        //   formik.touched.department &&
                        //   Boolean(formik.errors.department)
                        // }
                      />
                      {formik.touched.departmentId &&
                        formik.errors.departmentId && (
                          <Typography className="error-field">
                            {formik.errors.departmentId}
                          </Typography>
                        )}
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box>
                      <label style={{ display: 'block' }}>Laboratory/ies</label>

                      <Autocomplete
                        multiple
                        id="laboratoryId"
                        options={labData !== undefined ? labData : []}
                        disableCloseOnSelect
                        getOptionLabel={(option: any) => option.label}
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
                          f.forEach((element) => laboratory.push(element.id));
                          formik.setFieldValue('laboratoryId', laboratory);
                        }}
                        disabled
                      />
                      {formik.touched.laboratoryId &&
                        formik.errors.laboratoryId && (
                          <Typography className="error-field">
                            {formik.errors.laboratoryId}
                          </Typography>
                        )}
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}                    
                  >
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Test objective</label>
                      <TextField
                        margin="none"
                        fullWidth
                        id="objective"
                        name="objective"
                        autoComplete="objective"
                        InputLabelProps={{ shrink: false }}
                        placeholder="Test objective"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.objective}
                        size="small"
                        error={
                          formik.touched.objective &&
                          Boolean(formik.errors.objective)
                        }
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingRight: { sm: '1rem !important' } }}
                    className="asset-popup calender-sec"
                  >
                    <Box>
                      <label>Due date</label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker format="DD/MM/YYYY" />
                      </LocalizationProvider>
                      {formik.touched.dueDate && formik.errors.dueDate && (
                        <Typography className="error-field">
                          Date required
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={0} sm={6} md={6} lg={6} />
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingRight: { sm: '1rem !important' } }}
                  >
                    <Box>
                      <label
                        style={{ display: 'block', marginBottom: '0.8rem' }}
                      >
                        Assign to
                      </label>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src={Avatars} alt="Avatars" />
                        <Button
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
                {/* <Grid item xs={65} sm={12} md={12} lg={12}>
                    <Box>
                      <label
                        style={{ display: 'block', marginBottom: '0.8rem' }}
                      >
                        Assign to
                      </label>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src={Avatars} alt="Avatars" />
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
                  
                </Grid> */}
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
                  variant="contained"
                  onClick={() => {
                    openConfirmationPopup(true);
                  }}
                  className="cancel-btn"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" className="add-btn">
                  Create
                </Button>
              </Box>
            </Box>
          </form>
        </Dialog>
        <Box>
          <AddPeoplePopup open={runsOpen} close={() => setRunsOpen(false)} />
        </Box>
      </div>
    );
  },
);
export default RunsForm;
