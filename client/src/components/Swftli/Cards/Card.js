import React from 'react';

function Card(props) {
  if (props.enabled === true) {
    return (
      <a className='userCard' href={props.url}>
        <i className={props.social + ' cardSocial'}></i>
        <div className='userCardName'>{props.name}</div>
      </a>
    );
  } else {
    return <></>;
  }
}

export default Card;
