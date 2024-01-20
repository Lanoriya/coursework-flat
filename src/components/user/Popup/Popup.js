import React, { useState } from 'react';
import './Popup.css'

const Popup = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    // Валидация данных
    if (!name || !phone) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    // Отправка данных на сервер
    try {
      const response = await fetch('http://localhost:3001/submitOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone }),
      });

      if (response.ok) {
        // Данные успешно отправлены
        setError('');
        onClose(); // Закрыть Popup
      } else {
        // Обработка ошибки при отправке на сервер
        setError('Ошибка при отправке данных');
      }
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
      setError('Ошибка при отправке данных');
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2>Заявка на квартиру</h2>
        <p>Менеджер перезвонит вам и ответит на вопросы</p>
        <form>
          <label>
            Ваше имя:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Номер телефона:
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          {error && <p className="error-message">{error}</p>}
          <button type="button" onClick={handleSubmit}>
            Отправить заявку
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
