import axios from 'axios';
import React, { Component } from 'react';
import helper from './helper.js';

const Output = (props) => {
  //   const { stdout } = newTest();

  //   const getData = () => {
  //     let result = axios.get('/');
  //     return result.data;
  //   };

  return (
    <form method='GET' action='/test'>
      <button>click here</button>
    </form>
  );
};

export default Output;
