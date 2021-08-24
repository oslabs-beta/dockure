import React, { component, useEffect, useState } from 'react';
import DockerCommand from '../components/dockerCommand';
import Stats from '../components/stats';
import ContainerService from '../services/containerService'

const ContentContainer = () => {
  const [conList, setConList] = useState([]);

  useEffect(async () => {
    const result = await ContainerService.getConInfo('http://localhost:3000/api')
    setConList(result);
  }, []);

  return (
    <div className='content_container'>
      <DockerCommand conList={conList}/>
      <Stats />
    </div>
  );
};

export default ContentContainer;
