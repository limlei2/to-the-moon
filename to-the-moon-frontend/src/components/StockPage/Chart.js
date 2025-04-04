import React, {useState, useEffect} from 'react'
import { mockData2, mockHistoricalData } from '../../mockData/mock'
import { convertUnixTimestampToDate } from '../../helpers/date-helper';
import Card from './Card';
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis } from 'recharts'
import { chartConfig } from './config';
import ChartFilter from './ChartFilter';
import { fetchHistoricalData } from '../../api/stock-api';

const Chart = () => {
    const [data, setData] = useState(mockHistoricalData);
    const [filter, setFilter] = useState("1W");
    const [data2, setData2] = useState(mockData2);
    const [transformedData, setTransformedData] = useState(null);

    useEffect(() => {
        const transformData = (data) => {
          return data.values.reduce((acc, item) => {
            for (const key in item) {
              if (!acc[key]) {
                acc[key] = [];
              }
              if (key === 'volume') {
                acc[key].push(parseInt(item[key], 10));
              } else if (key === 'datetime') {
                acc[key].push(item[key]); // Keep datetime as string
              } else {
                acc[key].push(parseFloat(item[key]));
              }
            }
            return acc;
          }, {});
        };
        console.log(transformData(data2));
        setTransformedData(transformData(data2));
      }, [data2]);


    // useEffect(() => {
    //     setData(fetchHistoricalData("symbol","",""))
    // }, [filter]);

    const formatData = () => {
        return data.c.map((item, index) => {
            return {
                value: item.toFixed(2),
                date: convertUnixTimestampToDate(data.t[index])
            }
        })
    }

    const formatData2 = () => {
        return transformedData.close.map((item, index) => {
            return {
                value: item.toFixed(5),
                date: ""
            }
        })
    }

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
            <ResponsiveContainer>
                <AreaChart data={formatData(data)}>
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
                        contentStyle={{backgroundColor: "#111827"}}
                        itemStyle={{color:"#818cf8"}}
                    />
                    <XAxis dataKey={"date"} />
                    <YAxis domain={["dataMin", "dataMax"]} />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default Chart
