import React from 'react';

function Socials() {
  let socials = [];
  for (let i = 0; i < 5; i++) {
    socials.push(
      <a href='http://www.facebook.com'>
        <i class='fab fa-facebook userSocial'></i>
      </a>
    );
  }

  return <div className='userSocials'>{socials}</div>;
}

export default Socials;
