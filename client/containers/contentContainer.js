import React, { component, useEffect, useState } from 'react';
import DockerCommand from '../components/containerComponents/dockerCommand';
import StatsContainer from '../components/statComponents/statsContainer';
import ContainerService from '../services/containerService';
import UserDbService from '../services/userDbService';
import axios from 'axios';

const ContentContainer = ({ toggle }) => {
  const [conList, setConList] = useState([]);
  const [conStatus, setConStatus] = useState(true);
  const [error, setError] = useState(null);

  useEffect(async () => {
    const result = await UserDbService.getUserToken(
      'http://localhost:3000/api/user/me'
    );
    if (!result.token) {
      return UserDbService.logout();
    }
  }, []);

  useEffect(() => {
    const callConStatus = async () => {
      await axios.get('http://localhost:3000/api/containers');
      try {
        const result = await ContainerService.getConInfo(
          'http://localhost:3000/api/containers/containers'
        );
        setConList(result);
      } catch (err) {
        setError(true);
      }
    };
    callConStatus();
  }, [conStatus]);

  return (
    <div className='content_container'>
      {error && (
        <div>Cannot get the docker containers. Please reopen the app</div>
      )}
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
