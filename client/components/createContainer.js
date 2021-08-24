import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Editor from './Editor.js'
//Nate - delete this comment later: components inside:
//search bar
//drop down of cmds
//add button
//from/workdir/copy/run statements for dockerFile
//input fields next to the statements
//search results page???
//next button to push towards final edits page
const CreateContainer = () => {
  return (
    <>
      <div>
        <Editor />
      </div>
      <div>
    <input></input>
    <button>Commands Dropdown</button>
    <button>Add</button>
    <div id='fileConfig'>Input Fields will go here</div>
    <div id='searchResults'>Search Results will go here</div>
    <Link to='/main/editPage'>
    <button>Next</button>
    </Link>
   </div>
    </>
 
  );
};
export default CreateContainer;
