import React from 'react';

function Card(props) {
  return (
    <div className='userCard'>
      {props.number % 2 === 0 && <i class='fab fa-facebook cardSocial'></i>}
      <a className='cardLink' href={'http://www.google.com/' + props.number}>
        Link Name {props.number}
      </a>
    </div>
  );
}

export default Card;
