import React, { component, useEffect, useState } from 'react';
import StatsService from '../services/statsService';
import recharts from 'recharts';

const Stats = () => {
  //add some state for the data
  const [memory, setMemory] = useState([])
  //use effect on load to update data

  //button to update data
  useEffect(async () => {
    const result = await StatsService.getStats('process_resident_memory_bytes', 1);
    setMemory(result.data);
  }, []);

  function test() {
    console.log(memory);
    // return StatsService.getStats('process_resident_memory_bytes', 1);
  }

  return (
    <div className='stats'>
      {/* <div className='stats_cpu'>CPU</div> */}
      <button onClick={test} >Refresh</button>
      <div className='stats_memory'>Memory</div>
      {/* <div className='stats_count'>Request Count</div> */}
    </div>
  );
};

export default Stats;


//process_virtual_memory_bytes -> how much memory it has allocated?
//process_resident_memory_bytes  -> how much memory it currently utilizes
