import React, { component, useEffect } from 'react';
import ContainerService from '../services/containerService'

const ContainerList = () => {

  useEffect(async () => {
    const result = await ContainerService.getConInfo('http://localhost:3000/api')
    console.log('This is the result within components/containerList: ',result);
  }, []);


  return (
    <ul className='container_list'>
      <li>container1</li>
      <li>container2</li>
      <li>container3</li>
    </ul>
  );
};

export default ContainerList;
