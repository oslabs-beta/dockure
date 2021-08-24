import React, { Component } from 'react';
import MainContainer from './containers/mainContainer';
import Login from './components/login';
import SignUP from './components/signUp';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Titlebar from './components/titlebar';

const App = () => {
  return (
    <Router>
      <div>
        <Titlebar />
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/signup' component={SignUP} />
          <Route path='/main' component={MainContainer} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
