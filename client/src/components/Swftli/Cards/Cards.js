import React from 'react';

import Card from './Card';
import { socialClasses, getDomain } from '../Domains.js';

const Cards = (props) => {
  const allCards = props.links.map((card, i) => {
    const domain = getDomain(card.url);
    const domainNoW = domain.substring(4);
    const socialClass =
      domain in socialClasses
        ? socialClasses[domain]
        : domainNoW in socialClasses
        ? socialClasses[domainNoW]
        : '';

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
