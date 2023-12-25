import './Main.css';
import React from 'react';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import MainContent from './MainContent/MainContent';

function Main() {
  return (
    <div className='main'>
      <MainHeader />
      <MainContent />
      <MainFooter />
    </div>
  );
}

export default Main;
