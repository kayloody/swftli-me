import React from 'react';

import Logo from '../Logo.js';

function NoPage() {
  return (
    <div className='main'>
      <Logo />
      <p className='noPage'>
        <br />
        Sorry this page does not exist.{' '}
        <a href='./' className='noPageLink'>
          Go back to main page
        </a>
      </p>
    </div>
  );
}
export default NoPage;
