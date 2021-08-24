import React,{component, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
const ipcRenderer = window.require('electron').ipcRenderer;

const Titlebar = () => {
  const [isActive, setIsActive] = useState();
  const [isMaximized, setIsMaximized] = useState();

  ipcRenderer.on('focused', () => {
    setIsActive(true);
  })



  return (
    <div className='titlebar'>
      <div className='titlebar_btns'>
        <button className='minimizeBtn'>-</button>
        <button className='maxResBtn'>ㅁ</button>
        <button className='closeBtn'>x</button>
      </div>
      <div className='titlebar_toggle'>
        <button>I</button>
      </div>
        <div>Logo</div>
        <div>Login</div>
    </div>
  )
}

export default Titlebar