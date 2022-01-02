import React, { component, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserStatus from './userComponents/userStatus';
import dockureLogoTitle from '../asset/dockureLogoTitle.svg';
import dockureIconW from '../asset/dockureIconW1.svg';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';

const Titlebar = ({ toggle, setToggle, isLogin, setIsLogin, userName }) => {
  const [userStat, setUserStat] = useState(false);

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const userHandler = () => {
    setUserStat(!userStat);
  };

  useEffect(() => {
    const offUserStat = () => {
      setUserStat(false);
    };
    if (userStat) {
      document.body.addEventListener('click', offUserStat);
    }
    return () => {
      document.body.removeEventListener('click', offUserStat);
    };
  }, [userStat]);

  return (
    <>
      {isLogin ? (
        <div className='titlebar'>
          <div className='title_bar'>
            {/* <div className='titlebar_traffic'> */}
            <div className='titlebar_toggle' onClick={toggleHandler}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            {/* </div> */}
            <img src={dockureLogoTitle} className='titlebar_logo' />
            <div className='titlebar_btns'>
              <a href='http://dockure.com/' className='titlebar_link'>
                <img src={dockureIconW} className='titlebar_icon' />
              </a>
              <div className='titlebar_login titlebar_btn'>
                <FontAwesomeIcon icon={faUser} onClick={userHandler} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='titlebar'>
          <img src={dockureLogoTitle} className='titlebar_logo' />
        </div>
      )}
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
