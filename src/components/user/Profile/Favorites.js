import React, { useState, useEffect } from 'react';

function Favorites() {
  const [favoriteApartments, setFavoriteApartments] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    // Получение данных избранных квартир из localstorage
    const storedFavorites = JSON.parse(localStorage.getItem('cartItems')) || [];
    setFavoriteApartments(storedFavorites);
  }, []);

  const removeFromFavorites = (index) => {
    const updatedFavorites = [...favoriteApartments];
    updatedFavorites.splice(index, 1); // Удаляем элемент из массива
    setFavoriteApartments(updatedFavorites); // Обновляем состояние

    // Сохраняем обновленный массив в localstorage
    localStorage.setItem('cartItems', JSON.stringify(updatedFavorites));
  };

  return (
    <div className='favorites-container'>
      <ul className='favorites-ul'>
        {favoriteApartments.map((apartment, index) => (
          <li className='favorites-li' key={index}>
            <p>Квартира №{apartment.apartment_number}</p>
            <p>Площадь: {apartment.area}м²</p>
            <p>Этаж: {apartment.floor}</p>
            <p>Цена: {apartment.price}</p>
            <div 
              className={`favorites-img-container ${hoveredIndex === index ? 'image-hovered' : ''}`}
              onMouseEnter={() => setHoveredIndex(index)} // Устанавливаем индекс, когда курсор наведен на изображение
              onMouseLeave={() => setHoveredIndex(null)} // Сбрасываем индекс, когда курсор покидает изображение
            >
              <img 
                className='favorites-img'
                src={`http://localhost:3001/api/image/${apartment.image_id}`} 
                alt={`Apartment ${apartment.apartment_number}`}
              />
              {/* Кнопка для удаления квартиры из избранного */}
            </div>
            <button className='favorites-remover' onClick={() => removeFromFavorites(index)}>Удалить из избранного</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
