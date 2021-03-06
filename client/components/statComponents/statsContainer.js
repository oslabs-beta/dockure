import React from 'react';
import Graph from './graph';

import { useDispatch } from 'react-redux';
import { setTimeSelector } from '../../redux/action/action.js';
import { useSelector } from 'react-redux';
import { getMetricsSelector } from '../selectors/stats.selector';

const Stats = () => {
  const { metrics } = useSelector(getMetricsSelector);
  const dispatch = useDispatch();

  return (
    <div className='stats'>
      <div id='stats_time'>
        <button
          className='item_dataBtn'
          onClick={() => {
            dispatch(setTimeSelector(1));
          }}
        >
          1 Hour
        </button>
        <button
          className='item_dataBtn'
          onClick={() => dispatch(setTimeSelector(8))}
        >
          8 Hour
        </button>
        <button
          className='item_dataBtn'
          onClick={() => dispatch(setTimeSelector(24))}
        >
          24 Hour
        </button>
      </div>

      <div style={{ color: '#989898' }}>CPU Usage</div>
      <Graph
        data={metrics ? metrics.cpu : null}
        dataKey={'percentTotalCpuUsed'}
        dataType={'CPU'}
      />
      <div style={{ color: '#989898' }}>Memory Usage</div>
      <Graph
        data={metrics ? metrics.memory : null}
        dataKey={'percentTotalMemoryUsed'}
        dataType={'Memory'}
      />
    </div>
  );
};

export default Stats;
