import React, { useState } from 'react';
import imageService from '../services/imageService';

const DockerBuild = () => {
  const defaultPath = '~/';
  const [dockerPath, setDockerPath] = useState(defaultPath);
  const [imageName, setImageName] = useState('');

  const handleBuild = async (e) => {
    e.preventDefault();
    let result = await imageService.buildImage('/api/images/build', {
      imageName: imageName,
      path: dockerPath,
    });
  };

  return (
    <form className='build-form' onSubmit={handleBuild}>
      <input
        type='text'
        className='build_textbox'
        placeholder='Image Tag Name'
        value={imageName}
        onChange={(e) => setImageName(e.target.value)}
      />
      <input
        type='text'
        className='build_textbox'
        value={dockerPath}
        onChange={(e) => setDockerPath(e.target.value)}
      />

      <input className='image_submit' type='submit' />
    </form>
  );
};

export default DockerBuild;
