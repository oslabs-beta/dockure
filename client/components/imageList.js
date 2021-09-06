import React, { component, useState } from 'react';
import ImageItem from './imageItem';
import imageService from '../services/imageService';

const ImageList = ({ imageList }) => {
  const [imageName, setImageName] = useState('');

  const handlePull = async (e) => {
    const pulledImage = await imageService.pullImageInfo(
      '/api/images/pull',
      imageName
    );
    console.log(pulledImage);
  };

  const onSubmit = () => {
    const input = document.querySelector('.image_input');
    setImageName('');
    handlePull();
    input.focus();
  };

  const image = imageList.map((image, inx) => {
    return <ImageItem key={inx} id={image.Id} image={image} />;
  });

  return (
    <div className='image_main'>
      <div className='image_pull'>
        <input
          type='text'
          value={imageName}
          className='image_input'
          placeholder='Type Image Name'
          onChange={(e) => setImageName(e.target.value)}
        />
        <button className='image_submit' onClick={onSubmit}>
          Pull
        </button>
      </div>
      <ul className='image_list'>{image}</ul>
    </div>
  );
};

export default ImageList;

// `https://hub.docker.com/search?q=${input.value}&type=image`
