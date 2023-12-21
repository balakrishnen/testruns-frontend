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
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchTableChartData } from '../../api/RunsAPI';
// import { TableChartStaticData } from '../../utils/data';

export default function TableChart({ staticChartData }: any) {
  const colorList = ['#e22828', '#90239f', '#111fdf', '#38e907'];
  const channelOptions = [
    {
      channel: null,
      yAxisValue: 'Y1',
      color: colorList[0],
      yAxisId: 'left1',
      orientation: 'left',
      dataKey: 'plot1',
      name: 'Y1',
    },
    {
      channel: null,
      yAxisValue: 'Y2',
      color: colorList[1],
      yAxisId: 'right1',
      orientation: 'right',
      dataKey: 'plot2',
      name: 'Y2',
    },
    {
      channel: null,
      yAxisValue: 'Y3',
      color: colorList[2],
      yAxisId: 'left2',
      orientation: 'left',
      dataKey: 'plot3',
      name: 'Y3',
    },
    {
      channel: null,
      yAxisValue: 'Y4',
      color: colorList[3],
      yAxisId: 'right2',
      orientation: 'right',
      dataKey: 'plot4',
      name: 'Y4',
    },
  ];

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

  // const initialData: any = [
  //   {
  //     selectedTable: null,
  //     channelOptions: channelOptions,
  //     xAxisValue: null,
  //     yAxisOptions: [],
  //   },
  // ];

  const [chartData, setChartData] = React.useState<any>(
    staticChartData === '' ? [] : staticChartData,
  );
  const [tableList, setTableList] = React.useState<any>([]);
  const [channelsList, setChannelsList] = React.useState<any>([]);
  const [displayCount, setDisplayCount] = React.useState(1);
  const [xDataKey, setXDataKey] = React.useState<any>(null)

  React.useEffect(() => {
    const data: any = [];
    const tableList: any = [];
    const channels: any = [];
    chartData.forEach((element, index) => {
      tableList.push({
        name: element.label,
        value: element.value,
      });

      element.data.forEach((channel) => {
        channels.push({
          name: channel.label,
          value: channel.label,
          index: index,
          data: channel.values,
        });
      });
      debugger
      data.push({
        selectedTable: null,
        channelOptions: channelOptions,
        channelsList: [],
        xAxisValue: null,
        yAxisOptions: yAxisOptions,
        charts: [],
      });
    });
    setTableList(tableList);
    setChartData(data);
    setChannelsList(channels);
    // setCData(charts)
  }, []);

  const handleTableChange = (event, index) => {
    const data: any = [...chartData];
    const activeTable = tableList.findIndex(
      (item: any) => item.name === event.target.value,
    );
    const activeChannel = channelsList.filter(
      (item) => item.index === activeTable,
    );
    data[index].selectedTable = event.target.value;
    data[index].channelsList = activeChannel;
    data[index].xAxisValue = activeChannel[0].name;
    data[index].charts = [];
    data[index].channelOptions.forEach((element) => {
      element.channel = null;
    });
    setChartData(data);
  };

  const handleChannelChange = (event, index, keys) => {
    const data: any = [...chartData];
    const channels: any = { ...data[index] };
    const charts: any = [...channels.charts];
    // const axisPosition: any =
    //   channels.channelOptions[keys].dataKey.charAt(
    //     channels.channelOptions[keys].dataKey.length - 1,
    //   ) - 1;
    const channelPosition = channels.channelsList.findIndex(
      (item: any) => item.name === event.target.value,
    );
    channels.channelOptions[keys].channel = event.target.value;
    channels.channelOptions[keys].color = colorList[keys];
    channels.channelsList.forEach((element, index) => {
      if (channels.charts.length === 0) {
        charts.push({
          [`plot${keys + 1}`]: element.data[channelPosition]
            ? element.data[channelPosition]
            : 0,
        });
      } else {
        charts[index][`plot${channelPosition + 1}`] = element.data[
          channelPosition
        ]
          ? element.data[channelPosition]
          : 0;
      }
    });
    data[index].charts = charts;
    setChartData(data);
  };

  const handleXAxisChange = (event, index) => {
    const data = [...chartData];
    data[index].xAxisValue = event.target.value;
    const channelIndex = channelsList.findIndex((item) => item.name === event.target.value)
    setXDataKey(`plot${channelIndex + 1}`)
    setChartData(data);
  };

  const handleYAxisChange = (event, index, key) => {
    const data = [...chartData];
    const channels: any = { ...data[index] };
    channels.channelOptions[key].yAxisValue = event.target.value;
    setChartData(data);
  };

  const handleColorPickerChange = (event: any, dataIndex: any, key) => {
    const data = [...chartData];
    const values = { ...data[dataIndex] };
    values.channelOptions[key].color = event.target.value;
    setChartData(data);
  };

  const handleAddChannel = (index) => {
    const data: any = [...chartData];
    const newChannelIndex = data[index].channelOptions.length;
    const stringLen =
      data[index].channelOptions[newChannelIndex - 1].dataKey.length;
    data[index].channelOptions[newChannelIndex] = {
      channel: null,
      yAxisValue: 'Y1',
      color: '#000',
      yAxisId: 'left1',
      orientation: 'left',
      dataKey: `plot${stringLen}`,
    };
    // data[index].channelOptions[0].data.forEach((item) => {
    //   plot1.push({
    //     plot1: item.plot1,
    //   });
    // });
    // data[index].channelOptions[newChannelIndex] = {
    //   axisOptions: {
    //     yAxisId:
    //       newChannelIndex % 2 === 0
    //         ? `left${newChannelIndex}`
    //         : `right${newChannelIndex}`,
    //     orientation: newChannelIndex % 2 === 0 ? 'left' : 'right',
    //     dataKey: `plot${newChannelIndex + 1}`,
    //     name: yAxisOptions[0].name,
    //     color: colorList[0],
    //   },
    //   lineOptions: {
    //     yAxisId:
    //       newChannelIndex % 2 === 0
    //         ? `left${newChannelIndex}`
    //         : `right${newChannelIndex}`,
    //     color: colorList[0],
    //     dataKey: `plot${newChannelIndex + 1}`,
    //   },
    //   data: plot1,
    //   value: yAxisOptions[0].value,
    // };
    // debugger
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
    // const newIndex = data.length;
    // data[newIndex] = initialData[0];
    // setChartData(data);
    if (displayCount < data.length) {
      setDisplayCount(displayCount + 1);
    }
  };

  const handleRemoveChart = (index) => {
    // setChartData((prevData) => {
    //   const newArray = prevData.filter((item, key) => key !== index);
    //   return newArray;
    // });
    if (displayCount > 0) {
      setDisplayCount(displayCount - 1);
    }
  };

  const Placeholder = ({ children }: any) => {
    return <div style={{ color: 'lightgrey' }}>{children}</div>;
  };

  return (
    <Box>
      <>
        {chartData.slice(0, displayCount).map((data: any, index: any) => (
          <>
            <Grid container key={index} sx={{ my: 2 }} spacing={2}>
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
                  <Grid item xs={12} sm={8} md={6} lg={2} xl={2}>
                    <Select
                      labelId="view-all-label"
                      id="time-sec"
                      value={data.selectedTable}
                      displayEmpty
                      IconComponent={ExpandMoreOutlinedIcon}
                      onChange={(event) => handleTableChange(event, index)}
                      MenuProps={{
                        disableScrollLock: true,
                        marginThreshold: null,
                      }}
                      renderValue={
                        data.selectedTable !== null
                          ? undefined
                          : () => <Placeholder>Select Table</Placeholder>
                      }
                      size="small"
                      style={{
                        width: '100%',
                        borderRadius: '10px',
                        marginBottom: '15px',
                      }}
                    >
                      {tableList?.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={6}
                    lg={10}
                    xl={10}
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
                      {/* <XAxis
                        dataKey="dataKey"
                        axisLine={{ fontSize: 12, dy: 4 }}
                      /> */}
                      <XAxis
                        orientation="bottom"
                        dataKey={xDataKey}
                        label={{
                          value: data.xAxisValue,
                          position: 'insideBottom',
                          fill: 'blue',
                        }}
                        tick={{
                          fontSize: 12,
                        }}
                        domain={[0, 100]}
                        // tickFormatter={customTickFormatter}
                      />
                      {data.channelOptions?.map((axis, axisIndex) => (
                        <YAxis
                          key={axisIndex}
                          yAxisId={axis.yAxisId}
                          orientation={axis.orientation}
                          label={{
                            value: axis.name,
                            angle: -90,
                            position: 'insideBottom',
                            fill: axis.color,
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
                          dataKey={line.dataKey}
                          stroke={line.color}
                          strokeWidth={2}
                          yAxisId={line.yAxisId}
                          dot={{
                            r: 1,
                            fill: line.color,
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
                          MenuProps={{
                            disableScrollLock: true,
                            marginThreshold: null,
                          }}
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
                          disabled={data.selectedTable === null}
                          style={{ width: '250px' }}
                        >
                          {data.channelsList?.map((item, index) => (
                            <MenuItem key={index} value={item.name}>
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
                xs={12}
                sm={12}
                md={12}
                lg={3}
                xl={2}
                style={{ overflowY: 'scroll' }}
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
                      onClick={() => handleAddChannel(index)}
                      disabled={data.selectedTable === null}
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
                <Box
                  sx={{ mt: 2, pr: 2 }}
                  style={{ overflowY: 'scroll', height: '550px' }}
                >
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
                                  MenuProps={{
                                    disableScrollLock: true,
                                    marginThreshold: null,
                                  }}
                                  labelId="view-all-label"
                                  size="small"
                                  value={element.channel}
                                  displayEmpty
                                  IconComponent={ExpandMoreOutlinedIcon}
                                  onChange={(event) =>
                                    handleChannelChange(event, index, key)
                                  }
                                  disabled={data.selectedTable === null}
                                  renderValue={
                                    element.channel !== null
                                      ? undefined
                                      : () => <Placeholder>Select</Placeholder>
                                  }
                                  style={{ width: '90%' }}
                                  // style={{ width: '220px' }}
                                >
                                  {data.channelsList?.map((item, index) => (
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
                                  MenuProps={{
                                    disableScrollLock: true,
                                    marginThreshold: null,
                                  }}
                                  labelId="view-all-label"
                                  size="small"
                                  value={element.yAxisValue}
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
      </>
    </Box>
  );
}

const StaticData = [
  {
    y1: Math.ceil(Math.random()),
    y2: Math.ceil(Math.random()),
    y3: Math.ceil(Math.random()),
    y4: Math.ceil(Math.random()),
  },
  {
    y1: Math.ceil(Math.random()),
    y2: Math.ceil(Math.random()),
    y3: Math.ceil(Math.random()),
    y4: Math.ceil(Math.random()),
  },
  {
    y1: Math.ceil(Math.random()),
    y2: Math.ceil(Math.random()),
    y3: Math.ceil(Math.random()),
    y4: Math.ceil(Math.random()),
  },
  {
    y1: Math.ceil(Math.random()),
    y2: Math.ceil(Math.random()),
    y3: Math.ceil(Math.random()),
    y4: Math.ceil(Math.random()),
  },
  {
    y1: Math.ceil(Math.random()),
    y2: Math.ceil(Math.random()),
    y3: Math.ceil(Math.random()),
    y4: Math.ceil(Math.random()),
  },
];

const customTickFormatter = (value) => {
  return `${value}`;
};
