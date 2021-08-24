import React, { component } from 'react';
import ContainerItem from './containerItem';


const ContainerList = ({conList}) => {

  
  // for(let con of conList) {
  //   console.log(con, 'connnn')
  // }

    //repotags, id, created, size
  //id has to be actual container id
  const con = conList.map((container, inx) => {
    //do we really need to delete sha?
    // const id = container.Id.slice(7);
    

    return(
      <ContainerItem key={inx} id={container.Id} container={container}/>
    )
  });

  
  // console.log(conName, 'conname');
  
  // console.log(conName, 'con')
  return (
    // <ul className='container_list'>
    //   {conName}
    // </ul>
    <ul className='container_list'>
      <div><span className="item-name">Name</span> <span className="item-createdat">Created</span> <span className="item-state">State</span></div>
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