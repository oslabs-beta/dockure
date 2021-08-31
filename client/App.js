import React, { Component, useState, useEffect } from 'react';
import MainContainer from './containers/mainContainer';
import Login from './components/login';
import SignUP from './components/signUp';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Titlebar from './components/titlebar';
import StartUp from './services/prometheusService';
import ProtectedRoute from './containers/protectedRoute';

const App = () => {
  const [toggle, setToggle] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  //for now putting this here - can talk about it later
  //This NEEDS to run once on startup and this is the only place I can finde to force this
  // useEffect(() => {
  //   StartUp.prometheus();
  // }, [])

  return (
    <Router>
      <div>
        <Titlebar
          toggle={toggle}
          setToggle={setToggle}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        />
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/signup' component={SignUP} />
          <ProtectedRoute
            path='/main'
            component={MainContainer}
            toggle={toggle}
            setIsLogin={setIsLogin}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
