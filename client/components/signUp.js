import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import UserDbService from '../services/userDbService';

const SignUP = () => {
  const [userData, setUserData] = useState({username: '', email: '', password: ''});

  const userNameHandler = (e) => {
    setUserData(userData => ({
      ...userData, 
      username: e.target.value, 
    }));
    console.log(userData.username);
  };

  const userEmailHandler = (e) => {
    setUserData(userData => ({
      ...userData,
      email: e.target.value,
    }));
    console.log(userData.email);
  };

  const passwordHandler = (e) => {
    setUserData(userData => ({
      ...userData,
      password: e.target.value,
      }));
    console.log(userData.password);
  };

  const sendUserData = async () => {
    const result = await UserDbService.postUserData('http://localhost:3000/api/user/signup', userData);
    console.log(result);
  }


  const signUpHandler = (e) => {
    if (!userData.username || !userData.email) {
      alert("Username and Email cannot be empty");
      return;
    }
    if (userData.password.length < 5) {
      alert("Password must be 5 characters or more")
      return;
    }
    sendUserData();
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
        </form>
        <Link to='/'>
          <button className='signin_btn' onClick={(e) => signUpHandler()}>SIGN UP</button>
        </Link>
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
