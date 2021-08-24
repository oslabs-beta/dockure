import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import Editor from './editor.js';
import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import { Controlled as ControlledEditor} from 'react-codemirror2'

const CreateContainer = () => {

  const [html, setHtml] = useState('')

  return (
    <>
      <div>
        <Editor 
          value={html}
          onChange={setHtml}
        />
      </div>
      {/* <div>
        <button>Commands Dropdown</button>
        <button>Add</button>
        <div id='fileConfig'>Input Fields will go here</div>
        <div id='searchResults'>Search Results will go here</div>
        <Link to='/main/editPage'>
          <button>Next</button>
        </Link>
      </div> */}
    </>
  );
};
export default CreateContainer;
