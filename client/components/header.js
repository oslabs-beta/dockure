import React, { component } from 'react';

const Header = () => {
  return (
    <header className='header'>
      <div className='header_home'>home</div>
      <div className='header_logo'>logo</div>
      <button className='header_workspace'>Export Workspace</button>
    </header>
  );
};

export default Header;
