import React, { component, useState, useEffect } from 'react';
import moment from 'moment';

const ContainerItem = ({id, container, getData}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isExited, setIsExited] = useState(false);

  useEffect(()=>{
    if(container.State === 'running') return setIsRunning(true);
    if(container.State === 'exited') return setIsExited(true);
    return setIsExited(false);
  }, [isRunning, isExited])
  
    const utc = new Date(0)

    const date = utc.setUTCSeconds(container.Created)

//https://momentjs.com/docs/#/displaying/from/
    
  return (
    <li className="container_item">
      <div className='item_name_time'>
        <div className="item_name"> {container.Names[0].slice(1)} </div>
        {/* <div >Container Id: {container.Id}</div> */}
        <div className="item_createdat"> {moment(date).fromNow()} </div>
      </div>
      <div className='item_state_dateBtn'>
        <div className={`item_state ${isRunning ? 'is_running' : `${ isExited ? 'is_existed' : 'is_else'}`}`}> {container.State} </div>
        <button className='item_dataBtn' onClick={getData}>Get Data</button>
      </div>

    </li>
  )
}

export default ContainerItem;