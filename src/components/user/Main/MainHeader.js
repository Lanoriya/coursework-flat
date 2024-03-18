import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import burger from '../Main/imgs/burger.svg';
import Logo from '../Main/imgs/logo-white.png';
import Popup from '../Main/Popup/Popup';
import Mobile from '../Main/imgs/mobile.png'

function MainHeader() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const location = useLocation();
  const isApartmentsPage = /^\/apartments/.test(location.pathname);
  const isPolicyPage = location.pathname === '/policy';
  const isProfile = location.pathname === '/profile';
  const isPageValid = isApartmentsPage || isPolicyPage || isProfile;
  const isHomePage = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

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

  if (isProfile) {
    return null;
  }

  return (
    <header className={`main-header ${isPageValid ? 'apartments-header' : ''}`}>
      <div className={`header-container ${isPageValid ? 'apartments-header' : ''}`}>
        <div className={`container header-block ${isMenuOpen ? 'menu-open' : ''}`}>
          <button className='user-aside-btn' onClick={toggleMenu}>
            <img className='user-aside-img' src={burger} alt='burger'/>
          </button>
          <nav className='main-header-nav'>
            <ul className='header-ul'>
              <Link to='/' className='header-ul-li' onClick={() => {handleLinkClick(); window.scrollTo({top: 0, behavior: 'smooth'})}}><img className='header-logo' src={Logo} alt='header-logo' /></Link>
              <li className='header-ul-li' onClick={(e) => {handleLinkClick(); handleLocationClick(e, 'about')}}><Link to='/'>О проекте</Link></li>
              <Link to='/apartments' className='header-ul-li' onClick={() => {handleLinkClick()}}>Поиск квартир</Link>
              <li className='header-ul-li' onClick={(e) => {handleLinkClick(); handleLocationClick(e, 'location')}}><Link to='/'>Расположение</Link></li>
              <li className='header-ul-li' onClick={(e) => {handleLinkClick(); handleLocationClick(e, 'contacts')}}><Link to='/'>Контакты</Link></li>
              <Link to='/profile' className='header-ul-li' onClick={() => {handleLinkClick()}}>Личный кабинет</Link>
            </ul>
          </nav>
          <div className='header-callback'>
            <a href='tel:79504925990' className='callback-tel'>+79504925990</a>
            <button className='callback-tel-pop' onClick={openPopup}>Заказать звонок</button>
          </div>
        </div>
      </div>
      {isHomePage && (
        <div className='about-content'>
          <div className='about-header'>
            <h4 className='about-title'>Lanoriya. Место для души</h4>
          </div>
        </div>
      )}
      {isPopupOpen && <Popup onClose={closePopup} onSubmit={submitForm} />}
      <button className='callback-tel-pop callback-tel-mobile' onClick={openPopup}>
        <img className='mobile-img' src={Mobile} alt='mobile-icon'/>
      </button>
    </header>
  )
}

export default MainHeader;
