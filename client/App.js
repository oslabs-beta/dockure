import React, { Component, useState } from 'react';
import MainContainer from './containers/mainContainer';
import Login from './components/login';
import SignUP from './components/signUp';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Titlebar from './components/titlebar';

const App = () => {
  const [toggle, setToggle] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

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
          <Route
            path='/main'
            render={() => (
              <MainContainer toggle={toggle} setIsLogin={setIsLogin} />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
