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
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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

const validationSchema = Yup.object().shape({
  name: Yup.string().notRequired(),
  perchasedDate: Yup.string().notRequired(),
  expiryDate: Yup.string().notRequired(),
  departmentId: Yup.array().notRequired(),
  laboratoryId: Yup.array().notRequired(),
  organisationId: Yup.string().notRequired(),
  status: Yup.string().notRequired(),
  // assets_image: Yup.string().notRequired(),
  availability: Yup.string().notRequired(),
  // assets_id: Yup.string().notRequired(),
  lastUsedDate: Yup.string().notRequired(),
});

const Addnewpopup = React.forwardRef(
  (
    { closeFormPopup, openConfirmationPopup, fetchData, type }: any,
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
    const [departments, setDepartments] = React.useState([])
    const [laboratory, setLaboratory] = React.useState([])
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
        dispatch(postAssetsData(values));
        submitFormPopup()

      } else {
        formik.setFieldError('name', 'Invalid first name');
      }
    };

    const submitFormPopup = () => {
      setFormPopup(false);
      successPopupRef.current.open(true, 'Asset');
      setTimeout(() => {
        successPopupRef.current.open(false, 'Asset');
      }, 3000);
    };

    const Placeholder = ({ children }: any) => {
      return <div>{children}</div>;
    };

    const formik = useFormik({
      initialValues: {
        name: '',
        perchasedDate: new Date(),
        expiryDate: new Date(),
        departmentId: [],
        laboratoryId: [],
        organisationId: '',
        status: '',
        // assets_image: '',
        availability: '',
        // assets_id: 'ASSE-1000',
        lastUsedDate: new Date(),
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
      }
    };

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
                <Typography>{type} asset</Typography>
                <CloseIcon onClick={() => closeFormPopup(false)} />
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
                    <Box className="asset-upload">
                      <img src={assetimg} alt="assetimg" />
                    </Box>
                    <Box
                      className="edit-profile-btn"
                      sx={{ mt: 3, mb: 3, pb: '0px !important' }}
                    >
                      <span className="file-wrapper">
                        <input type="file" name="photo" id="photo" />
                        <span className="button">Upload photo</span>
                      </span>
                      {/* {formik.touched.assets_image &&
                        formik.errors.assets_image && (
                          <Typography className="error-field">
                            {formik.errors.assets_image}
                          </Typography>
                        )} */}
                    </Box>
                    <Box className="asset-id">
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
                        // value={formik.values.assets_id}
                        size="small"
                        // error={
                        //   formik.touched.assets_id &&
                        //   Boolean(formik.errors.assets_id)
                        // }
                        disabled
                      />
                      {/* {formik.touched.assets_id && formik.errors.assets_id && (
                        <Typography className="error-field">
                          {formik.errors.assets_id}
                        </Typography>
                      )} */}
                    </Box>
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
                        <Box>
                          <label>Assets name</label>
                          <TextField
                            margin="normal"
                            fullWidth
                            id="name"
                            name="name"
                            autoComplete="name"
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
                        <Box>
                          <label>Purchase date</label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker format="DD/MM/YYYY" />
                          </LocalizationProvider>
                          {formik.touched.perchasedDate &&
                            formik.errors.perchasedDate && (
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
                        sx={{
                          paddingLeft: { sm: '1rem !important' },
                          paddingTop: {
                            xs: '0rem !important',
                            sm: '1rem !important',
                          },
                        }}
                      >
                        <Box>
                          <label>Guaranty/warranty/expiry date</label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker format="DD/MM/YYYY" />
                          </LocalizationProvider>
                          {formik.touched.expiryDate &&
                            formik.errors.expiryDate && (
                              <Typography className="error-field">
                                Date required
                              </Typography>
                            )}
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} className="asset-popup">
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box>
                          <label style={{ display: 'block' }}>
                            Organisation
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
                        <Box>
                          <label style={{ display: 'block' }}>
                            Department/s
                          </label>

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
                        <Box>
                          <label style={{ display: 'block' }}>
                            Laboratory/ies
                          </label>

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
                    <Grid container spacing={2} className="asset-popup">
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        sx={{ paddingRight: { sm: '1rem !important' } }}
                      >
                        <Box>
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
                          <label style={{ display: 'block' }}>
                            Availability
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
                            {AvailabilityList.map((item) => (
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
export default Addnewpopup;
