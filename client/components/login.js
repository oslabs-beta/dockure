import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Nate: OAuth?
const Login = () => {

    // if (!username || !password)
  //   return next({
  //     status: 401,
  //     errMessage: 'invalid username or password',
  //   });


  return (
    <div className='login_page'>
      <div className='login_wallpaper'>
        <p className='login_head'>Welcome back!</p>
        <p className='login_intro'>You are almost in the promise land</p>
        <Link to='/signup'>
          <button className='login_wall_btn'>SIGN UP</button>
        </Link>
      </div>
      <div className='signin_page'>
        <p className='signin_head'>Sign in to Dockure</p>
        <form className='signin_form'>
          <input
            className='signin_input'
            placeholder='Username'
            type='text'
          ></input>
          <input
            className='signin_input'
            placeholder='Password'
            type='text'
          ></input>
        </form>
        <a className='signin_forgotPW'>Forgot your password?</a>
        <Link to='/main'>
          <button className='signin_btn'>SIGN IN</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
