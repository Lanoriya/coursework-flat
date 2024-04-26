import React, { useState, useEffect } from 'react';

function Deals({ userData, userToken }) {
  const [storedDeal, setStoredDeal] = useState([]);
  const [statusDeal, setStatusDeal] = useState([]);
  const [apartmentInfo, setApartmentInfo] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [removePopup, setRemovePopup] = useState(false);

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
        const storedDeals = JSON.parse(localStorage.getItem('deals')) || [];
        setStoredDeal(storedDeals);
        localStorage.setItem('activeDeals', JSON.stringify(data));
      })
      .catch(error => {
        console.error('Error fetching deals:', error);
        console.error('Произошла ошибка при загрузке сделок.');
      });
  };

  const fetchApartmentInfo = (apartmentId) => {
    fetch(`http://localhost:3001/api/apartments/${apartmentId}`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      },
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch apartment info.');
        }
        return response.json();
      })
      .then(data => {
        setApartmentInfo(data);
      })
      .catch(error => {
        console.error('Error fetching apartment info:', error);
      });
  };

  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTimeString).toLocaleString('ru-RU', options);
  };

  const startDeal = (apartment_id) => {
    const selectedDeal = storedDeal.find(deal => deal.apartment_id === apartment_id);
    setSelectedApartment(selectedDeal);
    setShowPopup(true);
  };

  const cancelDeal = (apartment_id) => {
    const selectedDeal = storedDeal.find(deal => deal.apartment_id === apartment_id);
    setSelectedApartment(selectedDeal);
    setRemovePopup(true);
  };

  const confirmStartDeal = () => {
    if (!selectedApartment) {
      alert('Квартира не выбрана.');
      return;
    }
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
        setShowPopup(false);
        fetchDeals();
        setSelectedApartment(null);
      })
      .catch(error => {
        console.error('Error starting deal:', error);
        alert('Произошла ошибка при начале сделки.');
      });
  };

  const cancelStartDeal = () => {
    setSelectedApartment(null);
    setShowPopup(false);
    setRemovePopup(false);
  };

  const removeFromDeals = (apartment_id) => {
    const index = storedDeal.findIndex(deal => deal.apartment_id === apartment_id);
    if (index === -1) {
      console.error('Apartment not found in stored deals.');
      return;
    }

    const updatedDeals = [...storedDeal];
    updatedDeals.splice(index, 1);

    setStoredDeal(updatedDeals);
    localStorage.setItem('deals', JSON.stringify(updatedDeals));

    setRemovePopup(false);
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  useEffect(() => {
    const fetchApartmentInfoForDeals = async () => {
      const apartmentIds = statusDeal.map(item => item.apartment_id);
      const promises = apartmentIds.map(apartmentId =>
        fetchApartmentInfo(apartmentId)
      );
      await Promise.all(promises);
    };

    fetchApartmentInfoForDeals();
  }, [statusDeal]);

  return (
    <div className='deals-container'>
      <ul className='deals-ul'>
        {[...storedDeal, ...statusDeal].map((deal, index) => (
          <li className='deals-li' key={index}>
            <div className='deals-li-p'>
              <p>Квартира №{deal.apartment_number}</p>
              {statusDeal.find(status => status.apartment_id === deal.apartment_id) && (
                <div>
                  <p>Статус: {statusDeal.find(status => status.apartment_id === deal.apartment_id).status}</p>
                  <p>Дата создания: {formatDateTime(statusDeal.find(status => status.apartment_id === deal.apartment_id).created_at)}</p>
                </div>
              )}
              {apartmentInfo && apartmentInfo.image_id && (
                <img
                  className='favorites-img'
                  src={`http://localhost:3001/api/image/${apartmentInfo.image_id}`}
                  alt={`Apartment ${apartmentInfo.apartment_number}`}
                />
              )}

              {!apartmentInfo.image_id && (
                <img
                  className='favorites-img'
                  src={`http://localhost:3001/api/image/${deal.image_id}`}
                  alt={`Apartment ${deal.apartment_number}`}
                />
              )}

            </div>
            <div className='start-deal-btns'>
              {!statusDeal.find(status => status.apartment_id === deal.apartment_id) && (
                <button className='start-deal-btn' onClick={() => startDeal(deal.apartment_id)}>
                  Начать сделку
                </button>
              )}
              {!statusDeal.find(status => status.apartment_id === deal.apartment_id) && (
                <button className='start-deal-btn' onClick={() => cancelDeal(deal.apartment_id)}>
                  Удалить из сделок
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {selectedApartment && showPopup && (
        <div className='pop-deal'>
          <div className='pop-block'>
            <p>Вы выбрали квартиру №{selectedApartment.apartment_number} для сделки.</p>
            <div className='pop-block-btns'>
              <button onClick={confirmStartDeal}>Подтвердить начало сделки</button>
              <button onClick={cancelStartDeal}>Отмена</button>
            </div>
          </div>
        </div>
      )}
      {selectedApartment && removePopup && (
        <div className='pop-deal'>
          <div className='pop-block'>
            <p>Вы уверены, что хотите удалить квартиру №{selectedApartment.apartment_number} из сделок?</p>
            <div className='pop-block-btns'>
              <button onClick={() => removeFromDeals(selectedApartment.apartment_id)}>Да</button>
              <button onClick={() => setRemovePopup(false)}>Нет</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Deals;
