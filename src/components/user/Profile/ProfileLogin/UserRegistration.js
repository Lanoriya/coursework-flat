import React, { useState } from 'react';

function UserRegistration() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user', // Роль пользователя по умолчанию
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Отправка данных о регистрации на сервер
    fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Пользователь зарегистрирован') {
          // Редирект или отображение сообщения об успешной регистрации
          console.log('Регистрация прошла успешно');
        } else {
          // Ошибка регистрации
          console.error('Ошибка регистрации пользователя');
        }
      });
  };

  return (
    <div>
      <h2>Регистрация пользователя</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Имя пользователя:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Зарегистрировать</button>
      </form>
    </div>
  );
}

export default UserRegistration;
