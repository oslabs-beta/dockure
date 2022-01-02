import React, { useEffect, useState } from 'react';
import imageService from '../services/imageService';
import ImageList from '../components/imageComponents/imageList';

const ImageContainer = ({ toggle }) => {
  const [imageList, setImageList] = useState([]);
  const [updateImage, setUpdateImage] = useState(false);

  useEffect(async () => {
    const result = await imageService.getImageInfo(
      'http://localhost:3000/api/images'
    );
    setImageList(result);
  }, [updateImage]);

  return (
    <div
      className={`image_container ${
        toggle ? 'image_toggle' : 'image_toggle_inactive'
      }`}
    >
      <ImageList
        imageList={imageList}
        updateImage={updateImage}
        setUpdateImage={setUpdateImage}
      />
    </div>
  );
};

export default ImageContainer;
