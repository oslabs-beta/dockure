import React, { component } from 'react';
import ImageItem from './imageItem';

const ImageList = ({imageList}) => {
    const image = imageList.map((image, inx) => {
        return(
            <ImageItem key={inx} id={image.Id} image = {image}/>
        )
    });

    return (
       <ul className='image_list'>
           {image}
       </ul>
    )
}

export default ImageList