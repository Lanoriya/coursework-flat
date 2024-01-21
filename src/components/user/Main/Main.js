import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import MainContent from './MainContent/MainContent';
import '../Apartments/Apartments.css'
import '../Main/Footer/Footer.css';
import Apartments from '../Apartments/Apartments';
import ApartmentPage from '../ApartmentPage/ApartmentPage'
import Policy from '../Policy/Policy';

function Main() {

  return (
    <div className='main'>
      <MainHeader />

      <Routes>
        <Route path="/apartments" element={<Apartments />} />
        <Route path="/apartments/flat/:id" element={<ApartmentPage />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<MainContent />} />
      </Routes>

      <MainFooter />
    </div>
  );
}

export default Main;
