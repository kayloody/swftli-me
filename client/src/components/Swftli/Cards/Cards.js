import React from 'react';

import Card from './Card';
import { socialClasses, getDomain } from '../Domains.js';

// Need to have code to remove everything before hostname as
// written below when user inputs links (no www http https)
// and to properly verify url
// Can then remove code to get hostname
const Cards = (props) => {
  const allCards = props.links.map((card, i) => {
    const domain = getDomain(card.url);
    const socialClass = domain in socialClasses ? socialClasses[domain] : '';
    return (
      <Card
        key={i}
        name={card.name}
        url={card.url}
        social={socialClass}
        enabled={card.enabled}
      />
    );
  });

  return <div className='userCards'>{allCards}</div>;
};

export default Cards;
