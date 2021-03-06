import React, { useState } from 'react';
import imageService from '../../services/imageService';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import ImageItemDeleteBtn from './imageItemDeleteBtn';

const ImageItem = ({ image, setUpdateImage, updateImage }) => {
  const [isRunning, setIsRunning] = useState();
  const [optClick, setOptClick] = useState(false);
  let history = useHistory();

  const checkRepoTag = ({ image }) => {
    if (image.RepoTags) {
      if (image.RepoTags[0] === '<none>:<none>') {
        image.RepoTags = ['Anonymous'];
      }
      return image.RepoTags[0];
    } else if (image.RepoDigests) {
      const nameArr = image.RepoDigests[0].split('@');
      return nameArr[0];
    } else {
      return 'Anonymous';
    }
  };

  const startClick = async (e) => {
    const ID = { image }.image.Id.slice(7, 19);
    const handleSubmit = await imageService.startImage(ID);
    if (handleSubmit.data === 'running') {
      setIsRunning(true);
      history.push('/main');
    }
  };

  const deleteClick = async (e) => {
    const ID = { image }.image.Id.slice(7, 19);
    setOptClick(false);
    await imageService.deleteImage(ID);
    setUpdateImage(!updateImage);
  };

  const optHandler = () => {
    setOptClick(!optClick);
  };

  return (
    <div className='image_item'>
      <div className='image_tagOpt'>
        <div className='image_opt'></div>
        <div className='image_tag'>Image Name </div>
        <div className='image_opt' onClick={optHandler}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
        {optClick && <ImageItemDeleteBtn deleteClick={deleteClick} />}
      </div>
      <div className='image_name'>{checkRepoTag({ image })}</div>
      <div className='imagebtns'>
        {isRunning ? (
          <div className='image_running'>In Use</div>
        ) : (
          <button className='image_button image_start' onClick={startClick}>
            Start
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageItem;
