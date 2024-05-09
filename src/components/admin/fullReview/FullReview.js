import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Notification from '../notification/Notification';

function FullReview() {
  const [buildings, setBuildings] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState(null);

  const inputFields = [
    { name: 'apartment_number', label: 'Номер квартиры', type: 'text' },
    { name: 'status', label: 'Статус', type: 'text' },
    { name: 'room_count', label: 'Количество комнат', type: 'text' },
    { name: 'area', label: 'Площадь', type: 'text' },
    { name: 'floor', label: 'Этаж', type: 'text' },
    { name: 'price', label: 'Цена', type: 'text' },
    { name: 'entrance', label: 'Подъезд', type: 'text' },
    { name: 'booking_date', label: 'Дата брони', type: 'text' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/admin/buildings', {
          withCredentials: true
        });
        setBuildings(response.data);
      } catch (error) {
        console.error('Error fetching buildings:', error);
      }
    };

    fetchData();
  }, []);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const showNotification = (message) => {
    setNotifications([...notifications, message]);
  };

  const fetchApartments = useCallback(() => {
    const params = {
      buildingId: selectedBuilding?.building_id,
      status: selectedStatus
    };

    axios.get(`http://localhost:3001/api/admin/apartments`, {
      params,
      withCredentials: true,
    }).then((response) => {
      console.log('Apartments Response:', response.data);
      // Фильтрация квартир по выбранному зданию
      const filteredApartments = response.data.filter(apartment => apartment.building_id === selectedBuilding?.building_id);
      setApartments(filteredApartments);
    }).catch(error => {
      console.error('Error fetching apartments:', error);
    });
  }, [selectedBuilding, selectedStatus]);

  const handleBuildingClick = (building) => {
    setSelectedBuilding(building);
    setSelectedStatus(null); // Сбрасываем выбранный статус при выборе нового здания
    setSelectedApartment(null); // Сбрасываем выбранную квартиру при выборе нового здания
    setApartments([]);
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    setSelectedApartment(null); // Сбрасываем выбранную квартиру при выборе нового статуса
  };

  const handleApartmentClick = (apartment) => {
    setSelectedApartment(apartment);
  };

  const isSelectedStatus = (status) => {
    return selectedStatus === status;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedApartment({ ...selectedApartment, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:3001/api/admin/apartments`, [selectedApartment], {
        withCredentials: true,
      });
      // Обновляем список квартир после успешного обновления
      fetchApartments();
    } catch (error) {
      console.error('Error updating apartment:', error);
    }
  };

  useEffect(() => {
    if (selectedStatus) {
      fetchApartments();
    }
  }, [fetchApartments, selectedStatus]);

  return (
    <div className='full-review-content'>
      <div className='full-review'>
        <div className='full-review-buildings'>
          <h2 className='full-review-title'>Список домов</h2>
          <ul>
            {buildings.map((building) => (
              <li key={building.building_id}>
                <button className={`admin-btn review-button ${selectedBuilding === building ? 'selected' : ''}`} onClick={() => handleBuildingClick(building)}>
                  {building.building_name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className='full-review-apartments-btns'>
          <h2 className='full-review-title'>Список квартир</h2>
          <div className='status-buttons'>
            <button className={`admin-btn status-button ${isSelectedStatus('Продана') ? 'selected' : ''}`} onClick={() => handleStatusFilter('Продана')}>Проданы</button>
            <button className={`admin-btn status-button ${isSelectedStatus('Готовая') ? 'selected' : ''}`} onClick={() => handleStatusFilter('Готовая')}>Готовые</button>
            <button className={`admin-btn status-button ${isSelectedStatus('В отделке') ? 'selected' : ''}`} onClick={() => handleStatusFilter('В отделке')}>В отделке</button>
            <button className={`admin-btn status-button ${isSelectedStatus('Строительство') ? 'selected' : ''}`} onClick={() => handleStatusFilter('Строительство')}>Строительство</button>
            <button className={`admin-btn status-button ${isSelectedStatus('Бронь') ? 'selected' : ''}`} onClick={() => handleStatusFilter('Бронь')}>Бронь</button>
          </div>
        </div>
        {selectedBuilding && (
          <div className='full-review-apartments'>
            <h2 className='full-review-title'>Список квартир</h2>
            <ul className='status-buttons'>
              {apartments.map((apart) => (
                <li key={apart.apartment_id}>
                  <button className={`admin-btn status-button ${selectedApartment === apart ? 'selected' : ''}`} onClick={() => handleApartmentClick(apart)}>{apart.apartment_number}</button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedApartment && (
          <div className='full-review-apartment-details'>
            <h2 className='full-review-title'>Информация о квартире</h2>
            {inputFields.map((field) => (
              <div key={field.name}>
                <label className='apartment-label'>{field.label}:</label>
                {field.name === 'booking_date' ? (
                  <input
                    className='apartment-item-value full-review-input'
                    type='date'
                    name={field.name}
                    value={selectedApartment[field.name] ? formatDateTime(selectedApartment[field.name]) : ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  <input
                    className='apartment-item-value full-review-input'
                    type={field.type}
                    name={field.name}
                    value={selectedApartment[field.name] || ''}
                    onChange={handleInputChange}
                  />
                )}
              </div>
            ))}
            <button className='admin-btn status-button' onClick={() => { handleSubmit(); showNotification('Сохранено успешно') }}>Сохранить</button>
          </div>
        )}
      </div>
      {notifications.map((message, index) => (
        <Notification key={index} message={message} />
      ))}
    </div>
  );
}

export default FullReview;
