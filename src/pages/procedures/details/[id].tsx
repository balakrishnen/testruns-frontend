import React from 'react';
import PrivateRoute from '../../../components/PrivateRoute';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import edit from '../../../assets/images/edit.svg';
import printer from '../../../assets/images/printer.svg';
import { Editor } from '@tinymce/tinymce-react';
import { fetchSingleProcedureData } from '../../../api/procedureAPI';
import { useDispatch, useSelector } from 'react-redux';
import ProcedureForm from '../ProcedureForm';
import SuccessPopup from '../../../components/SuccessPopup';
import { useLocation } from '@reach/router';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import { navigate } from 'gatsby';
import moment from 'moment';
import { fetchAssetsName } from '../../../api/assetsAPI';

const validationSchema = Yup.object().shape({
  name: Yup.string().notRequired(),
  assets: Yup.array().notRequired(),
  procedure: Yup.string().notRequired()
});

const editorData = `<h2>ESTIMATION OF IRON BY COLORIMETRY</h2>
<p>&nbsp;</p>
<h4>AIM:</h4>
<p><span style="font-weight: 400;">To determine the amount of iron in the given solution colorimetrically using thiocyanate as a complexing agent.</span></p>
<p>&nbsp;</p>
<h4>APPARATUS REQUIRED:</h4>
<ul>
<li>Spectrophotometer</li>
<li>Glass cuvettes</li>
<li>Pipettes</li>
<li>Reagents</li>
</ul>
<p>&nbsp;</p>
<h4>PRINCIPLE:</h4>
<p><span style="font-weight: 400;">Iron when complexed with thiocyanate gives intense red color. The intensity of the color depends upon the concentration of iron in the solution. A calibration curve is obtained by plotting optical density versus conc. the amount of iron in the unknown sample is determined from the plot using an observed optical density.</span><strong>&nbsp;</strong></p>
<p>&nbsp;</p>
<h4>PROCEDURE:</h4>
<p><span style="font-weight: 400;">Different aliquots of the standard iron solution(0.5,1,1.5,2,..3ml) were taken in 100ml of the standard flask. 5 ml potassium thiocyanate solution was added followed by 2 ml of 4 n nitric acids to each of the ions solution samples made up to&nbsp; Mark.&nbsp; The mixture in the standard flask was shaken well and a portion of the color of the solution was taken into the cell. The optical density was measured at 490 NM against a blank solution that contained all reagents except metal ions.</span></p>
<p>&nbsp;</p>
<h4 data-table="1">TABULAR COLUMN:</h4>
<table style="border-collapse: collapse; width: 100%;" border="1">
<thead>
<tr>
<td style="width: 31.8857%; text-align: center;" scope="col"><strong>SI.NO</strong></td>
<td style="width: 31.8857%; text-align: center;" scope="col"><strong data-column="1">The concentration of the iron solution in PPM</strong></td>
<td style="width: 31.9859%; text-align: center;" scope="col"><strong data-column="2">Optical density</strong></td>
</tr>
</thead>
<tbody>
<tr>
<td style="width: 31.8857%; text-align: center;">1.</td>
<td style="width: 31.8857%; text-align: center;" data-column="1">&nbsp;<input id="graph1x11" name="value_KTCw3Dg" type="text" />&nbsp;</td>
<td style="width: 31.9859%; text-align: center;" data-column="2"><input id="graph1y11" name="value_zxIBOyC" type="text" />&nbsp;</td>
</tr>
<tr>
<td style="width: 31.8857%; text-align: center;">2.</td>
<td style="width: 31.8857%; text-align: center;" data-column="1">&nbsp;<input id="graph1x12" name="value_ewAAtzE" type="text" />&nbsp;</td>
<td style="width: 31.9859%; text-align: center;" data-column="2">&nbsp;<input id="graph1y12" name="value_RJZC369" type="text" />&nbsp;</td>
</tr>
<tr>
<td style="width: 31.8857%; text-align: center;">3.</td>
<td style="width: 31.8857%; text-align: center;" data-column="1">&nbsp;<input id="graph1x13" name="value_JITYu6K" type="text" />&nbsp;</td>
<td style="width: 31.9859%; text-align: center;" data-column="2">&nbsp;<input id="graph1y13" name="value_WVTb49E" type="text" />&nbsp;</td>
</tr>
<tr>
<td style="width: 31.8857%; text-align: center;">4.</td>
<td style="width: 31.8857%; text-align: center;" data-column="1">&nbsp;<input id="graph1x14" name="value_ie3a1YZ" type="text" />&nbsp;</td>
<td style="width: 31.9859%; text-align: center;" data-column="2">&nbsp;<input id="graph1y14" name="value_Tilkciq" type="text" />&nbsp;</td>
</tr>
<tr>
<td style="width: 31.8857%; text-align: center;">5.</td>
<td style="width: 31.8857%; text-align: center;" data-column="1">&nbsp;<input id="graph1x15" name="value_VZfimCs" type="text" />&nbsp;</td>
<td style="width: 31.9859%; text-align: center;" data-column="2">&nbsp;<input id="graph1y15" name="value_3Th_fIu" type="text" />&nbsp;</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<p>Unknown=<strong>&nbsp;<input id="value_8uNUKWm" name="value_8uNUKWm" type="text" />&nbsp;</strong></p>
<p>&nbsp;</p>
<h4>MODEL GRAPH:</h4>
<p><img style="display: block; margin-left: auto; margin-right: auto;" title="Testrunz - Recreation of Schematic diagram (13).png" src="blob:https://test-runz.netlify.app/4f99dc48-3fe3-40cf-99c4-2a706a378e8b" alt="" width="708" height="398" /></p>
<p>&nbsp;</p>
<p><strong>PRECAUTION:</strong></p>
<div class="group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 bg-gray-50 dark:bg-[#444654]">
<div class="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto">
<div class="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
<div class="flex flex-grow flex-col gap-3">
<div class="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">
<div class="markdown prose w-full break-words dark:prose-invert light">
<ol>
<li>
<p>Safety precautions: Always wear appropriate personal protective equipment (PPE), such as gloves and safety glasses, when handling chemicals.</p>
</li>
<li>
<p>Contamination: Ensure that all glassware is clean and free from any contamination. This can be achieved by rinsing with distilled water and drying with a lint-free cloth.</p>
</li>
<li>
<p>Calibration: Ensure that the spectrophotometer is properly calibrated. This can be achieved by using a standard solution with a known concentration of iron.</p>
</li>
<li>
<p>Standardization: It is important to use a standard solution with a known concentration of iron to ensure accurate results.</p>
</li>
<li>
<p>Blank: Always prepare a blank solution to correct for any background absorbance.</p>
</li>
<li>
<p>Timely measurement: It is important to measure the absorbance of the sample immediately after adding the reagents, as the color of the iron complex may fade over time.</p>
</li>
<li>
<p>Temperature: Keep the temperature of the sample and reagents constant throughout the analysis, as the temperature can affect the formation of the iron complex.</p>
</li>
<li>
<p>Recording the wavelength: Record the wavelength used to measure the absorbance, as this information will be needed for future reference.</p>
</li>
</ol>
</div>
</div>
</div>
<div class="flex justify-between">
<div class="text-gray-400 flex self-end lg:self-center justify-center mt-2 gap-3 md:gap-4 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 visible">&nbsp;</div>
</div>
</div>
</div>
</div>`;

export default function ProcedureDetails() {
  const editorRef: any = React.useRef(null);
  const dispatch: any = useDispatch();
  const [procedureData, setprocedureData] = React.useState<any>({});
  const [assetsList, setAssetsList] = React.useState([]);
  const formPopupRef: any = React.useRef(null);
  const confirmationPopupRef: any = React.useRef(null);
  const successPopupRef: any = React.useRef(null);
  const [assetsData, setAssetsData] = React.useState<any>([]);
  const [assetName, setAssetName] = React.useState([])
  console.log('assetName',assetName);
  
  const procedureSliceData = useSelector(
    (state: any) => state.procedure.data?.get_procedure,
  );
  console.log(procedureSliceData);
  const location: any = useLocation();
  const procedureValue = location.state?.props;
  console.log(procedureValue);
  // console.log('log',window.location)
  const handleCloseFormPopup = (state: any) => {
    formPopupRef.current.open(state);
  };

  const handleSubmitFormPopup = () => {
    formPopupRef.current.open(false);
    successPopupRef.current.open(true, 'Procedure');
    setTimeout(() => {
      successPopupRef.current.open(false, 'Procedure');
    }, 3000);
  };

  const handleOpenConfirmationPopup = (state: any) => {
    confirmationPopupRef.current.open(state);
  };
  const handleConfirmationDone = (state: any) => {
    if (state === 1) {
      formPopupRef.current.open(false);
    }
    confirmationPopupRef.current.open(false);
  };
  React.useEffect(() => {
    setprocedureData(procedureSliceData);
  }, [procedureSliceData]);
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(window.location.pathname.split('/'));
      const procedureId = { _id: window.location.pathname.split('/')[3] };
      dispatch(fetchSingleProcedureData(procedureId));
    }
  }, []);
  const assetsSliceData = useSelector(
    (state: any) => state.assets.data?.get_all_assets_name,
  );

  // React.useEffect(() => {
  //   setAssetsData(assetsData);
  // }, [assetsData]);

  React.useEffect(() => {
    dispatch(fetchAssetsName());
    // setAssetsData(assetsData);
  }, []);
  React.useEffect(() => {
    setAssetsData(
      assetsSliceData?.map((item: any) => ({
        label: item.name,
        value: item.name,
      id: item._id,
      })))
  }, [assetsSliceData]);

  console.log('assetsData',assetsData);
  
  const checkCredentials = (values: any) => {
    return true;
  };

  const onSubmit = (values: any) => {
    // debugger
    const isMatch = checkCredentials(values.name);
    if (isMatch) {
      // dispatch(fetchUpdateAssetsData(values));
      // setFormPopup(false);
    } else {
      formik.setFieldError('name', 'Invalid first name');
    }
  };

  const formik = useFormik({
    initialValues: {
      name: procedureValue.name,
      assets: '',
      procedure: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };
  return (
    <PrivateRoute>
      <Box className="proceduredetails-page">
        <Box className="top-section">
          <Box sx={{ padding: '24px 0px', margin: '0px 24px' }}>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={12} sm={12} md={9} lg={9}>
                <Box>
                  <Typography className="id-detail">
                  {procedureValue?.procedureNumber}&ensp;/&ensp;Dept-Computer
                    science&ensp;/&ensp;Lab-Data structure
                  </Typography>
                  <Typography className="id-detail-title">
                    Bubble sort
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'end',
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    className="edit-btn"
                    onClick={() => {
                      formPopupRef.current.open(true);
                    }}
                  >
                    <img src={edit} alt="edit" style={{ marginRight: '8px' }} />
                    Edit
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                <Box>
                  <Typography className="id-detail">Created by</Typography>
                  <Typography
                    className="id-detail"
                    style={{
                      fontWeight: '600',
                      fontSize: '16px',
                      marginTop: '0.4rem',
                    }}
                  >
                    Super Admin
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                <Box>
                  <Typography className="id-detail">Created on</Typography>
                  <Typography
                    className="id-detail"
                    style={{
                      fontWeight: '600',
                      fontSize: '16px',
                      marginTop: '0.4rem',
                    }}
                  >
                   {moment(procedureValue.createdAt).isValid()
                              ? moment(procedureValue.createdAt)
                                  .local()
                                  .format('MM/DD/YYYY')
                              : moment().format('MM/DD/YYYY')}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ borderColor: '#FFEAA5', borderBottomWidth: '5px' }} />
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Box className="main-proceduredetails">
            <Grid container spacing={2} className="asset-popup">
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box style={{ position: 'relative' }}>
                  <label>Procedure name</label>
                  <TextField
                    margin="none"
                    fullWidth
                    id="name"
                    name="name"
                    autoComplete="name"
                    InputLabelProps={{ shrink: false }}
                    placeholder="Procedure name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    size="small"
                    error={formik.touched.name && Boolean(formik.errors.name)}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <Typography className="error-field">
                      {formik.errors.name}
                    </Typography>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box style={{ position: 'relative' }}>
                  <label>Assets name</label>
                  <Autocomplete
                    multiple
                    id="departmentId"
                    disableCloseOnSelect
                    value={assetName}
                    options={assetsData !== undefined ? assetsData : []}
                    getOptionLabel={(option: any) => option.label}
                    isOptionEqualToValue={(option: any, value: any) =>
                      value.id == option.id
                    }
                    renderInput={(params) => <TextField {...params} />}
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
                    onChange={(_, selectedOptions: any) =>
                      setAssetName(selectedOptions)
                    }
                  />
                  {formik.touched.assets && formik.errors.assets && (
                    <Typography className="error-field">
                      {formik.errors.assets}
                    </Typography>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box style={{ position: 'relative' }}>
                  <label>Full procedure</label>
                  <Box sx={{ mt: 1.5 }}>
                    <Editor
                      apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      value={editorData}
                      init={{
                        height: 400,
                        menubar: false,
                        plugins: [
                          'advlist autolink lists link image charmap print preview anchor',
                          'searchreplace visualblocks code fullscreen',
                          'insertdatetime media table paste code help wordcount',
                        ],
                        toolbar:
                          'undo redo | formatselect | ' +
                          'bold italic backcolor | alignleft aligncenter ' +
                          'alignright alignjustify | bullist numlist outdent indent | ' +
                          'removeformat | help',
                        content_style:
                          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* <Grid container spacing={2} className="asset-popup">
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box>
                  <label style={{ color: '#181818' }}>Procedure name</label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    InputLabelProps={{ shrink: false }}
                    placeholder="bubble sort 2"
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="asset-popup">
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box>
                  <label style={{ color: '#181818' }}>Full procedures</label>
                  <Box sx={{ mt: 2 }}>
                    <Editor
                      apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      init={{
                        height: 400,
                        menubar: false,
                        plugins: [
                          'advlist autolink lists link image charmap print preview anchor',
                          'searchreplace visualblocks code fullscreen',
                          'insertdatetime media table paste code help wordcount',
                        ],
                        toolbar:
                          'undo redo | formatselect | ' +
                          'bold italic backcolor | alignleft aligncenter ' +
                          'alignright alignjustify | bullist numlist outdent indent | ' +
                          'removeformat | help',
                        content_style:
                          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid> */}
          </Box>
          <Box className="edit-details" sx={{ p: 2 }}>
            <Button variant="contained" className="cancel-btn" onClick={()=>navigate('/procedures')}>
              Back
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={printer}
                alt="printer"
                style={{ marginRight: '1rem', cursor: 'pointer' }}
              />
              <Button type="submit" variant="contained" className="add-btn">
                Save
              </Button>
            </Box>
          </Box>
        </form>
        <ProcedureForm
          formData={procedureValue}
          type={'edit'}
          ref={formPopupRef}
          closeFormPopup={handleCloseFormPopup}
          submitFormPopup={handleSubmitFormPopup}
          openConfirmationPopup={handleOpenConfirmationPopup}
        />

        <SuccessPopup ref={successPopupRef} />
      </Box>
    </PrivateRoute>
  );
}
