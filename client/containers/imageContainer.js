import React, { component, useEffect, useState } from 'react';
import ImageService from '../services/imageService';
import ImageCommand from '../components/imageCommand';

const ImageContainer = () => {
    const [imageList, setImageList] = useState([]);

    useEffect(async () => {
        //right now the backend is not set up and is returning a 404 as a result
        const result = await ImageService.getImageInfo('http://localhost:3000/api/images');
        setImageList(result)
    }, []);

    return (
        <div>
            <h1>WELCOME TO IMAGES</h1>
            <ImageCommand imageList={imageList}/>
        </div>
    )
}

export default ImageContainer