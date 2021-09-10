import React, { component, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserStatus from './userStatus';
import dockureLogoTitle from '../asset/dockureLogoTitle.svg';
import dockureIconW from '../asset/dockureIconW1.svg';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';

const Titlebar = ({ toggle, setToggle, isLogin, setIsLogin, userName }) => {
  const [isActive, setIsActive] = useState(true);
  const [isMaximized, setIsMaximized] = useState();
  const [userStat, setUserStat] = useState(false);

  const toggleHandler = () => {
    if (!toggle) return setToggle(true);
    return setToggle(false);
  };

  const userHandler = (e) => {
    e.stopPropagation();
    if (!userStat) return setUserStat(true);
    return setUserStat(false);
  };

  useEffect(() => {
    if (userStat) {
      document.body.addEventListener('click', () => {
        setUserStat(false);
      });
    }
  }, [userStat]);

  return (
    <>
      <div className='titlebar'>
        <div className='title_bar'>
          <div className='titlebar_traffic'>
            <div
              className={isLogin ? 'titlebar_toggle' : 'titlebar_btn_inactive'}
              onClick={toggleHandler}
            >
              <FontAwesomeIcon icon={faBars} />
            </div>
          </div>
          <img src={dockureLogoTitle} className='titlebar_logo' />
          <div className='titlebar_btns'>
            {/* <div className={isLogin ? 'titlebar_btn' : 'titlebar_btn_inactive'}> */}
            <a
              href='http://dockure.com/'
              className={isLogin ? 'titlebar_link' : 'titlebar_btn_inactive'}
            >
              <img src={dockureIconW} className='titlebar_icon' />
            </a>
            {/* </div> */}
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
        <UserStatus
          userHandler={userHandler}
          userName={userName}
          setIsLogin={setIsLogin}
        />
      )}
    </>
  );
};

export default Titlebar;
