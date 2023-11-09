import React, { useState } from 'react';
import axios from 'axios';

function AddItem({ endpoint, fields, successMessage }) {
  const [formData, setFormData] = useState({});
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('adminToken');

    axios.post(`http://localhost:3001/api/admin/${endpoint}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(`${successMessage} added successfully`, response.data);
        setShowSuccessNotification(true);

        // Очистить поля формы или выполните другие действия по желанию
        setFormData({});

        // Удалить уведомление после 3 секунд
        setTimeout(() => {
          const successNotification = document.querySelector('.success-notification');
          successNotification.classList.add('end-notification');
          successNotification.classList.remove('success-notification');
          setTimeout(() => {
            setShowSuccessNotification(false);
          }, 3000)
        }, 3000);
      })
      .catch((error) => {
        console.error(`Error adding ${endpoint}`, error);
      });
  };

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
        <button type="submit">Добавить {successMessage}</button>
      </form>

      {showSuccessNotification && (
        <div className={`success-notification`}>
          {`${successMessage} успешно добавили`}
          <div className="timer-bar"></div>
        </div>
      )}
    </div>
  );
}

export default AddItem;
