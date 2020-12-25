import React from 'react';

import Header from '../Header.js';
import './styles.css';

function MyCards(props) {
  return (
    <div className='main'>
      <Header
        userImg={props.user.userImg}
        name={'@' + props.user.username}
        handleLogout={props.handleLogout}
        calledFrom='MyCards'
      />
      <p className='footer'>
        <br />
        Signed In.
      </p>
    </div>
  );
}

export default MyCards;
