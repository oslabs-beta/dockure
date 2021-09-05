import React, { component, useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const Graph = ({ data, dataKey, dataType }) => {
  return (
    <div>
      <ResponsiveContainer width={380} height={280}>
        <LineChart width={380} height={280} data={data}>
          <Line type='monotone' dataKey={dataKey} dot={false} />
          {/* <CartesianGrid stroke='#ccc' /> */}
          <XAxis dataKey='time' />
          <YAxis
            dataKey={dataKey}
            domain={['auto', 'auto']}
            label={{
              value: `Percent of Total ${dataType} Used`,
              angle: -90,
              position: 'insideLeft',
              dy: 100,
              dx: -5,
            }}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
