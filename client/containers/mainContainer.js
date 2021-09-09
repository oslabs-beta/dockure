import React, { component, useState, useEffect } from 'react';
import Nav from '../components/nav';
import ContentContainer from './contentContainer';
import ImageContainer from './imageContainer';
import CreateImage from '../components/createImage';
import UserDbService from '../services/userDbService';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';

const MainContainer = ({ toggle, setIsLogin, setUserName }) => {
  useEffect(async () => {
    const result = await UserDbService.getUserToken(
      'http://localhost:3000/api/user/me'
    );
    if (result.token) {
      setIsLogin(true);
      setUserName(result.username);
      return;
    }
    return UserDbService.logout();
  }, []);

  let main = useRouteMatch();
  return (
    <div className='main_container'>
      <div className='nav_content'>
        {toggle && <Nav />}
        <Switch>
          <Route
            path={`${main.path}`}
            exact
            render={() => <ContentContainer toggle={toggle} />}
          />
          <Route
            path={`${main.path}/images`}
            exact
            render={() => <ImageContainer toggle={toggle} />}
          />
          <Route
            path={`${main.path}/create`}
            exact
            render={() => <CreateImage toggle={toggle} />}
          />
        </Switch>
      </div>
    </div>
  );
};
export default MainContainer;

// const App = () => {
//   return (
//     <Router>
//       <Switch>
//         <Route path="/login" component={Login} />
//         <ProtectedRoute exact={true} path="/">
//           <MainAppContainer />
//         </ProtectedRoute>
//       </Switch>
//     </Router>
//   );
// };
