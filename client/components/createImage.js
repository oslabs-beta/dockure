import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import Editor from './editor.js';
import axios from 'axios';
import imageService from '../services/imageService';

const CreateImage = () => {
  const boilerPlate = 
  `FROM 
  
  WORKDIR
  
  COPY
  
  COPY
  
  RUN
  
  COPY
  
  CMD
      `;
  const defaultPath = '~/documents/codesmith_units/'
  const [value, setValue] = useState(boilerPlate);
  const [dockerPath, setDockerPath] = useState(defaultPath);
  const [imageName, setImageName] = useState('');

  const handleBuild = async (e) => {
    e.preventDefault();
    let result = await imageService.buildImage("/api/images/build", { imageName: imageName, path: dockerPath })
  }

  return (
      <div className="createContainer-container">
        
        <div>
          
          <Editor 
            value={value}
            onChange={setValue}
          />

          <br/>
          <div className="list-div">
            <img className="whale" width="25%" height="auto"  src="https://miro.medium.com/max/662/1*qWWZeEbuKMzouD1llLNj8w.png" />   
            <img className="whale" width="25%" height="auto"  src="https://miro.medium.com/max/662/1*qWWZeEbuKMzouD1llLNj8w.png" />    
            <img className="whale" width="25%" height="auto"  src="https://miro.medium.com/max/662/1*qWWZeEbuKMzouD1llLNj8w.png" />
            <img className="whale" width="25%" height="auto"  src="https://miro.medium.com/max/662/1*qWWZeEbuKMzouD1llLNj8w.png" />         
          </div>
        
          
        </div>
        <div className="right-grid">
        <h3>To build a Docker Image:</h3>
            <ol>
              <li>1. Create your Dockerfile and save it into the directory you are working on</li>
              <li>2. specify the tag (what do you want to call your image?)</li>
              <li>3. specify the directory path (where is your directory located?)</li>
            </ol>
          <form className="build-form" onSubmit={handleBuild}>
          <input 
            type="text"
            placeholder="Image Tag Name"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
          />
          <input 
            type="text"
            value={dockerPath}
            onChange={(e) => setDockerPath(e.target.value)}
          />

          <input className="docker-build-btn"type="submit" value="Docker Build" />

        </form>
        </div>
        
        
      </div>
  );
};

export default CreateImage;
