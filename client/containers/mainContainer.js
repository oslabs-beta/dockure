import React, { component, useEffect } from 'react';
import Nav from '../components/nav';
import ContentContainer from './contentContainer';
import ImageContainer from './imageContainer';
import CreateContainer from '../components/createContainer';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';

const MainContainer = ({ toggle, setIsLogin }) => {
  let main = useRouteMatch();
  useEffect(() => {
    setIsLogin(true);
  }, []);
  return (
    <div className='main_container'>
      <div className='nav_content'>
        {toggle && <Nav />}
        <Switch>
          <Route path={`${main.path}`} exact component={ContentContainer} />
          <Route
            path={`${main.path}/images`}
            exact
            component={ImageContainer}
          />
          <Route
            path={`${main.path}/create`}
            exact
            component={CreateContainer}
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
