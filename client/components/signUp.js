import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const SignUP = () => {
  return (
    <div className='login_page'>
      <div className='signin_page'>
        <p className='signin_head'>Create Account</p>
        <form className='signin_form'>
          <input
            className='signin_input'
            placeholder='Name'
            type='text'
          ></input>
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
        <Link to='/'>
          <button className='signin_btn'>SIGN UP</button>
        </Link>
      </div>
      <div className='login_wallpaper'>
        <p className='login_head'>Hello, Angel!</p>
        <p className='login_intro'>Enter your personal details</p>
        <p className='login_intro'>and enjoy Dockure</p>
        <Link to='/'>
          <button className='login_wall_btn'>SIGN IN</button>
        </Link>
      </div>
    </div>
  );
};

export default SignUP;
