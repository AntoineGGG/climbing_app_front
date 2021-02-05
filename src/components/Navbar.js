import React from 'react';

import './styles/Navbar.css';

import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='nav'>
      <h1>Climbing Crags</h1>
      <ul>
        <Link to='/home'>
          <li>Home</li>
        </Link>
        <Link to='/routes'>
          <li>Routes</li>
        </Link>
        <Link to='/crags'>
          <li>Crags</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
