import React, { useState, useEffect, useCallback } from 'react';
import Notification from '../notification/Notification';
import axios from 'axios';

function BuildingEdit() {
  const [buildings, setBuildings] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const fetchBuildings = useCallback(() => {
    axios.get(`http://localhost:3001/api/admin/buildings`, {
      withCredentials: true,
    }).then((response) => {
      console.log('Apartments Response:', response.data);
      setBuildings(response.data);
    }).catch(error => {
      console.error('Error fetching apartments:', error); // Добавим вывод в консоль для отладки
    });
  }, []);

  const handleChange = (event, buildingId, field) => {
    const updatedBuildings = [...buildings];
    const updatedBuildingIndex = updatedBuildings.findIndex((apart) => apart.building_id === buildingId);
    updatedBuildings[updatedBuildingIndex][field] = event.target.value;
    setBuildings(updatedBuildings);
  };

  const showNotification = (message) => {
    setNotifications([...notifications, message]);
  };

  const handleSave = () => {
    axios
      .put('http://localhost:3001/api/admin/buildings', buildings, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        showNotification('Сохранено успешно');
        fetchBuildings();
      })
      .catch((error) => {
        console.log(error);
      })
  };

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
          <button className='admin-btn review-btn' onClick={() => handleSave(building.building_id)}>Сохранить</button>
        </div>
      ))}
      {notifications.map((message, index) => (
        <Notification key={index} message={message} />
      ))}
    </div>
  );
}

export default BuildingEdit;
