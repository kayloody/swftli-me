import React from 'react';
import Socials from './Socials.js';

import userImage from '../../../images/digitalia.PNG';

const Header = (props) => {
  return (
    <div class='header userHeader'>
      <div class='banner userBanner'>
        <img className='userImage' src={userImage} alt='username' />{' '}
        {props.name}
      </div>
      <Socials socials={props.socials} />
    </div>
  );
};

export default Header;
