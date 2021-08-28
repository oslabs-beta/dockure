import React, { component, useState } from 'react';
import ImageItem from './imageItem';
import axios from 'axios';

const ImageList = ({ imageList }) => {
  const [imageName, setImageName] = useState('');

  const handlePull = async (e) => {
    // e.preventDefault();
    console.log(imageName, 'before');
    try {
      const image = await axios.post('/api/images/pull', {
        imageName: imageName,
      });
      console.log(imageName, 'imageName after');
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = () => {
    const input = document.querySelector('.image_input');
    handlePull();
    input.value = '';
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
