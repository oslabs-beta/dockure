import React, { component } from 'react';
import ImageItem from './imageItem';

const ImageList = ({imageList}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('hi')
    }
    const image = imageList.map((image, inx) => {
        return(
            <ImageItem key={inx} id={image.Id} image = {image}/>
        )
    });

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        value={imageName}
                        onChange={(e) => pull(e.target.value)}
                    />
                </form>
            </div> 
            <ul className='image_list'>
                {image}
            </ul>
        </div>
       
    )
}

export default ImageList

// `https://hub.docker.com/search?q=${input.value}&type=image`