import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import burger from '../Main/imgs/burger.svg';
import Favorites from './Favorites';
import Deals from './Deals';
import UserMain from './UserMain';
import '../styles/UserProfile.css';
import '../styles/UserProfile-media.css';


function UserProfile() {
  const [username, setUsername] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const userToken = document.cookie.split('; ').find(row => row.startsWith('userToken=')).split('=')[1];
    async function fetchUserData() {
      try {
        const response = await fetch('http://localhost:3001/api/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userToken}`, // Предполагается, что у вас есть токен доступа, который отправляется на сервер для аутентификации пользователя
          },
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          console.log(userData)
          setUsername(userData.username); // Предполагается, что имя пользователя содержится в объекте данных о пользователе
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, []); // Запрос будет выполнен только один раз после загрузки компонента

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="user-page">
      <header className='user-header'>
        <p className='user-header--p'>Здравствуйте! {username}</p>
      </header>

      <aside className={`user-aside ${isMenuOpen ? 'menu-open' : ''}`}>
        <button className='user-aside-btn' onClick={toggleMenu}>
          <img className='user-aside-img' src={burger} alt='burger'/>
        </button>
        <nav className='user-aside-nav'>
          <Link to='' className='aside-nav-btn' onClick={handleLinkClick}>Профиль</Link>
          <Link to='favorites' className='aside-nav-btn' onClick={handleLinkClick}>Избранное</Link>
          <Link to='deals' className='aside-nav-btn' onClick={handleLinkClick}>Сделки</Link>
        </nav>
      </aside>

      <main className='user-main'>
        <Routes>
          <Route path='' element={<UserMain />} />
          <Route path='favorites' element={<Favorites />} />
          <Route path='deals' element={<Deals />} />
        </Routes>
      </main>
    </div>
  );
}

export default UserProfile;
