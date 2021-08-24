import React, { Component } from 'react';
import MainContainer from './containers/mainContainer';
import Login from './components/login';
import SignUP from './components/signUp';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
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
