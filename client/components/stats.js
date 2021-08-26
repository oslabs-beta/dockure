import React, { component, useEffect, useState } from 'react';
import StatsService from '../services/statsService';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Stats = () => {
  const [memory, setMemory] = useState([])

  // useEffect(async () => {
    // const result = await StatsService.getStats('process_resident_memory_bytes', 1);
    // await setMemory(result);
    // await refresh();
    // console.log('refresh worked?: ', memory);
  // }, []);

  async function refresh() {
    //could add an input for what the y-axis data should be called
    const result = await StatsService.getCurrentMemory('process_resident_memory_bytes', 1);
    setMemory(result);
    console.log(memory);
  }

  function testButton() {
    console.log('TEST BUTTON: ', memory);
  }

  return (
    <div className='stats'>
      <div className='stats_cpu'>CPU</div> */

      <button onClick={refresh} >Refresh</button>
      <button onClick={testButton} >TEST</button>
      <div className='stats_memory'>Memory
      <ResponsiveContainer width={600} height={400}>
        <LineChart width={600} height={400} data={memory}>
          <Line type='monotone' dataKey='MBs'/>
          <CartesianGrid stroke='#ccc' />
          <XAxis datakey='time' />
          <YAxis dataKey='MBs' domain={['auto', 'auto']}/>
          <Tooltip />
        </LineChart>
      </ResponsiveContainer> 
      </div>
      <div className='stats_count'>Request Count</div>
    </div>
  );
};

export default Stats;


//process_virtual_memory_bytes -> how much memory it has allocated?
//process_resident_memory_bytes  -> how much memory it currently utilizes
