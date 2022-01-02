import React from 'react';
import MainContainer from './containers/mainContainer';
import Login from './components/userComponents/login';
import SignUP from './components/userComponents/signUp';
import { HashRouter as Router, Switch } from 'react-router-dom';
import ProtectedRoute from './containers/protectedRoute';
import UnProtectedRoute from './containers/unProtectedRoute';

const App = () => {
  return (
    <Router>
      <Switch>
        <UnProtectedRoute path='/' exact component={Login} />
        <UnProtectedRoute path='/signup' component={SignUP} />
        <ProtectedRoute path='/main' component={MainContainer} />
      </Switch>
    </Router>
  );
};

export default App;
