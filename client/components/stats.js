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



  // const metricsParser = (metrics) => {
  //   console.log(metrics)
  //   let data = {}
  //   if (metrics.cpu_stats !== undefined) {
  //     data.cpu = metrics.cpu_stats.cpu_usage.total_usage/100000000;
  //     data.memory = metrics.memory_stats.usage / 1000000;
  //     setData(data)
  //   }
  //   return data;
  // }
  
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

  


  console.log('Stats.js metrics passed successfully: ', metrics);

  return (
    <div className='stats'>
      <div className='stats_cpu'>CPU
      <ResponsiveContainer width={600} height={400}>
        <LineChart width={600} height={400} data={metrics.cpu}>
          <Line type='monotone' dataKey='percentTotalCpuUsed' dot={false}/>
          <CartesianGrid stroke='#ccc' />
          <XAxis datakey='time' />
          <YAxis dataKey='percentTotalCpuUsed' domain={['auto', 'auto']}/>
          <Tooltip />
        </LineChart>
      </ResponsiveContainer> 
      </div>
      <div className='stats_memory'>Memory

      <ResponsiveContainer width={600} height={400}>
        <LineChart width={600} height={400} data={metrics.memory}>
          <Line type='monotone' dataKey='percentTotalMemoryUsed' dot={false}/>
          <CartesianGrid stroke='#ccc' />
          <XAxis datakey='time' />
          <YAxis dataKey='percentTotalMemoryUsed' domain={['auto', 'auto']}/>
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
