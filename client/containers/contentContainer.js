import React, { component, useEffect, useState } from 'react';
import DockerCommand from '../components/dockerCommand';
import StatsContainer from '../components/statsContainer';
import ContainerService from '../services/containerService';
import UserDbService from '../services/userDbService';

const ContentContainer = () => {
  const [conList, setConList] = useState([]);
  const [conStatus, setConStatus] = useState(true);

  useEffect(async () => {
    const result = await UserDbService.getUserToken(
      'http://localhost:3000/api/user/me'
    );
    if (!result.token) {
      return UserDbService.logout();
    }
    console.log(result);
  }, []);

  useEffect(async () => {
    const result = await ContainerService.getConInfo(
      'http://localhost:3000/api/containers'
    );
    // console.log(result, 'resultttt');
    setConList(result);
  }, [conStatus]);

  //getting stats about a particular container

  //how do we pass this infoirmation from conList to Stats

  {
    /* <Switch> */
  }
  {
    /* <Route
            render={() =>
              notLogin ? <Redirect to='/main' /> : <Component {...rest} />
            }
          /> */
  }
  {
    /* <Route path={`${main.path}`} exact component={ContentContainer} />
          <Route
            path={`${main.path}/images`}
            exact
            component={ImageContainer}
          />
          <Route path={`${main.path}/create`} exact component={CreateImage} />
        </Switch> */
  }

  return (
    <div className='content_container'>
      <DockerCommand
        conList={conList}
        conStatus={conStatus}
        setConStatus={setConStatus}
      />
      <StatsContainer />
    </div>
  );
};

export default ContentContainer;
