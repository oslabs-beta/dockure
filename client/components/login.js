import React, { Component, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import UserDbService from '../services/userDbService';
import TokenStorage from '../db/token';
const tokenStorage = new TokenStorage();

//Nate: OAuth?
const Login = () => {
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [showError, setShowError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const userNameHandler = (e) => {
    setUserData((userData) => ({
      ...userData,
      username: e.target.value,
    }));
    console.log(userData.username);
  };

  const passwordHandler = (e) => {
    setUserData((userData) => ({
      ...userData,
      password: e.target.value,
    }));
  };

  const postSignIn = async () => {
    const result = await UserDbService.postUserData(
      'http://localhost:3000/api/user/login',
      userData
    );
    if (result.id) {
      tokenStorage.saveToken(result.token);
      setIsAuthenticated(true);
    }
  };

  const userSignIn = () => {
    if (!userData.username || !userData.password) {
      alert('Username and Password can not be empty');
      return;
    }
    postSignIn();
  };

  if (isAuthenticated) {
    return <Redirect to='/main' />;
  }

  return (
    <div className='login_page'>
      <div className='login_wallpaper'>
        {showError && <div>Error!!</div>}
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
            className='signin_input'
            placeholder='Password'
            type='password'
            value={userData.password}
            onChange={passwordHandler}
          ></input>
        </form>
        <a className='signin_forgotPW'>Forgot your password?</a>
        <button className='signin_btn' onClick={(e) => userSignIn()}>
          SIGN IN
        </button>
      </div>
    </div>
  );
};

export default Login;
