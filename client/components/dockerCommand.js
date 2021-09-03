import React, { component, useState } from 'react';
import ContainerList from './containerList';
import { Link } from 'react-router-dom';
import ContainerService from '../services/containerService'

const DockerCommand = ({conList}) => {
  const [selectedIds, setSelectedIds] = useState({"20b6e7b0c0b3b4c1a8a35cb67e5e3953d1f44fa07213f3db3b0af6181003fb69": true, 
  "67c8a0b568e7aa2f70a95a9c84e015b1e2f481c02f2c166514b2649a91043216":true, "ee1167cef19eb91d36b6fb99b4bcb36ac131c6afbd1f52a83498500f55eaa3dd":true})

  console.log('conList: ', conList);

  // [0].Id "71b5afbb1677465e2331cd66f6dbfcc66cbedb4ab2ce5be1a6813c97127f9f74"
  // [1] "20b6e7b0c0b3b4c1a8a35cb67e5e3953d1f44fa07213f3db3b0af6181003fb69"
  // [2] "67c8a0b568e7aa2f70a95a9c84e015b1e2f481c02f2c166514b2649a91043216"
  // [3] "ee1167cef19eb91d36b6fb99b4bcb36ac131c6afbd1f52a83498500f55eaa3dd"

  //'/api/containers' /start
  const onClickButton = (url, selectdIds) => {
    const promiseArr = []
    for (let id in selectedIds) {
      let result = ContainerService.postClickBtn(url, id)
      promiseArr.push(result);
    }
    Promise.all(promiseArr).then((values) => console.log('containerId: ', values)); 
    // need to refresh button 
  }

  return (
    <div className='docker_command'>
      <ul className='docker_buttons'>
        <button className='docker_btn' onClick={(e) => onClickButton('http://localhost:3000/api/containers/start', selectedIds)}>Start</button>
        <button className='docker_btn' onClick={(e) => onClickButton('http://localhost:3000/api/containers/stop', selectedIds)}>Stop</button>
        <button className='docker_btn' onClick={(e) => onClickButton('http://localhost:3000/api/containers/kill', selectedIds)}>Kill</button>
        <button className='docker_btn' onClick={(e) => onClickButton('http://localhost:3000/api/containers/restart', selectedIds)}>Restart</button>
        <button className='docker_btn' onClick={(e) => onClickButton('http://localhost:3000/api/containers/pause', selectedIds)}>Pause</button>
        <button className='docker_btn' onClick={(e) => onClickButton('http://localhost:3000/api/containers/resume', selectedIds)}>Resume</button>
        <button className='docker_btn' onClick={(e) => onClickButton('http://localhost:3000/api/containers/remove', selectedIds)}>Remove</button>
      </ul>
      <Link to='/main/create'>
      <button className='docker_btn add_btn'>
            {/* <span>+</span> */}
            <span>Add Container</span>
          </button>
        </Link>
      {/* get data of the which container got picked, and apply the buttons // or
      we can send all the button functions to the containerlist as props. */}
      <ContainerList conList={conList} />
    </div>
  );
};
export default DockerCommand;
