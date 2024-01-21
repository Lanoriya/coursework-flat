import React, { useState } from 'react';
import { useLocation, Link, Routes, Route } from 'react-router-dom';
import Logo from '../Main/imgs/logo-white.png';
import About from '../AboutHeader/About-header';
import Popup from '../Popup/Popup';

function MainHeader() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const submitForm = (data) => {
    console.log('Отправка данных:', data);
  };

  const handleLocationClick = (e) => {
    e.preventDefault();
    const locationContainer = document.getElementById('location');
    const aboutContainer = document.getElementById('about');
    const contactsContainer = document.getElementById('contacts');
    if (locationContainer) {
      window.scrollTo({
        top: locationContainer.offsetTop - 150,
        behavior: 'smooth',
      });
    }
    else if (aboutContainer) {
      window.scrollTo({
        top: aboutContainer.offsetTop - 150,
        behavior: 'smooth',
      });
    }
    else if (contactsContainer) {
      window.scrollTo({
        top: contactsContainer.offsetTop - 150,
        behavior: 'smooth',
      });
    }
  };

  const location = useLocation();
  const isApartmentsPage = /^\/apartments/.test(location.pathname);
  const isPolicyPage = location.pathname === '/policy';
  const isPageValid = isApartmentsPage || isPolicyPage;

  return (
    <header className={`main-header ${isPageValid ? 'apartments-header' : ''}`}>
      <div className={`header-container ${isPageValid ? 'apartments-header' : ''}`}>
        <div className='container header-block'>
          <nav className='main-header-nav'>
            <ul className='header-ul'>
              <Link to='/' className='header-ul-li'><img className='header-logo' src={Logo} alt='header-logo' /></Link>
              <li className='header-ul-li' onClick={handleLocationClick}><a href='/'>О проекте</a></li>
              <Link to='/apartments' className='header-ul-li'>Поиск квартир</Link>
              <li className='header-ul-li' onClick={handleLocationClick}><a href='/'>Расположение</a></li>
              <li className='header-ul-li' onClick={handleLocationClick}><a href='/'>Контакты</a></li>
            </ul>
          </nav>
          <div className='header-callback'>
            <a href='tel:79504925990' className='callback-tel'>+79504925990</a>
            <a href='#' className='callback-tel-pop' onClick={openPopup}>Заказать звонок</a>
          </div>
        </div>
      </div>
      {isPopupOpen && <Popup onClose={closePopup} onSubmit={submitForm} />}
      <Routes>
        <Route path="/" element={<About />} />
      </Routes>
    </header>
  )
}

export default MainHeader;