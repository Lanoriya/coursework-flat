import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function FullReview() {
  const [buildings, setBuildings] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(false); // Устанавливаем флаг загрузки в false после получения данных
    }).catch(error => {
      console.error('Error fetching apartments:', error);
    });
  }, [selectedBuilding, selectedStatus]);

  const handleBuildingClick = (building) => {
    setSelectedBuilding(building);
    setSelectedStatus(null); // Сбрасываем выбранный статус при выборе нового здания
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
  };

  const isSelectedStatus = (status) => {
    return selectedStatus === status;
  };

  useEffect(() => {
    if (selectedStatus) {
      setLoading(true); // Устанавливаем флаг загрузки в true перед запросом данных
      fetchApartments();
    }
  }, [fetchApartments, selectedStatus]);

  return (
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
          <button className={`admin-btn status-button ${isSelectedStatus('Продана') ? 'selected' : ''}`} onClick={() => handleStatusFilter('Продана')}>Продана</button>
          <button className={`admin-btn status-button ${isSelectedStatus('Готовая') ? 'selected' : ''}`} onClick={() => handleStatusFilter('Готовая')}>Готовая</button>
          <button className={`admin-btn status-button ${isSelectedStatus('В отделке') ? 'selected' : ''}`} onClick={() => handleStatusFilter('В отделке')}>В отделке</button>
          <button className={`admin-btn status-button ${isSelectedStatus('Строительство') ? 'selected' : ''}`} onClick={() => handleStatusFilter('Строительство')}>Строительство</button>
          <button className={`admin-btn status-button ${isSelectedStatus('Бронь') ? 'selected' : ''}`} onClick={() => handleStatusFilter('Бронь')}>Бронь</button>
        </div>
      </div>
      {selectedStatus && (
        <div className='full-review-apartments'>
          <table>
            <thead>
              <tr>
                <th>Номер квартиры</th>
              </tr>
            </thead>
            <tbody>
              {apartments.map((apart) => (
                <tr key={apart.apartment_id}>
                  <td>{apart.apartment_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default FullReview;
