import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
// import NavBar from './containers/NavBar.jsx'
import Login from './containers/Signup.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='router'>
        <h1>iowejfioawejfioeawjf</h1>
        <main>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/algos' component={MainContainer} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
