import React, { useState } from 'react';
import ImageItem from './imageItem';
import PullImage from './pullImage';
import DockerBuild from './dockerBuild';
import Loader from '../loader';

const ImageList = ({ imageList, updateImage, setUpdateImage }) => {
  const [dockerAction, setDockerAction] = useState(true);

  const handleChange = (e) => {
    if (e.target.value === 'Build') return setDockerAction(false);
    else return setDockerAction(true);
  };

  if (!imageList) return null;

  if (!imageList.length) return <Loader />;

  const image = imageList.map((image, inx) => {
    return (
      <ImageItem
        key={inx}
        id={image.Id}
        image={image}
        setUpdateImage={setUpdateImage}
        updateImage={updateImage}
      />
    );
  });

  return (
    <div className='image_main'>
      <div className='image_select'>
        <select className='select_opt' onChange={handleChange}>
          <option value='Pull'>Pull</option>
          <option value='Build'>Build</option>
        </select>
        {dockerAction ? (
          <PullImage
            updateImage={updateImage}
            setUpdateImage={setUpdateImage}
          />
        ) : (
          <DockerBuild
            updateImage={updateImage}
            setUpdateImage={setUpdateImage}
          />
        )}
      </div>
      <ul className='image_list'>{image}</ul>
    </div>
  );
};

export default ImageList;
