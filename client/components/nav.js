import React, { component } from 'react';
// import App from '../App';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Link,
  Redirect,
} from 'react-router-dom';

const Nav = () => {
  let main = useRouteMatch();
  return (
    <ul className='nav'>
      <Link to='/main'>
        <button className='nav_btns'>Containers</button>
      </Link>
      <Link to='/main/images'>
        <button className='nav_btns'>Images</button>
      </Link>
      <Link to='/main/create'>
        <button className='nav_btns'>Create Image</button>
      </Link>
    </ul>
  );
};

export default Nav;
