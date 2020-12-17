import React from 'react';

import Header from './Header.js';
import Footer from '../Footer.js';

import './styles.css';

const Auth = () => {
  return (
    <div className='main'>
      <Header />
      <div>
        <h1 className='auth'>Login and Auth</h1>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
