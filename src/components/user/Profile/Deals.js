import React, { useState, useEffect } from 'react';

function Deals({ userData, userToken }) {
  const [storedDeal, setStoredDeal] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState(null);
  
  const fetchDeals = () => {
    fetch(`http://localhost:3001/api/user/deals?userId=${userData.id}`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      },
      credentials: 'include'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch deals.');
      }
      return response.json();
    })
    .then(data => {
      // setDeals(data);
    })
    .catch(error => {
      console.error('Error fetching deals:', error);
      console.error('Произошла ошибка при загрузке сделок.');
    });
  };

  const startDeal = (apartmentId) => {
    const selectedDeal = storedDeal.find(deal => deal.apartmentId === apartmentId);
    setSelectedApartment(selectedDeal);
  };

  console.log(selectedApartment)

  const confirmStartDeal = () => {
    if (!selectedApartment) {
      alert('Квартира не выбрана.');
      return;
    }

    const confirmDeal = window.confirm(`Вы точно хотите начать сделку на квартиру №${selectedApartment.apartment_number}?`);
    if (confirmDeal) {
      const requestBody = {
        name: userData.settings.name,
        phoneNumber: userData.settings.phone_number,
        apartmentId: selectedApartment.apartment_id,
        status: 'На выполнении',
        userId: userData.settings.user_id
      };

      fetch('http://localhost:3001/api/user/startDeal', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(requestBody)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to start deal.');
        }
        fetchDeals();
        setSelectedApartment(null);
      })
      .catch(error => {
        console.error('Error starting deal:', error);
        alert('Произошла ошибка при начале сделки.');
      });
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  useEffect(() => {
    // Получение квартир из localstorage
    const storedDeal = JSON.parse(localStorage.getItem('deals')) || [];
    setStoredDeal(storedDeal);
  }, []);

  return (
    <div className='deals-container'>
      <ul className='deals-ul'>
        {storedDeal.map((deal, index) => (
          <li className='deals-li' key={index}>
            <div className='deals-li-p'>
              <p>Квартира №{deal.apartment_id}</p>
              <p>Статус: {deal.status}</p>
              <p>Дата создания: {deal.created_at}</p>
              <img
                className='favorites-img'
                src={`http://localhost:3001/api/image/${deal.image_id}`}
                alt={`Apartment ${deal.apartment_number}`}
              />
            </div>
            <button className='start-deal-btn' onClick={() => startDeal(deal.apartmentId)}>
              Начать сделку
            </button>
          </li>
        ))}
      </ul>
      {selectedApartment && (
        <div>
          <p>Вы выбрали квартиру №{selectedApartment.apartment_number} для сделки.</p>
          <button onClick={confirmStartDeal}>Подтвердить начало сделки</button>
        </div>
      )}
    </div>
  );
}

export default Deals;
