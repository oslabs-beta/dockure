import React, { component, useState, useEffect } from 'react';
import ImageService from '../services/imageService';
import axios from 'axios';

const ImageItem = ({ id, image }) => {
    const [isRunning, setIsRunning] = useState();
    const [clickStart, setClickStart] = useState(0);
  
  const checkRepoTag = ({ image }) => {
    //at index zero because it is an array which is the only way to compare with string value
    if (image.RepoTags[0] === '<none>:<none>') {
      image.RepoTags = ['Anonymous'];
    }

    //should this be the first index of the repo tag array or the last?
    return image.RepoTags[0];
  };

  const startClick = async (e) => {
    try {
        const ID = { image }.image.Id.slice(7, 19);
        const handleSubmit = await ImageService.startImage('/api/images/start', ID);
        if (handleSubmit.data === 'running') {
          setIsRunning(true);
        }
      } catch (error) {
        console.log('There was an error starting the image: ', error);
      }
  };

  return (
    <div className='image_item'>
      <div className='image_tag'>Image Name </div>
      <div className='image_name'>{checkRepoTag({ image })}</div>
      <div className='imagebtns'>
        {isRunning ? (
          <div className='image_running'>In Use</div>
        ) : (
          <div>
            <button className='image_button image_start' onClick={startClick}>
              Start
            </button>
          </div>
        )}
        {/* <div>
          <button className='image_button image_stop' onClick={stopClick}>
            Stop
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ImageItem;
