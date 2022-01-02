import React from 'react';

const ImageItemDeleteBtn = ({ deleteClick }) => {
  return (
    <div className='opt_box'>
      <button className='image_remove' onClick={deleteClick}>
        Remove
      </button>
    </div>
  );
};
export default ImageItemDeleteBtn;
