import React, { component } from 'react';
import ContainerList from './containerList';
import { Link } from 'react-router-dom';

const ImageCommand = ({imageList}) => {
    return (
        <div className='image_command'>
            <ul className='image_buttons'>
            <button>Start</button>
            <button>Stop</button>
            <button>Remove</button>
            </ul>
        </div>
    )
}

export default ImageCommand