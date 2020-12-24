import React from 'react';

import Header from '../Header.js';
import './styles.css';

function OauthUser(props) {
  return (
    <div className='main'>
      <Header userImg={props.user.userImg} name={''} />
      <p class='footer'>
        <br />
        Please select a username.
      </p>
    </div>
  );
}

export default OauthUser;
