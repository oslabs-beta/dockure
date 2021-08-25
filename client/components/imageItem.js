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

const startClick = (e) => {
    console.log('start clicked')
}

const stopClick = (e) => {
    console.log('stop clicked')
}
    return (
    <div className="image_item">
        <div className='image_name'>Image Name: {checkRepoTag({image})}</div>
        <button className="image_button" onClick={startClick}>Start</button>
        <button className="image_button" onClick={stopClick}>Stop</button>        
    </div>
    )

}

export default ImageItem;