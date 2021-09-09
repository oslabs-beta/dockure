import React, { component, useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const Graph = ({ data, dataKey, dataType }) => {

  const CustomTooltip = ({active, payload, label}) => {
    
    if(active) {
      let value;
      if(payload === null) return null;
        value = Object.values(payload[0].payload)
   
      return (
        <div
          style={{
            borderRadius: '0.25rem',
            background: '#26313c',
            color:'#fff',
            padding: '1rem',
            boxShadow: '14px 30px 40px 5px rgba(0, 0, 0, 0.5)',
            textAlign: 'center'
          }}
        >
        <h4>{`Time: ${label} value: ${value === undefined ? 0 : value[1].toFixed(5)}`}</h4>
      </div>)
    } else return (
      <div>loading</div>
    );
  };

  return (
    <div>

      <ResponsiveContainer width={380} height={280}>
        <AreaChart width={380} height={280} data={data}>
          {/* <Line type='monotone' dataKey={dataKey} dot={false} /> */}
          <CartesianGrid opacity={0.1} vertical={false} stroke='#ccc' />
          <defs>
            <linearGradient id="graph-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8884d8" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#8884d8" stopOpacity={0.05} />
              {/* <stop offset="0%" stopColor="#f7f7f7" stopOpacity={0.4} /> */}

            </linearGradient>
          </defs>
          <XAxis 
            dataKey='time' 
            axisLine={false}
            tickLine={false}
            style={{fontSize:'.8rem'}}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={number => `${number.toFixed(2)}%`}
            dataKey={dataKey}
            domain={['auto', 'auto']}
            style={{fontSize:'.8rem'}}
            label={{
              value: `Percent of Total ${dataType} Used`,
              angle: -90,
              position: 'insideLeft',
              dy: 100,
              dx: -3,
              style: {
                fill: '#989898',
                fontSize: '1rem'
              },
            }}
          />
          <Tooltip content={<CustomTooltip/>}/>
          
          <Area type="monotone" dataKey={dataKey} stroke="#8884d8" fill="url(#graph-gradient)" />
        </AreaChart>
      </ResponsiveContainer> 
    </div>
  );
};

export default Graph;


