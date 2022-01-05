import React, { useEffect, useState } from 'react';
import DockerCommand from '../components/containerComponents/dockerCommand';
import StatsContainer from '../components/statComponents/statsContainer';
import ContainerService from '../services/containerService';

const ContentContainer = ({ toggle }) => {
  const [conList, setConList] = useState([]);
  const [conStatus, setConStatus] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const callConStatus = async () => {
      try {
        await ContainerService.setupCon();
        setTimeout(async () => {
          const result = await ContainerService.getConInfo();
          setConList(result);
        }, 1000);
      } catch (err) {
        setError(true);
      }
    };
    callConStatus();
  }, [conStatus]);

  return (
    <div className='content_container'>
      <DockerCommand
        conList={conList}
        conStatus={conStatus}
        setConStatus={setConStatus}
        error={error}
        toggle={toggle}
      />
      <StatsContainer />
    </div>
  );
};

export default ContentContainer;
