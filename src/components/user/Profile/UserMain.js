import React, { useState, useEffect } from 'react';

function UserMain() {
  const [userData, setUserData] = useState(null);
  const [photo, setPhoto] = useState(null); // Состояние для хранения URL загруженной фотографии
  const [name, setName] = useState(''); // Состояние для хранения временного значения имени
  const [phoneNumber, setPhoneNumber] = useState(''); // Состояние для хранения временного значения номера телефона
  const [showInputs, setShowInputs] = useState(false);
  const [tempPhoto, setTempPhoto] = useState(null); // Состояние для временного хранения загруженной фотографии
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
          // Устанавливаем имя и номер телефона
          setName(userData.settings.name || ''); // Если имя пустое, устанавливаем пустую строку
          setPhoneNumber(userData.settings.phone_number || ''); // Если номер телефона пустой, устанавливаем пустую строку
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      // Если выбрана новая фотография, загружаем ее на сервер
      if (tempPhoto) {
        const formData = new FormData();
        formData.append('photo', tempPhoto);
      
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
        } else {
          console.error('Ошибка загрузки фотографии');
        }
      }

      const response = await fetch('http://localhost:3001/api/user/updateProfile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ name, phone_number: phoneNumber })
      });
      if (response.ok) {
        window.location.reload();
        // Обновляем состояние данных пользователя после успешного обновления
        setUserData(prevUserData => ({
          ...prevUserData,
          settings: {
            ...prevUserData.settings,
            name,
            phone_number: phoneNumber
          }
        }));
        // Устанавливаем новую фотографию, если она была выбрана
        if (tempPhoto) {
          setPhoto(tempPhoto);
          setTempPhoto(null); // Сбрасываем временное состояние фотографии
        }
      } else {
        console.error('Ошибка обновления профиля');
      }
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  };

  const handlePhotoUpload = (e) => {
    setTempPhoto(e.target.files[0]);
  };

  if (!userData) {
    return <div>Loading...</div>; // Показываем сообщение о загрузке, пока данные не загружены
  }

  return (
    <div className='user-about-bio'>
      {photo && <img src={photo} className='user-about-logo' alt="Фотография отсутствует" />} {/* Отображаем фотографию, если она загружена */}
      <p>Никнейм: {userData && userData.username}</p>
      <p>Имя: {name}</p> {/* Добавляем обработчик клика для изменения имени */}
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ display: showInputs ? 'block' : 'none' }} /> {/* Поле для ввода имени, скрытое по умолчанию */}
      <p>Номер телефона: {phoneNumber}</p> {/* Добавляем обработчик клика для изменения номера телефона */}
      <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={{ display: showInputs ? 'block' : 'none' }} /> {/* Поле для ввода номера телефона, скрытое по умолчанию */}
      <div className='photo-update' style={{ display: showInputs ? 'flex' : 'none' }}>
        <label htmlFor="photo-upload">Загрузить фотографию:</label>
        <input type="file" id="photo-upload" accept="image/*" onChange={handlePhotoUpload} />
      </div>
      <button className='user-about-btn' onClick={handleUpdateProfile} style={{ display: showInputs ? 'block' : 'none' }}>Сохранить изменения</button> {/* Кнопка для сохранения изменений профиля, отображается только при активации изменения данных */}
      <button className='user-about-btn' onClick={() => setShowInputs(true)} style={{ display: showInputs ? 'none' : 'block' }}>Изменить данные</button> {/* Кнопка для отображения полей для изменения данных */}
    </div>
  );
}

export default UserMain;
