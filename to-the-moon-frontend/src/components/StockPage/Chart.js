import React, {useState, useEffect} from 'react'
import { createDate, formatDate, isWeekend } from '../../helpers/date-helper';
import Card from '../Card';
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis } from 'recharts'
import { chartConfig } from './config';
import ChartFilter from './ChartFilter';
import { fetchHistoricalData } from '../../api/stock-api';

const Chart = ({symbol}) => {
    const [filter, setFilter] = useState("1W");
    const [data, setData] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [yDomain, setYDomain] = useState([0, 0]);
    const [valid, setValid] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
          try {
            const { interval, days, weeks, months, years } = chartConfig[filter];
            const date = new Date();
            const endDate = createDate(date, -1, 0, 0, 0);
            const startDate = createDate(endDate, -days, -weeks, -months, -years);
            let formattedStartDate = formatDate(startDate);
            let formattedEndDate = formatDate(endDate);
            if(filter === "1D") {
              while(isWeekend(formattedEndDate)){
                formattedStartDate = formatDate(createDate(formattedStartDate, -1, 0, 0, 0));
                formattedEndDate = formatDate(createDate(formattedEndDate, -1, 0, 0, 0));
              }
            }
            const fetchedData = await fetchHistoricalData(symbol, interval, formattedStartDate, formattedEndDate);

            if (!fetchedData || !fetchedData.values || fetchedData.status === "error") {
              setValid(false);
              setData(null);
            } else {
              setValid(true);
              setData(fetchedData);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
            setData(null);
            setValid(false);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }, [filter]);

    useEffect(() => {
        if(data && !loading){
          console.log(data);
            const transformData = (data) => {
                return data.values.reduce((acc, item) => {
                  for (const key in item) {
                    if (!acc[key]) {
                      acc[key] = [];
                    }
                    if (key === 'volume') {
                      acc[key].unshift(parseInt(item[key], 10)); // Push to the beginning
                    } else if (key === 'datetime') {
                      acc[key].unshift(item[key]); // Keep datetime as string and push to the beginning
                    } else {
                      acc[key].unshift(parseFloat(item[key])); // Push to the beginning
                    }
                  }
                  return acc;
                }, {});
            };
            const formatData = (data) => {
                return data.close.map((item, index) => {
                    return {
                        value: item.toFixed(2),
                        date: (data.datetime[index])
                    }
                })
            }
            const transformed = transformData(data);
            const formatted = formatData(transformed);
            setChartData(formatted);

            // calculate y-axis range
            const values = formatted.map((d) => parseFloat(d.value));
            const min = Math.min(...values);
            const max = Math.max(...values);
            const buffer = (max - min) * 0.05 || 1; // prevent buffer = 0 if values are flat

            setYDomain([min - buffer, max + buffer]);
        }
      }, [data, loading]);

    return (
        <Card>
            <ul className="flex absolute top-2 right-2 z-40">
                {Object.keys(chartConfig).map((item) => {
                    return (
                        <li key={item}>
                            <ChartFilter 
                                text={item} 
                                active={filter === item} 
                                onClick={()=>{
                                    setFilter(item);
                                }}
                            />
                        </li>
                    )
                })}
            </ul>
            {!valid ? (
              <div className="p-8 text-center text-red-400">Unable to load chart data. Please try again later.</div>
            ) : (
              <ResponsiveContainer>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#312e81" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#312e81" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#312e81"
                    fillOpacity={1}
                    strokeWidth={0.5}
                    fill="url(#chartColor)"
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#111827" }}
                    itemStyle={{ color: "#818cf8" }}
                  />
                  <XAxis dataKey={"date"} />
                  <YAxis domain={yDomain} tickFormatter={(value) => value.toFixed(2)} />
                </AreaChart>
              </ResponsiveContainer>
            )}
        </Card>
    )
}

export default Chart
