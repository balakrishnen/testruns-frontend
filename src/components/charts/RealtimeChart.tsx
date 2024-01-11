/* eslint-disable @typescript-eslint/no-var-requires */
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
// import {
//   ResponsiveContainer,
//   LineChart,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   Line,
//   Legend,
// } from 'recharts';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import io from 'socket.io-client';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssetsName } from '../../api/assetsAPI';
import { InfluxDB } from '@influxdata/influxdb-client';
// import Chart from 'react-apexcharts';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

const Chart = require('react-chartjs-2').Chart;

// const chartColors = {
//   red: 'rgb(255, 99, 132)',
//   orange: 'rgb(255, 159, 64)',
//   yellow: 'rgb(255, 205, 86)',
//   green: 'rgb(75, 192, 192)',
//   blue: 'rgb(54, 162, 235)',
//   purple: 'rgb(153, 102, 255)',
//   grey: 'rgb(201, 203, 207)',
// };

// const color = Chart.helpers.color;

const url = 'https://us-east-1-1.aws.cloud2.influxdata.com';
const token =
  'UvFb5MGj_jaqi9JTTNlVpKQIvNdoZF3-EilZhxCgESAdlbmNgVmJeXagVj12LomLF7-liSxePRlfio9k1r8fbA==';
const org = '63cd6a63187aa056';
const bucket = 'Pasco Codenode';

let query = `from(bucket: "${bucket}")
|> range(start: -duration(v: 1s))
|> filter(fn: (r) => r["_measurement"] == "sensor_data" and r._field =="brightness" or r._field == "button")
|> aggregateWindow(every: 1s, fn: mean, createEmpty: false)
|> yield(name: "mean")`;
//     let query = `from(bucket: "${bucket}")
//     |> range(start: -duration(v: 1s))
//     |> filter(fn: (r) => r._measurement == "sensor_data")
//     |> group(columns: ["_field"]) // Group by fiel	d to get all fields
//     |> limit(n: 1) // Limit to 1 row (optional, you can adjust as needed)
//   `;

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

const colorsList = ['#e22828', '#90239f', '#111fdf', '#38e907'];

const queryApi = new InfluxDB({ url, token }).getQueryApi(org);

const tempChannels = [];

export default function RealtimeChart() {
  // const socket = io('https://api.dev.testrunz.com');
  const [charts, setCharts] = React.useState<any>([]);
  const [assets, setAssets] = React.useState(null);
  const [assetsOptions, setAssetsOptions] = React.useState<any>([]);
  const [streamingData, setStreamingData] = React.useState<any>([]);
  const [chartSeries, setChartSeries] = React.useState<any>([]);
  const [isChartPause, setIsChartPause] = React.useState<any>(true);
  const [data, setData] = React.useState([]);
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const dispatch: any = useDispatch();
  const [channelOptions, setChannelOptions] = React.useState<any>([]);
  const [channelTemp, setChannelTemp] = React.useState<any>([]);
  const [chartData, setChartData] = React.useState<any>({
    datasets: [],
  });
  const [channelList, setChannelList] = React.useState<any>([
    {
      sensor: null,
      axis: 'Y1',
      color: colorsList[0],
    },
    {
      sensor: null,
      axis: 'Y2',
      color: colorsList[1],
    },
    {
      sensor: null,
      axis: 'Y3',
      color: colorsList[2],
    },
    {
      sensor: null,
      axis: 'Y4',
      color: colorsList[3],
    },
  ]);
  const tableChartSlice = useSelector(
    (state: any) => state.tableChart.data?.static_chart,
  );
  const assetsSliceData = useSelector(
    (state: any) => state.assets.data?.get_all_assets_name,
  );

  const [axisList, setAxisList] = React.useState<any>([
    { name: 'Y1', value: 'Y1' },
    { name: 'Y2', value: 'Y2' },
    { name: 'Y3', value: 'Y3' },
    { name: 'Y4', value: 'Y4' },
  ]);

  let influxInterval: any = null;

  const Placeholder = ({ children }: any) => {
    return <div style={{ color: 'lightgrey' }}>{children}</div>;
  };

  // React.useEffect(() => {
  //   const data: any = [];
  //   const tableList: any = [];
  //   if (tableChartSlice) {
  //     tableChartSlice.forEach((element, index) => {
  //       const tableChartOptionsList: any = [];
  //       const tableChartValues: any = [];
  //       const tableChannelsList: any = [];
  //       const tableChartData: any = [];

  //       element.rows.forEach((rows) => {
  //         tableChartData.push(rows.values);
  //       });

  //       for (let i = 0; i < 4; i++) {
  //         tableChartOptionsList.push({
  //           name: element.headers[i] ? element.headers[i] : null,
  //           value: `Y${i + 1}`,
  //           yAxis: `Y${i + 1}`,
  //           color: colorsList[i],
  //           yAxisId:
  //             i === 0
  //               ? 'left1'
  //               : i === 1
  //               ? 'right1'
  //               : i === 2
  //               ? 'left2'
  //               : 'right2',
  //           orientation: i % 2 === 0 ? 'left' : 'right',
  //           dataKey: `plot${[i + 1]}`,
  //           channelValue: null,
  //           xValue: null,
  //           yValue: `Y${i + 1}`,
  //           tableChartData: tableChartData,
  //         });
  //       }

  //       element.headers.forEach((head: any) => {
  //         tableChannelsList.push({
  //           name: head,
  //           value: head,
  //         });
  //       });

  //       tableList.push({
  //         name: element.tableName[0],
  //         value: element.tableName[0],
  //       });

  //       element.rows.forEach((row, rowIndex) => {
  //         row.values.forEach((value, valueIndex) => {
  //           tableChartValues.push({
  //             [`plot${rowIndex + 1}`]: value,
  //             name: value,
  //           });
  //         });
  //       });
  //       data.push({
  //         name: element.tableName[0] ? element.tableName[0] : null,
  //         selectedTable: null,
  //         tableChartValues: [],
  //         tableChartOptionsList: tableChartOptionsList,
  //         tableChannelsList: tableChannelsList,
  //         tableList: tableList,
  //         activeChannelOptions: [],
  //         activeTableChartValues: [],
  //         xValue: null,
  //       });
  //     });
  //     // console.log('######', data);
  //     setCharts(data);
  //   }
  // }, [tableChartSlice]);

  // React.useEffect(() => {
  //   getAssetsList();
  // }, []);

  React.useEffect(() => {
    dispatch(fetchAssetsName());
  }, []);

  React.useEffect(() => {
    // if (channelTemp !== null) {
    // const fetchMyAPI = async () => {
    //   console.log('result', channelTemp);
    //   const field = channelTemp
    //     .map((item) => `r._field == "${item}"`)
    //     .join(' or ');
    //   let query1 = `from(bucket: "${bucket}")
    // |> range(start: -duration(v: 1s))
    // |> filter(fn: (r) => r["_measurement"] == "sensor_data" and ${field})
    // |> aggregateWindow(every: 1s, fn: mean, createEmpty: false)
    // |> yield(name: "mean")`;
    //   const chart = { ...chartData };
    //   const result = await queryApi.collectRows(query1);
    //   const series: any = [];

    //   result.forEach((element: any) => {
    //     series.push(element._value);
    //   });

    //   if (chart.series[0] && chart.series[0].data) {
    //     chart.series[0] = {
    //       name: 'XYZ',
    //       data: chartOpt.series[0].data,
    //     };
    //   } else {
    //     chart.series[0] = {
    //       name: 'XYZ',
    //       data: result.map((element: any) => element._value),
    //     };
    //   }

    //   chartData.series = series;
    //   chartData.options['xaxis'].categories.push(Math.ceil(Math.random() * 10));

    //   setChartData(chart);

    //   console.log('result2', result);
    // };
    // }
    if (channelTemp.length !== 0) {
      // influxInterval = setInterval(() => {
      // fetchMyAPI();
      // }, 3000);
    }
  }, []);

  React.useEffect(() => {
    if (assetsSliceData) {
      let assetsFilterData = assetsSliceData.filter((item: any) =>
        item.name.includes('_connect'),
      );
      setAssetsOptions(assetsFilterData);
    }
  }, [assetsSliceData]);

  const influxQuery = async () => {
    let res = [];

    console.log('queryApi', queryApi);
    console.log('query', query);

    const result = await queryApi.collectRows(query);
    console.log('result##', result);
    // queryApi.queryRows(query, {
    //   next(row, tableMeta) {
    //     console.log("row", row);
    //     console.log("tableMeta", tableMeta);
    //     const o = tableMeta.toObject(row);
    //     //push rows from query into an array object
    //     res.push(o);
    //     //push rows from query into an array object
    //   },
    //   complete() {
    //     console.log("hiksdfjk", res);
    //   },
    //   error(error) {
    //     console.log("query failed- ", error);
    //   }
    // })
  };

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newDataPoint = {
  //       time: new Date(),
  //       value: Math.random() * 30,
  //     };

  //     setData((prevData: any) => [...prevData, newDataPoint]);
  //     setCurrentTime(new Date());
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  // const getAssetsList = () => {
  //   dispatch(fetchAssetsName());
  // };

  const startStreaming = () => {
    // const socket = io('https://api.dev.testrunz.com');
    // setDisableStart(true);
    // setDisableStop(false);
    // const data: any = [];
    // socket.emit('joinRoom', 'sensor_data');
    // socket.emit('sendMessageToRoom', {
    //   room: 'sensor_data',
    //   message: 'value',
    // });
    // socket.on('message', (message) => {
    //   console.log('##', message);
    //   const mergedData = message.concat(message);
    //   mergedData.forEach((element) => {
    //     data.push({
    //       name: new Date().toLocaleTimeString(),
    //       [element._measurement]: element._value,
    //     });
    //   });
    //   console.log(`HARDWARE STREAMING --- ${data.length}`, data);
    //   setChartSeries(data);
    //   setStreamingData(mergedData);
    // });
    // return () => {
    //   socket.emit('leaveRoom', 'charts');
    //   socket.disconnect();
    // };
  };

  const onRefresh = React.useCallback(
    async (values: any) => {
      if (channelTemp.length !== 0) {
        try {
          let selectedChannel = channelTemp.filter(
            (item: any, index: number, inputArray: any) => {
              return inputArray.indexOf(item) == index;
            },
          );
          const fields = selectedChannel
            .map((item: any) => `r._field == "${item}"`)
            .join(' or ');
          const query1: any = `from(bucket: "${bucket}")
    |> range(start: -duration(v: 1s))
    |> filter(fn: (r) => r["_measurement"] == "sensor_data" and ${fields})
    |> aggregateWindow(every: 1s, fn: mean, createEmpty: false)
    |> yield(name: "mean")`;
          const chart: any = { ...chartData };
          const result = await queryApi.collectRows(query1);

          if (result.length !== 0 && channelTemp.length === result.length) {
            result.forEach((dataset: any, index) => {
              const sets = chart.datasets[index];
              console.log('SETS', sets);
              console.log('DATASETS', dataset);
              if (dataset._value !== undefined && dataset._value !== null) {
                sets.data.push({
                  x: moment(dataset._stop),
                  y: dataset._value,
                });
              }
            });
          }

          console.log('result2', result);
          // chart.data.datasets.forEach((_, index) => {
          //   chart.data.datasets[index].data.push({
          //     x: moment(),
          //     y: Math.random(),
          //   });
          // });
        } catch (error) {
          console.log('handle Error list', error);
        }
      }
    },
    [channelTemp],
  );

  const handleAddChannel = () => {
    const data: any = [...channelList];
    data.push({
      color: '#000',
      sensor: null,
      axis: 'Y1',
    });
    setChannelList(data);
  };

  // const handleRemoveChannel = (dataIndex) => {
  //   const data = [...charts];
  //   const values = { ...data[dataIndex] };
  //   const spliceData = values.tableChartOptionsList.splice(4, 1);
  //   setCharts(data);
  // };

  const handleChannelChange = (event: any, index: any) => {
    const channels = [...channelList];
    const data = { ...chartData };
    channels[index].sensor = event.target.value;
    setChannelList(channels);
    // tempChannels.push(event.target.value);
    // setChannelTemp(tempChannels);

    data.datasets[index] = {
      label: event.target.value,
      backgroundColor: colorsList[index],
      borderColor: colorsList[index],
      fill: false,
      lineTension: 0,
      borderDash: [8, 4],
      data: [],
    };

    setChannelTemp((oldArray: any) => {
      clearInterval(influxInterval);
      return [...oldArray, event.target.value];
    });
    setIsChartPause(false);
    // const socket = io('https://api.dev.testrunz.com');
    // socket.emit('joinRoom', 'sensor_data');
    // socket.emit('sendMessageToRoom', {
    //   room: 'sensor_data',
    //   message: 'temperature',
    //   // message: event.target.value,
    // });
    // socket.on('message', (message: any) => {
    //   console.log('####1', message);
    // });
  };

  const handleYAxisChange = (event: any, keyIndex: number) => {
    const data = [...charts];
    const values = { ...data[keyIndex] };
    values.tableChartOptionsList[keyIndex].value = event.target.value;
    values.tableChartOptionsList[keyIndex].yValue = event.target.value;
    setCharts(data);
  };

  const handleColorPickerChange = (event: any, key: any) => {};

  const handleAssetsChange = async (event: any) => {
    let query2 = `from(bucket: "${bucket}")
    |> range(start: -duration(v: 1s))
    |> filter(fn: (r) => r._measurement == "sensor_data")
    |> group(columns: ["_field"]) // Group by fiel	d to get all fields
    |> limit(n: 1) // Limit to 1 row (optional, you can adjust as needed)
  `;

    const result = await queryApi.collectRows(query2);
    const sensors: any = [];
    result.forEach((element: any) => {
      sensors.push({
        name: element._field,
      });
    });

    console.log('result1', result);
    setAssets(event.target.value);
    setChannelOptions(sensors);

    // const socket = io('https://api.dev.testrunz.com');
    // setAssets(event.target.value);
    // socket.emit('joinRoom', 'sensor_data');
    // socket.emit('sendMessageToRoom', {
    //   room: 'sensor_data',
    //   // message: 'temperature',
    // });
    // socket.on('message', (message: any) => {
    //   console.log('####0', message);
    //   let channels: any = [];
    //   message.forEach((element: any) => {
    //     if (channelOptions.length !== 0) {
    //       const uniqueValues: any = new Set();
    //       channels = message.filter((obj) => {
    //         if (!uniqueValues.has(obj._field)) {
    //           uniqueValues.add(obj._field);
    //           return true;
    //         }
    //         return false;
    //       });
    //     } else {
    //       channels.push(element._field);
    //     }
    //   });
    //   setChannelOptions(channels);
    // });
  };

  const options: any = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    events: [],
    tooltips: { enabled: false },
    hover: { mode: null },
    plugins: {
      streaming: {
        pause: isChartPause,
        duration: 10000,
        refresh: 1000,
        delay: 1000,
        onRefresh: onRefresh,
      },
    },
    scales: {
      xAxes: [
        {
          type: 'realtime',
          distribution: 'linear',
          // realtime: {
          //   onRefresh: function (chart) {
          //     chart.data.datasets.forEach((_, index) => {
          //       chart.data.datasets[index].data.push({
          //         x: moment(),
          //         y: Math.random(),
          //       });
          //     });
          //   },
          //   delay: 10000,
          //   time: {
          //     displayFormat: 'h:mm',
          //   },
          // },
          ticks: {
            displayFormats: 1,
            maxRotation: 0,
            minRotation: 0,
            stepSize: 1,
            maxTicksLimit: 30,
            minUnit: 'second',
            source: 'auto',
            autoSkip: true,
            callback: function (value: moment.MomentInput) {
              return moment(value, 'HH:mm:ss').format('hh:mm:ss');
            },
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 50,
          },
        },
      ],
    },
    height: 300,
  };

  return (
    <>
      <Box>
        <>
          <Grid container sx={{ my: 2 }} spacing={2}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={9}
              xl={10}
              // sx={{ pr: 4 }}
              style={{ borderRight: '1px solid #e4e5e7' }}
            >
              <Grid container sx={{ px: 4 }}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Select
                    labelId="view-all-label"
                    id="time-sec"
                    value={assets}
                    displayEmpty
                    IconComponent={ExpandMoreOutlinedIcon}
                    MenuProps={{
                      disableScrollLock: true,
                      marginThreshold: null,
                    }}
                    onChange={(event) => handleAssetsChange(event)}
                    renderValue={
                      assets !== null
                        ? undefined
                        : () => <Placeholder>Select Assets</Placeholder>
                    }
                    size="small"
                    style={{
                      width: '250px',
                      borderRadius: '10px',
                    }}
                  >
                    {assetsOptions.map((item: any, index: number) => (
                      <MenuItem key={index} value={item.name}>
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
                <Line data={chartData} options={options} />
                {/* <Chart
                  options={chartData.options}
                  series={chartData.series}
                  type="line"
                  width="100%"
                /> */}
                {/* <ResponsiveContainer width="100%" height={500}>
                  <LineChart
                    data={chartSeries[0] && chartSeries[0]?.name && chartSeries}
                  >
                    <XAxis
                      dataKey="name"
                      axisLine={{ fontSize: 12, dy: 4 }}
                      domain={['auto', 'auto']}
                      tickFormatter={(time) => new Date().toLocaleTimeString()}
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
                      isAnimationActive={true} 
                    />
                  </LineChart>
                </ResponsiveContainer> */}
                {/* <Box
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
                </Box> */}
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={3}
              xl={2}
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
                <Grid item xs={8} sm={8} md={8} lg={8} xl={8} textAlign={'end'}>
                  <Button
                    variant="contained"
                    className="add-chart"
                    sx={{ mr: 2 }}
                    onClick={() => handleAddChannel()}
                  >
                    <AddIcon />
                  </Button>
                  <Button variant="contained" className="remove-chart" disabled>
                    <RemoveIcon />
                  </Button>
                </Grid>
              </Grid>
              <Box
                sx={{ mt: 2, pr: 2 }}
                style={{ overflowY: 'scroll', height: '550px' }}
              >
                {channelList?.map((element: any, key: number) => (
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
                                MenuProps={{
                                  disableScrollLock: true,
                                  marginThreshold: null,
                                }}
                                labelId="view-all-label"
                                size="small"
                                value={element.sensor}
                                displayEmpty
                                IconComponent={ExpandMoreOutlinedIcon}
                                onChange={(event) =>
                                  handleChannelChange(event, key)
                                }
                                renderValue={
                                  element.sensor !== null
                                    ? undefined
                                    : () => <Placeholder>Select</Placeholder>
                                }
                                disabled={assets === null}
                                style={{ width: '90%' }}
                              >
                                {channelOptions.map(
                                  (item: any, index: number) => (
                                    <MenuItem key={index} value={item.name}>
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
                                MenuProps={{
                                  disableScrollLock: true,
                                  marginThreshold: null,
                                }}
                                labelId="view-all-label"
                                size="small"
                                value={element.axis}
                                displayEmpty
                                IconComponent={ExpandMoreOutlinedIcon}
                                onChange={(event) =>
                                  handleYAxisChange(event, key)
                                }
                                renderValue={
                                  element.axis !== null
                                    ? undefined
                                    : () => <Placeholder>Axis</Placeholder>
                                }
                                fullWidth
                              >
                                {axisList.map((item: any, index: any) => (
                                  <MenuItem key={index} value={item.value}>
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
                                  handleColorPickerChange(event, key)
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
          </Grid>
          <Divider orientation="horizontal" sx={{ py: 0 }} />
        </>
      </Box>

      {/* {show && (
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
      )} */}
    </>
  );
}

// const chartOpt = {
//   options: {
//     chart: {
//       id: 'basic-bar',
//     },
//     xaxis: {
//       categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
//     },
//   },
//   series: [
//     {
//       name: 'series-1',
//       data: [Math.ceil(Math.random()) * 10, Math.ceil(Math.random()) * 10, Math.ceil(Math.random()) * 10, Math.ceil(Math.random()) * 10, Math.ceil(Math.random()) * 10, Math.ceil(Math.random()) * 10, 70, 91],
//     },
//     {
//       name: 'series-1',
//       data: [130, 240, 45, 350, 149, 160, 470, 291],
//     },
//   ],
// };
