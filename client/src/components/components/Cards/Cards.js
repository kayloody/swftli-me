import React from 'react';
import Card from './Card';

const Cards = () => {
    let cards =[];
    for (i = 0; i < 5; i++) {
        cards.push(<Card number={i} key={i}/>);
    }

    return(
        <ul>
            {cards}
        </ul>
    );
}

export default Cards;