import React, { useState } from 'react';

function UserLogin() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isPasswordResetting, setIsPasswordResetting] = useState(false); // State for password reset
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    username: '',
    email: '',
    password: '',
    role: 'user',
    resetEmail: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
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
        document.cookie = `userToken=${data.token}; path=/; max-age=3600; samesite=strict`;
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
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Регистрация прошла успешно');
      } else {
        console.error('Ошибка регистрации пользователя');
      }
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.resetEmail }), // Отправляем email на сервер для восстановления пароля
      });
  
      if (response.ok) {
        console.log('Запрос на восстановление пароля отправлен');
      } else {
        console.error('Ошибка при отправке запроса на восстановление пароля');
      }
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  };

  const handleToggleMode = () => {
    setIsRegistering(!isRegistering);
    // Reset password reset state when toggling modes
    setIsPasswordResetting(false);
  };

  const handlePasswordResetMode = () => {
    setIsPasswordResetting(true);
  };

  return (
    <div className='user-login'>
      <div className='user-container'>
        <div className='user-form'>
          <h2>{isPasswordResetting ? 'Восстановление пароля' : isRegistering ? 'Регистрация' : 'Вход для пользователя'}</h2>
          <form onSubmit={isPasswordResetting ? handleResetPassword : (isRegistering ? handleRegister : handleLogin)}>
            {!isPasswordResetting && (
              <div>
                <label htmlFor="usernameOrEmail">{isRegistering ? 'Имя пользователя' : 'Имя пользователя или Email'}</label>
                <input
                  type="text"
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  value={formData.usernameOrEmail}
                  onChange={handleChange}
                  autoComplete={isRegistering ? 'current-email' : 'current-username email'}
                  required
                />
              </div>
            )}
            {!isPasswordResetting && isRegistering && (
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="current-email"
                  required
                />
              </div>
            )}
            {!isPasswordResetting && (
              <div>
                <label htmlFor="password">Пароль</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </div>
            )}
            <div className='login-btns'>
              {isPasswordResetting ? (
                <div>
                  <label htmlFor="resetEmail">Введите Email для восстановления пароля</label>
                  <input
                    type="email"
                    id="resetEmail"
                    name="resetEmail"
                    value={formData.resetEmail}
                    onChange={handleChange}
                    autoComplete="current-email"
                    required
                  />
                  <button type="button" onClick={handleResetPassword}>Отправить запрос на восстановление пароля</button>
                  <button type="button" onClick={handleToggleMode}>Отменить</button>
                </div>
              ) : (
                <>
                  <button type="submit">{isRegistering ? 'Зарегистрировать' : 'Войти'}</button>
                  <button type="button" onClick={handleToggleMode}>{isRegistering ? 'Страница входа' : 'Страница регистрации'}</button>
                  <button type="button" onClick={handlePasswordResetMode}>Восстановить пароль</button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
