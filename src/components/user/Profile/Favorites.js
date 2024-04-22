import React, { useState, useEffect } from 'react';

function Favorites() {
  const [favoriteApartments, setFavoriteApartments] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    // Получение данных избранных квартир из localstorage
    const storedFavorites = JSON.parse(localStorage.getItem('cartItems')) || [];
    setFavoriteApartments(storedFavorites);

    // Получение сделок из localstorage
    const storedDeals = JSON.parse(localStorage.getItem('deals')) || [];
    setDeals(storedDeals);
  }, []);

  const removeFromFavorites = (index) => {
    const updatedFavorites = [...favoriteApartments];
    updatedFavorites.splice(index, 1); // Удаляем элемент из массива
    setFavoriteApartments(updatedFavorites); // Обновляем состояние

    // Сохраняем обновленный массив в localstorage
    localStorage.setItem('cartItems', JSON.stringify(updatedFavorites));
  };

  const addToDeal = (index) => {
    // Получаем квартиру, которую нужно добавить в сделку
    const apartmentToAdd = favoriteApartments[index];

    // Проверяем, существует ли уже сделка на эту квартиру
    const isAlreadyInDeals = deals.some(deal => deal.id === apartmentToAdd.id);
    if (!isAlreadyInDeals) {
      // Если сделки на квартиру нет, то добавляем её в массив сделок
      const updatedDeals = [...deals, apartmentToAdd];
      setDeals(updatedDeals);

      // Сохраняем обновленный массив сделок в localstorage
      localStorage.setItem('deals', JSON.stringify(updatedDeals));
    } else {
      // Если сделка уже существует, то удаляем её из сделок
      const updatedDeals = deals.filter(deal => deal.id !== apartmentToAdd.id);
      setDeals(updatedDeals);

      // Сохраняем обновленный массив сделок в localstorage
      localStorage.setItem('deals', JSON.stringify(updatedDeals));
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
            <button className='favorites-btn favorites-deal' onClick={() => addToDeal(index)}>
              {deals.some(deal => deal.id === apartment.id) ? 'Очистить сделки' : 'Начать сделку'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
