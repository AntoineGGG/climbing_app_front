import React from 'react';
import history from '../history';

import { withRouter } from 'react-router';

import './styles/Footer.css';

const Footer = () => {
  if (history.location.pathname === '/') {
    return false;
  }
  return (
    <div className='footer'>
      <p>Made with love by motion_DB</p>
    </div>
  );
};

export default withRouter(Footer);
