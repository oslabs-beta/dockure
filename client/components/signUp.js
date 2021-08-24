import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const SignUP = () => {
  return (
    <div>
      <h1>Please sign up</h1>
      <form>
        <input placeholder='Username' type='text'></input>
        <input placeholder='Password' type='text'></input>
        <Link to='/'>
          <button>Submit</button>
        </Link>
      </form>
    </div>
  );
};

export default SignUP;
