import React, { useState, useEffect } from 'react';

function UserProfile() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const userToken = document.cookie.split('; ').find(row => row.startsWith('userToken=')).split('=')[1];
    async function fetchUserData() {
      try {
        const response = await fetch('http://localhost:3001/api/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userToken}`, // Предполагается, что у вас есть токен доступа, который отправляется на сервер для аутентификации пользователя
          },
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          console.log(userData)
          setUsername(userData.username); // Предполагается, что имя пользователя содержится в объекте данных о пользователе
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, []); // Запрос будет выполнен только один раз после загрузки компонента

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <p>Welcome, {username}!</p>
      {/* Дополнительная информация о пользователе */}
    </div>
  );
}

export default UserProfile;
