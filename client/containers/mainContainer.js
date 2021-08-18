import React, { component } from 'react';
import Header from '../components/header';
import Nav from '../components/nav';
import ContentContainer from './contentContainer';

const MainContainer = () => {
  return (
    <div className='main_container'>
      <Header />
      <div className='nav_content'>
        <Nav />
        <ContentContainer />
      </div>
    </div>
  );
};

export default MainContainer;
