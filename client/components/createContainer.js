import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import Editor from './editor.js';
import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import { Controlled as ControlledEditor} from 'react-codemirror2'

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

  return (
    <>
      <div>
        <Editor 
          value={value}
          onChange={setValue}
        />
        <form id="searchBar" action="/build">
          <input value={dockerPath}></input>
          <button>Docker Build</button>
        </form>
      </div>
    </>
  );
};
export default CreateContainer;
