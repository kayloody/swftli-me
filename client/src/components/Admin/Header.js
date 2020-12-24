import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import defaultImg from '../../images/digitalia.PNG';

const Header = (props) => {
  const userImg = props.userImg === '' ? defaultImg : props.userImg;

  let links = <div></div>;
  switch (props.calledFrom) {
    case 'MyCards':
      links = (
        <div>
          <Link
            to={`/${props.name.split('@')[1]}`}
            target='_blank'
            className='bannerOtherLinks'
          >
            Preview
          </Link>
          <Link to='/admin/settings' className='bannerOtherLinks'>
            Settings
          </Link>
        </div>
      );
      break;
    case 'MySettings':
      links = (
        <div>
          <Link
            to={`/${props.name.split('@')[1]}`}
            target='_blank'
            className='bannerOtherLinks'
          >
            Preview
          </Link>
          <Link to='/admin/cards' className='bannerOtherLinks'>
            Cards
          </Link>
        </div>
      );
      break;
    default:
      links = <div></div>;
  }

  return (
    <div className='header'>
      <div className='adminBanner'>
        <div className='userBanner'>
          <img className='userImage' src={userImg} alt='User' />
          {''}
          {props.name}
        </div>
        <div className='bannerLinks'>
          {links}
          <div className='bannerLogout' onClick={props.handleLogout}>
            Log Out
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
