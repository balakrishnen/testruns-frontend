import React, { useState } from "react";
import PrivateRoute from '../../../components/PrivateRoute'
import Successpopup from "../../../components/SuccessPopup"
import { Box, Button, FormControl, Grid, Autocomplete, Checkbox, MenuItem, Select, TextField, Typography } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import test from '../../../assets/images/test.svg'
import { fetchSingleAssetsData, fetchUpdateAssetsData, postAssetsData } from "../../../api/assetsAPI";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from '@reach/router';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { AvailabilityList, OrganizationList, StatusList } from "../../../utils/data";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  assetId: Yup.string().notRequired(),
  laboratoryId: Yup.array().notRequired(),
  organisationId: Yup.string().notRequired(),
  departmentId: Yup.array().notRequired(),
  status: Yup.string().notRequired(),
  availability: Yup.string().notRequired(),
  lastUsedDate: Yup.string().notRequired(),
});
export default function AssetDetails() {
  const [value, setValue] = React.useState(0);
  const [answers, setAnswers] = React.useState("");
  const Placeholder = ({ children }: any) => {
    return <div>{children}</div>;
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const location: any = useLocation()
  const assetValue = location.state.props
  console.log(assetValue);

  const [openSuccess, setSuccessOpen] = React.useState(false);
  const [departmentData, setDepartmentData] = React.useState([]);
  const [labData, setLabData] = React.useState([]);
  const [organizationData, setOrganizationData] = React.useState([]);
  const [departments, setDepartments] = React.useState(assetValue.departmentId?.map((item: any) => ({
    label: item?.name,
    value: item?.name,
    id: item?._id,
  })));
  const [laboratory, setLaboratory] = React.useState(assetValue.laboratoryId?.map((item: any) => ({
    label: item?.name,
    value: item?.name,
    id: item?._id,
  })))
  // const [assetsData, setAssetsData] = React.useState<any>([]);
  // console.log(assetsData?.assetNumber);

  const dispatch: any = useDispatch();
  // const departments: any = 
  // // []
  // assetValue.departmentId?.map((item: any) => ({
  //   label: item?.name,
  //   value: item?.name,
  //   id: item?._id,
  // }));
  // const laboratory: any = 
  // // []
  // assetValue.laboratoryId?.map((item: any) => ({
  //   label: item?.name,
  //   value: item?.name,
  //   id: item?._id,
  // }));
  // const AssetSliceData = useSelector(
  //   (state: any) => state.assets.data?.get_asset,
  // );
  // console.log(departments,laboratory);
  const checkCredentials = (values: any) => {
    return true;
  }

  // React.useEffect(() => {
  //   if(typeof window !== 'undefined'){
  //     console.log(window.location.pathname.split("/") )
  //     const assetId = {_id:window.location.pathname.split("/")[3]}
  //     console.log(assetId);
  //     dispatch(fetchSingleAssetsData(assetId));
  //    }
  // }, []);
  // const onSubmit = (values: any) => {
  // console.log(values);

  // const isMatch = checkCredentials(values);
  // const procedures: any = {
  //   name: 'Stenography2',
  //   assectId: 'ASSET_1002',
  //   departmentId: '653b80a0301e33001265a64a',
  //   laboratoryId: '653b7fd4301e33001265a646',
  //   userId: 'USER_1001',
  //   procedureDetials:"Stenography2"

  // };
  // if(isMatch){
  //  dispatch(postProcedureData(values))
  // }

  // };
  const onSubmit = (values: any) => {
    // debugger
    console.log("value", value)
    const isMatch = checkCredentials(values.name);
    if (isMatch) {
      console.log('final',values);
      let assetValues={
        _id: assetValue._id,
        name: values.name,
        organisationId: assetValue.organisationId,
        perchasedDate: assetValue.perchasedDate,
        lastUsedDate: values.lastUsedDate,
        availability: values.availability,
        expiryDate: assetValue.expiryDate,
        departmentId: departments,
        laboratoryId: laboratory,
        status: values.status,
      }
      console.log(assetValues);
      
      dispatch(fetchUpdateAssetsData(assetValues));
      // setFormPopup(false);
    } else {
      formik.setFieldError('name', 'Invalid first name');
    }
  };
  const departmentSliceData = useSelector(
    (state: any) => state.department.data?.get_all_departments,
  );
  const labSliceData = useSelector(
    (state: any) => state.lab.data?.get_all_labs,
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
    setOrganizationData(
      organizationSliceData?.map((item: any) => ({
        label: item.name,
        value: item.name,
        id: item._id,
      })),
    );
  }, [departmentSliceData, labSliceData, organizationData]);
  // React.useEffect(() => {
  //   setAssetsData(AssetSliceData);
  // }, [AssetSliceData]);

  // React.useEffect(() => {
  //   if(typeof window !== 'undefined'){
  //     console.log(window.location.pathname.split("/")[3] )
  //     const AssetId = {_id:window.location.pathname.split("/")[3]}
  //     dispatch(fetchSingleAssetsData(AssetId));
  //    }
  // }, []);
  const formik = useFormik({
    initialValues: {
      name: assetValue.name,
      assetId: assetValue.assetNumber,
      laboratoryId: assetValue.laboratoryId,
      organisationId: '',
      departmentId: assetValue.departmentId,
      // userId: 'USER_1001', 
      status: 'AVAILABILITY',
      availability: assetValue.availability,
      // assets_id: assetValue.assets_id,
      lastUsedDate: assetValue.lastUsedDate,
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit
  });

  // console.log("datas",departments,laboratory);
  
  return (
    <PrivateRoute>
      <Box className="main-padding">
        <Successpopup open={openSuccess} close={() => setSuccessOpen(false)} />
        <Box className="title-main" sx={{ borderBottom: '3px solid #F3F3F3', paddingBottom: '1rem' }}>
          <Box>
            <Typography>Asset details</Typography>
            <Typography className="sub-text">Edit your assets and can view its usage history.</Typography>
          </Box>
        </Box>
        <Box sx={{ width: '100%', marginTop: '1rem' }}>
          <Box sx={{ borderBottom: 0 }}>
            <Tabs value={value} onChange={handleChange} variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile aria-label="tabs-common" className='tabs-common' >
              <Tab label="Edit details" {...a11yProps(0)} />
              <Tab label="History" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <CustomTabPanel value={value} index={0}>
              <Grid container spacing={2} sx={{ width: '100%', m: 0 }}>
                <Grid item xs={12} sm={12} md={4} lg={3} xl={3} sx={{ padding: '0px !important', paddingRight: { xs: '0px !important', md: '30px !important' } }}>
                  <Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <img src={test} alt="test" className="dynamic-img" />
                    </Box>

                    <Box className='edit-profile-btn' sx={{ mt: 3, mb: 3, pb: '0px !important' }}>
                      <Button>Upload photo</Button>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={8} lg={6} xl={5} sx={{ padding: '0px !important', paddingTop: { xs: '30px !important', md: '0px !important' } }}>
                  <Box>
                    <Grid container spacing={2} className='asset-popup'>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box style={{ position: 'relative' }}>
                          <label>Name</label>
                          <TextField
                            margin="none"
                            fullWidth
                            id="name"
                            name="name"
                            autoComplete="name"
                            InputLabelProps={{ shrink: false }}
                            placeholder="Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            size="small"
                            error={
                              formik.touched.name &&
                              Boolean(formik.errors.name)
                            }
                          />
                          {formik.touched.name &&
                            formik.errors.name && (
                              <Typography className="error-field">
                                {formik.errors.name}
                              </Typography>
                            )}

                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} className='asset-popup'>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box className='asset-id'>
                          <label>Asset Id (autogenerated)</label>
                          <TextField
                            margin="normal"

                            fullWidth
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.assetId}
                            id="assetId"
                            name="assetId"
                            autoComplete="assetId"
                            inputProps={{ maxLength: 50 }}
                            autoFocus
                            InputLabelProps={{ shrink: false }}
                            placeholder="Asset Id"
                            error={
                              formik.touched.assetId && Boolean(formik.errors.assetId)
                            }
                          />
                          {formik.touched.assetId && formik.errors.assetId && (
                            <Typography className="error-field">
                              {formik.errors.assetId}
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} className='asset-popup calender-sec'>
                      <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingRight: { sm: '1rem !important' } }}>
                        <Box>
                          <label>Purchase date</label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker format="DD/MM/YYYY" />
                          </LocalizationProvider>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingLeft: { sm: '1rem !important' }, paddingTop: { xs: '0rem !important', sm: '1rem !important' } }}>
                        <Box>
                          <label>Guaranty/warranty/expiry date</label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker format="DD/MM/YYYY" />
                          </LocalizationProvider>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} className='asset-popup'>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box style={{ position: 'relative' }}>
                          <label style={{ display: 'block' }}>Organisation</label>
                          <FormControl sx={{ width: '100%' }}>
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
                              autoComplete="organisationId"
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
                              {OrganizationList.map((item, index) => (
                                <MenuItem key={index} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              ))}
                            </Select>
                            {formik.touched.organisationId && formik.errors.organisationId && (
                              <Typography className="error-field">
                                {formik.errors.organisationId}
                              </Typography>
                            )}
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} className='asset-popup multi-selection'>
                      <Grid item xs={12} sm={12} md={12} lg={12}
                      >
                        <Box style={{ position: 'relative' }}>
                          <label style={{ display: 'block' }}>Department/s</label>
                          <FormControl sx={{ width: '100%' }}>
                            <Autocomplete
                              multiple
                              id="departmentId"
                              disableCloseOnSelect
                              value={departments}
                              options={
                                departmentData !== undefined ? departmentData : []
                              }
                              getOptionLabel={(option: any) => option.label}
                              isOptionEqualToValue={(option:any, value:any) => value.id == option.id}
                              renderInput={params => (
                                <TextField {...params} />)}
                              fullWidth
                              placeholder="Department"
                              size="medium"
                              renderOption={(props, option: any, { selected }) => (
                                <React.Fragment>
                                  <li {...props}>
                                    <Checkbox
                                      style={{ marginRight: 0 }}
                                      checked={selected}
                                    />
                                    {option.value}
                                  </li>

                                </React.Fragment>
                              )}
                              onChange={(_, selectedOptions: any) => setDepartments(selectedOptions)}
                            />
                            {/* <Autocomplete
                              multiple
                              id="departmentId"
                              options={
                                departmentData !== undefined ? departmentData : []
                              }
                              // value={departments}
                              disableCloseOnSelect
                              getOptionLabel={(option: any) => option.label}
                              renderOption={(props, option, { selected }) => (
                                // console.log('selected',selected),
                                
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
                                formik.setFieldValue('departmentId', departments);
                              }}
                            />*/}
                            {formik.touched.departmentId && 
                              formik.errors.departmentId && (
                                <Typography style={{
                                  color: "#E2445C",
                                  position: "relative",
                                  top: "-109px",
                                  right: "-535px",
                                  fontSize: "14px "
                                }}>
                                  {formik.errors.departmentId}
                                </Typography>
                              )}
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} className='asset-popup multi-selection'>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box style={{ position: 'relative' }}>
                          <label style={{ display: 'block' }}>Laboratory/ies</label>
                          <Autocomplete
                              multiple
                              id="departmentId"
                             
                              options={
                                labData !== undefined ? labData : []
                              }
                              getOptionLabel={(option: any) => option.label}
                              isOptionEqualToValue={(option:any, value:any) => value.id == option.id}
                              disableCloseOnSelect
                              value={laboratory}
                              renderInput={params => (
                                <TextField {...params} />)}
                              fullWidth
                              placeholder="Laboratory"
                              size="medium"
                              renderOption={(props, option: any, { selected }) => (
                                <React.Fragment>
                                  <li {...props}>
                                    <Checkbox
                                      style={{ marginRight: 0 }}
                                      checked={selected}
                                    />
                                    {option.value}
                                  </li>

                                </React.Fragment>
                              )}
                              onChange={(_, selectedOptions: any) => setLaboratory(selectedOptions)}
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
                    <Grid container spacing={2} className='asset-popup'>
                      <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingRight: { sm: '1rem !important' } }}>
                        <Box style={{ position: 'relative' }}>
                          <label style={{ display: 'block' }}>Status</label>
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
                              formik.touched.status &&
                              Boolean(formik.errors.status)
                            }
                          >
                            {StatusList.map((item: any) => (
                              <MenuItem key={item.id} value={item.state}>
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
                      <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingLeft: { sm: '1rem !important' }, paddingTop: { xs: '0rem !important', sm: '1rem !important' } }}>
                        <Box style={{ position: 'relative' }}>
                          <label style={{ display: 'block' }}>Availability</label>
                          <Select
                            className="placeholder-color"
                            displayEmpty
                            IconComponent={ExpandMoreOutlinedIcon}
                            renderValue={
                              formik.values.availability !== ''
                                ? undefined
                                : () => (
                                  <Placeholder>
                                    Select Availability
                                  </Placeholder>
                                )
                            }
                            margin="none"
                            fullWidth
                            id="availability"
                            name="availability"
                            autoComplete="availability"
                            placeholder="Laboratory"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.availability}
                            size="small"
                            error={
                              formik.touched.availability &&
                              Boolean(formik.errors.availability)
                            }
                          >
                            {AvailabilityList.map((item: any) => (
                              <MenuItem key={item.id} value={item.state}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {formik.touched.availability &&
                            formik.errors.availability && (
                              <Typography className="error-field">
                                {formik.errors.availability}
                              </Typography>
                            )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
              <Box className="edit-details">
                <Button variant="contained" className="cancel-btn">Back</Button>
                <Button type="submit" variant="contained" className="add-btn">Save</Button>
              </Box>
            </CustomTabPanel>
          </form>
          <CustomTabPanel value={value} index={1}>
            <Box className="asset-id-name">
              <img src={test} alt="test" className="dynamic-img" />
              <Box className='asset-name'>
                <Typography>Asset ID</Typography>
                <Typography>Asset name</Typography>
              </Box>
            </Box>
          </CustomTabPanel>
        </Box>
      </Box>
    </PrivateRoute>
  );
}