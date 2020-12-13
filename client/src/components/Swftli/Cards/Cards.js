import React from 'react';
import Card from './Card';

import axios from 'axios';

function Cards() {
  axios
    .get('/kLiddy')
    .then((res) => {
      const data = res.data;

      if ('Error' in data) {
        console.log(`Error: ${data.Error}`);
      } else {
        console.log(`Data: ${data}`);
      }
    })
    .catch((err) => {
      console.log('Error: Could not communicate with server.');
    });

  const cards = [];
  for (let i = 0; i < 5; i++) {
    cards.push(<Card number={i} key={i} />);
  }

  return <div className='userCards'>{data}</div>;
}
export default Cards;
