import React, { component } from 'react';

const Stats = () => {
  return (
    <div className='stats'>
      <div className='stats_box'>
        <div className='stats_cpu'>CPU</div>
        <div className='stats_memory'>Memory</div>
        <div className='stats_count'>Request Count</div>
      </div>
    </div>
  );
};

export default Stats;
