import React, { useState, useEffect } from 'react';

function Deals({ userData, userToken, activeDeals }) {
  const [storedDeal, setStoredDeal] = useState([]);
  const [statusDeal, setStatusDeal] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [removePopup, setRemovePopup] = useState(false);

  const startDeal = (apartment_id) => {
    const selectedDeal = storedDeal.find(deal => deal.apartment_id === apartment_id);
    console.log('Selected Deal:', selectedDeal); // Добавленный console.log
    setSelectedApartment(selectedDeal);
    setShowPopup(true);
  };

  const cancelStartDeal = () => {
    setSelectedApartment(null);
    setShowPopup(false);
    setRemovePopup(false);
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
        setSelectedApartment(null);
        removeFromDeals(selectedApartment.apartment_id); // Удаление из списка сделок после начала сделки
        window.location.reload();
      })
      .catch(error => {
        console.error('Error starting deal:', error);
        alert('Произошла ошибка при начале сделки.');
      });
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
    setStatusDeal(activeDeals)
    const storedDeals = JSON.parse(localStorage.getItem('deals')) || [];
    setStoredDeal(storedDeals);
    localStorage.setItem('activeDeals', JSON.stringify(activeDeals));
  }, [])

  return (
    <div className='deals-container'>
      <ul className='deals-ul'>
        {[...storedDeal].map((deal, index) => (
          <li className='deals-li' key={index}>
            <div className='deals-li-p'>
              <img
                className='favorites-img'
                src={`http://localhost:3001/api/image/${deal.image_id}`}
                alt={`Apartment ${deal.apartment_number}`}
              />
            </div>
            <div className='start-deal-btns'>
              <button className='start-deal-btn' onClick={() => startDeal(deal.apartment_id)}>
                Начать сделку
              </button>
              <button className='start-deal-btn' onClick={() => removeFromDeals(deal.apartment_id)}>
                Удалить из сделок
              </button>
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
