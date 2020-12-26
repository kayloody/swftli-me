import React from 'react';
import Socials from './Socials.js';

import defaultImg from '../../../images/digitalia.PNG';

const Header = (props) => {
  const userImg = props.userImg === '' ? defaultImg : props.userImg;
  return (
    <div className='userHeader'>
      <div className='userBanner'>
        <img className='userImage' src={userImg} alt='username' /> {props.name}
      </div>
      <Socials socials={props.socials} />
    </div>
  );
};

export default Header;
