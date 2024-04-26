import React, { useEffect, useState } from 'react';

function NowDeals({ activeDeals, userToken }) {
  const [apartmentInfoList, setApartmentInfoList] = useState([]);

  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTimeString).toLocaleString('ru-RU', options);
  };

  useEffect(() => {
    const fetchApartmentInfo = async () => {
      try {
        const promises = activeDeals.map(deal =>
          fetch(`http://localhost:3001/api/apartments/${deal.apartment_id}`, {
            headers: {
              'Authorization': `Bearer ${userToken}`
            },
            credentials: 'include'
          }).then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch apartment info.');
            }
            return response.json();
          })
        );

        const apartmentInfoArray = await Promise.all(promises);
        setApartmentInfoList(apartmentInfoArray);
      } catch (error) {
        console.error('Error fetching apartment info:', error);
      }
    };

    fetchApartmentInfo();
  }, [activeDeals, userToken]);

  return (
    <div className='deals-container'>
      <ul className='deals-ul'>
        {activeDeals.map((deal, index) => (
          <li className='deals-li' key={index}>
            <div className='deals-li-p'>
              {apartmentInfoList[index] && (
                <p>Квартира №{apartmentInfoList[index].apartment_number}</p>
              )}
              <div>
                <p>Статус: {deal.status}</p>
                <p>Дата создания: {formatDateTime(deal.created_at)}</p>
              </div>
              {apartmentInfoList[index] && (
                <img
                  className='favorites-img'
                  src={`http://localhost:3001/api/image/${apartmentInfoList[index].image_id}`}
                  alt={`Apartment ${deal.apartment_number}`}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NowDeals;
