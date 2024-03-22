import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import MainContent from './MainContent/MainContent';
import Apartments from '../Apartments/Apartments';
import ApartmentPage from '../ApartmentPage/ApartmentPage';
import Policy from '../Policy/Policy';
import UserProfile from '../Profile/ProfileLogin/UserProfile';
import UserLogin from '../Profile/ProfileLogin/UserLogin';
import '../styles/userlogin.css'
import './styles/Footer.css';
import '../styles/AboutHeader.css';
import '../styles/ApartmentPage.css';
import '../styles/Apartments.css';
import '../styles/Policy.css';
import '../styles/Main-mobile.css';

function Main() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const userToken = document.cookie.split('; ').find(row => row.startsWith('userToken='));
    if (userToken) {
      setIsAuthenticated(true);
      setUsername(userToken.split('=')[1]);
    }
  }, []);

  return (
    <div className='main'>
      <MainHeader />

      <Routes>
        <Route path="/apartments" element={<Apartments />} />
        <Route path="/apartments/flat/:id" element={<ApartmentPage />} />
        <Route path="/policy" element={<Policy />} />
        <Route
          path="/profile"
          element={isAuthenticated ? <UserProfile username={username} /> : <UserLogin />}
        />
        <Route path="/" element={<MainContent />} />
      </Routes>

      <MainFooter />
    </div>
  );
}

export default Main;
