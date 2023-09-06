// header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <div className='header'>
      <div className="name">
        <h4>{props.firstName}</h4>
        <h1>{props.lastName}</h1>
      </div>
      <ul className='headerBtn'>
      <Link to="/"><li className='loginBtn'>Ana Sayfa</li></Link>
          <Link to="/login"><li className='loginBtn'>Giriş Yap</li></Link> {/* Giriş yap sayfasına yönlendiren bağlantı */}
          {/* Diğer bağlantılar buraya eklenebilir */}
      </ul>
      <div className="userImg">
        <img className='homeimage' src={props.avatar} alt="Avatar" />
        </div>
    </div>
  );
}

export default Header;
