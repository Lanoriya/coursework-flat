import './Main.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import React from 'react';
import Apartments from '../Apartments/Apartments';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import About from '../About/About';

function Main() {
  return (
    <div className='main'>
      <MainHeader />
      <section className='main-content'>
        <Routes>
          <Route path='*' element={<Outlet />} />
          <Route path='apartments' element={<Apartments />} />
        </Routes>
      </section>
      <MainFooter />
    </div>
  );
}

export default Main;
