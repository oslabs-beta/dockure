import React, { component, useState } from 'react';
import axios from 'axios';


const ImageItem = ({id, image}) => {
    const [isRunning, setIsRunning] = useState(false);

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
            const ID = {image}.image.Id.slice(7, 19)
            console.log(ID)
            const handleSubmit = await axios({
                method: "post",
                url: "/api/images/start",
                data: {
                    imageID: ID
                },
                params: {
                    imageID: ID
                }
            })
            console.log(handleSubmit.data);
            if(handleSubmit.data === 'running') {
                setIsRunning(true);
            }
            //if we get back that image is running
            //update button color to green and text to running
        } catch (error) {
            console.log("There was an error starting the image: ", error);
        }
    }

    const stopClick = async (e) => {
        try {
            const ID = {image}.image.Id.slice(7, 19)
            console.log(ID)
            const handleSubmit = await axios({
                method: "post",
                url: "/api/images/stop",
                data: {
                    imageID: ID
                },
                params: {
                    imageID: ID
                }
            })
            console.log(handleSubmit.data);
            if (handleSubmit === 'stopped'){
                setIsRunning(false);
            }
        } catch (error) {
            console.log("There was an error stopping the image: ", error);
        }
    }

    return (
    <div className="image_item">
        <div className='image_name'>Image Name: {checkRepoTag({image})}</div>
        {isRunning ? <div className="image_running">Running</div> : <button className="image_button" onClick={startClick}>Start</button>}
        <button className="image_button" onClick={stopClick}>Stop</button>        
    </div>
    )

}

export default ImageItem;


  