import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import Notification from '../notification/Notification';
import './styles/Review.css';

function Review() {
  const [apartments, setApartments] = useState([]);
  const [sortField, setSortField] = useState("apartment_number");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [apartmentToDelete, setApartmentToDelete] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const showNotification = (message) => {
    setNotifications([...notifications, message]);
  };

  // Define fetchApartments using useCallback
  const fetchApartments = useCallback(() => {
    axios.get(`http://localhost:3001/api/admin/apartments`, {
      params: {
        sortField,
        sortOrder,
      },
      withCredentials: true,
    }).then((response) => {
      console.log('Apartments Response:', response.data);
      setApartments(response.data);
    }).catch(error => {
      console.error('Error fetching apartments:', error); // Добавим вывод в консоль для отладки
    });
  }, [sortField, sortOrder]);

  useEffect(() => {
    fetchApartments();
  }, [fetchApartments]);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    fetchApartments();
  };

  const handleChange = (event, apartmentId, field) => {
    const updatedApartments = [...apartments];
    const updatedApartmentIndex = updatedApartments.findIndex((apart) => apart.apartment_id === apartmentId);
    updatedApartments[updatedApartmentIndex][field] = event.target.value;
    setApartments(updatedApartments);
  };

  const handleDeleteBlock = (apartmentId) => {
    setApartmentToDelete(apartmentId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (isSaving) {
      return;
    }
    setIsSaving(true);

    axios
      .delete(`http://localhost:3001/api/admin/apartments/${apartmentToDelete}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        showNotification('Сохранено успешно');
        fetchApartments();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setApartmentToDelete(null);
        setShowDeleteModal(false);
        setTimeout(() => {
          setIsSaving(false);
        }, 1000); // Задержка в одну секунду перед следующим кликом
      });
  };

  const handleDeleteButtonClick = (apartmentId) => {
    handleDeleteBlock(apartmentId);
  };

  const handleSave = () => {
    if (isSaving) {
      return;
    }
    setIsSaving(true);

    axios
      .put('http://localhost:3001/api/admin/apartments', apartments, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        showNotification('Сохранено успешно');
        fetchApartments();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsSaving(false);
        }, 1000); // Задержка в одну секунду перед следующим кликом
      });
    };

  return (
    <div className='review-content'>
      <div className='apartment-container'>
        <div className='apartment-name'>
          <p onClick={() => handleSort("apartment_number")}>Номер квартиры</p>
          <p onClick={() => handleSort("room_count")}>Количество комнат</p>
          <p onClick={() => handleSort("area")}>Площадь</p>
          <p onClick={() => handleSort("floor")}>Этаж</p>
          <p onClick={() => handleSort("price")}>Цена</p>
          <p onClick={() => handleSort("building_id")}>Номер здания</p>
          <p onClick={() => handleSort("entrance")}>Подъезд</p>
          <p onClick={() => handleSort("image_id")}>Номер фотографии</p>
          <button className='admin-btn review-btn' onClick={handleSave}>Сохранить</button>
        </div>
        {apartments.map((apart) => (
          <div key={apart.apartment_id} className='apartment-items'>
            <div className='apartment-item-value'>
              <input
                type='text'
                value={apart.apartment_number}
                onChange={(event) => handleChange(event, apart.apartment_id, "apartment_number")}
              />
            </div>
            <div className='apartment-item-value'>
              <input
                type='text'
                value={apart.room_count}
                onChange={(event) => handleChange(event, apart.apartment_id, "room_count")}
              />
            </div>
            <div className='apartment-item-value'>
              <input
                type='text'
                value={apart.area}
                onChange={(event) => handleChange(event, apart.apartment_id, "area")}
              />
            </div>
            <div className='apartment-item-value'>
              <input
                type='text'
                value={apart.floor}
                onChange={(event) => handleChange(event, apart.apartment_id, "floor")}
              />
            </div>
            <div className='apartment-item-value'>
              <input
                type='text'
                value={apart.price}
                onChange={(event) => handleChange(event, apart.apartment_id, "price")}
              />
            </div>
            <div className='apartment-item-value'>
              <input
                type='text'
                value={apart.building_id}
                onChange={(event) => handleChange(event, apart.apartment_id, "building_id")}
              />
            </div>
            <div className='apartment-item-value'>
              <input
                type='text'
                value={apart.entrance}
                onChange={(event) => handleChange(event, apart.apartment_id, "entrance")}
              />
            </div>
            <div className='apartment-item-value'>
              <input
                type='text'
                value={apart.image_id}
                onChange={(event) => handleChange(event, apart.apartment_id, "image_id")}
              />
              <div className='delete-btn-overlay' onClick={() => handleDeleteButtonClick(apart.apartment_id)}></div>
            </div>
          </div>
        ))}
        {showDeleteModal && (
          <div className='delete-modal'>
            <div className='delete-container'>
              <h3>Вы уверены, что хотите удалить эту квартиру?</h3>
              <div className='delete-buttons'>
                <button onClick={handleDeleteConfirm}>Да</button>
                <button onClick={() => setShowDeleteModal(false)}>Нет</button>
              </div>
            </div>
          </div>
        )}
      </div>
      {notifications.map((message, index) => (
        <Notification key={index} message={message}/>
      ))}
    </div>
  );
}

export default Review;
