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
import { fetchOrganizationData } from '../../../api/organizationAPI';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CheckBoxOutlineBlank } from '@mui/icons-material';
import { postUserData, fetchUpdateUserData } from '../../../api/userAPI';
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
import { fetchRoleData } from '../../../api/roleApi';
import { fetchLabData } from '../../../api/labAPI';
import SuccessPopup from '../../../components/SuccessPopup';
import Confirmationpopup from '../../../components/ConfirmationPopup';
import {
  fetchSingleUserData
} from '../../../api/userAPI';
const validationSchema = Yup.object().shape({
  firstName: Yup.string().notRequired(),
  lastName: Yup.string().notRequired(),
  email: Yup.string().notRequired(),
  phoneNumber: Yup.string().notRequired(),
  organisationId: Yup.string().notRequired(),
  institution: Yup.string().notRequired(),
  departmentId: Yup.array().notRequired(),
  laboratoryId: Yup.array().notRequired(),
  user_id: Yup.string().notRequired(),
  role: Yup.string().notRequired(),
  status: Yup.string().notRequired(),
});

const UserForm = React.forwardRef(
  ({ closeFormPopup, openConfirmationPopup, reload, rowVal }: any, ref) => {
    const [departments, setDepartments] = React.useState([]);
    const [laboratory, setLaboratory] = React.useState([]);
    const laboratoryId: any = [];
    const [formPopup, setFormPopup] = React.useState(false);
    const [organizationData, setOrganizationData] = React.useState([]);
    const [rowValue, setRowValue] = React.useState<any>(rowVal);
    const [departmentData, setDepartmentData] = React.useState([]);
    const [roleData, setRoleData] = React.useState([]);
    const [labData, setLabData] = React.useState([]);
    const dispatch: any = useDispatch();
    const [type, setType] = React.useState(null);
    const successPopupRef: any = React.useRef();
    const confirmationPopupRef: any = React.useRef();

    const Placeholder = ({ children }: any) => {
      return <div>{children}</div>;
    };

    React.useImperativeHandle(ref, () => ({
      open(state: any, type: any, row: any) {
        setType(type);
        setRowValue(row)
        let temp = { '_id': row?._id }
        if (row?._id) {
          dispatch(fetchSingleUserData(temp)).then((isSucess) => {
            if (isSucess.get_user) {
              console.log(row, 'isSucess', isSucess.get_user)
              formik.setFieldValue('firstName', isSucess.get_user.firstName || '');
              formik.setFieldValue('lastName', isSucess.get_user.lastName || '');
              formik.setFieldValue('email', isSucess.get_user.email || '');
              formik.setFieldValue('phoneNumber', isSucess.get_user.phoneNumber || '');
              formik.setFieldValue('organisationId', isSucess.get_user.organisationId || '');
              formik.setFieldValue('institution', isSucess.get_user.institution || '');
              formik.setFieldValue('departmentId', isSucess.get_user.departmentId || '');
              formik.setFieldValue('laboratoryId', isSucess.get_user.laboratoryId || '');
              formik.setFieldValue('user_id', isSucess.get_user.user_id || '');
              formik.setFieldValue('role', isSucess.get_user.role || '');
              formik.setFieldValue('status', isSucess.get_user.status || '');
              // setRowValue(isSucess.get_uesr)
              setFormPopup(state);
            }
          })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setFormPopup(state);
        }
      },
    }));

    const checkCredentials = (firstName: any) => {
      return true;
    };

    const clearForm = () => {
      formik.resetForm();
      setDepartments([])
    };

    const onSubmit = (values: any) => {
      const isMatch = checkCredentials(values.firstName);
      if (isMatch) {
        var deptArray: any = []
        departments.map((item: any) => (deptArray.push(item?.id)))
        var labArray: any = []
        laboratory.map((item: any) => (labArray.push(item?.id)))
        let userValues: any = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          organisationId: values.organisationId,
          institution: values.institution,
          departmentId: values.departmentId,
          laboratoryId: values.laboratoryId,
          user_id: 'USER_12345678',
          role: values.role,
          status: values.status,
        }
        debugger
        if (type == 'edit') {
          values['_id'] = rowValue._id
          dispatch(fetchUpdateUserData(values))
          submitFormPopup();
          reload()
        }
        else {
          dispatch(postUserData(userValues));
          submitFormPopup();
          reload()
        }
        clearForm()
      } else {
        formik.setFieldError('first_name', 'Invalid first name');
      }
    };

    const submitFormPopup = () => {
      setFormPopup(false);
      successPopupRef.current.open(true, 'User');
      setTimeout(() => {
        successPopupRef.current.open(false, 'User');
      }, 3000);
    };

    const handleConfirmationState = (state: any) => {
      if (state === 0) {
        confirmationPopupRef.current.open(false);
      } else {
        confirmationPopupRef.current.open(false);
        setFormPopup(false);
      }
    };
    const formik = useFormik({
      initialValues: {
        firstName: rowValue?.firstName ? rowValue?.firstName : '',
        lastName: rowValue?.lastName ? rowValue?.lastName : '',
        email: rowValue?.email ? rowValue?.email : '',
        phoneNumber: rowValue?.phoneNumber ? rowValue?.phoneNumber : '',
        organisationId: rowValue?.organisationId ? rowValue?.organisationId : '',
        institution: rowValue?.institution ? rowValue?.institution : '',
        departmentId: rowValue?.departmentId ? rowValue?.departmentId : [],
        laboratoryId: rowValue?.laboratoryId ? rowValue?.laboratoryId : [],
        user_id: 'USER_12345678',
        role: rowValue?.role ? rowValue?.role : '',
        status: rowValue?.status ? rowValue?.status : '',
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
    const roleSliceData = useSelector(
      (state: any) => state.role.data?.get_all_roles,
    );
    const organizationSliceData = useSelector(
      (state: any) => state.organization.data?.get_all_organisations,
    );

    React.useEffect(() => {
      setDepartmentData(
        departmentSliceData?.map((item: any) => ({
          label: item.name,
          value: item.name,
          id: item._id,
        })),
      );
      setLabData(
        labSliceData?.map((item: any) => ({
          label: item.name,
          value: item.name,
          id: item._id,
        })),
      );
      setRoleData(
        roleSliceData?.map((item: any) => ({
          label: item.name,
          value: item._id,
        })),
      );
      setOrganizationData(
        organizationSliceData?.map((item: any) => ({
          label: item.name,
          value: item.name,
          id: item._id,
        })),
      );
    }, [departmentSliceData, labSliceData, roleSliceData, organizationSliceData]);



    React.useEffect(() => {
      dispatch(fetchDepartmentData());
      dispatch(fetchLabData());
      dispatch(fetchRoleData());
      dispatch(fetchOrganizationData());
    }, []);

    console.log(formik.values)
    return (
      <div>
        <Dialog
          open={formPopup}
          keepMounted
          onClose={() => {
            closeFormPopup(false)
            clearForm()
          }}
          aria-labelledby="add-new-asset-title"
          aria-describedby="add-new-asset"
          fullWidth
          maxWidth="md"
          className="popup-outer"
        >
          <form onSubmit={formik.handleSubmit}>
            <Box className="popup-section">
              <Box className="title-popup">
                <Typography>{type} user</Typography>
                <CloseIcon onClick={() => {
                  closeFormPopup(false)
                  clearForm()
                }} />
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
                        id="firstName"
                        name="firstName"
                        autoComplete="firstName"
                        InputLabelProps={{ shrink: false }}
                        placeholder="First name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                        size="small"
                        error={
                          formik.touched.firstName &&
                          Boolean(formik.errors.firstName)
                        }
                      />
                      {formik.touched.firstName &&
                        formik.errors.firstName && (
                          <Typography className="error-field">
                            {formik.errors.firstName}
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
                        id="lastName"
                        name="lastName"
                        autoComplete="lastName"
                        InputLabelProps={{ shrink: false }}
                        placeholder="Last name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                        size="small"
                        error={
                          formik.touched.lastName &&
                          Boolean(formik.errors.lastName)
                        }
                      />
                      {formik.touched.lastName && formik.errors.lastName && (
                        <Typography className="error-field">
                          {formik.errors.lastName}
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
                        id="email"
                        name="email"
                        autoComplete="email"
                        InputLabelProps={{ shrink: false }}
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        size="small"
                        error={
                          formik.touched.email &&
                          Boolean(formik.errors.email)
                        }
                      />
                      {formik.touched.email && formik.errors.email && (
                        <Typography className="error-field">
                          {formik.errors.email}
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
                        id="phoneNumber"
                        name="phoneNumber"
                        autoComplete="phoneNumber"
                        InputLabelProps={{ shrink: false }}
                        placeholder="Mobile number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phoneNumber}
                        size="small"
                        error={
                          formik.touched.phoneNumber &&
                          Boolean(formik.errors.phoneNumber)
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment sx={{ mx: 2 }} position="start">
                              +91{' '}
                            </InputAdornment>
                          ),
                        }}
                      />
                      {formik.touched.phoneNumber &&
                        formik.errors.phoneNumber && (
                          <Typography className="error-field">
                            {formik.errors.phoneNumber}
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
                        className="placeholder-color"
                        displayEmpty
                        IconComponent={ExpandMoreOutlinedIcon}
                        renderValue={
                          formik.values.organisationId !== ''
                            ? undefined
                            : () => (
                              <Placeholder>
                                Select Organization
                              </Placeholder>
                            )
                        }
                        margin="none"
                        fullWidth
                        id="organisationId"
                        name="organisationId"
                        // autoComplete="organisationId"
                        placeholder="Organization"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.organisationId}
                        size="small"
                        error={
                          formik.touched.organisationId &&
                          Boolean(formik.errors.organisationId)
                        }
                      >
                        {organizationData?.map((item: any, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>

                      {formik.touched.organisationId &&
                        formik.errors.organisationId && (
                          <Typography className="error-field">
                            {formik.errors.organisationId}
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
                        className="placeholder-color"
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
                <Grid
                  container
                  spacing={2}
                  className="asset-popup multi-selection"
                >
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingRight: { sm: '1rem !important' } }}
                  >
                    <Box style={{ position: 'relative' }}>
                      <label style={{ display: 'block' }}>Department/s</label>
                      <Autocomplete
                        multiple
                        id="departmentId"
                        options={
                          departmentData !== undefined ? departmentData : []
                        }
                        disableCloseOnSelect
                        getOptionLabel={(option: any) => option.label}
                        isOptionEqualToValue={(option: any, value: any) =>
                          value.id == option.id
                        }
                        renderOption={(
                          props,
                          option: any,
                          { selected }
                        ) => (
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
                          let temp: any = []
                          f.forEach((element) => temp.push(element.id));
                          setDepartments(temp);
                          formik.setFieldValue('departmentId', temp);
                        }}
                      />
                      {formik.touched.departmentId &&
                        formik.errors.departmentId && (
                          <Typography className="error-field">
                            {formik.errors.departmentId}
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
                          f.forEach((element) => laboratoryId.push(element.id));
                          formik.setFieldValue('laboratoryId', laboratoryId);
                        }}
                      />
                      {formik.touched.laboratoryId &&
                        formik.errors.laboratoryId && (
                          <Typography className="error-field">
                            {formik.errors.laboratoryId}
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
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: '150px',
                              overflowY: 'auto',
                            },
                          },
                        }}
                        className="placeholder-color"
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
                        {roleData &&
                          roleData.map((item: any) => (
                            <MenuItem key={item.value} value={item.value}>
                              {item.label}
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
                        className="placeholder-color"
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
                  variant="contained"
                  onClick={() => {
                    confirmationPopupRef.current.open(true);
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
                  {type === 'edit' ? 'Update' : 'Create'}
                </Button>
              </Box>
            </Box>
          </form>
        </Dialog>

        <SuccessPopup ref={successPopupRef} type={type} />
        <Confirmationpopup
          ref={confirmationPopupRef}
          confirmationState={handleConfirmationState}
          type={type}
        />
      </div>
    );
  },
);

export default UserForm;
