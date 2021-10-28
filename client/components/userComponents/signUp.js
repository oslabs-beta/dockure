import React, { Component, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import UserDbService from '../../services/userDbService';

const SignUP = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [showUserError, setShowUserError] = useState(false);
  const [showPWError, setShowPWError] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const userNameHandler = (e) => {
    setUserData((userData) => ({
      ...userData,
      username: e.target.value,
    }));
  };

  const userEmailHandler = (e) => {
    setUserData((userData) => ({
      ...userData,
      email: e.target.value,
    }));
  };

  const passwordHandler = (e) => {
    setUserData((userData) => ({
      ...userData,
      password: e.target.value,
    }));
  };

  const sendUserData = async () => {
    const result = await UserDbService.postUserData(
      'http://localhost:3000/api/user/signup',
      userData
    );
  };

  const signUpHandler = (e) => {
    if (!userData.username || !userData.email) {
      setShowUserError(true);
      setShowPWError(false);
      return;
    }
    if (userData.password.length < 5) {
      setShowUserError(false);
      setShowPWError(true);
      return;
    }
    sendUserData();
    setIsSignUp(true);
  };

  if (isSignUp) {
    return <Redirect to='/' />;
  }

  //*******only when the sign up is successful, we are going to sign in link.******

  return (
    <div className='login_page'>
      <div className='signin_page'>
        <p className='signin_head'>Create Account</p>
        <form className='signin_form'>
          <input
            className='signin_input'
            placeholder='Username'
            type='text'
            value={userData.username}
            onChange={userNameHandler}
          ></input>
          <input
            className='signin_input'
            placeholder='Email'
            type='text'
            value={userData.email}
            onChange={userEmailHandler}
          ></input>
          <input
            className='signin_input'
            placeholder='Password'
            type='password'
            value={userData.password}
            onChange={passwordHandler}
          ></input>
          {showUserError && (
            <div className='login_error'>
              Username and Email cannot be empty
            </div>
          )}
          {showPWError && (
            <div className='login_error'>
              Password must be 5 characters or more
            </div>
          )}
        </form>
        {/* <Link to='/'> */}
        <button className='signin_btn' onClick={(e) => signUpHandler()}>
          SIGN UP
        </button>
        {/* </Link> */}
      </div>
      <div className='login_wallpaper'>
        <p className='login_head'>Hello, Friend!</p>
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
