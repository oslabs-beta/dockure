import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Titlebar from '../titlebar';
import UserDbService from '../../services/userDbService';
import TokenStorage from '../../db/token';

const Login = () => {
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [showError, setShowError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const userHandler = (e) => {
    setUserData((userData) => ({
      ...userData,
      [e.target.name]: e.target.value,
    }));
  };

  const postSignIn = async () => {
    const pwInput = document.querySelector('.signin_pw');
    const result = await UserDbService.postUserData(userData);
    if (result.id) {
      TokenStorage.saveToken(result.token);
      return setIsAuthenticated(true);
    }
    setUserData((userData) => ({
      ...userData,
      password: '',
    }));
    pwInput.focus();
    return setShowError(true);
  };

  const userSignIn = (e) => {
    e.preventDefault();
    if (!userData.username || !userData.password) {
      return setShowError(true);
    }
    postSignIn();
  };

  if (isAuthenticated) {
    return <Redirect to='/main' />;
  }

  return (
    <section>
      <Titlebar />
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
              name='username'
              type='text'
              value={userData.username}
              onChange={userHandler}
            ></input>
            <input
              className='signin_input signin_pw'
              placeholder='Password'
              name='password'
              type='password'
              value={userData.password}
              onChange={userHandler}
            ></input>
            {showError && (
              <div className='login_error'>Invalid username or password</div>
            )}
            <button className='signin_btn' type='submit' onClick={userSignIn}>
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
