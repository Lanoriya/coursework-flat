import React, { useState, useEffect } from 'react';

function Deals() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    // Получение данных о сделках из localstorage
    const storedDeals = JSON.parse(localStorage.getItem('deals')) || [];
    setDeals(storedDeals);
  }, []);

  return (
    <div className='deals-container'>
      <ul className='deals-ul'>
        {deals.map((deal, index) => (
          <li className='deals-li' key={index}>
            <div className='deals-li-p'>
              <p>Квартира №{deal.apartment_number}</p>
              <p>Площадь: {deal.area}м²</p>
              <p>Этаж: {deal.floor}</p>
              <p>Цена: {deal.price}</p>
            </div>
            <img
              className='favorites-img'
              src={`http://localhost:3001/api/image/${deal.image_id}`}
              alt={`Apartment ${deal.apartment_number}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Deals;
