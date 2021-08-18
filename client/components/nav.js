import React, { component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
// import App from '../App';
const Nav = () => {
  return (
    <ul className='nav'>
      <li className='nav_list'>something else</li>
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
