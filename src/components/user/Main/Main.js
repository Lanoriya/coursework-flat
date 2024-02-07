import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import MainContent from './MainContent/MainContent';
import Apartments from '../Apartments/Apartments';
import ApartmentPage from '../ApartmentPage/ApartmentPage'
import Policy from '../Policy/Policy';
import './styles/Footer.css';
import '../styles/AboutHeader.css';
import '../styles/ApartmentPage.css';
import '../styles/Apartments.css';
import '../styles/Policy.css';
import '../styles/Main-mobile.css';

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
