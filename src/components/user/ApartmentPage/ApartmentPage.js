import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Popup from '../Main/Popup/Popup';
import axios from 'axios';

function ApartmentPage() {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    // Получение данных о квартире по её id
    axios.get(`http://localhost:3001/api/apartments/${id}`)
      .then((response) => {
        setApartment(response.data);

        // Проверяем, содержится ли квартира в избранных при загрузке страницы
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const isInFavorites = cartItems.some(item => item.apartment_id === response.data.apartment_id);
        setIsInFavorites(isInFavorites);
      })
      .catch((error) => {
        console.error('Error fetching apartment details:', error);
      });
  }, [id]);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const submitForm = (data) => {
    console.log('Отправка данных:', data);
    // Добавление квартиры в корзину (localStorage)
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(apartment);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const toggleFavorites = () => {
    // Получаем квартиры из localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Проверяем, содержится ли текущая квартира в избранных
    const isAlreadyInFavorites = cartItems.some(item => item.apartment_id === apartment.apartment_id);

    // Если квартира уже в избранных, удаляем ее
    if (isAlreadyInFavorites) {
      const updatedCartItems = cartItems.filter(item => item.apartment_id !== apartment.apartment_id);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      setIsInFavorites(false);
    } else {
      // Если квартира не в избранных, добавляем ее
      const updatedCartItems = [...cartItems, apartment];
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      setIsInFavorites(true);
    }
  };


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
          <img className="flat-img" src={`http://localhost:3001/api/image/${apartment.image_id}`} alt={`Apartment ${apartment.apartment_number}`} />
          <div className='flat-about'>
            <h1>Квартира №{apartment.apartment_number}</h1>
            <p>Площадь: {apartment.area}м²</p>
            <p>Этаж: {apartment.floor}</p>
            <p>Цена: {apartment.price}</p>
            <button className="callback-tel-pop" onClick={openPopup}>Сделать звонок</button>
            <button className="callback-tel-pop add-to-cart" onClick={toggleFavorites}>
              {isInFavorites ? "Удалить из избранного" : "Добавить в избранное"}
            </button>
          </div>
        </div>
      </div>
      {isPopupOpen && <Popup onClose={closePopup} onSubmit={submitForm} />}
    </div>
  );
}

export default ApartmentPage;
