import React, { Component, useState, useEffect } from 'react';
import MainContainer from './containers/mainContainer';
import Login from './components/login';
import SignUP from './components/signUp';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Titlebar from './components/titlebar';
import ProtectedRoute from './containers/protectedRoute';
import UnProtectedRoute from './containers/unProtectedRoute';

const App = () => {
  const [toggle, setToggle] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState('');

  return (
    <Router>
      <div>
        <Titlebar
          toggle={toggle}
          setToggle={setToggle}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          userName={userName}
        />
        <Switch>
          <UnProtectedRoute path='/' exact component={Login} />
          <UnProtectedRoute path='/signup' component={SignUP} />
          <ProtectedRoute
            path='/main'
            component={MainContainer}
            toggle={toggle}
            setIsLogin={setIsLogin}
            setUserName={setUserName}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
