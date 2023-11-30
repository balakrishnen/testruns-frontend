/* eslint-disable no-var */
/* eslint-disable react/display-name */
import React from 'react';
import Dialog from '@mui/material/Dialog';
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  Autocomplete,
  InputAdornment,
  Divider,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import CloseIcon from '@mui/icons-material/Close';
import '../../assets/styles/asset-popup.scss';
import assetimg from '../../assets/images/assetimg.svg';
import darkcircle from '../../assets/images/darkgary-circle.svg';
import lightcircle from '../../assets/images/lightgary-circle.svg';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Organization } from '../../modals';
import {
  AvailabilityList,
  DepartmentList,
  LaboratoryList,
  OrganizationList,
  StatusList,
} from '../../utils/data';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { postAssetsData } from '../../api/assetsAPI';
import { fetchDepartmentData } from '../../api/departmentAPI';
import { fetchLabData } from '../../api/labAPI';
import { fetchOrganizationData } from '../../api/organizationAPI';
import SuccessPopup from '../../components/SuccessPopup';
import Confirmationpopup from '../../components/ConfirmationPopup';
import moment from 'moment';
import test from '../../assets/images/test.svg';
import preview from '../../assets/images/profile/preview.jpg';
import { toast } from 'react-toastify';
import AWS from 'aws-sdk';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Asset Name is required'),
  perchasedDate: Yup.string().required('Purchase date is required'),
  expiryDate: Yup.string().required('Expiry date is required'),
  departmentId: Yup.array().min(1, 'Please select at least one Department').required('Department is required'),
  laboratoryId: Yup.array().min(1, 'Please select at least one Laboratory').required('Laboratory is required'),
  organisationId: Yup.string().required('Organisation is required'),
  status: Yup.string().required('Status is required'),
  // assets_image: Yup.string().required(),
  availability: Yup.string().required('Availability is required'),
  // assets_id: Yup.string().required(),
  // lastUsedDate: Yup.string().required(),
});

const Addnewpopup = React.forwardRef(
  (
    { closeFormPopup, reload, openConfirmationPopup, fetchData, type }: any,
    ref,
  ) => {
    const [answers, setAnswers] = React.useState('');
    const [formPopup, setFormPopup] = React.useState(false);
    const [organizations] = React.useState<Organization[]>(OrganizationList);
    const [departmentData, setDepartmentData] = React.useState([]);
    const [labData, setLabData] = React.useState([]);
    const [organizationData, setOrganizationData] = React.useState([]);
    const successPopupRef: any = React.useRef(null);
    const confirmationPopupRef: any = React.useRef(null);
    const dispatch: any = useDispatch();
    // const departments: any = [];
    // const laboratory: any = [];
    const [departments, setDepartments] = React.useState([]);
    const [organization, setOrganization] = React.useState([]);
    const [laboratory, setLaboratory] = React.useState([]);
    const fileUploadField = React.useRef<any>(null);
    const [uploadedFile, setUploadedFile] = React.useState(null);

    React.useImperativeHandle(ref, () => ({
      open(state: any) {
        setFormPopup(state);
      },
    }));

    const checkCredentials = (name: any) => {
      return true;
    };
    const onSubmit = (values: any) => {
      const isMatch = checkCredentials(values.name);
      if (isMatch) {
        var deptArray:any=[]
        departments.map((item:any)=>(deptArray.push(item?.id)))
        var labArray:any=[]
        laboratory.map((item:any)=>(labArray.push(item?.id)))
        
        let assetValues={
        name: values.name,
        organisationId: values.organisationId,
        perchasedDate: values.perchasedDate,
        lastUsedDate: moment().format("MM/DD/YYYY"),
        availability: values.availability,
        expiryDate: values.expiryDate,
        departmentId: deptArray,
        laboratoryId: labArray,
        status: values.status,
        }
        console.log(values.organisationId);
        
        dispatch(postAssetsData(assetValues));
       
        submitFormPopup();
        clearForm();
        reload();
        // dispatch(fetchAssetsData(queryStrings));
      } else {
        formik.setFieldError('name', 'Invalid first name');
      }
    };
    const clearForm = () => {
      formik.resetForm();
      setDepartments([]);
      setLaboratory([]);
      setOrganization([]);
    };
    const submitFormPopup = () => {
      setFormPopup(false);
      toast(`Assets created !`, {
        style: {
          background: '#00bf70', color: '#fff'
        }
      });
      // setTimeout(() => {
      //   successPopupRef.current.open(false, 'Asset');
      // }, 3000);
    };

    const Placeholder = ({ children }: any) => {
      return <div>{children}</div>;
    };
    const today = moment().format('YYYY-MM-DD');

    const formik = useFormik({
      initialValues: {
        name: '',
        perchasedDate: null,
        expiryDate: null,
        departmentId: [],
        laboratoryId: [],
        organisationId: '',
        status: '',
        // assets_image: '',
        availability: '',
        // assets_id: 'ASSE-1000',
        lastUsedDate:"",
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
    const organizationSliceData = useSelector(
      (state: any) => state.organization.data?.get_all_organisations,
    );
    console.log(organizationData);

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
    }, [departmentSliceData, labSliceData, organizationSliceData]);

    React.useEffect(() => {
      dispatch(fetchDepartmentData());
      dispatch(fetchLabData());
      dispatch(fetchOrganizationData());
    }, []);

    const handleConfirmationState = (state: any) => {
      if (state === 0) {
        confirmationPopupRef.current.open(false);
      } else {
        confirmationPopupRef.current.open(false);
        setFormPopup(false);
        clearForm()
      }
    };
    const handleDateChanges = (selectedDate: any, name: any) => {
      const formattedDate = moment(selectedDate.$d).format('YYYY-MM-DD');
      formik.handleChange(name)(formattedDate);
    };
    console.log('formvalues',formik.values);

    const handleImageUpload = async () => {
      const selectedFile = fileUploadField.current.files[0];
      // const formData = new FormData();
      // formData.append('file', selectedFile);
      // const payload = {
      //   file: formData,
      //   type: 'profile'
      // }
      // dispatch(fileUploadData(payload));
  
      const s3 = new AWS.S3({
        // params: { Bucket: S3_BUCKET, folderName: "profile" },
        region: 'us-east-1',
        accessKeyId: 'AKIAUVVYVBYI2GJ3ENMQ',
        secretAccessKey: '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',
      });
      const keyPath = `profile/${Date.now()}`;
      const params = {
        Bucket: 'test-run-v2',
        Key: keyPath,
        Body: selectedFile,
        ACL: 'public-read',
        // ContentType: selectedFile.type
      };
  
      const result = s3.upload(params).promise();
      await result.then((res: any) => {
        setUploadedFile(res.Location);
        toast(`Image uploaded successfully !`, {
          style: {
            background: '#00bf70',
            color: '#fff',
          },
        });
      });
      await result.catch((err) => {
        console.error('Failed to upload');
        toast(`Failed to upload !`, {
          style: {
            background: '#e2445c',
            color: '#fff',
          },
        });
      });
    };

    const triggerFileUploadField = () => {
      fileUploadField.current?.click();
    };
    
    return (
      <div>
        <Dialog
          open={formPopup}
          keepMounted
          // onClose={() => closeFormPopup(false)}
          aria-labelledby="add-new-asset-title"
          aria-describedby="add-new-asset"
          fullWidth
          maxWidth="md"
          className="popup-outer"
        >
          <form onSubmit={formik.handleSubmit}>
            <Box className="popup-section">
              <Box className="title-popup">
                <Typography>{type} asset</Typography>
                <CloseIcon
                  onClick={() => {
                    closeFormPopup(false);
                    clearForm();
                  }}
                />
              </Box>
              <Grid container spacing={2} sx={{ width: '100%', m: 0 }}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={5}
                  lg={4}
                  sx={{
                    padding: '0px !important',
                    paddingRight: {
                      xs: '0px !important',
                      md: '30px !important',
                    },
                  }}
                >
                  <Box>
                    <Box style={{width: '220px', height: '220px', padding: '10px', background: '#e4e5e7', margin: 'auto'}}>
                      <img src={uploadedFile === null ? preview : uploadedFile} alt="assetimg" style={{width: '100%', height: '100%'}} />
                    </Box>
                    <Box
                      className="edit-profile-btn"
                      sx={{ mt: 3, mb: 3, pb: '0px !important' }}
                    >
                      <span className="file-wrapper">
                        <input   ref={fileUploadField} type="file" name="photo" id="photo"   onChange={handleImageUpload} />
                        <span className="button" onClick={triggerFileUploadField}>Upload photo</span>
                      </span>
                      {/* {formik.touched.assets_image &&
                        formik.errors.assets_image && (
                          <Typography className="error-field">
                            {formik.errors.assets_image}
                          </Typography>
                        )} */}
                    </Box>
                    {/* <Box className="asset-id">
                      <label>Asset Id (autogenerated)</label>
                      <TextField
                        margin="none"
                        fullWidth
                        id="assets_id"
                        name="assets_id"
                        autoComplete="assets_id"
                        InputLabelProps={{ shrink: false }}
                        placeholder="Assets Id"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        size="small"
                    
                        disabled
                      />
                     
                    </Box> */}
                    {/* <Box>
                      <Typography className="recent-use">
                        Recently used
                      </Typography>
                      <Box className="data-detail">
                        <img src={darkcircle} alt="darkcircle" />
                        <Typography>no data found</Typography>
                      </Box>
                      <Timeline className="asset-timeline">
                        <TimelineItem>
                          <TimelineSeparator>
                            <TimelineDot>
                              <img src={darkcircle} alt="darkcircle" />
                            </TimelineDot>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent className="timeline-content">
                            <Typography>Date:22/05/2023</Typography>
                            <Typography>Dept-Computer science</Typography>
                            <Typography>Dept-Computer science</Typography>
                          </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                          <TimelineSeparator>
                            <TimelineDot>
                              <img src={lightcircle} alt="lightcircle" />
                            </TimelineDot>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent className="timeline-content">
                            <Typography>Date:22/05/2023</Typography>
                            <Typography>Dept-Computer science</Typography>
                            <Typography>Dept-Computer science</Typography>
                          </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                          <TimelineSeparator>
                            <TimelineDot>
                              <img src={lightcircle} alt="lightcircle" />
                            </TimelineDot>
                          </TimelineSeparator>
                          <TimelineContent>
                            <Box className="edit-profile-btn view-more">
                              <Button>View more</Button>
                            </Box>
                          </TimelineContent>
                        </TimelineItem>
                      </Timeline>
                    </Box> */}
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={7}
                  lg={8}
                  sx={{
                    padding: '0px !important',
                    paddingTop: { xs: '30px !important', md: '0px !important' },
                  }}
                >
                  <Box>
                    <Grid container spacing={2} className="asset-popup">
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box style={{ position: 'relative' }}>
                          <label>Assets name<span style={{ color: "#E2445C" }}>*</span></label>
                          <TextField
                            margin="normal"
                            fullWidth
                            id="name"
                            name="name"
                            autoComplete="off"
                            InputLabelProps={{ shrink: false }}
                            placeholder="Assets name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            size="small"
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
                    <Grid
                      container
                      spacing={2}
                      className="asset-popup calender-sec"
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
                          <label>Purchase date<span style={{ color: "#E2445C" }}>*</span></label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}  name='perchasedDate'>
                            <DatePicker 
                              format="DD/MM/YYYY"
                              onChange={(selectedDate: any) =>
                                handleDateChanges(selectedDate, 'perchasedDate')
                              }
                              value={formik.values.perchasedDate}
                            />
                          </LocalizationProvider>
                          {formik.touched.perchasedDate &&
                            formik.errors.perchasedDate && (
                              <Typography className="error-field">
                                Purchase date required
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
                        <Box>
                          <label>Guaranty/warranty/expiry date<span style={{ color: "#E2445C" }}>*</span></label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker disablePast
                              format="DD/MM/YYYY"
                              onChange={(selectedDate: any) =>
                                handleDateChanges(selectedDate, 'expiryDate')
                              }
                              value={formik.values.expiryDate}
                            />
                          </LocalizationProvider>
                          {/* {formik.touched.expiryDate &&
                            formik.errors.expiryDate && (
                              <Typography className="error-field">
                                required
                              </Typography>
                            )} */}
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} className="asset-popup">
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box style={{ position: 'relative' }}>
                          <label style={{ display: 'block' }}>
                            Organisation<span style={{ color: "#E2445C" }}>*</span>
                          </label>
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
                            {organizationData?.map((item:any, index) => (
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
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      className="asset-popup multi-selection"
                    >
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box style={{ position: 'relative' }}>
                          <label style={{ display: 'block' }}>
                            Department/s<span style={{ color: "#E2445C" }}>*</span>
                          </label>

                          <Autocomplete
                            multiple
                            id="departmentId"
                            // name="laboratoryId"
                            disableCloseOnSelect
                            value={departments}
                            options={
                              departmentData !== undefined ? departmentData : []
                            }
                            getOptionLabel={(option: any) => option.label}
                            isOptionEqualToValue={(option: any, value: any) =>
                              value.id == option.id
                            }
                            renderInput={(params) => (
                              <TextField {...params} placeholder="Department/s" />
                            )}
                            fullWidth
                            placeholder="Department"
                            size="medium"
                            renderOption={(
                              props,
                              option: any,
                              { selected },
                            ) => (
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
                            onChange={(_, selectedOptions: any) =>{
                              setDepartments(selectedOptions);formik.setValues({...formik.values,'departmentId':selectedOptions})}
                            }
                          />
                          {formik.touched.departmentId &&
                            formik.errors.departmentId && (
                              <Typography className="error-field">
                                {formik.errors.departmentId}
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
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box style={{ position: 'relative' }}>
                          <label style={{ display: 'block' }}>
                            Laboratory/ies<span style={{ color: "#E2445C" }}>*</span>
                          </label>

                          <Autocomplete
                            multiple
                            id="laboratoryId"
                            options={labData !== undefined ? labData : []}
                            getOptionLabel={(option: any) => option.label}
                            isOptionEqualToValue={(option: any, value: any) =>
                              value.id == option.id
                            }
                            disableCloseOnSelect
                            value={laboratory}
                            renderInput={(params) => (
                              <TextField {...params} placeholder="Laboratory/ies"/>
                            )}
                            fullWidth
                            placeholder="Laboratory"
                            size="medium"
                            renderOption={(
                              props,
                              option: any,
                              { selected },
                            ) => (
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
                            onChange={(_, selectedOptions: any) =>{
                              setLaboratory(selectedOptions);formik.setValues({...formik.values,'laboratoryId':selectedOptions})}
                            }
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
                        <Box style={{position:'relative'}}>
                          <label style={{ display: 'block' }}>Status<span style={{ color: "#E2445C" }}>*</span></label>

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
                            <MenuItem value={'Active'}>Active</MenuItem>
                            <MenuItem value={'Inactive'}>In-Active</MenuItem>
                            {/* {StatusList.map((item: any) => (
                              <MenuItem key={item.id} value={item.state}>
                                {item.name}
                              </MenuItem>
                            ))} */}
                          </Select>
                          {formik.touched.status && formik.errors.status && (
                            <Typography className="error-field">
                              {formik.errors.status}
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
                        <Box style={{position:'relative'}}>
                          <label style={{ display: 'block' }}>
                            Availability<span style={{ color: "#E2445C" }}>*</span>
                          </label>

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
                            <MenuItem value={'Available'}>Available</MenuItem>
                            <MenuItem value={'In_Use'}>In Use</MenuItem>
                            <MenuItem value={'Not_Available'}>
                              Not Available
                            </MenuItem>
                            {/* {AvailabilityList.map((item) => (
                              <MenuItem key={item.id} value={item.state}>
                                {item.name}
                              </MenuItem>
                            ))} */}
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
              <Divider sx={{py: 1}} />
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
                  disabled={!formik.isValid}
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
export default Addnewpopup;
