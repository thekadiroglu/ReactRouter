// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Header( user ) {
  return (
    <div className='header'>
      <div className="name">
        <h4>{user.firstName}</h4>
        <h1>{user.lastName}</h1>
      </div>
      <ul className='headerBtn'>
        <Link to="/"><li className='loginBtn'>Ana Sayfa</li></Link>
        <Link to="/login"><li className='loginBtn'>Giriş Yap</li></Link>
        {/* Diğer bağlantılar buraya eklenebilir */}
      </ul>
      <div className="userImg">
        {user.avatar && <img src={user.avatar} alt="Profil Fotoğrafı" />}
      </div>
    </div>
  );
}

export default Header;
