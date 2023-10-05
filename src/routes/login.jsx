// Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Login() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    avatar: null,
  });

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setUser((prevUser) => ({ ...prevUser, avatar: URL.createObjectURL(imageFile) }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className='container'>
      <div className="form">
        <h2>Giriş Yap</h2>
        <h4>Ad</h4>
        <input
          type="text"
          name='firstName'
          value={user.firstName}
          onChange={handleInputChange}
        />
        <h4>Soyad</h4>
        <input
          type="text"
          name='lastName'
          value={user.lastName}
          onChange={handleInputChange}
        />
        <h4>Telefon Numarası</h4>
        <input type="tel" placeholder='+90 (___) ___ ____' />
        <h4>Profil Fotoğrafı</h4>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <br />
        {user.avatar && <img className='homeimage' src={user.avatar} alt="Seçilen" />}
        <Link to={"/"}><button className="complete-button">Bilgiler Tamamla</button></Link>
      </div>
    </div>
  );
}

export default Login;
