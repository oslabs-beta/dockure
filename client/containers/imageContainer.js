import React, { component, useEffect, useState } from 'react';
import imageService from '../services/imageService';
import ImageList from '../components/imageList';

const ImageContainer = ({ toggle }) => {
  const [imageList, setImageList] = useState([]);

  useEffect(async () => {
    const result = await imageService.getImageInfo(
      'http://localhost:3000/api/images'
    );
    setImageList(result);
  }, []);

  return (
    <div
      className={`image_container ${
        toggle ? 'image_toggle' : 'image_toggle_inactive'
      }`}
    >
      <ImageList imageList={imageList} />
    </div>
  );
};

export default ImageContainer;
