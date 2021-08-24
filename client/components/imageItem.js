import React, { component } from 'react';

const ImageItem = ({id, image}) => {


// console.log(image);

const checkRepoTag = ({image}) => {

    //at index zero because it is an array which is the only way to compare with string value
    if(image.RepoTags[0] === '<none>:<none>'){
        image.RepoTags = ['Anonymous'];
    } 
    return image.RepoTags;
}
    return (
    <li className="image_item">
        <div className='image-name'>{checkRepoTag({image})}</div>
        <div className="image_button">
        <button>Start</button>
        <button>Stop</button>
        </div>
    </li>
    )

}

export default ImageItem;