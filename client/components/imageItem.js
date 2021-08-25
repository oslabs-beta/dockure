import React, { component } from 'react';
import axios from 'axios';


const ImageItem = ({id, image}) => {


    const checkRepoTag = ({image}) => {

        //at index zero because it is an array which is the only way to compare with string value
        if(image.RepoTags[0] === '<none>:<none>'){
            image.RepoTags = ['Anonymous'];
        } 

        //should this be the first index of the repo tag array or the last?
        return image.RepoTags[0];
    }

    const startClick = async (e) => {
        try {
            const handleSubmit = await axios.post('/start', {containerId: {image}.image.Id.slice(7, 19)})
            console.log(handleSubmit);
        } catch (error) {
            console.log("There was an error starting the image: ", error);
        }
    }

    const stopClick = (e) => {
        console.log('stop clicked')
        console.log({image}.image.Id.slice(7, 19))
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


  