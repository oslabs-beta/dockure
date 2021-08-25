import React, { component, useState } from 'react';
import ImageItem from './imageItem';
import axios from 'axios'

const ImageList = ({imageList}) => {

    const [ imageName, setImageName] = useState('')


    const handlePull = async (e) => {
        e.preventDefault();
        
        try {
            const image = await axios.post("/api/images/pull", { imageName: imageName })

            console.log(imageName)
            
        } catch(e) {
            console.log(e);
        }
    }

    const image = imageList.map((image, inx) => {
        return(
            <ImageItem key={inx} id={image.Id} image = {image}/>
        )
    });

    return (
        <div>
            <div>
                <form onSubmit={handlePull}>
                    <input 
                        type="text"
                        value={imageName}
                        onChange={(e) => setImageName(e.target.value)}
                    />

                    <input 
                        type="submit" 
                        value="pull"
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