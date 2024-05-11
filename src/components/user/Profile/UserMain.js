import React, { useState } from 'react';

function UserMain({ userData, userToken, setUserData }) {
  const [name, setName] = useState(userData ? userData.settings.name || '' : ''); 
  const [phoneNumber, setPhoneNumber] = useState(userData ? userData.settings.phone_number || '' : ''); 
  const [photo, setPhoto] = useState(null);
  const [showInputs, setShowInputs] = useState(false);
  const [tempPhoto, setTempPhoto] = useState(null);
  const handleUpdateProfile = async () => {
    try {
      if (tempPhoto) {
        const formData = new FormData();
        formData.append('photo', tempPhoto);
      
        const response = await fetch('http://localhost:3001/api/user/uploadPhoto', {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${userToken}`,
          },
          credentials: 'include'
        });
    
        if (response.ok) {
          console.log('Фотография успешно загружена');
          setPhoto(tempPhoto); // Update the photo in parent component
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
        body: JSON.stringify({ name: name || userData.settings.name, phone_number: phoneNumber || userData.settings.phone_number })
      });
      if (response.ok) {
        window.location.reload();
        setUserData(prevUserData => ({
          ...prevUserData,
          settings: {
            ...prevUserData.settings,
            name,
            phone_number: phoneNumber
          }
        }));
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
    return <div>Loading...</div>;
  }

  return (
    <div className='user-about-bio'>
      {userData.settings.photo_url && <img src={'http://localhost:3001/' + userData.settings.photo_url} className='user-about-logo' alt="Фотография отсутствует" />}
      <p>Никнейм: {userData.username}</p>
      <p>Имя: {userData.settings.name}</p> 
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ display: showInputs ? 'block' : 'none' }} /> 
      <p>Номер телефона: {userData.settings.phone_number}</p> 
      <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={{ display: showInputs ? 'block' : 'none' }} />
      <div className='photo-update' style={{ display: showInputs ? 'flex' : 'none' }}>
        <label htmlFor="photo-upload">Загрузить фотографию:</label>
        <input type="file" id="photo-upload" accept="image/*" onChange={handlePhotoUpload} />
      </div>
      <button className='user-about-btn' onClick={handleUpdateProfile} style={{ display: showInputs ? 'block' : 'none' }}>Сохранить изменения</button> 
      <button className='user-about-btn' onClick={() => setShowInputs(true)} style={{ display: showInputs ? 'none' : 'block' }}>Изменить данные</button> 
    </div>
  );
}

export default UserMain;
