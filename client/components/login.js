import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Nate: OAuth?
const Login = () => {
  return (
    <div>
      <h1>Welcome, you are almost in the promise land</h1>
      <form>
        <input placeholder='Username' type='text'></input>
        <input placeholder='Password' type='text'></input>
        <Link to='/main'>
          <button>Login</button>
        </Link>
        <Link to='/signup'>
          <button>Sign Up</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
