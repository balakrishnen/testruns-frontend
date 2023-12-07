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
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTableChartData } from '../../api/RunsAPI';

export default function TableChart() {
  const colorList = ['#e22828', '#90239f', '#111fdf', '#38e907'];
  const yAxisOptions: any = [
    {
      name: 'Y1',
      value: 'Y1',
    },
    {
      name: 'Y2',
      value: 'Y2',
    },
    {
      name: 'Y3',
      value: 'Y3',
    },
    {
      name: 'Y4',
      value: 'Y4',
    },
  ];
  const initialData: any = [
    {
      tableOptions: [
        {
          name: 'Table_1',
          value: 'Table_1',
        },
      ],
      selectedTable: null,
      data: [],
      channelOptions: [
        {
          channelName: null,
          channelValue: null,
          name: 'Y1',
          value: 'Y1',
          data: [],
          color: colorList[0],
          yAxisId: 'left1',
          orientation: 'left',
          dataKey: 'plot1',
        },
        {
          channelName: null,
          channelValue: null,
          name: 'Y2',
          value: 'Y2',
          data: [],
          color: colorList[1],
          yAxisId: 'right1',
          orientation: 'right',
          dataKey: 'plot2',
        },
        {
          channelName: null,
          channelValue: null,
          name: 'Y3',
          value: 'Y3',
          data: [],
          color: colorList[2],
          yAxisId: 'left2',
          orientation: 'left',
          dataKey: 'plot3',
        },
        {
          channelName: null,
          channelValue: null,
          name: 'Y4',
          value: 'Y4',
          data: [],
          color: colorList[3],
          yAxisId: 'right2',
          orientation: 'right',
          dataKey: 'plot4',
        },
      ],
      xAxisOptions: [
        {
          name: null,
          value: null,
        },
      ],
      xAxisValue: null,
      yAxisOptions: yAxisOptions,
    },
  ];

  const [yAxisData, setYAxisData] = React.useState([
    {
      yAxisId: 'left1',
      orientation: 'left',
      name: 'Y1',
      color: '#e22828',
    },
  ]);

  const [lineChartData, setLineChartData] = React.useState([
    {
      yAxisId: 'left1',
      color: '#e22828',
      dataKey: 'plot1',
    },
  ]);

  const [dd, setDd] = React.useState([
    { plot1: 23 },
    { plot1: 23 },
    { plot1: 35 },
  ]);

  const [chartData, setChartData] = React.useState(initialData);
  const dispatch: any = useDispatch();
  const tableChartSlice: any = useSelector(
    (state) => state.tableChart.data?.static_chart,
  );

  React.useEffect(() => {
    dispatch(fetchTableChartData('655b261e7e26fb0012425184'));
  }, []);

  React.useEffect(() => {
    if (tableChartSlice) {
      const data: any = [];
      const tableOptions: any = [];

      tableChartSlice.forEach((element, index) => {
        const xAxisOptions: any = [];
        const channelOptions: any = [];

        tableOptions.push({
          name: element.tableName[0],
          value: element.tableName[0],
        });

        element.headers.forEach((header) => {
          xAxisOptions.push({
            name: header,
            value: header,
          });
        });

        const charts = element.rows.map((row) => {
          const outputObj: any = {};
          row.values.forEach((value, index) => {
            outputObj[`plot${index + 1}`] = parseInt(value);
          });
          return outputObj;
        });

        yAxisOptions.forEach((axis, axisIndex) => {
          channelOptions.push({
            axisOptions: {
              yAxisId: initialData[index]?.channelOptions[axisIndex].yAxisId,
              orientation:
                initialData[index]?.channelOptions[axisIndex].orientation,
              dataKey: `plot${axisIndex + 1}`,
              name: axis.name,
              color: colorList[axisIndex],
            },
            lineOptions: {
              yAxisId: initialData[index]?.channelOptions[axisIndex].yAxisId,
              color: colorList[axisIndex],
              dataKey: `plot${axisIndex + 1}`,
            },
            channelName: null,
            channelValue: null,
            data: charts,
            value: yAxisOptions[axisIndex].value,
          });
        });
        data.push({
          tableOptions: tableOptions,
          selectedTable: null,
          xAxisValue: null,
          yAxisOptions: yAxisOptions,
          xAxisOptions: xAxisOptions,
          channelOptions: channelOptions,
          charts: [],
        });
      });
      setChartData(data);
    }
  }, [tableChartSlice]);

  const handleTableChange = (event, index) => {
    const data: any = [...chartData];
    data[index].selectedTable = event.target.value;
    data[index].xAxisValue = null;
    data[index].channelOptions.forEach((element, position) => {
      data[index].channelOptions[position].channelValue = null;
      data[index].channelOptions.splice(4);
      if (position > 4) {
        data[index].channelOptions[position].value = null;
      }
    });
    setChartData(data);
  };

  const handleChannelChange = (event, index, keys) => {
    const data: any = [...chartData];
    const channels: any = { ...data[index] };
    channels.channelOptions[keys].channelValue = event.target.value;
    data[index].channelOptions.forEach((dataItem, index) => {
      if (!channels.charts[index]) {
        channels.charts[index] = {};
      }
      for (const key in dataItem) {
        const outputKey = channels.channelOptions[keys].axisOptions.dataKey
          ? channels.channelOptions[keys].axisOptions.dataKey
          : `plot${index + 1}`;
        channels.charts.push({
          [outputKey]: '',
        });
        debugger;
        channels.charts[index][outputKey] =
          dataItem.data[index][`plot${keys + 1}`];
      }
    });
    setChartData(data);
  };

  const handleXAxisChange = (event, index, key) => {
    const data = [...chartData];
    data[index].xAxisValue = event.target.value;
    setChartData(data);
  };

  const handleYAxisChange = (event, index, key) => {
    const data = [...chartData];
    const channels: any = { ...data[index] };
    channels.channelOptions[key].value = event.target.value;
    setChartData(data);
  };

  const handleColorPickerChange = (event: any, dataIndex: any, key) => {
    const data = [...chartData];
    const values = { ...data[dataIndex] };
    values.channelOptions[key].axisOptions.color = event.target.value;
    values.channelOptions[key].lineOptions.color = event.target.value;
    setChartData(data);
  };

  const handleAddChannel = (index) => {
    const data: any = [...chartData];
    const plot1: any = [];
    const newChannelIndex = data[index].channelOptions.length;
    data[index].channelOptions[0].data.forEach((item) => {
      plot1.push({
        plot1: item.plot1,
      });
    });
    data[index].channelOptions[newChannelIndex] = {
      axisOptions: {
        yAxisId:
          newChannelIndex % 2 === 0
            ? `left${newChannelIndex}`
            : `right${newChannelIndex}`,
        orientation: newChannelIndex % 2 === 0 ? 'left' : 'right',
        dataKey: `plot${newChannelIndex + 1}`,
        name: yAxisOptions[0].name,
        color: colorList[0],
      },
      lineOptions: {
        yAxisId:
          newChannelIndex % 2 === 0
            ? `left${newChannelIndex}`
            : `right${newChannelIndex}`,
        color: colorList[0],
        dataKey: `plot${newChannelIndex + 1}`,
      },
      data: plot1,
      value: yAxisOptions[0].value,
    };
    debugger
    setChartData(data);
  };

  const handleRemoveChannel = (index) => {
    const data: any = [...chartData];
    data[index].channelOptions.pop();
    setChartData(data);
    // setChartData((prevData) => {
    //     const data = [...prevData];
    //     data[index].channelOptions.pop();
    //     return data;
    //   });
  };

  const handleAddChart = () => {
    const data: any = [...chartData];
    const newIndex = data.length;
    data[newIndex] = initialData[0];
    setChartData(data);
  };

  const handleRemoveChart = (index) => {
    setChartData((prevData) => {
      const newArray = prevData.filter((item, key) => key !== index);
      return newArray;
    });
  };

  const Placeholder = ({ children }: any) => {
    return <div style={{ color: 'lightgrey' }}>{children}</div>;
  };

  return (
    <Box>
      {chartData.map((data: any, index: any) => (
        <>
          <Grid container key={index} sx={{ my: 2 }} spacing={2}>
            <Grid
              item
              xs={9.5}
              sm={9.5}
              md={9.5}
              lg={9.5}
              xl={9.5}
              // sx={{ pr: 4 }}
              style={{ borderRight: '1px solid #e4e5e7' }}
            >
              <Grid container sx={{ px: 4 }}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Select
                    labelId="view-all-label"
                    id="time-sec"
                    value={data.selectedTable}
                    displayEmpty
                    IconComponent={ExpandMoreOutlinedIcon}
                    onChange={(event) => handleTableChange(event, index)}
                    renderValue={
                      data.selectedTable !== null
                        ? undefined
                        : () => <Placeholder>Select Table</Placeholder>
                    }
                    size="small"
                    style={{
                      width: '250px',
                      borderRadius: '10px',
                    }}
                  >
                    {data.tableOptions?.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} textAlign={'end'}>
                  <>
                    <Button
                      variant="contained"
                      className="add-chart"
                      onClick={handleAddChart}
                      sx={{ mr: 2 }}
                    >
                      <AddIcon /> &nbsp; Add
                    </Button>
                    {index >= 1 && (
                      <Button
                        variant="contained"
                        className="add-chart"
                        onClick={() => handleRemoveChart(index)}
                      >
                        <CloseOutlined sx={{ fontSize: '18px' }} /> &nbsp;
                        Remove
                      </Button>
                    )}
                  </>
                </Grid>
              </Grid>
              <Box sx={{ mt: 4 }}>
                <ResponsiveContainer width="100%" height={500}>
                  <LineChart data={data.charts}>
                    <XAxis dataKey="name" axisLine={{ fontSize: 12, dy: 4 }} />
                    {data.channelOptions?.map((axis, axisIndex) => (
                      <YAxis
                        key={axisIndex}
                        yAxisId={axis.axisOptions?.yAxisId}
                        orientation={axis.axisOptions?.orientation}
                        label={{
                          value: axis.axisOptions?.name,
                          angle: -90,
                          position: 'insideBottom',
                          fill: axis.axisOptions?.color,
                        }}
                        tick={{
                          fontSize: 12,
                        }}
                        domain={[0, 100]}
                      />
                    ))}
                    <Tooltip />
                    <CartesianGrid
                      stroke="#f5f5f5"
                      strokeDasharray="3 3"
                      strokeWidth={2}
                    />

                    {data.channelOptions?.map((line, lineIndex) => (
                      <Line
                        key={lineIndex}
                        type="linear"
                        dataKey={line.lineOptions?.dataKey}
                        stroke={line.lineOptions?.color}
                        strokeWidth={2}
                        yAxisId={line.lineOptions?.yAxisId}
                        dot={{
                          r: 1,
                          fill: line.lineOptions?.color,
                        }}
                      />
                    ))}
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
                      <Typography className="xy-sec">X</Typography>
                      <Select
                        labelId="view-all-label"
                        size="small"
                        value={data.xAxisValue}
                        displayEmpty
                        IconComponent={ExpandMoreOutlinedIcon}
                        onChange={(event) => handleXAxisChange(event, index)}
                        renderValue={
                          data.xAxisValue !== null
                            ? undefined
                            : () => <Placeholder>Channel</Placeholder>
                        }
                        style={{ width: '250px' }}
                      >
                        {data.xAxisOptions?.map((item, index) => (
                          <MenuItem key={index} value={item.value}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid
              item
              xs={2.5}
              sm={2.5}
              md={2.5}
              lg={2.5}
              xl={2.5}
              style={{ overflowY: 'scroll', height: '650px' }}
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
                    onClick={() => handleAddChannel(index)}
                  >
                    <AddIcon />
                  </Button>
                  <Button
                    variant="contained"
                    className={
                      data.channelOptions?.length < 5
                        ? 'remove-chart'
                        : 'add-chart'
                    }
                    onClick={() => handleRemoveChannel(index)}
                    disabled={data.channelOptions?.length < 5}
                  >
                    <RemoveIcon />
                  </Button>
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                {data.channelOptions?.map((element, key) => (
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
                                  handleChannelChange(event, index, key)
                                }
                                disabled={data.selectedTable === null}
                                renderValue={
                                  element.channelValue !== null
                                    ? undefined
                                    : () => <Placeholder>Select</Placeholder>
                                }
                                style={{ width: '90%' }}
                                // style={{ width: '220px' }}
                              >
                                {data.xAxisOptions.map((item, index) => (
                                  <MenuItem key={index} value={item.name}>
                                    {item.name}
                                  </MenuItem>
                                ))}
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
                              <Select
                                labelId="view-all-label"
                                size="small"
                                value={element.value}
                                displayEmpty
                                IconComponent={ExpandMoreOutlinedIcon}
                                onChange={(event) =>
                                  handleYAxisChange(event, index, key)
                                }
                                disabled={data.selectedTable === null}
                                // renderValue={
                                //   element.value !== null
                                //     ? undefined
                                //     : () => <Placeholder>Axis</Placeholder>
                                // }
                                // style={{ width: '100px' }}
                                fullWidth
                              >
                                {data.yAxisOptions.map((item, index) => (
                                  <MenuItem key={index} value={item.name}>
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
                                  handleColorPickerChange(event, index, key)
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
      ))}
    </Box>
  );
}
