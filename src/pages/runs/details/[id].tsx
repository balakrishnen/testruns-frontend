import React from 'react';
import PrivateRoute from '../../../components/PrivateRoute';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Divider, FormControl, Grid, Select } from '@mui/material';
import edit from '../../../assets/images/edit.svg';
import shareimg from '../../../assets/images/Share-black.svg';
import shareimgarrow from '../../../assets/images/share-arrow-black.svg';
import printer from '../../../assets/images/printer.svg';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import EditPopup from './editpopup';
import SplitPane from 'react-split-pane';
import { Editor } from '@tinymce/tinymce-react';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '../../../assets/images/chevrondown-thin.svg';

import { LineChart, Line, XAxis, CartesianGrid, Tooltip } from 'recharts';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import RunsForm from '../RunsForm';
import SuccessPopup from '../../../components/SuccessPopup';
import { useLocation } from '@reach/router';

const data = [
  { name: 'Jul', plot1: 2684, plot2: 2400, plot3: 1544, amt: 2400 },
  { name: 'Aug', plot1: 3000, plot2: 1398, plot3: 2844, amt: 2210 },
  { name: 'Sep', plot1: 1544, plot2: 1754, plot3: 1472, amt: 2290 },
  { name: 'Oct', plot1: 4654, plot2: 4575, plot3: 3574, amt: 2355 },
  { name: 'Nov', plot1: 3613, plot2: 4564, plot3: 1475, amt: 4323 },
  { name: 'Dec', plot1: 1581, plot2: 2544, plot3: 2965, amt: 3547 },
];

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
        <Box sx={{ p: 3 }}>
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

export default function RunsDetails() {
  const [openDlg2Dialog, setDialog2Open] = React.useState(false);
  const [answers, setAnswers] = React.useState('');
  const [moreInfo, setMoreInfo] = React.useState(false);
  const runsPopupRef: any = React.useRef(null);
  const successPopupRef: any = React.useRef(null);
  const Placeholder = ({ children }: any) => {
    return <div>{children}</div>;
  };
  const location: any = useLocation();
  const runzValue = location.state?.props;
  console.log(runzValue);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const editorRef: any = React.useRef(null);
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };

  const handleSubmitFormPopup = () => {
    runsPopupRef.current.open(false);
    successPopupRef.current.open(true, 'Runs');
    setTimeout(() => {
      successPopupRef.current.open(false, 'Runs');
    }, 3000);
  };

  return (
    <PrivateRoute>
      {/* <EditPopup open={openDlg2Dialog} close={() => setDialog2Open(false)} /> */}
      <Box className="runzdetails-page">
        <Box className="top-section">
          <Box sx={{ padding: '24px 0px', margin: '0px 24px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={10} md={10} lg={5} xl={6}>
                <Box>
                  <Typography className="id-detail">
                    {runzValue?.runNumber}&ensp;/&ensp;Dept-Computer
                    science&ensp;/&ensp;Lab-Data structure
                  </Typography>
                  <Typography className="id-detail-title">
                  {runzValue?.objective}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={2} md={2} lg={7} xl={6}>
                <Box
                  sx={{
                    display: { xs: 'none', lg: 'flex' },
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'end',
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    className="edit-btn"
                  >
                    <img
                      src={shareimgarrow}
                      alt="edit"
                      style={{ marginRight: '8px' }}
                    />
                    Assign
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    className="edit-btn"
                  >
                    <img
                      src={shareimg}
                      alt="edit"
                      style={{ marginRight: '8px' }}
                    />
                    Share
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    className="edit-btn"
                    onClick={() => {
                      // setDialog2Open(true);
                      runsPopupRef.current.open(true);
                    }}
                  >
                    <img src={edit} alt="edit" style={{ marginRight: '8px' }} />
                    Edit
                  </Button>
                  <Button
                    className="edit-btn"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      marginRight: '0rem',
                    }}
                    onClick={() => setMoreInfo(!moreInfo)}
                  >
                    More Info &nbsp;
                    {/* <img
                      src={KeyboardArrowDownIcon}
                      alt="KeyboardArrowDownIcon"
                      style={{ marginLeft: '8px' }}
                    /> */}
                    {!moreInfo ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: { xs: 'block', lg: 'none' },
                    textAlign: 'right',
                  }}
                >
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      <Button
                        type="submit"
                        variant="contained"
                        className="edit-btn"
                      >
                        <img
                          src={shareimgarrow}
                          alt="edit"
                          style={{ marginRight: '8px' }}
                        />
                        Assign
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button
                        type="submit"
                        variant="contained"
                        className="edit-btn"
                      >
                        <img
                          src={shareimg}
                          alt="edit"
                          style={{ marginRight: '8px' }}
                        />
                        Share
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button
                        type="submit"
                        variant="contained"
                        className="edit-btn"
                        onClick={() => {
                          // setDialog2Open(true);
                          runsPopupRef.current.open(true);
                        }}
                      >
                        <img
                          src={edit}
                          alt="edit"
                          style={{ marginRight: '8px' }}
                        />
                        Edit
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button
                        className="edit-btn"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                          marginRight: '0rem',
                        }}
                      >
                        More Info{' '}
                        <img
                          src={KeyboardArrowDownIcon}
                          alt="KeyboardArrowDownIcon"
                          style={{ marginLeft: '8px' }}
                        />
                      </Button>
                    </MenuItem>
                  </Menu>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box
            className="assign-create"
            sx={{
              padding: '24px 0px',
              margin: '0px 24px',
              display: moreInfo ? 'block' : 'none',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                <Box>
                  <Typography className="id-detail">Test objective</Typography>
                  <Typography
                    className="id-detail"
                    style={{
                      fontSize: '16px',
                      marginTop: '0.4rem',
                    }}
                  >
                    Testing
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                <Box>
                  <Typography className="id-detail">Assigned by</Typography>
                  <Typography
                    className="id-detail"
                    style={{
                      fontSize: '16px',
                      marginTop: '0.4rem',
                    }}
                  >
                    Abinaya
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                <Box>
                  <Typography className="id-detail">Created by</Typography>
                  <Typography
                    className="id-detail"
                    style={{
                      fontSize: '16px',
                      marginTop: '0.4rem',
                    }}
                  >
                    Teacher A
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                <Box>
                  <Typography className="id-detail">Created on</Typography>
                  <Typography
                    className="id-detail"
                    style={{
                      fontSize: '16px',
                      marginTop: '0.4rem',
                    }}
                  >
                    28/05/2023 (Wed)
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                <Box>
                  <Typography className="id-detail">Status</Typography>
                  <FormControl className="Status-info">
                    <Select
                      labelId="Status-popup-label"
                      id="Status-info"
                      value={answers}
                      displayEmpty
                      IconComponent={ExpandMoreOutlinedIcon}
                      onChange={(event) => setAnswers(event.target.value)}
                      renderValue={
                        answers !== ''
                          ? undefined
                          : () => <Placeholder>Status</Placeholder>
                      }
                      className="list-completed"
                    >
                      <MenuItem
                        value={'1'}
                        style={{
                          background: '#E2445C',
                          color: '#fff',
                          fontSize: '14px',
                        }}
                      >
                        Not Started
                      </MenuItem>
                      <MenuItem
                        value={'2'}
                        style={{
                          background: '#00BF70',
                          color: '#fff',
                          fontSize: '14px',
                        }}
                      >
                        Completed
                      </MenuItem>
                      <MenuItem
                        value={'3'}
                        style={{
                          background: '#F8A83C',
                          color: '#fff',
                          fontSize: '14px',
                        }}
                      >
                        Working
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ borderColor: '#FFEAA5', borderBottomWidth: '5px' }} />
        </Box>

        <Box className="main-runzdetails runz-height">
          {/* <SplitPane> */}
          {/* <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={7}
              xl={7}
              className="runz-height leftside-runz"
              sx={{ padding: '24px!important', overflowY: 'auto' }}
            >
              <Box>
                <Box sx={{ fontSize: '14px' }}>
                  Aim To measure the time period of a simple pendulum. Apparatus
                  required A wire of unknown resistance (~10Ω), battery
                  eliminator or an accumulator (0 to 3V) or two dry cells (1.5 V
                  each), voltmeter (0-5 V), milliammeter (0– 500 mA), rheostat,
                  plug key, connecting wires and a piece of sand paper.
                  Principle is directly proportional to the potential difference
                  across its ends, provided the physical state of the conductor
                  remains unchanged. If I be the current flowing through the
                  conductor and V the potential difference across its ends, then
                  according to Ohm s law V I ∝ and hence V = RI where R is the
                  constant of proportionality and is termed as the electrical
                  resistance of the conductor. If V is expressed in volts and I
                  in amperes, then R is expressed in ohms. The resistance R,
                  depends upon the material and dimensions of the conductor. For
                  a wire of uniform cross-section, the resistance depends on the
                  length l and the area of cross-section A. It also depends on
                  the temperature of the conductor. At a given temperature the
                  resistance R = l A ρ where ρ is the specific resistance or
                  resistivity and is characteristic of the material of wire.
                  Procedure 1. Clean the ends of the connecting wires with the
                  help of sand paper in order to remove any insulating coating
                  on them. 2. Connect various components - resistance, rheostat,
                  battery, key, voltmeter and ammeter as shown in Fig. E 1.2. 3.
                  Note whether pointers in milliammeter and voltmeter coincide
                  with the zero mark on the measuring scale. If it is not so,
                  adjust the pointer to coincide with the zero mark by adjusting
                  the screw provided near the base of the needle using a screw
                  driver. 4. Note the range and least count of the given
                  voltmeter and milliammeter. 5. Insert the key K and slide the
                  rheostat contact to one of its extreme ends, so that current
                  passing through the resistance wire is minimum. 6. Note the
                  milliammeter and voltmeter readings. 7. Remove the key K and
                  allow the wire to cool, if heated. Again insert the key. Shift
                  the rheostat contact slightly to increase the applied voltage.
                  Note the milliammeter and voltmeter reading. 8. Repeat step 7
                  for four different settings of the rheostat. Record your
                  observations in a tabular form. Observations 1. Range of
                  ammeter = 0 ... mA to ...mA 2. Least count of ammeter = ... mA
                  3. Range of voltmeter = 0 ... V to ...V 4. Least count of
                  voltmeter = ...V 5. Least count of metre scale = ... m 6.
                  Length of the given wire, l = ...m Aim To measure the time
                  period of a simple pendulum. Apparatus required A wire of
                  unknown resistance (~10Ω), battery eliminator or an
                  accumulator (0 to 3V) or two dry cells (1.5 V each), voltmeter
                  (0-5 V), milliammeter (0– 500 mA), rheostat, plug key,
                  connecting wires and a piece of sand paper. Principle is
                  directly proportional to the potential difference across its
                  ends, provided the physical state of the conductor remains
                  unchanged. If I be the current flowing through the conductor
                  and V the potential difference across its ends, then according
                  to Ohms law V I ∝ and hence V = RI where R is the constant of
                  proportionality and is termed as the electrical resistance of
                  the conductor. If V is expressed in volts and I in amperes,
                  then R is expressed in ohms. The resistance R, depends upon
                  the material and dimensions of the conductor. For a wire of
                  uniform cross-section, the resistance depends on the length l
                  and the area of cross-section A. It also depends on the
                  temperature of the conductor. At a given temperature the
                  resistance R = l A ρ where ρ is the specific resistance or
                  resistivity and is characteristic of the material of wire.
                  Procedure 1. Clean the ends of the connecting wires with the
                  help of sand paper in order to remove any insulating coating
                  on them. 2. Connect various components - resistance, rheostat,
                  battery, key, voltmeter and ammeter as shown in Fig. E 1.2. 3.
                  Note whether pointers in milliammeter and voltmeter coincide
                  with the zero mark on the measuring scale. If it is not so,
                  adjust the pointer to coincide with the zero mark by adjusting
                  the screw provided near the base of the needle using a screw
                  driver. 4. Note the range and least count of the given
                  voltmeter and milliammeter. 5. Insert the key K and slide the
                  rheostat contact to one of its extreme ends, so that current
                  passing through the resistance wire is minimum. 6. Note the
                  milliammeter and voltmeter readings. 7. Remove the key K and
                  allow the wire to cool, if heated. Again insert the key. Shift
                  the rheostat contact slightly to increase the applied voltage.
                  Note the milliammeter and voltmeter reading. 8. Repeat step 7
                  for four different settings of the rheostat. Record your
                  observations in a tabular form. Observations 1. Range of
                  ammeter = 0 ... mA to ...mA 2. Least count of ammeter = ... mA
                  3. Range of voltmeter = 0 ... V to ...V 4. Least count of
                  voltmeter = ...V 5. Least count of metre scale = ... m 6.
                  Length of the given wire, l = ...m
                </Box>
              </Box>
            </Grid> */}
          {/* <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={5}
              xl={5}
              className="rightside-runz"
              sx={{ borderLeft: { xs: '0px', lg: '2px solid #9F9F9F;' } }}
            > */}
          <Box className="runz-height" sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 0 }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="tabs-common"
                className="tabs-common"
              >
                <Tab label="Procedures" {...a11yProps(0)} />
                <Tab label="Results" {...a11yProps(1)} />
                <Tab label="Charts" {...a11yProps(2)} />
                <Tab label="Remarks" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <Box sx={{ paddingBottom: '6rem' }}>
              <CustomTabPanel value={value} index={0}>
                <div dangerouslySetInnerHTML={{ __html: editorData }} />
                {/* <Editor
                  apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  init={{
                    height: 1000,
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
                  value={editorData}
                /> */}
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Editor
                  apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  init={{
                    height: 500,
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
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <Box>
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',
                      }}
                    >
                      <Typography className="chart-title">
                        Chart no. 1
                      </Typography>
                      <Button
                        type="submit"
                        variant="contained"
                        className="add-chart"
                      >
                        <AddIcon sx={{ mr: 1 }} />
                        Add
                      </Button>
                    </Box>
                    <Box>
                      <Grid
                        container
                        spacing={2}
                        style={{
                          justifyContent: 'space-between',
                          marginBottom: '2rem',
                        }}
                      >
                        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                          <Box className="color-chart">
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                              }}
                            >
                              <Typography className="xy-sec">X</Typography>
                              <FormControl fullWidth size="medium">
                                <Select
                                  labelId="view-all-label"
                                  id="time-sec"
                                  value={answers}
                                  displayEmpty
                                  IconComponent={ExpandMoreOutlinedIcon}
                                  onChange={(event) =>
                                    setAnswers(event.target.value)
                                  }
                                  renderValue={
                                    answers !== ''
                                      ? undefined
                                      : () => <Placeholder>Time</Placeholder>
                                  }
                                >
                                  <MenuItem value={'1'}>1</MenuItem>
                                  <MenuItem value={'2'}>2</MenuItem>
                                  <MenuItem value={'3'}>3</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                            <Box className="color-picker">
                              <input type="color" className="color-input" />
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                          <Box>
                            <Box className="color-chart">
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  width: '100%',
                                }}
                              >
                                <Typography className="xy-sec">Y1</Typography>
                                <FormControl fullWidth size="medium">
                                  <Select
                                    labelId="view-all-label"
                                    id="time-sec"
                                    value={answers}
                                    displayEmpty
                                    IconComponent={ExpandMoreOutlinedIcon}
                                    onChange={(event) =>
                                      setAnswers(event.target.value)
                                    }
                                    renderValue={
                                      answers !== ''
                                        ? undefined
                                        : () => <Placeholder>Time</Placeholder>
                                    }
                                  >
                                    <MenuItem value={'1'}>1</MenuItem>
                                    <MenuItem value={'2'}>2</MenuItem>
                                    <MenuItem value={'3'}>3</MenuItem>
                                  </Select>
                                </FormControl>
                              </Box>
                              <Box className="color-picker">
                                <input type="color" className="color-input" />
                              </Box>
                            </Box>
                            <Box className="color-chart">
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  width: '100%',
                                }}
                              >
                                <Typography className="xy-sec">Y2</Typography>
                                <FormControl fullWidth size="medium">
                                  <Select
                                    labelId="view-all-label"
                                    id="time-sec"
                                    value={answers}
                                    displayEmpty
                                    IconComponent={ExpandMoreOutlinedIcon}
                                    onChange={(event) =>
                                      setAnswers(event.target.value)
                                    }
                                    renderValue={
                                      answers !== ''
                                        ? undefined
                                        : () => <Placeholder>Time</Placeholder>
                                    }
                                  >
                                    <MenuItem value={'1'}>1</MenuItem>
                                    <MenuItem value={'2'}>2</MenuItem>
                                    <MenuItem value={'3'}>3</MenuItem>
                                  </Select>
                                </FormControl>
                              </Box>
                              <Box className="color-picker">
                                <input type="color" className="color-input" />
                              </Box>
                            </Box>
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Button
                              type="submit"
                              variant="contained"
                              className="add-chart"
                            >
                              <AddIcon sx={{ mr: 1 }} />
                              Add
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                  <Box>
                    <LineChart width={750} height={400} data={data}>
                      <XAxis dataKey="name" />
                      <Tooltip />
                      <CartesianGrid stroke="#f5f5f5" strokeDasharray="2 2" />
                      <Line
                        type="monotone"
                        dataKey="plot1"
                        stroke="#ff7300"
                        yAxisId={1}
                      />
                      <Line
                        type="monotone"
                        dataKey="plot2"
                        stroke="#387908"
                        yAxisId={1}
                      />
                      <Line
                        type="monotone"
                        dataKey="plot3"
                        stroke="#7631CD"
                        yAxisId={1}
                      />
                    </LineChart>
                  </Box>
                </Box>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
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
              </CustomTabPanel>
            </Box>
          </Box>
          <Box className="edit-details" sx={{ p: 2 }}>
            <Button type="submit" variant="contained" className="cancel-btn">
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
          {/* </Grid> */}
          {/* </SplitPane> */}
        </Box>
      </Box>
      <SuccessPopup ref={successPopupRef} type="edit" />
      <RunsForm
        formData={runzValue}
        ref={runsPopupRef}
        type="edit"
        submitFormPopup={handleSubmitFormPopup}
      />
    </PrivateRoute>
  );
}
