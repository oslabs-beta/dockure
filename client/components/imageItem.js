import React, { component, useState, useEffect } from 'react';
import axios from 'axios';

const ImageItem = ({ id, image }) => {
    const [isRunning, setIsRunning] = useState();
    const [clickStart, setClickStart] = useState(0);
  
//   useEffect( async() => {
   
//   }, [clickStart])
  console.log(image)
  const checkRepoTag = ({ image }) => {
    //at index zero because it is an array which is the only way to compare with string value
    if (image.RepoTags[0] === '<none>:<none>') {
      image.RepoTags = ['Anonymous'];
    }

    //should this be the first index of the repo tag array or the last?
    return image.RepoTags[0];
  };

  const startClick = async(e) => {
    try {
        const ID = { image }.image.Id.slice(7, 19);
        console.log(ID);
        const handleSubmit = await axios({
          method: 'post',
          url: '/api/images/start',
          data: {
            imageID: ID,
          },
          params: {
            imageID: ID,
          },
        });
        console.log(handleSubmit.data);
        if (handleSubmit.data === 'running') {
          setIsRunning(true);
        }
        //if we get back that image is running
        //update button color to green and text to running
      } catch (error) {
        console.log('There was an error starting the image: ', error);
      }
//    if (clickStart === 0) return setClickStart(1);
//    return setClickStart(0);
  };

  //this function doesn't actually stop a container
//   const stopClick = async (e) => {
//     try {
//       const ID = { image }.image.Id.slice(7, 19);
//       console.log(ID);
//       const handleSubmit = await axios({
//         method: 'post',
//         url: '/api/images/stop',
//         data: {
//           imageID: ID,
//         },
//         params: {
//           imageID: ID,
//         },
//       });
//       console.log(handleSubmit.data);
//       if (handleSubmit.data === 'stopped') {
//         setIsRunning(false);
//       }
//     } catch (error) {
//       console.log('There was an error stopping the image: ', error);
//     }
//   };

  return (
    <div className='image_item'>
      <div className='image_tag'>Image Name </div>
      <div className='image_name'>{checkRepoTag({ image })}</div>
      <div className='imagebtns'>
        {isRunning ? (
          <div className='image_running'>In Use</div>
        ) : (
          <div>
            <button className='image_button image_start' onClick={startClick}>
              Start
            </button>
          </div>
        )}
        {/* <div>
          <button className='image_button image_stop' onClick={stopClick}>
            Stop
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ImageItem;
