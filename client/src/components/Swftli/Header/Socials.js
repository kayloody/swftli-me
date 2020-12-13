import React from 'react';

import { socialClasses, getDomain } from '../Domains.js';

const Socials = (props) => {
  const socials = props.socials.map((social, i) => {
    const socialClass = socialClasses[social.name];
    return (
      <a key={i} href={'https://' + social.name + '/' + social.uid}>
        <i class={socialClass + ' userSocial'}></i>
      </a>
    );
  });

  return <div className='userSocials'>{socials}</div>;
};

export default Socials;
