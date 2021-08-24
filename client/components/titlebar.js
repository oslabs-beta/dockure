import React, { component, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const ipcRenderer = window.require('electron').ipcRenderer;
import {
  faBars,
  faFish,
  faUser,
  faTimes,
  faWindowMinimize,
  faExpandAlt,
} from '@fortawesome/free-solid-svg-icons';

const Titlebar = () => {
  const [isActive, setIsActive] = useState();
  const [isMaximized, setIsMaximized] = useState();

  ipcRenderer.on('focused', () => {
    setIsActive(true);
  });
  ipcRenderer.on('blurred', () => {
    setIsActive(false);
  });
  ipcRenderer.on('maximized', () => {
    setIsMaximized(true);
  });
  ipcRenderer.on('unmaximized', () => {
    setIsMaximized(false);
  });

  const minimizeHandler = () => {
    ipcRenderer.invoke('minimize-event');
  };
  const maximizeHandler = () => {
    ipcRenderer.invoke('maximize-event');
  };
  const unmaximizeHandler = () => {
    ipcRenderer.invoke('unmaximize-event');
  };
  const closeHandler = () => {
    ipcRenderer.invoke('close-event');
  };

  return (
    <div className='titlebar'>
      <div className='titlebar_draggable'>
        <div className='titlebar_traffic'>
          <div className='traffic traffic_red'>
            <div className='traffic_btns title_closeBtn'>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
          <div className='traffic traffic_yellow'>
            <div className='traffic_btns title_minimizeBtn'>
              <FontAwesomeIcon icon={faWindowMinimize} />
            </div>
          </div>
          <div className='traffic traffic_green'>
            <div className='traffic_btns title_maximumBtn'>
              <FontAwesomeIcon icon={faExpandAlt} />
            </div>
          </div>
          <div className='titlebar_toggle'>
            <FontAwesomeIcon icon={faBars} />
          </div>
        </div>
        <div className='titlebar_btns'>
          <div className='titlebar_logo titlebar_btn'>
            <FontAwesomeIcon icon={faFish} />
          </div>
          <div className='titlebar_login titlebar_btn'>
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Titlebar;
