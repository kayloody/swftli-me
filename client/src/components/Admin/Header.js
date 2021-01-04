import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import defaultImg from '../../images/defaultImg.png';

const Header = (props) => {
  const userImg = props.userImg === '' ? defaultImg : props.userImg;

  let userName = props.name;
  let links = <div></div>;
  switch (props.calledFrom) {
    case 'MyCards':
      links = (
        <div className='bannerSettings'>
          <Link
            to={`/${props.name}`}
            target='_blank'
            className='bannerOtherLinks'
          >
            Preview
          </Link>
          <Link
            to={process.env.PUBLIC_URL + '/admin/settings'}
            className='bannerOtherLinks'
          >
            Settings
          </Link>
        </div>
      );
      userName = '';
      break;
    case 'MySettings':
      links = (
        <div className='bannerSettings'>
          <Link
            to={`/${props.name}`}
            target='_blank'
            className='bannerOtherLinks'
          >
            Preview
          </Link>
          <Link
            to={process.env.PUBLIC_URL + '/admin/cards'}
            className='bannerOtherLinks'
          >
            Cards
          </Link>
        </div>
      );
      userName = '';
      break;
    default:
      links = <div></div>;
      userName = props.name;
  }

  return (
    <div className='adminBanner'>
      <div className='adminUser'>
        <img className='adminImage' src={userImg} alt='user' />
        {userName}
      </div>
      <div className='bannerLinks'>
        {links}
        <div className='bannerLogout' onClick={props.handleLogout}>
          Log Out
        </div>
      </div>
    </div>
  );
};

export default Header;
