import React, { component, useState, useEffect } from 'react';
import ImageItem from './imageItem';
import PullImage from './pullImage';
import DockerBuild from './dockerBuild';

const ImageList = ({ imageList }) => {
  const [dockerAction, setDockerAction] = useState(true);

  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.value === 'Build') return setDockerAction(false);
    else return setDockerAction(true);
  };

  const image = imageList.map((image, inx) => {
    return <ImageItem key={inx} id={image.Id} image={image} />;
  });

  //  else if (dockerAction === 'Build') let Form = <BuildImage />

  return (
    <div className='image_main'>
      <div className='image_select'>
        <select className='select_opt' onChange={handleChange}>
          <option value='Pull'>Pull</option>
          <option value='Build'>Build</option>
        </select>
        {dockerAction ? <PullImage /> : <DockerBuild />}
      </div>
      <ul className='image_list'>{image}</ul>
    </div>
  );
};

export default ImageList;

//
