import React from 'react';

function Card(props) {
  if (props.enabled === true) {
    return (
      <a className='userCard' href={props.url}>
        <i class={props.social + ' cardSocial'}></i>
        {props.name}
      </a>
    );
  } else {
    return <></>;
  }
}

export default Card;
