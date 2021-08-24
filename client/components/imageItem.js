import React, { component } from 'react';

const ImageItem = ({id, image}) => {


console.log(image);

const checkRepoTag = ({image}) => {
    if(image.RepoTags === '<none>:<none>') image.RepoTags = 'Anonymous';
    return image.RepoTags;
}
    return (
    <li className="image_item">
        <div className='image-name'>{image.RepoTags}</div>
        <span className="image_button">
        <button>Start</button>
        <button>Stop</button>
        </span>
    </li>
    )

}

export default ImageItem;