import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ApartmentPage.css';
import Popup from '../Popup/Popup';
import axios from 'axios';

function ApartmentPage() {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
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

  useEffect(() => {
    // Получение данных о квартире по её id
    axios.get(`http://localhost:3001/api/apartments/${id}`)
      .then((response) => {
        setApartment(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching apartment details:', error);
      });
  }, [id]);

  if (!apartment) {
    return <div>Loading...</div>;
  }

  return (
    <div className='apartment-page'>
      <div className='container'>
        <div className='back-btn'>
          <a href='/apartments'>back</a>
        </div>
        <div className='flat-container'>
          <img className="flat-img" src={`http://localhost:3001/api/image/${apartment.image_id}`} alt={`Apartment ${apartment.apartment_number}`}/>
          <div className='flat-about'>
            <h1>Квартира №{apartment.apartment_number}</h1>
            <p>Площадь: {apartment.area}м²</p>
            <p>Этаж: {apartment.floor}</p>
            <p>Цена: {apartment.price}</p>
            <a href="#" className="callback-tel-pop" onClick={openPopup}>Оставить заявку</a>
          </div>
        </div>
      </div>
      {isPopupOpen && <Popup onClose={closePopup} onSubmit={submitForm} />}
    </div>
  );
}

export default ApartmentPage;
