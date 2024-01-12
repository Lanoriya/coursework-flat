import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function AddItem({ endpoint, fields, successMessage }) {
  const [formData, setFormData] = useState({});
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Если анимация идет, не отправлять запрос
    if (isAnimating) {
      return;
    }

    const token = Cookies.get('adminToken');
    const addButton = document.querySelector('.admin-btn');

    if (addButton) {
      addButton.disabled = true;
    }

    // Устанавливаем состояние isAnimating в true перед началом анимации
    setIsAnimating(true);

    axios.post(`http://localhost:3001/api/admin/${endpoint}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        console.log(`${successMessage} added successfully`, response.data);

        setShowSuccessNotification(true);
        // Очистить поля формы или выполните другие действия по желанию
        setFormData({});

        setTimeout(() => {
          const successNotification = document.querySelector('.success-notification');
          if (successNotification) {
            successNotification.classList.add('end-notification');
            successNotification.classList.remove('success-notification');
  
            // Re-enable the button after the notification disappears
            if (addButton) {
              addButton.disabled = false;
            }
  
            setTimeout(() => {
              setShowSuccessNotification(false);
              // Устанавливаем состояние isAnimating в false после завершения анимации
              setIsAnimating(false);
            }, 500);
          }
        }, 3000);
      })
      .catch((error) => {
        console.error(`Error adding ${endpoint}`, error);
        if (addButton) {
          addButton.disabled = false;
        }
        // Устанавливаем состояние isAnimating в false при ошибке
        setIsAnimating(false);
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
    <div className='item-container'>
      <h2>Добавить {successMessage}</h2>
      <form className='add-item' onSubmit={handleSubmit}>
        <div className='item-content'>
          {fields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name}>{field.label}: </label>
              <input
                type="text"
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <button className='admin-btn' type="submit">Добавить {successMessage}</button>
      </form>

      {showSuccessNotification && (
        <div className={`success-notification`}>
          {`${successMessage} успешно добавили`}
          <progress id='progress' value='1'></progress>
        </div>
      )}
    </div>
  );
}

export default AddItem;
