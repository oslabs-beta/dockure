import React, { useState } from 'react';
import Titlebar from '../titlebar';
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

  const userHandler = (e) => {
    setUserData((userData) => ({
      ...userData,
      [e.target.name]: e.target.value,
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
    <section>
      <Titlebar />
      <div className='login_page'>
        <div className='signin_page'>
          <p className='signin_head'>Create Account</p>
          <form className='signin_form'>
            <input
              className='signin_input'
              placeholder='Username'
              name='username'
              type='text'
              value={userData.username}
              onChange={userHandler}
            ></input>
            <input
              className='signin_input'
              placeholder='Email'
              name='email'
              type='text'
              value={userData.email}
              onChange={userHandler}
            ></input>
            <input
              className='signin_input'
              placeholder='Password'
              name='password'
              type='password'
              value={userData.password}
              onChange={userHandler}
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
          <button className='signin_btn' onClick={(e) => signUpHandler()}>
            SIGN UP
          </button>
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
    </section>
  );
};

export default SignUP;
