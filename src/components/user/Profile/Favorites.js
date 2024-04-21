import React, { useState, useEffect } from 'react';

function Favorites() {
  const [favoriteApartments, setFavoriteApartments] = useState([]);

  useEffect(() => {
    // Получение данных избранных квартир из localstorage
    const storedFavorites = JSON.parse(localStorage.getItem('cartItems')) || [];
    setFavoriteApartments(storedFavorites);
  }, []);

  return (
    <div className='favorites-container'>
      <ul className='favorites-ul'>
        {favoriteApartments.map((apartment, index) => (
          <li key={index}>
            <p>Квартира №{apartment.apartment_number}</p>
            <p>Площадь: {apartment.area}м²</p>
            <p>Этаж: {apartment.floor}</p>
            <p>Цена: {apartment.price}</p>
            <img className='favorites-img' src={`http://localhost:3001/api/image/${apartment.image_id}`} alt={`Apartment ${apartment.apartment_number}`}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
