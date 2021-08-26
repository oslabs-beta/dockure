import React, { component } from 'react';
import ContainerList from './containerList';
import { Link } from 'react-router-dom';
const DockerCommand = ({conList}) => {
  return (
    <div className='docker_command'>
      <ul className='docker_buttons'>
        <button className='docker_btn'>Start</button>
        <button className='docker_btn'>Stop</button>
        <button className='docker_btn'>Kill</button>
        <button className='docker_btn'>Restart</button>
        <button className='docker_btn'>Pause</button>
        <button className='docker_btn'>Resume</button>
        <button className='docker_btn'>Remove</button>
      </ul>
      <Link to='/main/create'>
      <button className='docker_btn add_btn'>
            {/* <span>+</span> */}
            <span>Add Container</span>
          </button>
        </Link>
      {/* get data of the which container got picked, and apply the buttons // or
      we can send all the button functions to the containerlist as props. */}
      <ContainerList conList={conList} />
    </div>
  );
};
export default DockerCommand;
