import React from 'react';

import './styles/Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home-container'>
      <div
        className='bandeau-img'
        style={{ backgroundImage: "url('/images/image-home.jpg')" }}
      >
        <div className='welcome-message'>
          <p> Welcome to Climbing Crag !</p>
          <p>
            Here you can find your all of your routes that you've done or not
            and share it with other climbers
          </p>
          <p>Enjoy it, and happy climbing !!</p>
        </div>
        <div className='list-home-button'>
          <Link to='/routes/all'>
            <button type='button'>Go to the routes list</button>
          </Link>
          <Link to='/routes/crags'>
            <button type='button'>Show me the crags !!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
