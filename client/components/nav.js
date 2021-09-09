import React, { component } from 'react';
import dockureIconV2 from '../asset/dockureIconLogoV2.svg';

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
      <img src={dockureIconV2} className='nav_icon' />
      {/* <img src={dockureI} className='nav_icon' /> */}
      <Link to='/main'>
        <button className='nav_btns'>Containers</button>
      </Link>
      <Link to='/main/images'>
        <button className='nav_btns'>Images</button>
      </Link>
      <Link to='/main/create'>
        <button className='nav_btns'>YAML Editor</button>
      </Link>
    </ul>
  );
};

export default Nav;
