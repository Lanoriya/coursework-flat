import React, { useState, useEffect } from 'react';
import UserRegistration from './ProfileLogin/UserRegistration';
import UserProfile from './ProfileLogin/UserProfile';
import UserLogin from './ProfileLogin/UserLogin';

function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Переменная для хранения статуса авторизации
  const [isLoading, setIsLoading] = useState(true); // Переменная для отслеживания состояния загрузки

  useEffect(() => {
    // Здесь можно провести проверку наличия какой-либо информации об авторизации (например, куки или localStorage)
    const userIsLoggedIn = /* Ваша логика проверки авторизации */
    setIsLoggedIn(userIsLoggedIn);
    setIsLoading(false); // Устанавливаем isLoading в false, так как проверка завершена
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Отображаем сообщение о загрузке, пока идет проверка авторизации
  }

  return (
    <div>
      {isLoggedIn ? (
        <UserProfile />
      ) : (
        <UserLogin />
      )}
    </div>
  );
}

export default ProfilePage;
