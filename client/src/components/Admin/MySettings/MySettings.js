import React from 'react';

import Header from '../Header.js';
import './styles.css';

function MySettings(props) {
  return (
    <div className='main'>
      <Header
        userImg={props.user.userImg}
        name={'@' + props.user.username}
        handleLogout={props.handleLogout}
        calledFrom='MySettings'
      />
      <p class='footer'>
        <br />
        Settings
      </p>
    </div>
  );
}

export default MySettings;
