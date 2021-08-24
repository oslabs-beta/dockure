import React, { component } from 'react';
import ContainerList from './containerList';
import { Link } from 'react-router-dom';
const DockerCommand = ({conList}) => {
  return (
    <div className='docker_command'>
      <ul className='docker_buttons'>
        <button>Start</button>
        <button>Stop</button>
        <button>Kill</button>
        <button>Restart</button>
        <button>Pause</button>
        <button>Resume</button>
        <button>Remove</button>
        <Link to='/main/create'>
          <button>
            <span>+</span>
            <span>Add container</span>
          </button>
        </Link>
      </ul>
      {/* get data of the which container got picked, and apply the buttons // or
      we can send all the button functions to the containerlist as props. */}
      <ContainerList conList={conList} />
    </div>
  );
};
export default DockerCommand;
