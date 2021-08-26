import React, { component, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserStatus from './userStatus';
// uncommand ipcRenderer for testing on electron.
// Please also command the lines before push the file. (line 6, 22-46, 67, 81, 98, 115)
// const { ipcRenderer } = window.require('electron');
import {
  faBars,
  faFish,
  faUser,
  faTimes,
  faWindowMinimize,
  faExpandAlt,
  faCompressAlt,
} from '@fortawesome/free-solid-svg-icons';

const Titlebar = ({ toggle, setToggle, isLogin, setIsLogin }) => {
  const [isActive, setIsActive] = useState(true);
  const [isMaximized, setIsMaximized] = useState();
  const [userStat, setUserStat] = useState(false);

  // ipcRenderer.on('focused', () => {
  //   setIsActive(true);
  // });
  // ipcRenderer.on('blurred', () => {
  //   setIsActive(false);
  // });
  // ipcRenderer.on('maximized', () => {
  //   setIsMaximized(true);
  // });
  // ipcRenderer.on('unmaximized', () => {
  //   setIsMaximized(false);
  // });

  // const minimizeHandler = () => {
  //   ipcRenderer.invoke('minimize-event');
  // };
  // const maximizeHandler = () => {
  //   ipcRenderer.invoke('maximize-event');
  // };
  // const unmaximizeHandler = () => {
  //   ipcRenderer.invoke('unmaximize-event');
  // };
  // const closeHandler = () => {
  //   ipcRenderer.invoke('close-event');
  // };

  const toggleHandler = () => {
    if (!toggle) return setToggle(true);
    return setToggle(false);
  };

  const userHandler = () => {
    if (!userStat) return setUserStat(true);
    return setUserStat(false);
  };

  return (
    <>
      <div className='titlebar'>
        <div className='title_bar'>
          <div className='titlebar_traffic'>
            <div
              className={`traffic ${isActive ? 'traffic_red' : 'traffic_gray'}`}
              // onClick={closeHandler}
            >
              <div
                className={
                  isActive ? 'traffic_btns title_closeBtn' : 'traffic_inactive'
                }
              >
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>
            <div
              className={`traffic ${
                isActive ? 'traffic_yellow' : 'traffic_gray'
              }`}
              // onClick={minimizeHandler}
            >
              <div
                className={
                  isActive
                    ? 'traffic_btns title_minimizeBtn'
                    : 'traffic_inactive'
                }
              >
                <FontAwesomeIcon icon={faWindowMinimize} />
              </div>
            </div>
            {isMaximized ? (
              <div
                className={`traffic ${
                  isActive ? 'traffic_green' : 'traffic_gray'
                }`}
                // onClick={unmaximizeHandler}
              >
                <div
                  className={
                    isActive
                      ? 'traffic_btns title_unmaximumBtn'
                      : 'traffic_inactive'
                  }
                >
                  <FontAwesomeIcon icon={faCompressAlt} />
                </div>
              </div>
            ) : (
              <div
                className={`traffic ${
                  isActive ? 'traffic_green' : 'traffic_gray'
                }`}
                // onClick={maximizeHandler}
              >
                <div
                  className={
                    isActive
                      ? 'traffic_btns title_maximumBtn'
                      : 'traffic_inactive'
                  }
                >
                  <FontAwesomeIcon icon={faExpandAlt} />
                </div>
              </div>
            )}

            <div
              className={isLogin ? 'titlebar_toggle' : 'titlebar_btn_inactive'}
              onClick={toggleHandler}
            >
              <FontAwesomeIcon icon={faBars} />
            </div>
          </div>
          <div className='titlebar_btns'>
            <div
              className={
                isLogin ? 'titlebar_logo titlebar_btn' : 'titlebar_btn_inactive'
              }
            >
              <FontAwesomeIcon icon={faFish} />
            </div>
            <div
              className={
                isLogin
                  ? 'titlebar_login titlebar_btn'
                  : 'titlebar_btn_inactive'
              }
            >
              <FontAwesomeIcon icon={faUser} onClick={userHandler} />
            </div>
          </div>
        </div>
      </div>
      {userStat && (
        <UserStatus setIsLogin={setIsLogin} userHandler={userHandler} />
      )}
    </>
  );
};

export default Titlebar;
