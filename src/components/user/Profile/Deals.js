import React, { useState, useEffect } from 'react';

function Deals({ userData, userToken }) {
  const [storedDeal, setStoredDeal] = useState([]);
  const [statusDeal, setStatusDeal] = useState([]);
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
      setStatusDeal(data);
    })
    .catch(error => {
      console.error('Error fetching deals:', error);
      console.error('Произошла ошибка при загрузке сделок.');
    });
  };

  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTimeString).toLocaleString('ru-RU', options);
  };

  const startDeal = (apartment_id) => {
    const selectedDeal = storedDeal.find(deal => deal.apartment_id === apartment_id);
    setSelectedApartment(selectedDeal);
  };

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
        status: 'Не просмотрено',
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
    // Получение квартир из localstorage
    const storedDeal = JSON.parse(localStorage.getItem('deals')) || [];
    setStoredDeal(storedDeal);
  }, []);

  useEffect(() => {
    fetchDeals();
  }, []);

  return (
    <div className='deals-container'>
      <ul className='deals-ul'>
        {storedDeal.map((deal, index) => (
          <li className='deals-li' key={index}>
            <div className='deals-li-p'>
              <p>Квартира №{deal.apartment_number}</p>
              {statusDeal.find(status => status.apartment_id === deal.apartment_id) && (
                <div>
                  <p>Статус: {statusDeal.find(status => status.apartment_id === deal.apartment_id).status}</p>
                  <p>Дата создания: {formatDateTime(statusDeal.find(status => status.apartment_id === deal.apartment_id).created_at)}</p>
                </div>
              )}
              <img
                className='favorites-img'
                src={`http://localhost:3001/api/image/${deal.image_id}`}
                alt={`Apartment ${deal.apartment_number}`}
              />
            </div>
            {!statusDeal.find(status => status.apartment_id === deal.apartment_id) && (
              <button className='start-deal-btn' onClick={() => startDeal(deal.apartment_id)}>
                Начать сделку
              </button>
            )}
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
