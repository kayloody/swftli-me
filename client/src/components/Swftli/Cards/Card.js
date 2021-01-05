import React from 'react';

function Card(props) {
  if (props.enabled === true) {
    return (
      <a
        className='userCard'
        href={props.url}
        target='_blank'
        rel='noopener noreferrer'
      >
        {props.social !== '' && (
          <i className={props.social + ' cardSocial'}></i>
        )}
        <div className='userCardName'>{props.name}</div>
      </a>
    );
  } else {
    return <></>;
  }
}

export default Card;
