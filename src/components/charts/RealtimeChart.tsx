/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CloseOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  Legend,
} from 'recharts';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import io from 'socket.io-client';
import moment from 'moment';
import { useSelector } from 'react-redux';

const tableList = [
  {
    name: 'TABULAR COLUMN 1',
    value: 'TABULAR COLUMN 1',
  },
  {
    name: 'TABULAR COLUMN 2',
    value: 'TABULAR COLUMN 2',
  },
];

export default function RealtimeChart() {
  const socket = io('https://api.dev.testrunz.com');
  const [charts, setCharts] = React.useState<any>([]);
  const [tableOptions, setTableOptions] = React.useState<any>(tableList);
  const [streamingData, setStreamingData] = React.useState<any>([]);
  const [chartSeries, setChartSeries] = React.useState<any>([]);
  const [disableStart, setDisableStart] = React.useState<any>(true);
  const [disableStop, setDisableStop] = React.useState<any>(false);
  const [data, setData] = React.useState([]);
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const tableChartSlice = useSelector(
    (state) => state.tableChart.data?.static_chart,
  );

  const [axisList, setAxisList] = React.useState<any>([
    { name: 'Y1', value: 'Y1' },
    { name: 'Y2', value: 'Y2' },
    { name: 'Y3', value: 'Y3' },
    { name: 'Y4', value: 'Y4' },
  ]);

  const colorsList = ['#e22828', '#90239f', '#111fdf', '#38e907'];

  const Placeholder = ({ children }: any) => {
    return <div style={{ color: 'lightgrey' }}>{children}</div>;
  };

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

  React.useEffect(() => {
    const interval = setInterval(() => {
      const newDataPoint = {
        time: new Date(),
        value: Math.random() * 30,
      };

      setData((prevData: any) => [...prevData, newDataPoint]);
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const startStreaming = () => {
    setDisableStart(true);
    setDisableStop(false);
    const data: any = [];
    socket.emit('joinRoom', 'sensor_data');
    socket.emit('sendMessageToRoom', {
      room: 'sensor_data',
      message: 'value',
    });
    socket.on('message', (message) => {
      console.log('##', message);
      const mergedData = message.concat(message);
      mergedData.forEach((element) => {
        data.push({
          name: new Date().toLocaleTimeString(),
          [element._measurement]: element._value,
        });
      });
      console.log(`HARDWARE STREAMING --- ${data.length}`, data);
      setChartSeries(data);
      setStreamingData(mergedData);
    });
    return () => {
      socket.emit('leaveRoom', 'charts');
      socket.disconnect();
    };
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

  const handleRemoveChannel = (dataIndex) => {
    const data = [...charts];
    const values = { ...data[dataIndex] };
    const spliceData = values.tableChartOptionsList.splice(4, 1);
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
    setDisableStart(false);
    setDisableStop(true);
    setCharts(data);
  };

  const handleYAxisChange = (event: any, dataIndex: any, keyIndex) => {
    const data = [...charts];
    const values = { ...data[dataIndex] };
    values.tableChartOptionsList[keyIndex].value = event.target.value;
    values.tableChartOptionsList[keyIndex].yValue = event.target.value;
    setCharts(data);
  };

  const handleColorPickerChange = (event: any, dataIndex: any, keyIndex) => {
    const data = [...charts];
    const values = { ...data[dataIndex] };
    values.tableChartOptionsList[keyIndex].color = event.target.value;
    setCharts(data);
  };

  const handleTabularColumnChange = (event: any, dataIndex: any) => {
    const data = [...charts];
    const tableChartOptionsList: any = [];
    data[dataIndex].selectedTable = event.target.value;

    for (let i = 0; i < 4; i++) {
      let tableChartData: any = [];
      data[dataIndex].tableChartOptionsList.forEach((rows) => {
        tableChartData = rows.tableChartData;
      });
      tableChartOptionsList.push({
        name: data[dataIndex].tableChannelsList[i]
          ? data[dataIndex].tableChannelsList[i].name
          : null,
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
        tableChartData: tableChartData,
      });
    }
    const removedOptions = charts[dataIndex].tableChartOptionsList.filter(
      (item) => item.name !== null,
    );
    data[dataIndex].tableChartOptionsList = tableChartOptionsList;
    data[dataIndex].activeTableChartValues = [];
    data[dataIndex].activeChannelOptions = removedOptions;
    setCharts(data);
  };

  return (
    <>
      <Box>
        {[charts[0]].map((chartData: any, dataIndex: any) => (
          <>
            <Grid container key={dataIndex} sx={{ my: 2 }} spacing={2}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={8}
                xl={8}
                // sx={{ pr: 4 }}
                style={{ borderRight: '1px solid #e4e5e7' }}
              >
                <Grid container sx={{ px: 4 }}>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Select
                      labelId="view-all-label"
                      id="time-sec"
                      value={chartData?.selectedTable}
                      displayEmpty
                      IconComponent={ExpandMoreOutlinedIcon}
                      onChange={(event) =>
                        handleTabularColumnChange(event, dataIndex)
                      }
                      renderValue={
                        chartData?.selectedTable !== null
                          ? undefined
                          : () => <Placeholder>Select Table</Placeholder>
                      }
                      size="small"
                      style={{
                        width: '250px',
                        borderRadius: '10px',
                      }}
                    >
                      {tableOptions.map((item, index) => (
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
                  ></Grid>
                </Grid>
                <Box sx={{ mt: 4 }}>
                  <ResponsiveContainer width="100%" height={500}>
                    <LineChart
                      data={
                        chartSeries[0] && chartSeries[0]?.name && chartSeries
                      }
                    >
                      <XAxis
                        dataKey="name"
                        axisLine={{ fontSize: 12, dy: 4 }}
                        domain={['auto', 'auto']}
                        tickFormatter={(time) =>
                          new Date().toLocaleTimeString()
                        }
                      />

                      <YAxis
                        yAxisId="temperature"
                        orientation="left"
                        label={{
                          value: 'Y1',
                          angle: -90,
                          position: 'insideBottom',
                          fill: '#e22828',
                        }}
                        tick={{
                          fontSize: 12,
                        }}
                      />

                      <Tooltip />
                      <CartesianGrid
                        stroke="#f5f5f5"
                        strokeDasharray="3 3"
                        strokeWidth={2}
                      />

                      <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="#e22828"
                        strokeWidth={2}
                        yAxisId="temperature"
                        dot={{
                          r: 1,
                          fill: '#e22828',
                        }}
                        isAnimationActive={true} // Enable animation
                      />
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
                        <Button
                          disabled={disableStart}
                          variant="contained"
                          className="add-btn"
                          sx={{ m: 2 }}
                          onClick={startStreaming}
                        >
                          Start
                        </Button>
                        <Button
                          disabled={disableStop}
                          variant="contained"
                          className="add-btn"
                          onClick={() => setShow(true)}
                        >
                          Stop
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {chartData?.selectedTable !== null &&
                chartData?.activeChannelOptions.length !== 0 && (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    xl={4}
                    style={{
                      overflowY: 'scroll',
                      
                    }}
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
                            chartData?.tableChartOptionsList?.length < 5
                              ? 'remove-chart'
                              : 'add-chart'
                          }
                          onClick={() => handleRemoveChannel(dataIndex)}
                          disabled={
                            chartData?.tableChartOptionsList?.length < 5
                          }
                        >
                          <RemoveIcon />
                        </Button>
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 2 }}>
                      {chartData?.tableChartOptionsList?.map((element, key) => (
                        <Box key={key}>
                          <Grid container>
                            <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
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
                                      IconComponent={ExpandMoreOutlinedIcon}
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
                                              <Placeholder>Select</Placeholder>
                                            )
                                      }
                                      style={{ width: '90%' }}
                                      // style={{ width: '220px' }}
                                    >
                                      {chartData?.activeChannelOptions?.map(
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
                            <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
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
                                      IconComponent={ExpandMoreOutlinedIcon}
                                      onChange={(event) =>
                                        handleYAxisChange(event, dataIndex, key)
                                      }
                                      renderValue={
                                        element.yValue !== null
                                          ? undefined
                                          : () => (
                                              <Placeholder>Axis</Placeholder>
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
                                        backgroundColor: element.color,
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
                            </Grid>
                          </Grid>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                )}
            </Grid>
            <Divider orientation="horizontal" sx={{ py: 0 }} />
          </>
        ))}
      </Box>

      {show && (
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            width={600}
            height={300}
            data={chartSeries[0] && chartSeries[0]?.name && chartSeries}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid stroke="#ccc" />
            <XAxis
              dataKey="name"
              type="category"
              tickFormatter={(time) => new Date().toLocaleTimeString()}
            />
            <YAxis tickFormatter={(time) => new Date().toLocaleTimeString()} />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleTimeString()}
            />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
