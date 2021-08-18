import React, { component } from 'react';
import { Link } from 'react-router-dom';
//final edits page at the top
//yaml file in the middle
//save to local button at the bottom
const EditContainer = () => {
  return (
    <>
      <nav>Final Edits</nav>
      <div>final yaml</div>
      <Link to='/main'>
        <button>Save to Local</button>
      </Link>
    </>
  );
};
export default EditContainer;
