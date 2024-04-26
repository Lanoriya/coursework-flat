import React, { useState, useEffect } from 'react';

function Favorites({ activeDeals }) {
  const [favoriteApartments, setFavoriteApartments] = useState([]);
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    // Получение данных избранных квартир из localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('cartItems')) || [];
    setFavoriteApartments(storedFavorites);

    // Получение активных сделок из localStorage
    localStorage.setItem('activeDeals', JSON.stringify(activeDeals));
    // const storedActives = JSON.parse(localStorage.getItem('activeDeals') || [])

    // Получение всех сделок из localStorage
    const storedDeals = JSON.parse(localStorage.getItem('deals')) || [];
    setDeals(storedDeals);
  }, []);

  const removeFromFavorites = (index) => {
    const updatedFavorites = [...favoriteApartments];
    updatedFavorites.splice(index, 1); // Удаляем элемент из массива
    setFavoriteApartments(updatedFavorites); // Обновляем состояние

    // Сохраняем обновленный массив в localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedFavorites));
  };

  const addToDeal = (index) => {
    const apartmentToAdd = favoriteApartments[index];
    const isAlreadyInActiveDeals = activeDeals.some(deal => deal.apartment_id === apartmentToAdd.apartment_id);
    const isAlreadyInDeals = deals.some(deal => deal.apartment_id === apartmentToAdd.apartment_id);
  
    if (!isAlreadyInActiveDeals && !isAlreadyInDeals) {
      const updatedDeals = [...deals, apartmentToAdd];
      setDeals(updatedDeals);
      localStorage.setItem('deals', JSON.stringify(updatedDeals));
    } else {
      alert('Вы не можете добавить квартиру, которая уже находится в сделках');
    }
  };  
  
  return (
    <div className='favorites-container'>
      <ul className='favorites-ul'>
        {favoriteApartments.map((apartment, index) => (
          <li className='favorites-li' key={index}>
            <div className='favorites-li-p'>
              <p>Квартира №{apartment.apartment_number}</p>
              <p>Площадь: {apartment.area}м²</p>
              <p>Этаж: {apartment.floor}</p>
              <p>Цена: {apartment.price}</p>
            </div>
            <img
              className='favorites-img'
              src={`http://localhost:3001/api/image/${apartment.image_id}`}
              alt={`Apartment ${apartment.apartment_number}`}
            />
            <button className='favorites-btn favorites-remover' onClick={() => removeFromFavorites(index)}>Удалить из избранного</button>
            {!deals.some(deal => deal.apartment_id === apartment.apartment_id) && (
              <button className='favorites-btn favorites-deal' onClick={() => addToDeal(index)}>
                Добавить в сделки
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
