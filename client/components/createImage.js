import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import Editor from './editor.js';
import axios from 'axios';
import imageService from '../services/imageService';


const CreateImage = () => {

  const [yaml, setYaml] = useState(imageService.yamlBoiler());
  const [dockerfile, setDockerfile] = useState(imageService.dockerBoiler());

  return (
    <div className='create-image'>
        <Editor
          language="text/x-yaml" 
          value={yaml} 
          onChange={setYaml} 
          displayName='YAML'
          saveType='yml'
        />

        <Editor
          language="dockerfile" 
          value={dockerfile} 
          onChange={setDockerfile} 
          displayName='Dockerfile'
          saveType='Dockerfile'
        />
    </div>
  );
};

export default CreateImage;