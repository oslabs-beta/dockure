import React, { useState, useEffect } from 'react';
import Nav from '../components/nav';
import Titlebar from '../components/titlebar';
import ContentContainer from './contentContainer';
import ImageContainer from './imageContainer';
import CreateImage from '../components/imageComponents/createImage';
import UserDbService from '../services/userDbService';
import ProtectedRoute from '../containers/protectedRoute';

import {
  BrowserRouter as Router,
  Switch,
  useRouteMatch,
} from 'react-router-dom';

const MainContainer = (props) => {
  const [toggle, setToggle] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState('');
  useEffect(() => {
    let result;
    const getUser = async () => {
      result = await UserDbService.getUserToken();
      if (result.token) {
        setIsLogin(true);
        setUserName(result.username);
      }
    };
    getUser();
    return () => {
      result = null;
    };
  }, []);

  let main = useRouteMatch();
  return (
    <section>
      <Titlebar
        toggle={toggle}
        setToggle={setToggle}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        userName={userName}
      />
      <div className='main_container'>
        <div className='nav_content'>
          {toggle && <Nav />}
          <Switch>
            <ProtectedRoute
              path={`${main.path}`}
              exact
              toggle={toggle}
              component={ContentContainer}
            />
            <ProtectedRoute
              path={`${main.path}/images`}
              exact
              toggle={toggle}
              component={ImageContainer}
            />
            <ProtectedRoute
              path={`${main.path}/create`}
              exact
              toggle={toggle}
              component={CreateImage}
            />
          </Switch>
        </div>
      </div>
    </section>
  );
};
export default MainContainer;
