/* eslint-disable no-var */
import React from 'react';
import PrivateRoute from '../../../components/PrivateRoute';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material';
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
import RemoveIcon from '@mui/icons-material/Remove';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'react-toastify';
import AddPeoplePopup from '../../../components/AddPeoplePopup';

import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from 'recharts';
import {
  AddOutlined,
  CloseOutlined,
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from '@mui/icons-material';
import RunsForm from '../RunsForm';
import SuccessPopup from '../../../components/SuccessPopup';
import { useLocation } from '@reach/router';
import moment from 'moment';
import { RunsStatusList } from '../../../utils/data';
import { fetchTableChartData, fetchUpdateRunsData } from '../../../api/RunsAPI';
import { useDispatch } from 'react-redux';
import { navigate } from 'gatsby';
import { useSelector } from 'react-redux';

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

// {
//   name: 600,
//   plot1: 81,
//   plot2: 44,
//   plot3: 25,
//   plot4: 14,
//   amt: 47,
// },

export default function RunsDetails() {
  const [openDlg2Dialog, setDialog2Open] = React.useState(false);
  const [answers, setAnswers] = React.useState('');
  const [runsOpen, setRunsOpen] = React.useState(false);
  const [moreInfo, setMoreInfo] = React.useState(false);
  const runsPopupRef: any = React.useRef(null);
  const successPopupRef: any = React.useRef(null);
  const [chartTable, setChartTable] = React.useState(null);
  const runsStatus = RunsStatusList;
  const inputRefs = React.useRef<any>({});

  const handleInputChange = (id: any, column: any) => {
    const value = inputRefs.current[id]?.[column]?.value;
    console.log(`Input ${id}, Column ${column}: ${value}`);
  };
  const [axisList, setAxisList] = React.useState<any>([
    { name: 'Y1', value: 'Y1' },
    { name: 'Y2', value: 'Y2' },
    { name: 'Y3', value: 'Y3' },
    { name: 'Y4', value: 'Y4' },
  ]);
  const [channelsList, setChannelsList] = React.useState<any>([
    { name: 'Concentration', value: 'Concentration' },
    { name: 'Density', value: 'Density' },
    { name: 'Velocity', value: 'Velocity' },
  ]);
  const [xAxisList, setXAxisList] = React.useState<any>([
    { name: 'Temperature', value: 'Temperature' },
    { name: 'Speed', value: 'Speed' },
    { name: 'Time', value: 'Time' },
  ]);

  const [charts, setCharts] = React.useState<any>([]);

  const [chartLines, setChartLines] = React.useState([
    {
      dataKey: 'plot1',
      stroke: '#e22828',
      yAxisId: 'left1',
      dot: {
        r: 1,
        fill: '#e22828',
      },
    },
    {
      dataKey: 'plot2',
      stroke: '#90239f',
      yAxisId: 'right1',
      dot: {
        r: 1,
        fill: '#90239f',
      },
    },
    {
      dataKey: 'plot3',
      stroke: '#111fdf',
      yAxisId: 'left2',
      dot: {
        r: 1,
        fill: '#111fdf',
      },
    },
    {
      dataKey: 'plot4',
      stroke: '#38e907',
      yAxisId: 'right2',
      dot: {
        r: 1,
        fill: '#38e907',
      },
    },
  ]);

  const [ddData, setData] = React.useState([
    { name: 'Jan', uv: 4000 },
    { name: 'Jan', uv: 2000 },
  ]);

  const [yAxis, setYAxis] = React.useState([
    {
      yAxisId: 'left1',
      orientation: 'left',
      label: {
        value: 'Y1',
        angle: -90,
        position: 'insideBottom',
        fill: '#e22828',
      },
      tick: {
        fontSize: 12,
      },
    },
    {
      yAxisId: 'left2',
      orientation: 'left',
      label: {
        value: 'Y3',
        angle: -90,
        position: 'insideBottom',
        fill: '#111fdf',
      },
      tick: {
        fontSize: 12,
      },
    },
    {
      yAxisId: 'right1',
      orientation: 'right',
      label: {
        value: 'Y2',
        angle: -90,
        position: 'insideBottom',
        fill: '#90239f',
      },
      tick: {
        fontSize: 12,
      },
    },
    {
      yAxisId: 'right2',
      orientation: 'right',
      label: {
        value: 'Y4',
        angle: -90,
        position: 'insideBottom',
        fill: '#38e907',
      },
      tick: {
        fontSize: 12,
      },
    },
  ]);

  const Placeholder = ({ children }: any) => {
    return <div style={{ color: 'lightgrey' }}>{children}</div>;
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
  const tableChartSlice = useSelector(
    (state) => state.tableChart.data?.static_chart,
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const editorRef: any = React.useRef(null);
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };

  const colorsList = ['#e22828', '#90239f', '#111fdf', '#38e907'];

  React.useEffect(() => {
    dispatch(fetchTableChartData('655b261e7e26fb0012425184'));
  }, []);

  React.useEffect(() => {
    const data: any = [];
    const tableList: any = [];
    if (tableChartSlice) {
      tableChartSlice.forEach((element, index) => {
        const tableChartOptionsList: any = [];
        const tableChartValues: any = [];
        const tableChannelsList: any = [];
        const tableChartData: any = [];

        element.rows.forEach((rows) => {
          tableChartData.push(rows.values);
        });

        for (let i = 0; i < 4; i++) {
          tableChartOptionsList.push({
            name: element.headers[i] ? element.headers[i] : null,
            value: `Y${i + 1}`,
            yAxis: `Y${i + 1}`,
            color: colorsList[i],
            yAxisId:
              i === 0
                ? 'left1'
                : i === 1
                ? 'right1'
                : i === 2
                ? 'left2'
                : 'right2',
            orientation: i % 2 === 0 ? 'left' : 'right',
            dataKey: `plot${[i + 1]}`,
            channelValue: null,
            xValue: null,
            yValue: `Y${i + 1}`,
            tableChartData: tableChartData,
          });
        }

        element.headers.forEach((head: any) => {
          tableChannelsList.push({
            name: head,
            value: head,
          });
        });

        tableList.push({
          name: element.tableName[0],
          value: element.tableName[0],
        });

        element.rows.forEach((row, rowIndex) => {
          row.values.forEach((value, valueIndex) => {
            tableChartValues.push({
              [`plot${rowIndex + 1}`]: value,
              name: value,
            });
          });
        });
        data.push({
          name: element.tableName[0] ? element.tableName[0] : null,
          selectedTable: null,
          tableChartValues: [],
          tableChartOptionsList: tableChartOptionsList,
          tableChannelsList: tableChannelsList,
          tableList: tableList,
          activeChannelOptions: [],
          activeTableChartValues: [],
          xValue: null,
        });
      });
      // console.log('######', data);
      setCharts(data);
    }
  }, [tableChartSlice]);

  const handleSubmitFormPopup = () => {
    runsPopupRef.current.open(false);
    successPopupRef.current.open(true, 'Runs');
    setTimeout(() => {
      successPopupRef.current.open(false, 'Runs');
    }, 3000);
  };

  const handleXAxisChange = (event: any, dataIndex: any) => {
    const data = [...charts];
    data[dataIndex].xValue = event.target.value;
    setCharts(data);
  };

  const handleYAxisChange = (event: any, dataIndex: any, keyIndex) => {
    const data = [...charts];
    const values = { ...data[dataIndex] };
    values.tableChartOptionsList[keyIndex].value = event.target.value;
    values.tableChartOptionsList[keyIndex].yValue = event.target.value;
    setCharts(data);
  };

  const handleTabularColumnChange = (event: any, dataIndex: any) => {
    const data = [...charts];
    data[dataIndex].selectedTable = event.target.value;
    const removedOptions = charts[dataIndex].tableChartOptionsList.filter(
      (item) => item.name !== null,
    );
    data[dataIndex].activeChannelOptions = removedOptions;
    setCharts(data);
  };

  const handleChannelChange = (event: any, dataIndex: any, keyIndex) => {
    const data = [...charts];
    const values = { ...data[dataIndex] };
    const newIndex = values.activeChannelOptions.length + 1;
    values.tableChartOptionsList[keyIndex].channelValue = event.target.value;
    if (values.activeChannelOptions[keyIndex]) {
      if (values.activeTableChartValues.length === 0) {
        values.activeChannelOptions[keyIndex].tableChartData.forEach(
          (val, vi) => {
            values.activeTableChartValues[vi] = {
              name: val[0],
              [`plot${keyIndex + 1}`]: val[0],
            };
          },
        );
      } else {
        values.activeChannelOptions[keyIndex].tableChartData.forEach(
          (val, vi) => {
            values.activeTableChartValues[vi] = {
              ...values.activeTableChartValues[vi],
              name: val[0],
              [`plot${keyIndex + 1}`]: val[0],
            };
          },
        );
      }
    } else {
      values.activeTableChartValues[newIndex] = {
        ...values.activeTableChartValues[newIndex],
        name: 0,
        [`plot${keyIndex + 1}`]: 0,
      };
    }

    setCharts(data);
  };

  const handleColorPickerChange = (event: any, dataIndex: any, keyIndex) => {
    const data = [...charts];
    const values = { ...data[dataIndex] };
    values.tableChartOptionsList[keyIndex].color = event.target.value;
    setCharts(data);
  };

  const handleAddChart = () => {
    const data = [...charts];
    const tableChartOptionsList = [];
    for (let i = 0; i < 4; i++) {
      tableChartOptionsList.push({
        name: null,
        value: `Y${i + 1}`,
        yAxis: `Y${i + 1}`,
        color: colorsList[i],
        yAxisId:
          i === 0 ? 'left1' : i === 1 ? 'right1' : i === 2 ? 'left2' : 'right2',
        orientation: i % 2 === 0 ? 'left' : 'right',
        dataKey: `plot${[i + 1]}`,
        channelValue: null,
        xValue: null,
        yValue: `Y${i + 1}`,
      });
    }
    data.push({
      name: null,
      selectedTable: null,
      tableChartValues: [],
      tableChartOptionsList: tableChartOptionsList,
      tableChannelsList: [],
      tableList: data[0].tableList,
      activeChannelOptions: [],
      activeTableChartValues: [],
    });
    setCharts(data);
  };

  const handleAddChannel = (dataIndex) => {
    const data = [...charts];
    data[dataIndex].tableChartOptionsList.push({
      color: '#000',
      axisY: 'Y1',
      channelName: null,
      value: 'Y1',
      channelValue: null,
      yAxisId: 'left1',
      dataKey: `plot${charts[dataIndex].tableChartOptionsList.length + 1}`,
      name: null,
      yAxis: `Y1`,
      orientation: dataIndex % 2 === 0 ? 'left' : 'right',
      xValue: null,
      yValue: `Y1`,
    });
    setCharts(data);
  };

  const handleRemoveChart = (dataIndex) => {
    const data = [...charts];
    const spliceData = data.splice(dataIndex, 1);
    setCharts(data);
  };

  const handleRemoveChannel = (dataIndex) => {
    const data = [...charts];
    const values = { ...data[dataIndex] };
    const spliceData = values.tableChartOptionsList.splice(4, 1);
    setCharts(data);
  };
  const printDocument = () => {
    const input: any = document.getElementById('divToPrint');
    // Set the desired PDF size (A4 or A3)
    const pdfWidth = typeof window !== 'undefined' && window.innerWidth;
    const pdfHeight = typeof window !== 'undefined' && window.innerHeight;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: 'portrait',
        format: [pdfWidth, pdfHeight],
      });

      pdf.addImage(imgData, 'JPEG', 0, 0);
      pdf.save('chart.pdf');
    });
  };
  const dispatch: any = useDispatch();
  console.log(value, 'value');

  const handleOnChange = (e: any, row: any) => {
    console.log(e.target.value);

    console.log('change', row.departmentId, row.laboratoryId);
    var runsChange: any = {
      _id: row._id,
    };
    if (e.target.name == 'status') {
      runsChange['status'] = e.target.value;
    }
    console.log(runsChange);
    dispatch(fetchUpdateRunsData(runsChange));
    toast('Runs status updated !', {
      style: {
        background: '#00bf70',
        color: '#fff',
      },
    });
    // reload();
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
                    {runzValue?.runNumber}
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
                    onClick={() => {
                      setRunsOpen(true);
                    }}
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
                    onClick={() => {
                      setRunsOpen(true);
                    }}
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
                    {runzValue?.objective}
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
                    Super Admin
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
                    {moment(parseInt(runzValue?.createdAt)).format(
                      'MM/DD/YYYY',
                    )}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                <Box>
                  <Typography className="id-detail">Status</Typography>
                  <FormControl
                    className="Status-info"
                    style={{ marginTop: '7px' }}
                  >
                    <Box
                      style={{
                        borderRadius: '20px',
                        color: 'white',
                        width: '110px',
                        padding: '9px 0px',
                        alignItems: 'center',
                        textAlign: 'center',
                        height: '24px',
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: '12px',
                        backgroundColor:
                          runzValue?.status == 'Created'
                            ? '#8d8d8d'
                            : runzValue?.status == 'Started'
                            ? '#faaa49'
                            : runzValue?.status == 'Complete'
                            ? '#00bf70'
                            : '#e2445c',
                      }}
                    >
                      {runzValue?.status == 'Created'
                        ? 'Created'
                        : runzValue?.status == 'Started'
                        ? 'Started'
                        : runzValue?.status == 'Complete'
                        ? 'Completed'
                        : 'Stopped'}
                    </Box>
                    {/* <Select
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
                      {runsStatus.map((element: any) => (
                              <MenuItem
                                value={element.value}
                                key={element.value}
                              >
                                {element.name}
                              </MenuItem>
                            ))}
                    </Select> */}
                  </FormControl>
                  {/* <FormControl className="Status-info"> */}
                  {/* <Select
                            name="status"
                            className={
                              runzValue?.status === 'Created'
                                ? 'create-select td-select'
                                : runzValue?.status === 'Started'
                                ? 'start-select td-select'
                                : runzValue?.status === 'Complete'
                                ? 'active-select td-select'
                                : 'inactive-select td-select'
                            }
                            value={runzValue?.status ? runzValue?.status : 'Stopped'}
                            displayEmpty
                            onChange={(e) => handleOnChange(e, row)}
                            IconComponent={ExpandMoreOutlinedIcon}
                          >
                            {RunsStatusList.map((element: any) => (
                              <MenuItem
                                value={element.value}
                                key={element.value}
                              >
                                {element.name}
                              </MenuItem>
                            ))}
                          </Select> */}
                  {/* </FormControl> */}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ borderColor: '#FFEAA5', borderBottomWidth: '5px' }} />
        </Box>

        <Box className="main-runzdetails runz-height">
          <Box className="runz-height" sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 0 }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="tabs-common"
                className="tabs-common"
              >
                <Tab label="Procedures" {...a11yProps(0)} />
                <Tab label="Charts" {...a11yProps(1)} />
                <Tab label="Results" {...a11yProps(2)} />
                <Tab label="Remarks" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <Box sx={{ paddingBottom: '6rem' }}>
              <CustomTabPanel value={value} index={0}>
                <div dangerouslySetInnerHTML={{ __html: editorData }} />
                <button onClick={() => handleInputChange('graph1x11', '1')}>
                  Get Value
                </button>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Box id="divToPrint">
                  <Box sx={{ px: 4, mb: 2 }}>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value="Table_Chart"
                      >
                        <FormControlLabel
                          value="Table_Chart"
                          control={<Radio />}
                          label="Table Chart"
                          sx={{
                            px: 2,
                          }}
                        />
                        <FormControlLabel
                          value="disabled"
                          control={<Radio />}
                          label="Realtime Chart"
                          sx={{
                            px: 2,
                          }}
                        />
                        <FormControlLabel
                          value="disabled"
                          disabled
                          control={<Radio />}
                          label="Archive Chart"
                          sx={{
                            px: 2,
                          }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  <Box>
                    {charts.map((chartData: any, dataIndex: any) => (
                      <>
                        <Grid
                          container
                          key={dataIndex}
                          sx={{ my: 2 }}
                          spacing={2}
                        >
                          <Grid
                            item
                            xs={10}
                            sm={10}
                            md={10}
                            lg={10}
                            xl={10}
                            // sx={{ pr: 4 }}
                            style={{ borderRight: '1px solid #e4e5e7' }}
                          >
                            <Grid container sx={{ px: 4 }}>
                              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                {/* <label
                              style={{ fontSize: '16px', fontWeight: 500 }}
                            >
                              Tabular Column: &nbsp;
                            </label> */}
                                <Select
                                  labelId="view-all-label"
                                  id="time-sec"
                                  value={chartData.selectedTable}
                                  displayEmpty
                                  IconComponent={ExpandMoreOutlinedIcon}
                                  onChange={(event) =>
                                    handleTabularColumnChange(event, dataIndex)
                                  }
                                  renderValue={
                                    chartData.selectedTable !== null
                                      ? undefined
                                      : () => (
                                          <Placeholder>
                                            Select Table
                                          </Placeholder>
                                        )
                                  }
                                  size="small"
                                  style={{
                                    width: '250px',
                                    borderRadius: '10px',
                                  }}
                                >
                                  {chartData.tableList?.map((item, index) => (
                                    <MenuItem key={index} value={item.value}>
                                      {item.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </Grid>
                              <Grid
                                item
                                xs={6}
                                sm={6}
                                md={6}
                                lg={6}
                                xl={6}
                                textAlign={'end'}
                              >
                                <>
                                  <Button
                                    variant="contained"
                                    className="add-chart"
                                    onClick={handleAddChart}
                                    sx={{ mr: 2 }}
                                  >
                                    <AddIcon /> &nbsp; Add
                                  </Button>
                                  {dataIndex >= 1 && (
                                    <Button
                                      variant="contained"
                                      className="add-chart"
                                      onClick={() =>
                                        handleRemoveChart(dataIndex)
                                      }
                                    >
                                      <CloseOutlined
                                        sx={{ fontSize: '18px' }}
                                      />{' '}
                                      &nbsp; Remove
                                    </Button>
                                  )}
                                </>
                              </Grid>
                            </Grid>
                            <Box sx={{ mt: 4 }}>
                              <ResponsiveContainer width="100%" height={500}>
                                <LineChart
                                  data={
                                    chartData.activeTableChartValues[0]?.name &&
                                    chartData.activeTableChartValues
                                  }
                                >
                                  <XAxis
                                    dataKey="name"
                                    axisLine={{ fontSize: 12, dy: 4 }}
                                  />
                                  {chartData.tableChartOptionsList?.map(
                                    (axis, axisIndex) => (
                                      <YAxis
                                        key={axisIndex}
                                        yAxisId={axis.yAxis}
                                        orientation={axis.orientation}
                                        label={{
                                          value: axis.yAxis,
                                          angle: -90,
                                          position: 'insideBottom',
                                          fill: axis.color,
                                        }}
                                        tick={{
                                          fontSize: 12,
                                        }}
                                      />
                                    ),
                                  )}

                                  <Tooltip />
                                  <CartesianGrid
                                    stroke="#f5f5f5"
                                    strokeDasharray="3 3"
                                    strokeWidth={2}
                                  />
                                  {chartData.tableChartOptionsList?.map(
                                    (line, lineIndex) => (
                                      <Line
                                        key={lineIndex}
                                        type="linear"
                                        dataKey={line.dataKey}
                                        stroke={line.color}
                                        strokeWidth={2}
                                        yAxisId={line.yAxis}
                                        dot={{
                                          r: 1,
                                          fill: line.color,
                                        }}
                                      />
                                    ),
                                  )}
                                </LineChart>
                              </ResponsiveContainer>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  marginTop: '30px',
                                }}
                              >
                                <Box className="color-chart">
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      width: '100%',
                                    }}
                                  >
                                    <Typography className="xy-sec">
                                      X
                                    </Typography>
                                    <Select
                                      labelId="view-all-label"
                                      size="small"
                                      value={chartData.xValue}
                                      displayEmpty
                                      IconComponent={ExpandMoreOutlinedIcon}
                                      onChange={(event) =>
                                        handleXAxisChange(event, dataIndex)
                                      }
                                      renderValue={
                                        chartData.xValue !== null
                                          ? undefined
                                          : () => (
                                              <Placeholder>Channel</Placeholder>
                                            )
                                      }
                                      style={{ width: '250px' }}
                                    >
                                      {chartData.activeChannelOptions?.map(
                                        (item, index) => (
                                          <MenuItem
                                            key={index}
                                            value={item.value}
                                          >
                                            {item.name}
                                          </MenuItem>
                                        ),
                                      )}
                                    </Select>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Grid>

                          <Grid
                            item
                            xs={2}
                            sm={2}
                            md={2}
                            lg={2}
                            xl={2}
                            style={{ overflowY: 'scroll', height: '650px' }}
                          >
                            <Grid container alignItems={'center'}>
                              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <Typography variant="body1" fontWeight={500}>
                                  Channels
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={8}
                                sm={8}
                                md={8}
                                lg={8}
                                xl={8}
                                textAlign={'end'}
                              >
                                <Button
                                  variant="contained"
                                  className="add-chart"
                                  sx={{ mr: 2 }}
                                  onClick={() => handleAddChannel(dataIndex)}
                                >
                                  <AddIcon />
                                </Button>
                                <Button
                                  variant="contained"
                                  className={
                                    chartData.tableChartOptionsList?.length < 5
                                      ? 'remove-chart'
                                      : 'add-chart'
                                  }
                                  onClick={() => handleRemoveChannel(dataIndex)}
                                  disabled={
                                    chartData.tableChartOptionsList?.length < 5
                                  }
                                >
                                  <RemoveIcon />
                                </Button>
                              </Grid>
                            </Grid>
                            <Box sx={{ mt: 2 }}>
                              {chartData.tableChartOptionsList?.map(
                                (element, key) => (
                                  <Box key={key}>
                                    <Grid container>
                                      <Grid
                                        item
                                        xs={7}
                                        sm={7}
                                        md={7}
                                        lg={7}
                                        xl={7}
                                      >
                                        <Box>
                                          <Box className="color-chart">
                                            <Box
                                              sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                width: '100%',
                                              }}
                                            >
                                              <Select
                                                labelId="view-all-label"
                                                size="small"
                                                value={element.channelValue}
                                                displayEmpty
                                                IconComponent={
                                                  ExpandMoreOutlinedIcon
                                                }
                                                onChange={(event) =>
                                                  handleChannelChange(
                                                    event,
                                                    dataIndex,
                                                    key,
                                                  )
                                                }
                                                renderValue={
                                                  element.channelValue !== null
                                                    ? undefined
                                                    : () => (
                                                        <Placeholder>
                                                          Select
                                                        </Placeholder>
                                                      )
                                                }
                                                style={{ width: '90%' }}
                                                // style={{ width: '220px' }}
                                              >
                                                {chartData.activeChannelOptions?.map(
                                                  (item, index) => (
                                                    <MenuItem
                                                      key={index}
                                                      value={item.name}
                                                    >
                                                      {item.name}
                                                    </MenuItem>
                                                  ),
                                                )}
                                              </Select>
                                            </Box>
                                            <Box className="color-picker">
                                              <Box />
                                            </Box>
                                          </Box>
                                        </Box>
                                      </Grid>
                                      <Grid
                                        item
                                        xs={5}
                                        sm={5}
                                        md={5}
                                        lg={5}
                                        xl={5}
                                      >
                                        <Box>
                                          <Box className="color-chart">
                                            <Box
                                              sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                width: '100%',
                                              }}
                                            >
                                              {/* <Typography className="xy-sec">
                                              {element.axisY}
                                            </Typography> */}
                                              <Select
                                                labelId="view-all-label"
                                                size="small"
                                                value={element.yValue}
                                                displayEmpty
                                                IconComponent={
                                                  ExpandMoreOutlinedIcon
                                                }
                                                onChange={(event) =>
                                                  handleYAxisChange(
                                                    event,
                                                    dataIndex,
                                                    key,
                                                  )
                                                }
                                                renderValue={
                                                  element.yValue !== null
                                                    ? undefined
                                                    : () => (
                                                        <Placeholder>
                                                          Axis
                                                        </Placeholder>
                                                      )
                                                }
                                                // style={{ width: '100px' }}
                                                fullWidth
                                              >
                                                {axisList.map((item, index) => (
                                                  <MenuItem
                                                    key={index}
                                                    value={item.value}
                                                  >
                                                    {item.name}
                                                  </MenuItem>
                                                ))}
                                              </Select>
                                            </Box>
                                            <Box className="color-picker">
                                              <input
                                                style={{
                                                  backgroundColor:
                                                    element.color,
                                                  color: element.color,
                                                }}
                                                type="color"
                                                className="color-input"
                                                value={element.color}
                                                onChange={(event) =>
                                                  handleColorPickerChange(
                                                    event,
                                                    dataIndex,
                                                    key,
                                                  )
                                                }
                                              />
                                            </Box>
                                          </Box>
                                        </Box>
                                        {/* <Box sx={{ textAlign: 'right' }}>
                                <Button
                                  type="submit"
                                  variant="contained"
                                  className="add-chart"
                                >
                                  <AddIcon sx={{ mr: 1 }} />
                                  Add
                                </Button>
                              </Box> */}
                                      </Grid>
                                    </Grid>
                                  </Box>
                                ),
                              )}
                            </Box>
                          </Grid>
                        </Grid>
                        <Divider orientation="horizontal" sx={{ py: 0 }} />
                      </>
                    ))}
                  </Box>
                </Box>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
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
            <Button
              onClick={() => navigate('/runs')}
              variant="contained"
              className="cancel-btn"
            >
              Back
            </Button>
            <Box
              sx={{ display: 'flex', alignItems: 'center' }}
              onClick={() => printDocument()}
            >
              {value == 1 && (
                <img
                  src={printer}
                  alt="printer"
                  style={{ marginRight: '1rem', cursor: 'pointer' }}
                />
              )}
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
      <AddPeoplePopup open={runsOpen} close={() => setRunsOpen(false)} />
    </PrivateRoute>
  );
}
