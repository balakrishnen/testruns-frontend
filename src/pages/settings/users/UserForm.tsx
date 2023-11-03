/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import React from 'react';
import Dialog from '@mui/material/Dialog';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CheckBoxOutlineBlank } from '@mui/icons-material';
import { postUserData } from '../../../api/userAPI';
import {
  DepartmentList,
  InstitutionList,
  LaboratoryList,
  OrganizationList,
  RoleList,
  StatusList,
} from '../../../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartmentData } from '../../../api/departmentAPI';
import { fetchLabData } from '../../../api/labAPI';

// const departmentList = [
//   { id: 1, name: 'Computer Science' },
//   { id: 2, name: 'Bio Chemistry' },
//   { id: 3, name: 'Mechanical' },
//   { id: 4, name: 'Electronics' },
//   { id: 5, name: 'Genetic Science' },
// ];

// const organizationList = [
//   { id: 1, name: 'Twilight' },
//   { id: 2, name: 'Learny' },
// ];

// const institutionList = [
//   { id: 1, name: 'Academy 1' },
//   { id: 2, name: 'Academy 2' },
//   { id: 3, name: 'Academy 3' },
// ];

// const laboratoryList = [
//   { id: 1, name: 'Spectrum Lab' },
//   { id: 2, name: 'Microprocessor Lab' },
//   { id: 3, name: 'Screw Gauage Lab' },
// ];

// const roleList = [
//   { id: 1, name: 'Admin' },
//   { id: 2, name: 'Resolver' },
//   { id: 3, name: 'Tester' },
// ];

// const statusList = [
//   { id: 1, name: 'Active' },
//   { id: 2, name: 'Inactive' },
// ];

const validationSchema = Yup.object().shape({
  first_name: Yup.string().notRequired(),
  last_name: Yup.string().notRequired(),
  email_id: Yup.string().notRequired(),
  mobile_number: Yup.string().notRequired(),
  organization: Yup.string().notRequired(),
  institution: Yup.string().notRequired(),
  department: Yup.array().notRequired(),
  laboratory: Yup.array().notRequired(),
  user_id: Yup.string().notRequired(),
  role: Yup.string().notRequired(),
  status: Yup.string().notRequired(),
});

const UserForm = React.forwardRef(
  ({ closeFormPopup, openConfirmationPopup, submitFormPopup }: any, ref) => {
    const departments: any = [];
    const laboratory: any = [];
    const [formPopup, setFormPopup] = React.useState(false);
    const [departmentData, setDepartmentData] = React.useState([]);
    const [labData, setLabData] = React.useState([]);
    const dispatch: any = useDispatch();

    const Placeholder = ({ children }: any) => {
      return <div>{children}</div>;
    };

    React.useImperativeHandle(ref, () => ({
      open(state: any) {
        setFormPopup(state);
      },
    }));

    const checkCredentials = (first_name: any) => {
      return true;
    };

    const onSubmit = (values: any) => {
      const isMatch = checkCredentials(values.first_name);
      if (isMatch) {
        dispatch(postUserData(values));
      } else {
        formik.setFieldError('first_name', 'Invalid first name');
      }
    };

    const formik = useFormik({
      initialValues: {
        first_name: '',
        last_name: '',
        email_id: '',
        mobile_number: '',
        organization: '',
        institution: '',
        department: [],
        laboratory: '',
        user_id: 'USER_12345678',
        role: '',
        status: '',
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
      setDepartmentData(departmentSliceData?.map((item: any) => ({
        label: item.name,
        value: item.name
      })))
      setLabData(labSliceData?.map((item: any) => ({
        label: item.name,
        value: item.name
      })))
    }, [departmentSliceData, labSliceData])

    console.log(departmentData);

    console.log(DepartmentList);

    React.useEffect(() => {
      dispatch(fetchDepartmentData());
      dispatch(fetchLabData());
    }, []);

    return (
      <div>
        <Dialog
          open={formPopup}
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
                <Typography>Create new user</Typography>
                <CloseIcon onClick={() => closeFormPopup(false)} />
              </Box>
              <Box>
                <Grid container spacing={2} className="asset-popup">
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingRight: { sm: '1rem !important' } }}
                  >
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>First name</label>
                      <TextField
                        margin="none"
                        fullWidth
                        id="first_name"
                        name="first_name"
                        autoComplete="first_name"
                        InputLabelProps={{ shrink: false }}
                        placeholder="First name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.first_name}
                        size="small"
                        error={
                          formik.touched.first_name &&
                          Boolean(formik.errors.first_name)
                        }
                      />
                      {formik.touched.first_name &&
                        formik.errors.first_name && (
                          <Typography className="error-field">
                            {formik.errors.first_name}
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
                    sx={{
                      paddingLeft: { sm: '1rem !important' },
                      paddingTop: {
                        xs: '0rem !important',
                        sm: '1rem !important',
                      },
                    }}
                  >
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Last name</label>
                      <TextField
                        margin="normal"
                        fullWidth
                        id="last_name"
                        name="last_name"
                        autoComplete="last_name"
                        InputLabelProps={{ shrink: false }}
                        placeholder="Last name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.last_name}
                        size="small"
                        error={
                          formik.touched.last_name &&
                          Boolean(formik.errors.last_name)
                        }
                      />
                      {formik.touched.last_name && formik.errors.last_name && (
                        <Typography className="error-field">
                          {formik.errors.last_name}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className="asset-popup">
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingRight: { sm: '1rem !important' } }}
                  >
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Email ID</label>

                      <TextField
                        margin="normal"
                        fullWidth
                        id="email_id"
                        name="email_id"
                        autoComplete="email_id"
                        InputLabelProps={{ shrink: false }}
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email_id}
                        size="small"
                        error={
                          formik.touched.email_id &&
                          Boolean(formik.errors.email_id)
                        }
                      />
                      {formik.touched.email_id && formik.errors.email_id && (
                        <Typography className="error-field">
                          {formik.errors.email_id}
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
                    sx={{
                      paddingLeft: { sm: '1rem !important' },
                      paddingTop: {
                        xs: '0rem !important',
                        sm: '1rem !important',
                      },
                    }}
                  >
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Mobile number</label>
                      <TextField
                        margin="none"
                        fullWidth
                        id="mobile_number"
                        name="mobile_number"
                        autoComplete="mobile_number"
                        InputLabelProps={{ shrink: false }}
                        placeholder="Mobile number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.mobile_number}
                        size="small"
                        error={
                          formik.touched.mobile_number &&
                          Boolean(formik.errors.mobile_number)
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment sx={{ mx: 2 }} position="start">
                              +91{' '}
                            </InputAdornment>
                          ),
                        }}
                      />
                      {formik.touched.mobile_number &&
                        formik.errors.mobile_number && (
                          <Typography className="error-field">
                            {formik.errors.mobile_number}
                          </Typography>
                        )}
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className="asset-popup">
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingRight: { sm: '1rem !important' } }}
                  >
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Organisation</label>

                      <Select
                        displayEmpty
                        IconComponent={ExpandMoreOutlinedIcon}
                        renderValue={
                          formik.values.organization !== ''
                            ? undefined
                            : () => (
                              <Placeholder>Select Organization</Placeholder>
                            )
                        }
                        margin="none"
                        fullWidth
                        id="organization"
                        name="organization"
                        autoComplete="organization"
                        placeholder="Organization"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.organization}
                        size="small"
                        error={
                          formik.touched.organization &&
                          Boolean(formik.errors.organization)
                        }
                      >
                        {OrganizationList.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>

                      {formik.touched.organization &&
                        formik.errors.organization && (
                          <Typography className="error-field">
                            {formik.errors.organization}
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
                    sx={{
                      paddingLeft: { sm: '1rem !important' },
                      paddingTop: {
                        xs: '0rem !important',
                        sm: '1rem !important',
                      },
                    }}
                  >
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Institution</label>

                      <Select
                        displayEmpty
                        IconComponent={ExpandMoreOutlinedIcon}
                        renderValue={
                          formik.values.institution !== ''
                            ? undefined
                            : () => (
                              <Placeholder>Select Institution</Placeholder>
                            )
                        }
                        margin="none"
                        fullWidth
                        id="institution"
                        name="institution"
                        autoComplete="institution"
                        placeholder="Institution"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.institution}
                        size="small"
                        error={
                          formik.touched.institution &&
                          Boolean(formik.errors.institution)
                        }
                      >
                        {InstitutionList.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>

                      {formik.touched.institution &&
                        formik.errors.institution && (
                          <Typography className="error-field">
                            {formik.errors.institution}
                          </Typography>
                        )}
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className="asset-popup multi-selection">
                  <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingRight: { sm: '1rem !important' } }}>
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Department/s</label>
                      <Autocomplete
                        multiple
                        id="department"
                        options={departmentData !== undefined ? departmentData : []}
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
                          formik.setFieldValue('department', departments);
                        }}
                      // onChange={formik.handleChange}
                      // onBlur={formik.handleBlur}
                      // value={formik.values.department}
                      // error={
                      //   formik.touched.department &&
                      //   Boolean(formik.errors.department)
                      // }
                      />
                      {formik.touched.department &&
                        formik.errors.department && (
                          <Typography className="error-field">
                            {formik.errors.department}
                          </Typography>
                        )}
                    </Box>
                  </Grid>
                  <Grid item  xs={12} sm={6} md={6} lg={6}
                    sx={{
                      paddingLeft: { sm: '1rem !important' },
                      paddingTop: {
                        xs: '0rem !important',
                        sm: '1rem !important',
                      },
                    }}
                  >
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Laboratory/ies</label>

                      <Autocomplete
                        multiple
                        id="laboratory"
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
                          formik.setFieldValue('laboratory', laboratory);
                        }}
                      />
                      {formik.touched.laboratory &&
                        formik.errors.laboratory && (
                          <Typography className="error-field">
                            {formik.errors.laboratory}
                          </Typography>
                        )}
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className="asset-popup">
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
                        User ID (autogenerated)
                      </label>
                      <TextField
                        margin="none"
                        fullWidth
                        id="user_id"
                        name="user_id"
                        autoComplete="user_id"
                        InputLabelProps={{ shrink: false }}
                        placeholder="User ID"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.user_id}
                        size="small"
                        error={
                          formik.touched.user_id &&
                          Boolean(formik.errors.user_id)
                        }
                        disabled
                      />
                      {formik.touched.user_id && formik.errors.user_id && (
                        <Typography className="error-field">
                          {formik.errors.user_id}
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
                    sx={{
                      paddingLeft: { sm: '1rem !important' },
                      paddingTop: {
                        xs: '0rem !important',
                        sm: '1rem !important',
                      },
                    }}
                  >
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Select role</label>

                      <Select
                        displayEmpty
                        IconComponent={ExpandMoreOutlinedIcon}
                        renderValue={
                          formik.values.role !== ''
                            ? undefined
                            : () => <Placeholder>Select Role</Placeholder>
                        }
                        margin="none"
                        fullWidth
                        id="role"
                        name="role"
                        autoComplete="role"
                        placeholder="Role"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.role}
                        size="small"
                        error={
                          formik.touched.role && Boolean(formik.errors.role)
                        }
                      >
                        {RoleList.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>

                      {formik.touched.role && formik.errors.role && (
                        <Typography className="error-field">
                          {formik.errors.role}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className="asset-popup">
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingRight: { sm: '1rem !important' } }}
                  >
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Current status</label>

                      <Select
                        displayEmpty
                        IconComponent={ExpandMoreOutlinedIcon}
                        renderValue={
                          formik.values.status !== ''
                            ? undefined
                            : () => <Placeholder>Select Status</Placeholder>
                        }
                        margin="none"
                        fullWidth
                        id="status"
                        name="status"
                        autoComplete="status"
                        placeholder="Laboratory"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.status}
                        size="small"
                        error={
                          formik.touched.status && Boolean(formik.errors.status)
                        }
                      >
                        {StatusList.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched.status && formik.errors.status && (
                        <Typography className="error-field">
                          {formik.errors.status}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
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
                <Button
                  type="submit"
                  variant="contained"
                  // onClick={submitFormPopup}
                  className="add-btn"
                >
                  Create
                </Button>
              </Box>
            </Box>
          </form>
        </Dialog>
      </div>
    );
  },
);

export default UserForm;
