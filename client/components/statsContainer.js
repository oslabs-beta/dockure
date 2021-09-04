import React, { component, useEffect, useState } from 'react';
import Graph from './graph';

import { useSelector } from 'react-redux';
import { getMetricsSelector } from './stats.selector';

const Stats = () => {
  const { metrics } = useSelector(getMetricsSelector);

  return (
    <div className='stats'>
      <div>CPU Usage</div>
      <Graph 
        data={metrics.cpu}
        dataKey={'percentTotalCpuUsed'}
        dataType={'CPU'}
      />
      
      <div>Memory Usage</div>
      <Graph
        data={metrics.memory}
        dataKey={'percentTotalMemoryUsed'}
        dataType={'Memory'}
      />
      {/* <div className='stats_count'>Request Count</div> */}
    </div>
  );
};

export default Stats;
