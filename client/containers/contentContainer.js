import React, { component } from 'react';
import DockerCommand from '../components/dockerCommand';
import Stats from '../components/stats';

const ContentContainer = () => {
  return (
    <div className='content_container'>
      <DockerCommand />
      <Stats />
    </div>
  );
};

export default ContentContainer;
