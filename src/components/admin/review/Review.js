import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import './styles/Review.css';

function Review() {
  const [apartments, setApartments] = useState([]);
  const [sortField, setSortField] = useState("apartment_number");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [apartmentToDelete, setApartmentToDelete] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAnimationActive, setIsAnimationActive] = useState(false);

  // Define fetchApartments using useCallback
  const fetchApartments = useCallback(() => {
    const token = Cookies.get('adminToken');
    
    axios.get(`http://localhost:3001/api/admin/apartments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
    if (apartmentToDelete && !isAnimating) {
      const token = Cookies.get('adminToken');
    
      setIsAnimating(true);
      setIsAnimationActive(true); // Устанавливаем состояние активности анимации в true
    
      axios
        .delete(`http://localhost:3001/api/admin/apartments/${apartmentToDelete}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          fetchApartments();
          setShowSuccessNotification(true);
          setTimeout(() => {
            const successNotification = document.querySelector('.success-notification');
            if (successNotification) {
              successNotification.classList.add('end-notification');
              successNotification.classList.remove('success-notification');
              setTimeout(() => {
                setShowSuccessNotification(false);
                setIsAnimating(false);
                setIsAnimationActive(false); // Устанавливаем состояние активности анимации в false
              }, 500);
            }
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
          setIsAnimating(false);
          setIsAnimationActive(false); // Обработка ошибок при удалении
        })
        .finally(() => {
          setApartmentToDelete(null);
          setShowDeleteModal(false);
        });
    }
  };

  const handleDeleteButtonClick = (apartmentId) => {
    handleDeleteBlock(apartmentId);
  };

  const handleSave = () => {
    const token = Cookies.get('adminToken');
    const saveButton = document.querySelector('.review-btn');
  
    // Disable the button to prevent multiple clicks
    if (saveButton) {
      saveButton.disabled = true;
    }
  
    setIsAnimationActive(true);

    axios
      .put('http://localhost:3001/api/admin/apartments', apartments, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
  
        setShowSuccessNotification(true);
  
        setTimeout(() => {
          const successNotification = document.querySelector('.success-notification');
  
          if (successNotification) {
            successNotification.classList.add('end-notification');
            successNotification.classList.remove('success-notification');
            setTimeout(() => {
              setShowSuccessNotification(false);
              if (saveButton) {
                saveButton.disabled = false;
              }
              setIsAnimationActive(false);
            }, 500);
          }
        }, 3000);
  
        fetchApartments();
      })
      .catch((error) => {
        console.log(error);
        // Re-enable the button in case of an error
        if (saveButton) {
          saveButton.disabled = false;
        }
      });
  };

  useEffect(() => {
    const progress = document.getElementById('progress');

    if (progress) {
      let interval = setInterval(() => {
        progress.value -= 0.01;
        if (progress.value <= 0) {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  });

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
              <div className='delete-btn-overlay' onClick={() => handleDeleteButtonClick(apart.apartment_id)}></div>
            </div>
          </div>
        ))}
        {showDeleteModal && (
          <div className='delete-modal'>
            <div className='delete-container'>
              <h3>Вы уверены, что хотите удалить эту квартиру?</h3>
              <div className='delete-buttons'>
                <button disabled={isAnimating} onClick={handleDeleteConfirm}>Да</button>
                <button onClick={() => setShowDeleteModal(false)}>Нет</button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showSuccessNotification && (
        <div className={`success-notification`}>
          {`Сохранено успешно`}
          <progress id='progress' value='1'></progress>
        </div>
      )}
      {isAnimationActive && <div className="overlay"></div>}
    </div>
  );
}

export default Review;
