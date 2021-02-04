import React from 'react';
import { Link } from 'react-router-dom';

import './styles/AllCrags.css';

const Crag = () => {
  return (
    <div className='all-crags'>
      <p>
        Hey, It looks like the dev team didn't have enoug time to build this
        page, come back again later to see the crags list
      </p>
      <Link to='/home'>
        <button type='button'>Back to Home</button>
      </Link>
    </div>
  );
};

export default Crag;
