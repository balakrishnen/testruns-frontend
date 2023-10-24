import React, { useState } from "react";
import PrivateRoute from "../../../components/PrivateRoute";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Divider, FormControl, Grid, Select } from "@mui/material";
import edit from "../../../assets/images/edit.svg";
import shareimg from "../../../assets/images/Share-black.svg";
import shareimgarrow from "../../../assets/images/share-arrow-black.svg";
import printer from "../../../assets/images/printer.svg";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EditPopup from "./editpopup";
import SplitPane from "react-split-pane";
import { Editor } from "@tinymce/tinymce-react";
import AddIcon from '@mui/icons-material/Add';
import { PhotoshopPicker } from "react-color";
import { SketchPicker } from "react-color";



import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Jul", plot1: 2684, plot2: 2400, plot3: 1544, amt: 2400 },
  { name: "Aug", plot1: 3000, plot2: 1398, plot3: 2844, amt: 2210 },
  { name: "Sep", plot1: 1544, plot2: 1754, plot3: 1472, amt: 2290 },
  { name: "Oct", plot1: 4654, plot2: 4575, plot3: 3574, amt: 2355 },
  { name: "Nov", plot1: 3613, plot2: 4564, plot3: 1475, amt: 4323 },
  { name: "Dec", plot1: 1581, plot2: 2544, plot3: 2965, amt: 3547 },
];

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function RunsDetails() {
  const [openDlg2Dialog, setDialog2Open] = React.useState(false);
  const [answers, setAnswers] = React.useState("");
  const Placeholder = ({ children }: any) => {
    return <div>{children}</div>;
  };
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
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const [color, setColor] = useState("#ff0000");
  return (
    <PrivateRoute>
      <EditPopup open={openDlg2Dialog} close={() => setDialog2Open(false)} />
      <Box className="runzdetails-page">
        <Box className="top-section">
          <Box sx={{ padding: "24px 0px", margin: "0px 24px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={10} md={10} lg={5} xl={6}>
                <Box>
                  <Typography className="id-detail">
                    ID023659ADN&ensp;/&ensp;Dept-Computer
                    science&ensp;/&ensp;Lab-Data structure
                  </Typography>
                  <Typography className="id-detail-title">
                    The simple pendulum
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={2} md={2} lg={7} xl={6}>
                <Box
                  sx={{
                    display: { xs: "none", lg: "flex" },
                    alignItems: "center",
                    height: "100%",
                    justifyContent: "end",
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
                      style={{ marginRight: "8px" }}
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
                      style={{ marginRight: "8px" }}
                    />
                    Share
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    className="edit-btn"
                    onClick={() => {
                      setDialog2Open(true);
                    }}
                  >
                    <img src={edit} alt="edit" style={{ marginRight: "8px" }} />
                    Edit
                  </Button>
                  <FormControl className="more-info">
                    <Select
                      labelId="tselect-popup-label"
                      id="more-info"
                      value={answers}
                      displayEmpty
                      IconComponent={ExpandMoreOutlinedIcon}
                      onChange={(event) => setAnswers(event.target.value)}
                      renderValue={
                        answers !== ""
                          ? undefined
                          : () => <Placeholder>More Info</Placeholder>
                      }
                    >
                      <MenuItem value={"1"}>1</MenuItem>
                      <MenuItem value={"2"}>2</MenuItem>
                      <MenuItem value={"3"}>3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    display: { xs: "block", lg: "none" },
                    textAlign: "right",
                  }}
                >
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
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
                          style={{ marginRight: "8px" }}
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
                          style={{ marginRight: "8px" }}
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
                          setDialog2Open(true);
                        }}
                      >
                        <img
                          src={edit}
                          alt="edit"
                          style={{ marginRight: "8px" }}
                        />
                        Edit
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <FormControl className="more-info">
                        <Select
                          labelId="tselect-popup-label"
                          id="more-info"
                          value={answers}
                          displayEmpty
                          IconComponent={ExpandMoreOutlinedIcon}
                          onChange={(event) => setAnswers(event.target.value)}
                          renderValue={
                            answers !== ""
                              ? undefined
                              : () => <Placeholder>More Info</Placeholder>
                          }
                        >
                          <MenuItem value={"1"}>1</MenuItem>
                          <MenuItem value={"2"}>2</MenuItem>
                          <MenuItem value={"3"}>3</MenuItem>
                        </Select>
                      </FormControl>
                    </MenuItem>
                  </Menu>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ borderColor: "#FFEAA5", borderBottomWidth: "5px" }} />
        </Box>

        <Box className="main-runzdetails runz-height">
          {/* <Grid container spacing={2} sx={{ width: '100%', margin: '0px' }}> */}
          <SplitPane>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={7}
              xl={7}
              className="runz-height leftside-runz"
              sx={{ padding: "24px!important", overflowY: "auto" }}
            >
              <Box>
                <Box>
                  Aim To measure the time period of a simple pendulum. Apparatus
                  required A wire of unknown resistance (~10Ω), battery
                  eliminator or an accumulator (0 to 3V) or two dry cells (1.5 V
                  each), voltmeter (0-5 V), milliammeter (0– 500 mA), rheostat,
                  plug key, connecting wires and a piece of sand paper.
                  Principle is directly proportional to the potential difference
                  across its ends, provided the physical state of the conductor
                  remains unchanged. If I be the current flowing through the
                  conductor and V the potential difference across its ends, then
                  according to Ohm's law V I ∝ and hence V = RI where R is the
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
                  to Ohm's law V I ∝ and hence V = RI where R is the constant of
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
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={5}
              xl={5}
              className="rightside-runz"
              sx={{ borderLeft: { xs: "0px", lg: "2px solid #9F9F9F;" } }}
            >
              <Box className="runz-height" sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 0 }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="tabs-common"
                    className="tabs-common"
                  >
                    <Tab label="Results" {...a11yProps(0)} />
                    <Tab label="Charts" {...a11yProps(1)} />
                    <Tab label="Remarks" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <Box>
                  <CustomTabPanel value={value} index={0}>
                    <Editor
                      apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      init={{
                        height: 400,
                        menubar: false,
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                          "undo redo | formatselect | " +
                          "bold italic backcolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                    />
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                    <Box>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                          <Typography className="chart-title">Chart no. 1</Typography>
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
                          <Grid container spacing={2} style={{ justifyContent: 'space-between', marginBottom: '2rem' }}>
                            <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                              <Box className="color-chart">
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                  <Typography className="xy-sec">X</Typography>
                                  <FormControl fullWidth size="medium">
                                    <Select
                                      labelId="view-all-label"
                                      id="time-sec"
                                      value={answers}
                                      displayEmpty
                                      IconComponent={ExpandMoreOutlinedIcon}
                                      onChange={(event) => setAnswers(event.target.value)}
                                      renderValue={
                                        answers !== ""
                                          ? undefined
                                          : () => <Placeholder>Time</Placeholder>
                                      }
                                    >
                                      <MenuItem value={"1"}>1</MenuItem>
                                      <MenuItem value={"2"}>2</MenuItem>
                                      <MenuItem value={"3"}>3</MenuItem>
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
                                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <Typography className="xy-sec">Y1</Typography>
                                    <FormControl fullWidth size="medium">
                                      <Select
                                        labelId="view-all-label"
                                        id="time-sec"
                                        value={answers}
                                        displayEmpty
                                        IconComponent={ExpandMoreOutlinedIcon}
                                        onChange={(event) => setAnswers(event.target.value)}
                                        renderValue={
                                          answers !== ""
                                            ? undefined
                                            : () => <Placeholder>Time</Placeholder>
                                        }
                                      >
                                        <MenuItem value={"1"}>1</MenuItem>
                                        <MenuItem value={"2"}>2</MenuItem>
                                        <MenuItem value={"3"}>3</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Box>
                                  <Box className="color-picker">
                                    <input type="color" className="color-input" />
                                  </Box>
                                </Box>
                                <Box className="color-chart">
                                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <Typography className="xy-sec">Y2</Typography>
                                    <FormControl fullWidth size="medium">
                                      <Select
                                        labelId="view-all-label"
                                        id="time-sec"
                                        value={answers}
                                        displayEmpty
                                        IconComponent={ExpandMoreOutlinedIcon}
                                        onChange={(event) => setAnswers(event.target.value)}
                                        renderValue={
                                          answers !== ""
                                            ? undefined
                                            : () => <Placeholder>Time</Placeholder>
                                        }
                                      >
                                        <MenuItem value={"1"}>1</MenuItem>
                                        <MenuItem value={"2"}>2</MenuItem>
                                        <MenuItem value={"3"}>3</MenuItem>
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
                          <CartesianGrid
                            stroke="#f5f5f5"
                            strokeDasharray="2 2"
                          />
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
                  <CustomTabPanel value={value} index={2}>
                    <Editor
                      apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      init={{
                        height: 400,
                        menubar: false,
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                          "undo redo | formatselect | " +
                          "bold italic backcolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                    />
                  </CustomTabPanel>
                </Box>
              </Box>
              <Box className="edit-details" sx={{ p: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  className="cancel-btn"
                >
                  Back
                </Button>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={printer}
                    alt="printer"
                    style={{ marginRight: "1rem" ,  cursor:"pointer" }}
                  />
                  <Button type="submit" variant="contained" className="add-btn">
                    Save
                  </Button>
                </Box>
              </Box>
            </Grid>
          </SplitPane>
        </Box>
      </Box>
    </PrivateRoute>
  );
}