import React, { useState, useEffect } from 'react';

function UserMain() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userToken = document.cookie.split('; ').find(row => row.startsWith('userToken=')).split('=')[1];
        const response = await fetch('http://localhost:3001/api/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Никнейм: {userData.username}</p>
      <p>Имя: {userData.settings.name}</p>
      <p>Номер телефона: {userData.settings.phone_number}</p>
    </div>
  );
}

export default UserMain;
