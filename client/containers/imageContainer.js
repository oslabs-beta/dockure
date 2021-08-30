import React, { component, useEffect, useState } from 'react';
import imageService from '../services/imageService';
import ImageList from '../components/imageList';

const ImageContainer = () => {
  const [imageList, setImageList] = useState([]);

  useEffect(async () => {
    const result = await imageService.getImageInfo(
      'http://localhost:3000/api/images'
    );
    setImageList(result);
  }, []);

  return (
    <div className='image_container'>
      <p className='image_head'>WELCOME TO IMAGES</p>
      <ImageList imageList={imageList} />
    </div>
  );
};

export default ImageContainer;
