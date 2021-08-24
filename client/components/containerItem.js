import React, { component } from 'react';
import moment from 'moment';

const ContainerItem = ({id, container}) => {

    //current unix time stamp(the time since 1970 in secs)
    // const ts = Math.round((new Date()).getTime()/1000);

    const utc = new Date(0)
    // console.log(time.setUTCSeconds(1629746209))

    //how should we convert the time?
    const date = utc.setUTCSeconds(container.Created)
    // console.log('date variable: ', date)
    // const time = new Date(date)
    // console.log('time variable: ', time)
    // const readableTime = time.toUTCString()
    // console.log(moment(time).fromNow())

//https://momentjs.com/docs/#/displaying/from/
    
  return (
    <li className="container_item">
      <div className="item-name"> {container.Names} </div>
      {/* <div >Container Id: {container.Id}</div> */}
      <div className="item-createdat"> {moment(date).fromNow()} </div>
      <div className="item-state"> {container.State} </div>
    </li>
  )
}

export default ContainerItem;