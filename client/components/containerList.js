import React, { component, useState, useEffect } from 'react';
import ContainerItem from './containerItem';
import containerService from '../services/containerService';
import { useDispatch } from 'react-redux';
import { setStateMetrics } from '../redux/action/action.js'

const ContainerList = ({conList}) => {

    //repotags, id, created, size
  //id has to be actual container id
  const dispatch = useDispatch();
  
  const getData = async (id, containerState) => {
    // const stats = await containerService.getMetrics('api/containers/stats', { id: id })
    console.log('CONTAINER INFO: ', containerState);
    let stats = {
      cpu: [],
      memory: []
    }
    if (containerState === 'running') stats = await containerService.getMetrics('http://localhost:3000/api/metrics', id)
    dispatch(setStateMetrics(stats))
  }

  // const con = (<h1>Content loading...</h1>)

  
    const con = conList.map((container, inx) => {
      return(
        <ContainerItem key={inx} id={container.Id} getData={() => getData(container.Id, container.State)} container={container}/>
      )
    });
  
  // console.log(conName, 'conname');
    // console.log(conName, 'con')
  return (
    // <ul className='container_list'>
    //   {conName}
    // </ul>
    <ul className='container_list'>
      {/* <div className='container_head'>
        <div className="item-name">Name</div> 
        <div className="item-createdat">Created</div> 
        <div className="item-state">State</div>
      </div> */}
      {con}
      
    </ul>

  );
};

export default ContainerList;


{/* <ul className='container_list'> */}
      
{/* <div>
  {conList.map((container, id) => <h2 key={id}>{container.Id}</h2>)}
</div>
</ul> */}