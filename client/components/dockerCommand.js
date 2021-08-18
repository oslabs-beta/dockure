import React, { component } from 'react';
import ContainerList from './containerList';

const DockerCommand = () => {
  return (
    <div className='docker_command'>
      <ul className='docker_buttons'>buttons!!!</ul>
      {/* get data of the which container got picked, and apply the buttons // or
      we can send all the button functions to the containerlist as props. */}
      <ContainerList />
    </div>
  );
};

export default DockerCommand;
