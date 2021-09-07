import React, { component, useState } from 'react';
import ContainerList from './containerList';
import { Link } from 'react-router-dom';
import ContainerService from '../services/containerService';

const DockerCommand = ({ conList, conStatus, setConStatus, toggle }) => {
  const [selectedIds, setSelectedIds] = useState({});
  // refactor code with redux;

  const onCheckboxClickCallback = (id) => {
    let newSelectedIds = { ...selectedIds };
    if (selectedIds[id]) {
      delete newSelectedIds[id];
      setSelectedIds(newSelectedIds);
      return;
    }
    newSelectedIds[id] = true;
    setSelectedIds(newSelectedIds);
  };

  const onClickButton = (url) => {
    // const check = document.querySelector('.item_checkbox');
    // console.log(selectedIds);
    const promiseArr = [];
    for (let id in selectedIds) {
      let result = ContainerService.postClickBtn(url, id);
      promiseArr.push(result);
    }
    // const values = await Promise.all(promiseArr);
    Promise.all(promiseArr).then((values) => {
      console.log(values[0].status);
      // need to use redux to update status
      // check.checked = false;
      setSelectedIds({});
      if (conStatus) return setConStatus(false);
      return setConStatus(true);
    });
  };

  return (
    <div
      className={`docker_command ${
        toggle ? 'content_toggle' : 'content_toggle_inactive'
      }`}
    >
      <ul className='docker_buttons'>
        <button
          className='docker_btn docker_start'
          onClick={(e) =>
            onClickButton('http://localhost:3000/api/containers/start')
          }
        >
          Start
        </button>
        <button
          className='docker_btn docker_redbtn'
          onClick={(e) =>
            onClickButton('http://localhost:3000/api/containers/stop')
          }
        >
          Stop
        </button>
        <button
          className='docker_btn docker_redbtn'
          onClick={(e) =>
            onClickButton('http://localhost:3000/api/containers/kill')
          }
        >
          Kill
        </button>
        <button
          className='docker_btn docker_commonbtn'
          onClick={(e) =>
            onClickButton('http://localhost:3000/api/containers/restart')
          }
        >
          Restart
        </button>
        <button
          className='docker_btn docker_commonbtn'
          onClick={(e) =>
            onClickButton(
              'http://localhost:3000/api/containers/pause',
              selectedIds
            )
          }
        >
          Pause
        </button>
        <button
          className='docker_btn docker_commonbtn'
          onClick={(e) =>
            onClickButton(
              'http://localhost:3000/api/containers/resume',
              selectedIds
            )
          }
        >
          Resume
        </button>
        <button
          className='docker_btn docker_redbtn'
          onClick={(e) =>
            onClickButton(
              'http://localhost:3000/api/containers/remove',
              selectedIds
            )
          }
        >
          Remove
        </button>
      </ul>
      <Link to='/main/create'>
        <button className='docker_btn add_btn'>
          {/* <span>+</span> */}
          <span> + Add Container</span>
        </button>
      </Link>
      {/* get data of the which container got picked, and apply the buttons // or
      we can send all the button functions to the containerlist as props. */}
      <ContainerList
        conList={conList}
        onCheckboxClickCallback={onCheckboxClickCallback}
        conStatus={conStatus}
        selectedIds={selectedIds}
      />
    </div>
  );
};
export default DockerCommand;
