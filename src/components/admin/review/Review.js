import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './styles/Review.css';


function Review() {
  const [apartment, setApartment] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/apartments')
      .then((response) => {
        setApartment(response.data)
      })
  }, [])

  return (
    <div className='review-content'>
      <div className='apartment-container'>
        <div className='apartment-name'>
          <p>Номер квартиры</p>
          <p>Количество комнат</p>
          <p>Площадь</p>
          <p>Этаж</p>
          <p>Цена</p>
          <p>Номер здания</p>
          <p>Подъезд</p>
        </div>
        {apartment.map((apart, index) => (
          <div key={index} className='apartment-items'>
            <div className='apartment-item-value'>
              <p>{apart.apartment_number}</p>
            </div>
            <div className='apartment-item-value'>
              <p>{apart.room_count}</p>
            </div>
            <div className='apartment-item-value'>
              <p>{apart.area}</p>
            </div>
            <div className='apartment-item-value'>
              <p>{apart.floor}</p>
            </div>
            <div className='apartment-item-value'>
              <p>{apart.price}</p>
            </div>
            <div className='apartment-item-value'>
              <p>{apart.building_id}</p>
            </div>
            <div className='apartment-item-value'>
              <p>{apart.entrance}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Review;