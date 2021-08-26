import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import Editor from './editor.js';
import axios from 'axios';

const CreateContainer = () => {

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
  const [dockerPath, setDockerPath] = useState(defaultPath)
  const [imageName, setImageName] = useState('')

  const handleBuild = async (e) => {
    e.preventDefault();
    
    try {
        const build = await axios.post("/api/images/build", { imageName: imageName, path: dockerPath })
        console.log(build)
    } catch(e) {
        console.log(e);
    }
  }

  return (
      <div>
        <Editor 
          value={value}
          onChange={setValue}
        />
        <br/>
        <form onSubmit={handleBuild}>
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
          <input type="submit" value="Docker Build" />
        </form>
      </div>
  );
};

export default CreateContainer;
