import React, { useState } from 'react';

function UserLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user',
  });

  const [isRegistering, setIsRegistering] = useState(false); // Состояние для отслеживания режима регистрации

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Отправьте данные аутентификации на сервер
    try {
      const response = await fetch('http://localhost:3001/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const data = await response.json();

        // Сохраните токен в localStorage или куки
        document.cookie = `userToken=${data.token}; path=/; max-age=3600; samesite=strict`;

        // Перенаправьте пользователя на нужную страницу
        window.location.reload();
      } else {
        const errorData = await response.text();
        console.error('Ошибка аутентификации:', errorData);
      }
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Отправка данных о регистрации на сервер
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Редирект или отображение сообщения об успешной регистрации
        console.log('Регистрация прошла успешно');
      } else {
        // Ошибка регистрации
        console.error('Ошибка регистрации пользователя');
      }
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  };

  const handleToggleMode = () => {
    // Переключение между режимами входа и регистрации
    setIsRegistering(!isRegistering);
  };

  return (
    <div className='user-login'>
      <div className='user-container'>
        <div className='user-form'>
          <h2>{isRegistering ? 'Регистрация' : 'Вход для пользователя'}</h2>
          <form onSubmit={isRegistering ? handleRegister : handleLogin}>
            <div>
              <label htmlFor="username">Имя пользователя</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className='login-btns'>
              <button type="submit">{isRegistering ? 'Зарегистрировать' : 'Войти'}</button>
              <button type="button" onClick={handleToggleMode}>{isRegistering ? 'Страница входа' : 'Страница регистрации'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
