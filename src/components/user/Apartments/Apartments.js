import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Apartments.css';

function Apartments() {
  const [apartments, setApartments] = useState([]);
  const [minArea, setMinArea] = useState(32);
  const [maxArea, setMaxArea] = useState(77);
  const [minFloor, setMinFloor] = useState(1);
  const [maxFloor, setMaxFloor] = useState(20);
  const [filterChanged, setFilterChanged] = useState(false);
  const navigate = useNavigate();

  const fetchApartments = useCallback(() => {
    axios.get(`http://localhost:3001/api/apartments`, {
      withCredentials: true,
      params: {
        minArea,
        maxArea,
        minFloor,
        maxFloor,
      },
    })
      .then((response) => {
        console.log('Apartments Response:', response.data);
        setApartments(response.data);
      })
      .catch(error => {
        console.error('Error fetching apartments:', error);
      });
  }, [minArea, maxArea, minFloor, maxFloor]);

  useEffect(() => {
    // Fetch apartments once on component mount
    fetchApartments();
  }, []);

  useEffect(() => {
    if (filterChanged) {
      fetchApartments();
      setFilterChanged(false); // Сброс флага изменения фильтрации
    }
  }, [fetchApartments, filterChanged]);

  const handleApartmentClick = (apartmentId) => {
    navigate(`/apartments/flat/${apartmentId}`);
  };

  const handleFilterReset = () => {
    setMinArea(32);
    setMaxArea(77);
    setMinFloor(1);
    setMaxFloor(20);
    setFilterChanged(true);
  };

  return (
    <div className='container apartments-container'>
      <aside className='apartments-filter'>
        <div className='filter-box'>
          <div className='filter-area'>
            <h4>Площадь м²</h4>
            <div className='filter-area-numbers'>
              <div className='area-numbers-score'><span>от</span> <span className='area-number'>{minArea}</span></div>
              <input
                type='range'
                min='32'
                max='77'
                step='1'
                value={minArea}
                onMouseUp={() => setFilterChanged(true)}
                onChange={(e) => setMinArea(e.target.value)}
              />
              <div className='area-numbers-score'><span>до</span> <span className='area-number'>{maxArea}</span></div>
              <input
                type='range'
                min='32'
                max='77'
                step='1'
                value={maxArea}
                onMouseUp={() => setFilterChanged(true)}
                onChange={(e) => setMaxArea(e.target.value)}
              />
            </div>
          </div>
          <div className='filter-floor'>
            <h4>Этаж</h4>
            <div className='filter-floor-numbers'><span>от</span> <span className='area-number'>{minFloor}</span></div>
            <input
              type='range'
              min='1'
              max='20'
              value={minFloor}
              onMouseUp={() => fetchApartments()}
              onChange={(e) => setMinFloor(e.target.value)}
            />
            <div className='filter-floor-numbers'><span>до</span> <span className='area-number'>{maxFloor}</span></div>
            <input
              type='range'
              min='1'
              max='20'
              value={maxFloor}
              onMouseUp={() => fetchApartments()}
              onChange={(e) => setMaxFloor(e.target.value)}
            />
          </div>
          <div className='filter-reset'>
            <a href='/apartments' onClick={handleFilterReset}>Сбросить параметры
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
            </a>
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
