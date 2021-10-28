import React, { Component, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import UserDbService from '../../services/userDbService';
import TokenStorage from '../../db/token';
const tokenStorage = new TokenStorage();

const Login = () => {
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [showError, setShowError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const userNameHandler = (e) => {
    setUserData((userData) => ({
      ...userData,
      username: e.target.value,
    }));
  };

  const passwordHandler = (e) => {
    setUserData((userData) => ({
      ...userData,
      password: e.target.value,
    }));
  };

  const postSignIn = async () => {
    const pwInput = document.querySelector('.signin_pw');
    const result = await UserDbService.postUserData(
      'http://localhost:3000/api/user/login',
      userData
    );
    if (result.id) {
      tokenStorage.saveToken(result.token);
      return setIsAuthenticated(true);
    }
    setUserData((userData) => ({
      ...userData,
      password: '',
    }));
    pwInput.focus();
    return setShowError(true);
  };

  const userSignIn = () => {
    if (!userData.username || !userData.password) {
      return setShowError(true);
    }
    postSignIn();
  };

  if (isAuthenticated) {
    return <Redirect to='/main' />;
  }

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
            value={userData.username}
            onChange={userNameHandler}
          ></input>
          <input
            className='signin_input signin_pw'
            placeholder='Password'
            type='password'
            value={userData.password}
            onChange={passwordHandler}
          ></input>
          {showError && (
            <div className='login_error'>Invalid username or password</div>
          )}
        </form>
        {/* <a className='signin_forgotPW'>Forgot your password?</a> */}
        <button className='signin_btn' onClick={(e) => userSignIn()}>
          SIGN IN
        </button>
      </div>
    </div>
  );
};

export default Login;
