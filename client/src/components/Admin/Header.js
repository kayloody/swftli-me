import React from 'react';

import defaultImg from '../../images/digitalia.PNG';

const Header = (props) => {
  const userImg = props.userImg === '' ? defaultImg : props.userImg;
  return (
    <div class='header userHeader'>
      <div class='banner userBanner'>
        <img className='userImage' src={userImg} alt='User' />
        {''}
        {props.name}
      </div>
    </div>
  );
};

export default Header;
