import React, { component } from 'react';
// import App from '../App';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Link,
  Redirect
} from 'react-router-dom';

const Nav = () => {
  let main = useRouteMatch();
  return (
    <ul className='nav'>
      <Link to='/main/images'>
      <button>
        <li className='nav_list'>Images</li>
        </button>
      </Link>
      <li className='nav_list'>something else</li>
      <Link to='/'>
        <button className='nav_signout'>Sign out</button>
      </Link>
      {/* <Route
        render={() => {
          return (
            <button className='nav_signout'>
              <Redirect to='/' />
              Sign out
            </button>
          );
        }}
      /> */}

      {/* <Switch>
        <Route path='/' exact component={App} />
      </Switch> */}
    </ul>
  );
};

export default Nav;
