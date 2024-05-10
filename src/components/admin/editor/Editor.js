import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddItem from './additem/AddItem';

function Editor() {
  const [buildings, setBuildings] = useState([]);

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

  return (
    <div className='editor-content'>
      <AddItem
        endpoint="addApartment"
        fields={[
          { name: 'room_count', label: 'Количество комнат' },
          { name: 'area', label: 'Площадь' },
          { name: 'floor', label: 'Этаж' },
          { name: 'price', label: 'Цена' },
          { name: 'apartment_number', label: 'Номер квартиры' },
          { name: 'building_name', label: 'Название здания' },
          { name: 'entrance', label: '№ подъезда' },
          { name: 'image_id', label: 'Фотография' },
        ]}
        successMessage="Квартиру"
        buildings={buildings} // Прокидываем переменную buildings в AddItem
      />
      <AddItem
        endpoint="addBuilding"
        fields={[
          { name: 'building_name', label: 'Название здания' },
          { name: 'completion_date', label: 'Дата сдачи (yyyy-mm-dd)' },
          { name: 'material', label: 'Материал здания' },
          { name: 'total_apartments', label: 'Количество квартир' },
          { name: 'total_entrances', label: 'Количество подъездов' },
        ]}
        successMessage="Здание"
      />
    </div>
  );
}

export default Editor;
