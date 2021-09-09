import React, { component, useEffect, useState } from 'react';
import DockerCommand from '../components/dockerCommand';
import StatsContainer from '../components/statsContainer';
import ContainerService from '../services/containerService';
import UserDbService from '../services/userDbService';
import axios from 'axios';
import Loader from '../components/loader';

const ContentContainer = ({ toggle }) => {
  const [conList, setConList] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [conStatus, setConStatus] = useState(true);

  useEffect(async () => {
    const result = await UserDbService.getUserToken(
      'http://localhost:3000/api/user/me'
    );
    if (!result.token) {
      return UserDbService.logout();
    }
  }, []);

  let conInfo = useEffect(async () => {
    await axios.get('http://localhost:3000/api/containers');

    setTimeout(async () => {
      const result = await ContainerService.getConInfo(
        'http://localhost:3000/api/containers/containers'
      );
      setConList(result);
    }, 1000);
  }, [conStatus]);

  return (
    <div className='content_container'>
      <DockerCommand
        conList={conList}
        conStatus={conStatus}
        setConStatus={setConStatus}
        toggle={toggle}
      />
      <StatsContainer />
    </div>
  );
};

export default ContentContainer;
