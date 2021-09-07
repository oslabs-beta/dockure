import React, { component, useState, useEffect } from 'react';
import imageService from '../services/imageService';
import { Link } from 'react-router-dom';
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
    const ID = { image }.image.Id.slice(7, 19);
    const handleSubmit = await imageService.startImage(
      'http://localhost:3000/api/images/start',
      ID
    );
    if (handleSubmit.data === 'running') setIsRunning(true);
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
            <Link to='/main'>
              <button className='image_button image_start' onClick={startClick}>
                Start
              </button>
            </Link>
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
