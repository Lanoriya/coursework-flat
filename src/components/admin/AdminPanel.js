import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import burger from './imgs/burger.svg';
import Orders from './orders/Orders';
import Editor from './editor/Editor';
import Review from './review/Review';
import AdminMain from './admin-main/AdminMain';
import './styles/AdminPanel.css';
import './styles/Editor.css';
import './styles/Review.css';
import './styles/Orders.css';
import './styles/Admin-media.css';

function AdminPanel() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className='admin-page'>
      <header className='admin-header'>
        <p className='admin-header--p'>Developed by Lanoriya</p>
      </header>

      <aside className={`admin-aside ${isMenuOpen ? 'menu-open' : ''}`}>
        <button className='admin-aside-btn' onClick={toggleMenu}>
          <img className='admin-aside-img' src={burger} alt='burger'/>
        </button>
        <nav className='admin-aside-nav'>
          <Link to='' className='aside-nav-btn' onClick={handleLinkClick}>Main</Link>
          <Link to='editor' className='aside-nav-btn' onClick={handleLinkClick}>Editor</Link>
          <Link to='orders' className='aside-nav-btn' onClick={handleLinkClick}>Orders</Link>
          <Link to='review' className='aside-nav-btn' onClick={handleLinkClick}>Review</Link>
        </nav>
      </aside>

      <main className='admin-main'>
        <Routes>
          <Route path='/' element={<AdminMain />} />
          <Route path='editor' element={<Editor />} />
          <Route path='orders' element={<Orders />} />
          <Route path='review' element={<Review />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminPanel;
