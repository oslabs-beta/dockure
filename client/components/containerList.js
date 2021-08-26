import React, { component } from 'react';
import ContainerItem from './containerItem';
import axios from 'axios';



const ContainerList = ({conList}) => {


  const getData = async (id) => {

    console.log('data in conatinerlist')
    id = id.slice(0, 12)
    let stats = await axios.post('api/containers/stats', { id: id })
    let data = {};
    data.cpu = stats.data.cpu_stats.cpu_usage.total_usage / 1000000;
    data.memory = stats.data.memory_stats.usage / 1000000;
    console.log('data memory : ', data.memory)
;    // let stats = await axios.get('http://localhost:2375/containers/3b160b3cf74b/json')
    console.log('stats: ', stats)

  }
    //repotags, id, created, size
  //id has to be actual container id
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