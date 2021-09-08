import React, { useState } from 'react';
import imageService from '../services/imageService';

const PullImage = () => {

    const [imageName, setImageName] = useState('');

    const handlePull = async (e) => {
        const pulledImage = await imageService.pullImageInfo(
          '/api/images/pull',
          imageName
        );
        console.log(pulledImage);
      };

    const onSubmit = () => {
        const input = document.querySelector('.image_input');
        setImageName('');
        handlePull();
        input.focus();
    };

    const searchSubmit = () => {
        window.open(`https://hub.docker.com/search?q=${imageName}&type=image`)
    }



    return (
        <div className='image_pull'>
            <input
                type='text'
                value={imageName}
                className='image_input'
                placeholder='Type Image Name'
                onChange={(e) => setImageName(e.target.value)}
            />
            <button className='image_submit' onClick={onSubmit}>
                Pull
            </button>
            <button onClick={searchSubmit}>Search Docker Hub</button>
        </div>
    )
    
}

export default PullImage

//