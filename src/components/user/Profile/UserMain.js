import React, { useState, useEffect } from 'react';

function UserMain() {
  const [userData, setUserData] = useState(null);
  const [photo, setPhoto] = useState(null); // Состояние для хранения URL загруженной фотографии
  const userToken = document.cookie.split('; ').find(row => row.startsWith('userToken=')).split('=')[1];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
          // Устанавливаем URL фотографии, если он доступен в данных пользователя
          if (userData.settings.photo_url) {
            setPhoto('http://localhost:3001/'+userData.settings.photo_url);
          }
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const handlePhotoUpload = async (e) => {
    const formData = new FormData();
    formData.append('photo', e.target.files[0]);
  
    try {
      const response = await fetch('http://localhost:3001/api/user/uploadPhoto', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${userToken}`, // Проверьте, что здесь корректно передается токен
        },
        credentials: 'include'
      });
  
      if (response.ok) {
        console.log('Фотография успешно загружена');
        // Обновляем состояние фотографии после успешной загрузки
        window.location.reload();
        const responseData = await response.json();
        setPhoto(responseData.photoUrl); // Предположим, что сервер возвращает URL загруженной фотографии
      } else {
        console.error('Ошибка загрузки фотографии');
      }
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  };

  return (
    <div className='user-about-container'>
      {photo && <img src={photo} className='user-about-logo' alt="User Photo" />} {/* Отображаем фотографию, если она загружена */}
      <p>Никнейм: {userData.username}</p>
      <p>Имя: {userData.settings.name}</p>
      <p>Номер телефона: {userData.settings.phone_number}</p>
      <div className='photo-update'>
        <label htmlFor="photo-upload">Загрузить фотографию:</label>
        <input type="file" id="photo-upload" accept="image/*" onChange={handlePhotoUpload} />
      </div>
    </div>
  );
}

export default UserMain;
