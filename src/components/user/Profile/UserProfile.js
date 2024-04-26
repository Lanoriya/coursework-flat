import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import burger from '../Main/imgs/burger.svg';
import Favorites from './Favorites';
import Deals from './Deals';
import UserMain from './UserMain';
import NowDeals from './NowDeals';
import '../styles/UserProfile.css';
import '../styles/UserProfile-media.css';
import '../styles/Favorites.css';
import '../styles/Deals.css';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [activeDeals, setActiveDeals] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userToken = document.cookie.split('; ').find(row => row.startsWith('userToken=')).split('=')[1];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userToken}`,
          },
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
          setActiveDeals(userData.activeDeals); // Передаем активные сделки из userData
          fetchDeals(userData);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const fetchDeals = (userData) => {
    fetch(`http://localhost:3001/api/user/deals?userId=${userData.id}`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      },
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch deals.');
        }
        return response.json();
      })
      .then(data => {
        setActiveDeals(data);
        localStorage.setItem('activeDeals', JSON.stringify(data));
      })
      .catch(error => {
        console.error('Error fetching deals:', error);
        console.error('Произошла ошибка при загрузке сделок.');
      });
  };

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
        <p className='user-header--p'>Здравствуйте! {userData && userData.username}</p>
      </header>

      <aside className={`user-aside ${isMenuOpen ? 'menu-open' : ''}`}>
        <button className='user-aside-btn' onClick={toggleMenu}>
          <img className='user-aside-img' src={burger} alt='burger'/>
        </button>
        <nav className='user-aside-nav'>
          <Link to='/' className='aside-nav-btn' onClick={handleLinkClick}>Главная</Link>
          <Link to='' className='aside-nav-btn' onClick={handleLinkClick}>Профиль</Link>
          <Link to='favorites' className='aside-nav-btn' onClick={handleLinkClick}>Избранное</Link>
          <Link to='deals' className='aside-nav-btn' onClick={handleLinkClick}>Сделки</Link>
          <Link to='now-deals' className='aside-nav-btn' onClick={handleLinkClick}>Активные сделки</Link>
        </nav>
      </aside>

      <main className='user-main'>
        <Routes>
          <Route path='' element={<UserMain userData={userData} userToken={userToken} setUserData={setUserData} />} />
          <Route path='favorites' element={<Favorites activeDeals={activeDeals}/>} />
          <Route path='deals' element={<Deals activeDeals={activeDeals} userData={userData} userToken={userToken} setUserData={setUserData} />} />
          <Route path='now-deals' element={<NowDeals activeDeals={activeDeals} userToken={userToken} />} />
        </Routes>
      </main>
    </div>
  );
}

export default UserProfile;
