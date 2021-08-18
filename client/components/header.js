import React, { component } from 'react';

const Header = () => {
  return (
    <header className='header'>
      <a href='#' className='header_home'>
        Home
      </a>
      <div className='header_logo'>Logo</div>
      <button className='header_workspace'>Export Workspace</button>
    </header>
  );
};

export default Header;
