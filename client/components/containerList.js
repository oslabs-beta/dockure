import React, { component, useState, useEffect } from 'react';
import ContainerItem from './containerItem';
import ContainerService from '../services/ContainerService';
import { useDispatch } from 'react-redux';
import { setStateMetrics } from '../redux/action/action.js'

const ContainerList = ({conList}) => {

    //repotags, id, created, size
  //id has to be actual container id
  const dispatch = useDispatch();

  const getData = async (id) => {
    const stats = await ContainerService.getMetrics('api/containers/stats', { id: id })
    dispatch(setStateMetrics(stats))
  }

  const con = conList.map((container, inx) => {
    //do we really need to delete sha?
    // const id = container.Id.slice(7);
    return(
      <ContainerItem key={inx} id={container.Id} getData={() => getData(container.Id)} container={container}/>
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