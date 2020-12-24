import React from 'react';

import './styles.css';
import defaultImg from '../../images/digitalia.PNG';

const Header = (props) => {
  const userImg = props.userImg === '' ? defaultImg : props.userImg;
  return (
    <div className='header'>
      <div className='adminBanner'>
        <div className='userBanner'>
          <img className='userImage' src={userImg} alt='User' />
          {''}
          {props.name}
        </div>
        <div className='bannerLinks'>
          <div className='bannerOtherLinks'></div>
          <div className='bannerLogout' onClick={props.handleLogout}>
            Log Out
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
