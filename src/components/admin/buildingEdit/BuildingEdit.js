import React, { useState, useEffect, useCallback } from 'react';
import Notification from '../notification/Notification';
import axios from 'axios';

function BuildingEdit() {
  const [buildings, setBuildings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [tempPhoto, setTempPhoto] = useState(null); 

  const fetchBuildings = useCallback(() => {
    axios.get(`http://localhost:3001/api/admin/buildings`, {
      withCredentials: true,
    }).then((response) => {
      console.log('Buildings Response:', response.data);
      setBuildings(response.data);
    }).catch(error => {
      console.error('Error fetching buildings:', error);
    });
  }, []);

  const handleChange = (event, buildingId, field) => {
    const updatedBuildings = [...buildings];
    const updatedBuildingIndex = updatedBuildings.findIndex((building) => building.building_id === buildingId);
    updatedBuildings[updatedBuildingIndex][field] = event.target.value;
    setBuildings(updatedBuildings);
  };

  const handlePhotoUploader = async (e, buildingId) => {
    const selectedPhoto = e.target.files[0];
    setTempPhoto(selectedPhoto);
    
    const formData = new FormData();
    formData.append('photo', selectedPhoto);
    formData.append('building_id', buildingId);
  
    try {
      const response = await axios.post('http://localhost:3001/api/admin/uploadLayout', formData, {
        withCredentials: true,
      });
  
      if (response.status === 200) {
        console.log('Фотография успешно загружена');
        setPhoto(selectedPhoto); // Обновляем фотографию в родительском компоненте
      } else {
        console.error('Ошибка загрузки фотографии');
      }
    } catch (error) {
      console.error('Ошибка загрузки фотографии:', error);
    }
  }

  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateTimeString).toLocaleString('ru-RU', options);
  };

  useEffect(() => {
    fetchBuildings();
  }, [fetchBuildings]);

  return (
    <div className='building-edit'>
      <div className='building-container'>
        <div className='apartment-name'>
          <p>Название здания</p>
          <p>Материал</p>
          <p>Подъеды</p>
          <p>Квартиры</p>
          <p>Дата сдачи</p>
          <p>Изображения</p>
        </div>
      </div>
      {buildings.map((building) => (
        <div key={building.building_id} className='apartment-items'>
          <div className='apartment-item-value building-edit-input'>
            <input
              type='text'
              name='building_name'
              value={building.building_name}
              readOnly
            />
          </div>
          <div className='apartment-item-value building-edit-input'>
            <input
              type='text'
              name='material'
              value={building.material}
              onChange={(event) => handleChange(event, building.building_id, 'material')}
            />
          </div>
          <div className='apartment-item-value building-edit-input'>
            <input
              type='text'
              name='total_entrances'
              value={building.total_entrances}
              onChange={(event) => handleChange(event, building.building_id, 'total_entrances')}
            />
          </div>
          <div className='apartment-item-value building-edit-input'>
            <input
              type='text'
              name='total_apartments'
              value={building.total_apartments}
              onChange={(event) => handleChange(event, building.building_id, 'total_apartments')}
            />
          </div>
          <div className='apartment-item-value building-edit-input'>
            <input
              type='text'
              name='completion_date'
              value={formatDateTime(building.completion_date)}
              onChange={(event) => handleChange(event, building.building_id, 'completion_date')}
            />
          </div>
          <div className='apartment-item-value building-edit-input'>
            <input className='building-edit-photo' type="file" id="photo-upload" accept="image/*" onChange={(e) => handlePhotoUploader(e, building.building_id)} />
            <span>Выберите фото</span>
          </div>
        </div>
      ))}
      {notifications.map((message, index) => (
        <Notification key={index} message={message} />
      ))}
    </div>
  );
}

export default BuildingEdit;
