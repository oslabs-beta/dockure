import React, { useEffect, useState, useCallback } from 'react';
import DockerCommand from '../components/containerComponents/dockerCommand';
import StatsContainer from '../components/statComponents/statsContainer';
import ContainerService from '../services/containerService';

const ContentContainer = ({ toggle }) => {
  const [conList, setConList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setupCon = async () => {
      try {
        await ContainerService.setupCon();
        const clear = setTimeout(() => callConStatus(), 1000);
        return () => clearTimeout(clear);
      } catch (err) {
        setError(true);
      }
    };
    setupCon();
  }, []);

  const callConStatus = useCallback(async () => {
    try {
      const result = await ContainerService.getConInfo();
      setConList(result);
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  }, []);

  return (
    <div className='content_container'>
      <DockerCommand
        conList={conList}
        callConStatus={callConStatus}
        error={error}
        toggle={toggle}
        loading={loading}
        setLoading={setLoading}
      />
      <StatsContainer />
    </div>
  );
};

export default ContentContainer;
