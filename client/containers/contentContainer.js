import React, { component, useEffect, useState } from 'react';
import DockerCommand from '../components/dockerCommand';
import Stats from '../components/stats';
import ContainerService from '../services/containerService';

const ContentContainer = () => {
  const [conList, setConList] = useState([]);
  const [conStats, setConStats] = useState([]);

  useEffect(async () => {
    const result = await ContainerService.getConInfo('http://localhost:3000/api/containers')
    setConList(result);
  }, []);

  //getting stats about a particular container
  //how do we pass this infoirmation from conList to Stats
  // useEffect(async () => {
  //   const stats = await ContainerService.getConStats('api/containers/stats', { id: id })
  //   setConStats(stats)
  // });

  return (
    <div className='content_container'>
      <DockerCommand conList={conList}/>
      <Stats />
    </div>
  );
};

export default ContentContainer;
