import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Link className='logoBanner' to={process.env.PUBLIC_URL}>
      swftli.<span className='logoMe'>me</span>
    </Link>
  );
};

export default Header;
