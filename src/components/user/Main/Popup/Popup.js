import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import './Popup.css'

const Popup = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    // Валидация данных
    if (!isAgreed) {
      setError('Необходимо согласиться с политикой конфиденциальности');
      return;
    }

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
        <h1>Заявка на квартиру</h1>
        <h3>Менеджер перезвонит вам и ответит на вопросы</h3>
        <form>
          <p>Ваше имя:</p>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <p>Номер телефона:</p>
          <InputMask
            mask="+7 (999) 99-99-999"
            maskChar="_"
            placeholder="+7 (__) __-__-___"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <p>
            <input type="checkbox" checked={isAgreed} onChange={() => setIsAgreed(!isAgreed)} />
            {' '}
            Согласен с <a href="/">политикой конфиденциальности</a>
          </p>
          <button className='callback-tel-pop' type="button" onClick={handleSubmit}>
            Отправить заявку
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
