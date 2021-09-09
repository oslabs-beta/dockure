import React, { component, useState } from 'react';
import ContainerList from './containerList';
import { Link } from 'react-router-dom';
import ContainerService from '../services/containerService';

const DockerCommand = ({ conList, conStatus, setConStatus, toggle }) => {
  const [selectedIds, setSelectedIds] = useState({});
  let ready = true;

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
    if (ready) {
      ready = false;
      const promiseArr = [];

      for (let id in selectedIds) {
        let result = ContainerService.postClickBtn(url, id);
        promiseArr.push(result);
      }
      Promise.all(promiseArr).then((values) => {
        setSelectedIds({});
        if (conStatus) return setConStatus(false);
        return setConStatus(true);
      });
      setTimeout(() => {
        ready = true;
      }, 5000);
    }
  };

  return (
    <div
      className={`docker_command ${
        toggle ? 'content_toggle' : 'content_toggle_inactive'
      }`}
    >
      <div>
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
            <span> + Add Container</span>
          </button>
        </Link>
      </div>

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
