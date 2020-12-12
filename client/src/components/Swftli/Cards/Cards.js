import React from 'react';
import Card from './Card';

function Cards() {
  let cards = [];
  for (let i = 0; i < 5; i++) {
    cards.push(<Card number={i} key={i} />);
  }

  return <div className='userCards'>{cards}</div>;
}
export default Cards;
