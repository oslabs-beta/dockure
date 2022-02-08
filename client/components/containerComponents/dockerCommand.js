import React, { useState, useEffect, useCallback } from 'react';
import ContainerList from './containerList';
import { Link } from 'react-router-dom';
import ContainerService from '../../services/containerService';
import { throttle } from '../../services/utilities';

const DockerCommand = ({
  conList,
  toggle,
  callConStatus,
  loading,
  setLoading,
  error,
}) => {
  const [selectedIds, setSelectedIds] = useState({});
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

  const updateContainerStatuses = (ids, command) => {
    setLoading(true);
    const promiseArr = [];
    for (let id in ids) {
      let result = ContainerService.postClickBtn(command, id);
      promiseArr.push(result);
    }
    Promise.all(promiseArr).then((values) => {
      setSelectedIds({});
      callConStatus();
    });
  };

  const updateContainerStatusesThrottle = useCallback(
    throttle(updateContainerStatuses, 5000),
    []
  );

  const onClickButton = (command) => {
    updateContainerStatusesThrottle(selectedIds, command);
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
            onClick={(e) => onClickButton('start')}
          >
            Start
          </button>
          <button
            className='docker_btn docker_redbtn'
            onClick={(e) => onClickButton('stop')}
          >
            Stop
          </button>
          <button
            className='docker_btn docker_redbtn'
            onClick={(e) => onClickButton('kill')}
          >
            Kill
          </button>
          <button
            className='docker_btn docker_commonbtn'
            onClick={(e) => onClickButton('restart')}
          >
            Restart
          </button>
          <button
            className='docker_btn docker_commonbtn'
            onClick={(e) => onClickButton('pause')}
          >
            Pause
          </button>
          <button
            className='docker_btn docker_commonbtn'
            onClick={(e) => onClickButton('resume')}
          >
            Resume
          </button>
          <button
            className='docker_btn docker_redbtn'
            onClick={(e) => onClickButton('remove')}
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
      {error && (
        <div>Cannot get the docker containers. Please reopen the app</div>
      )}
      {loading && <div>Please wait...</div>}

      <ContainerList
        conList={conList}
        onCheckboxClickCallback={onCheckboxClickCallback}
        selectedIds={selectedIds}
      />
    </div>
  );
};
export default DockerCommand;
