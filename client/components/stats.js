import React, { component, useEffect, useState } from 'react';
import StatsService from '../services/statsService';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useSelector } from 'react-redux';
import { getMetricsSelector } from './stats.selector';

const Stats = () => {
  const [memory, setMemory] = useState([])
  const [data, setData] = useState({});

  // useEffect(async () => {
    // const result = await StatsService.getStats('process_resident_memory_bytes', 1);
    // await setMemory(result);
    // await refresh();
    // console.log('refresh worked?: ', memory);
  // }, []);

  //is this correct?


  const { metrics } = useSelector(getMetricsSelector);



  const metricsParser = (metrics) => {
    console.log(metrics)
    let data = {}
    if (metrics.cpu_stats !== undefined) {
      data.cpu = metrics.cpu_stats.cpu_usage.total_usage/100000000;
      data.memory = metrics.memory_stats.usage / 1000000;
      setData(data)
    }
    return data;
  }
  
  console.log(metrics, 'metricssssjioawej')
  //   if (state.container !== undefined) {
  //     let stateMets = state.container.metrics;
  //     console.log(stateMets, 'mets suck');
  //     let data = {}
  //     console.log('Selector in stats entered: ', state);
  //     data.cpu = stateMets.data.cpu_stats.cpu_usage.total_usage / 1000000;
  //     data.memory = StateMets.data.memory_stats.usage / 1000000;
  //     console.log(data, 'dataaaaaaaaa');
  //     return data; 
  //   }
  //   else return {};
  //   let stateMets = state.container.metrics;
  //   console.log(state.container)
  //   ;
  // });

  // useEffect(async () => {
  //   setData(metrics)
  //   console.log(data, )
  // });

  
  
  

  // console.log('data.cpu data: ', data.cpu);
  // console.log('data.memory data: ', data.memory);

  console.log('Stats.js metrics passed successfully: ', metrics);

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
      <h1>testing if this works</h1>
      {metricsParser(metrics)}
      <button onClick={refresh} >Refresh</button>
      <button onClick={testButton} >TEST</button>
      <div className='stats_memory'>Memory
      {/* <BarChart width={300}} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart> */}

      {/* <ResponsiveContainer width={600} height={400}>
        <LineChart width={600} height={400} data={memory}>
          <Line type='monotone' dataKey='MBs'/>
          <CartesianGrid stroke='#ccc' />
          <XAxis datakey='time' />
          <YAxis dataKey='MBs' domain={['auto', 'auto']}/>
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>  */}
      </div>
      <div className='stats_count'>Request Count</div>
    </div>
  );
};

export default Stats;


//process_virtual_memory_bytes -> how much memory it has allocated?
//process_resident_memory_bytes  -> how much memory it currently utilizes
