import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Notification from '../notification/Notification';
import BuildingPhotosPopup from './buildingPhotosPopup/BuildingPhotosPopup';

function FullReview() {
  const [buildings, setBuildings] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [buildingInfo, setBuildingInfo] = useState(null); // Добавляем состояние для информации о здании
  const [buildingPhotos, setBuildingPhotos] = useState([]);
  const [showBuildingPhotos, setShowBuildingPhotos] = useState(false);

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

  const fetchBuildingPhotos = async (buildingId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/admin/building_images/${buildingId}/photos`, {
        withCredentials: true,
      });
      setBuildingPhotos(response.data);
    } catch (error) {
      console.error('Error fetching building photos:', error);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateTimeString).toLocaleString('ru-RU', options);
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
    // Игнорируем левый клик
    if (buildingInfo && buildingInfo.building_id === building.building_id) return;
    setSelectedBuilding(building);
    setSelectedStatus(null); // Сбрасываем выбранный статус при выборе нового здания
    setSelectedApartment(null); // Сбрасываем выбранную квартиру при выборе нового здания
    setApartments([]);
  };

  const handleBuildingRightClick = (building, event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение контекстного меню
    if (buildingInfo && buildingInfo.building_id === building.building_id) {
      setBuildingInfo(null); // Закрываем окно с информацией о здании при повторном правом клике
    } else {
      console.log(building)
      setBuildingInfo(building);
    }
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

  const handleViewPhotosClick = () => {
    fetchBuildingPhotos(buildingInfo.building_id);
    setShowBuildingPhotos(true); // Устанавливаем состояние для отображения фотографий
  };

  const handleCloseBuildingPhotos = () => {
    setShowBuildingPhotos(false); // Закрываем всплывающее окно
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
                <button
                  className={`admin-btn review-button ${selectedBuilding === building ? 'selected' : ''}`}
                  onClick={(e) => handleBuildingClick(building, e)}
                  onContextMenu={(e) => handleBuildingRightClick(building, e)}
                >
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
        {buildingInfo && (
          <div className='building-info-popup'>
            <h2 className='building-info-title'>{buildingInfo.building_name}</h2>
            <p className='building-info-text'>Айди здания: {buildingInfo.building_id}</p>
            <p className='building-info-text'>Дата сдачи: {formatDateTime(buildingInfo.completion_date)}</p>
            <p className='building-info-text'>Материал здания: {buildingInfo.material}</p>
            <p className='building-info-text'>Количество этажей: {Math.round(buildingInfo.total_apartments / 6)}</p>
            <p className='building-info-text'>Количество квартир: {buildingInfo.total_apartments}</p>
            <p className='building-info-text'>Количество подъездов: {buildingInfo.total_entrances}</p>
            <button className='admin-btn' onClick={handleViewPhotosClick}>Посмотреть фотографии</button>
          </div>
        )}
        {showBuildingPhotos && (
          <BuildingPhotosPopup buildingPhotos={buildingPhotos} onClose={handleCloseBuildingPhotos} />
        )}
        {selectedApartment && (
          <div className='full-review-apartment-details'>
            <h2 className='full-review-title'>Информация о квартире</h2>
            {inputFields.map((field) => (
              <div key={field.name}>
                <label className='apartment-label'>{field.label}:</label>
                {field.name === 'status' ? (
                  <select
                    className='apartment-item-value full-review-input'
                    name={field.name}
                    value={selectedApartment[field.name] || ''}
                    onChange={handleInputChange}
                  >
                    <option value='Продана'>Продана</option>
                    <option value='Готовая'>Готовая</option>
                    <option value='В отделке'>В отделке</option>
                    <option value='Строительство'>Строительство</option>
                    <option value='Бронь'>Бронь</option>
                  </select>
                ) : field.name === 'booking_date' ? (
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
