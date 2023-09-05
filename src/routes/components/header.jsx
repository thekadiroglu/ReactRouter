// header.js
import React from 'react';

function Header(props) {
  return (
    <div className='header'>
      <div className="name">
        <h4>{props.firstName}</h4>
        <h1>{props.lastName}</h1>
      </div>
      
      <img className='homeimage' src={props.avatar} alt="Avatar" />
    </div>
  );
}

export default Header;
