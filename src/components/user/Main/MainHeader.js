import React, { useState } from 'react';
import { useLocation, Link, Routes, Route } from 'react-router-dom';
import Logo from '../Main/imgs/logo-white.png';
import About from '../AboutHeader/About-header';
import Popup from '../Main/Popup/Popup';

function MainHeader() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const location = useLocation();
  const isApartmentsPage = /^\/apartments/.test(location.pathname);
  const isPolicyPage = location.pathname === '/policy';
  const isPageValid = isApartmentsPage || isPolicyPage;

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const submitForm = (data) => {
    console.log('Отправка данных:', data);
  };

  const handleLocationClick = (e, section) => {
    e.preventDefault();
  
    const sectionContainers = {
      location: document.getElementById('location'),
      about: document.getElementById('about'),
      contacts: document.getElementById('contacts'),
    };
    const targetContainer = sectionContainers[section];
  
    if (targetContainer) {
      window.scrollTo({
        top: targetContainer.offsetTop - 150,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className={`main-header ${isPageValid ? 'apartments-header' : ''}`}>
      <div className={`header-container ${isPageValid ? 'apartments-header' : ''}`}>
        <div className='container header-block'>
          <nav className='main-header-nav'>
            <ul className='header-ul'>
              <Link to='/' className='header-ul-li' onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'})}}><img className='header-logo' src={Logo} alt='header-logo' /></Link>
              <li className='header-ul-li' onClick={(e) => handleLocationClick(e, 'about')}><Link to='/'>О проекте</Link></li>
              <Link to='/apartments' className='header-ul-li'>Поиск квартир</Link>
              <li className='header-ul-li' onClick={(e) => handleLocationClick(e, 'location')}><Link to='/'>Расположение</Link></li>
              <li className='header-ul-li' onClick={(e) => handleLocationClick(e, 'contacts')}><Link to='/'>Контакты</Link></li>
            </ul>
          </nav>
          <div className='header-callback'>
            <a href='tel:79504925990' className='callback-tel'>+79504925990</a>
            <button className='callback-tel-pop' onClick={openPopup}>Заказать звонок</button>
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