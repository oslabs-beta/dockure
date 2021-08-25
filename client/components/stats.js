import React, { component } from 'react';
import StatsService from '../services/statsService';

const Stats = () => {

  function test() {
    return StatsService.getStats('node_memory_Active_bytes', 1);
  }

  return (
    <div className='stats'>
      {/* <div className='stats_cpu'>CPU</div> */}
      <button onClick={test} >StatsTest</button>
      <div className='stats_memory'>Memory</div>
      {/* <div className='stats_count'>Request Count</div> */}
    </div>
  );
};

export default Stats;


//process_virtual_memory_bytes -> how much memory it has allocated?
//process_resident_memory_bytes  -> how much memory it currently utilizes
