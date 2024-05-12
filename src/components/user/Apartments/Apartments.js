import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Apartments() {
  const [apartments, setApartments] = useState([]);
  const [filters, setFilters] = useState({
    minArea: 32,
    maxArea: 77,
    minFloor: 1,
    maxFloor: 20,
    selectedStatuses: [],
    selectedBuildings: [],
  });
  const [buildings, setBuildings] = useState([]); 
  const navigate = useNavigate();

  // Загрузка зданий
  useEffect(() => {
    axios.get('http://localhost:3001/api/user/buildings', { withCredentials: true })
      .then((response) => {
        setBuildings(response.data);
      })
      .catch(error => {
        console.error('Error fetching buildings:', error);
      });
  }, []);

  // Загрузка фильтров из localStorage
  useEffect(() => {
    const storedFilters = JSON.parse(localStorage.getItem('apartmentFilters'));
    if (storedFilters) {
      setFilters(storedFilters);
    }
  }, []);

  // Сохранение фильтров в localStorage
  useEffect(() => {
    localStorage.setItem('apartmentFilters', JSON.stringify(filters));
  }, [filters]);

  const fetchApartments = useCallback(() => {
    axios.get(`http://localhost:3001/api/apartments`, {
      withCredentials: true,
      params: {
        ...filters, 
        status: filters.selectedStatuses, // добавляем status в параметры
        building: filters.selectedBuildings, // добавляем building в параметры
      }
    })
      .then((response) => {
        setApartments(response.data);
      })
      .catch(error => {
        console.error('Error fetching apartments:', error);
      });
  }, [filters]);

  const handleApartmentClick = (apartmentId) => {
    navigate(`/apartments/flat/${apartmentId}`);
  };

  const handleFilterReset = () => {
    setFilters({
      minArea: 32,
      maxArea: 77,
      minFloor: 1,
      maxFloor: 20,
      selectedStatuses: [],
      selectedBuildings: [],
    });
  };

  const handleStatusFilterChange = (status) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      selectedStatuses: prevFilters.selectedStatuses.includes(status)
        ? prevFilters.selectedStatuses.filter(s => s !== status)
        : [...prevFilters.selectedStatuses, status],
    }));
  };

  const handleBuildingFilterChange = (buildingId) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      selectedBuildings: prevFilters.selectedBuildings.includes(buildingId)
        ? prevFilters.selectedBuildings.filter(id => id !== buildingId)
        : [...prevFilters.selectedBuildings, buildingId],
    }));
  };

  // Вызов fetchApartments при изменении фильтров
  useEffect(() => {
    fetchApartments();
  }, [filters]);

  return (
    <div className='container apartments-container'>
      <aside className='apartments-filter'>
        <div className='filter-box'>
          <div className='filter-building filter-status'>
            <h4>Здание</h4>
            {buildings.map(building => (
              <label key={building.building_id}>
                <input
                  type='checkbox'
                  checked={filters.selectedBuildings.includes(building.building_id)}
                  onChange={() => handleBuildingFilterChange(building.building_id)}
                />
                {building.building_name}
              </label>
            ))}
          </div>
          <div className='filter-area'>
            <h4>Площадь м²</h4>
            <div className='filter-area-numbers'>
              <div className='area-numbers-score'><span>от</span> <span className='area-number'>{filters.minArea}</span></div>
              <input
                type='range'
                min='32'
                max='77'
                step={(filters.maxArea - filters.minArea) / 100}
                value={filters.minArea}
                onMouseUp={() => setFilters(prevFilters => ({ ...prevFilters, minArea: prevFilters.minArea }))} 
                onInput={(e) => {
                  const value = Math.min(e.target.value, filters.maxArea);
                  setFilters(prevFilters => ({ ...prevFilters, minArea: Math.round(value) }));
                }}
              />
              <div className='area-numbers-score'><span>до</span> <span className='area-number'>{filters.maxArea}</span></div>
              <input
                type='range'
                min='32'
                max='77'
                step={(filters.maxArea - filters.minArea) / 100}
                value={filters.maxArea}
                onMouseUp={() => setFilters(prevFilters => ({ ...prevFilters, maxArea: prevFilters.maxArea }))} 
                onInput={(e) => {
                  const value = Math.max(e.target.value, filters.minArea);
                  setFilters(prevFilters => ({ ...prevFilters, maxArea: Math.round(value) }));
                }}
              />
            </div>
          </div>
          <div className='filter-floor'>
            <h4>Этаж</h4>
            <div className='filter-floor-numbers'><span>от</span> <span className='area-number'>{filters.minFloor}</span></div>
            <input
              type='range'
              min='1'
              max='20'
              step='1'
              value={filters.minFloor}
              onMouseUp={() => setFilters(prevFilters => ({ ...prevFilters, minFloor: prevFilters.minFloor }))}
              onInput={(e) => {
                const value = Math.min(e.target.value, filters.maxFloor);
                setFilters(prevFilters => ({ ...prevFilters, minFloor: Math.round(value) }));
              }}
            />
            <div className='filter-floor-numbers'><span>до</span> <span className='area-number'>{filters.maxFloor}</span></div>
            <input
              type='range'
              min='1'
              max='20'
              step='1'
              value={filters.maxFloor}
              onMouseUp={() => setFilters(prevFilters => ({ ...prevFilters, maxFloor: prevFilters.maxFloor }))} 
              onInput={(e) => {
                const value = Math.max(e.target.value, filters.minFloor);
                setFilters(prevFilters => ({ ...prevFilters, maxFloor: Math.round(value) }));
              }}
            />
          </div>
          <div className='filter-status'>
            <h4>Статус</h4>
            {['Готовая', 'Строительство', 'Бронь', 'В отделке', 'Продана'].map(status => (
              <label key={status}>
                <input
                  type='checkbox'
                  checked={filters.selectedStatuses.includes(status)} 
                  onChange={() => handleStatusFilterChange(status)}
                />
                {status}
              </label>
            ))}
          </div>
          <div className='filter-reset'>
            <button onClick={handleFilterReset}>Сбросить параметры
              <svg width="8" height="8" viewBox="0 0 8 8" fill="000" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.99996 5.22229L1.37727 7.84498C1.12213
                  8.10013 0.641687 8.03336 0.304183 7.69586C-0.0333213 7.35836 -0.100086 6.87792
                  0.15506 6.62277L2.77775 4.00008L0.155017 1.37735C-0.100129 1.1222 -0.0333644
                  0.641762 0.30414 0.304258C0.641644 -0.0332461 1.12208 -0.100011 1.37723
                  0.155135L3.99996 2.77787L6.62282 0.155017C6.87796 -0.100129 7.3584
                  -0.0333646 7.6959 0.30414C8.03341 0.641644 8.10017 1.12208 7.84503
                  1.37723L5.22217 4.00008L7.84498 6.62289C8.10013 6.87804 8.03336 7.35847 7.69586
                  7.69598C7.35836 8.03348 6.87792 8.10025 6.62277 7.8451L3.99996 5.22229Z">
                </path>
              </svg>
            </button>
          </div>
        </div>
      </aside>
      <div className='apartments-main'>
        <h1>Квартиры</h1>
        <table className='apartments-main-table'>
          <thead className='apartments-main-thead'>
            <tr className='apartments-main-tr'>
              <th className='apartments-main-th'>Номер квартиры</th>
              <th className='apartments-main-th'>Количество комнат</th>
              <th className='apartments-main-th'>Площадь</th>
              <th className='apartments-main-th'>Этаж</th>
              <th className='apartments-main-th'>Цена</th>
              <th className='apartments-main-th'>Статус</th>
              <th className='apartments-main-th'>Планировка</th>
            </tr>
          </thead>
          <tbody className='apartments-main-tbody'>
            {apartments.map((apart) => (
              <tr
                key={apart.apartment_id}
                className='apartment-user-container'
                onClick={() => handleApartmentClick(apart.apartment_id)}
              >
                <td className='apartments-main-td'>{apart.apartment_number}</td>
                <td className='apartments-main-td'>{apart.room_count}</td>
                <td className='apartments-main-td'>{apart.area}м²</td>
                <td className='apartments-main-td'>{apart.floor}</td>
                <td className='apartments-main-td'>{apart.price}</td>
                <td className='apartments-main-td'>{apart.status}</td>
                <td className='apartments-main-td'>
                  <img
                    className='apartments-main-img'
                    src={`http://localhost:3001/api/image/${apart.image_id}`}
                    alt={`Apartment ${apart.apartment_number}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Apartments;