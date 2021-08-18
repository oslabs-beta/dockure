import React, { component } from 'react';
import Header from '../components/header';
import Nav from '../components/nav';
import ContentContainer from './contentContainer';
import CreateContainer from '../components/createContainer';
import EditContainer from '../components/editContainer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';

const MainContainer = () => {
  let main = useRouteMatch();
  return (
    <div className='main_container'>
      <Header />
      <div className='nav_content'>
        <Nav />
        <Switch>
          <Route path={`${main.path}`} exact component={ContentContainer} />
          <Route
            path={`${main.path}/create`}
            exact
            component={CreateContainer}
          />
          <Route
            path={`${main.path}/editPage`}
            exact
            component={EditContainer}
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
