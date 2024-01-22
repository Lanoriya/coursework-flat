import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './styles/Orders.css';

function Orders() {

  const [orders, setOrders] = useState([]);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [isAnimationActive, setIsAnimationActive] = useState(false);

  const fetchOrders = useCallback(() => {
    axios.get(`http://localhost:3001/api/admin/orders`, {
      withCredentials: true,
    }).then((response) => {
      console.log('Orders Response:', response.data);
      setOrders(response.data);
    }).catch(error => {
      console.error('Error fetching orders:', error);
    });
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleChange = (event, orderId, field) => {
    const updatedOrders = [...orders];
    const updatedOrderIndex = updatedOrders.findIndex((order) => order.order_id === orderId);
    updatedOrders[updatedOrderIndex][field] = event.target.value;
    setOrders(updatedOrders);
  };

  const handleSave = () => {
    const saveButton = document.querySelector('.review-btn');
  
    // Disable the button to prevent multiple clicks
    if (saveButton) {
      saveButton.disabled = true;
    }
    setIsAnimationActive(true);

    axios
      .put('http://localhost:3001/api/admin/orders', orders, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
  
        setShowSuccessNotification(true);
  
        setTimeout(() => {
          const successNotification = document.querySelector('.success-notification');
  
          if (successNotification) {
            successNotification.classList.add('end-notification');
            successNotification.classList.remove('success-notification');
            setTimeout(() => {
              setShowSuccessNotification(false);
              if (saveButton) {
                saveButton.disabled = false;
              }
              setIsAnimationActive(false);
            }, 500);
          }
        }, 3000);
  
        fetchOrders();
      })
      .catch((error) => {
        console.log(error);
        if (saveButton) {
          saveButton.disabled = false;
        }
      });
    }

    useEffect(() => {
      const progress = document.getElementById('progress');
  
      if (progress) {
        let interval = setInterval(() => {
          progress.value -= 0.01;
          if (progress.value <= 0) {
            clearInterval(interval);
          }
        }, 30);
        return () => clearInterval(interval);
      }
    });




  return (
    <div className='orders-container'>
      <div className='apartment-name orders-name'>
        <p className='orders-p'>Имя</p>
        <p className='orders-p'>Номер</p>
        <p className='orders-p'>Статус</p>
        <p className='orders-p'>Комментарий</p>
        <button className='admin-btn review-btn' onClick={handleSave}>Сохранить</button>
      </div>
      <div className='orders-items'>
        {orders.map(order => (
          <div className='orders-item apartment-items' key={order.order_id}>
            <div className='orders-item-value apartment-item-value'>
              <input
                type='text'
                value={order.name}
                onChange={(event) => handleChange(event, order.order_id, "name")}
              />
            </div>
            <div className='orders-item-value apartment-item-value'>
              <input
                type='text'
                value={order.number}
                onChange={(event) => handleChange(event, order.order_id, "number")}
              />
            </div>
            <div className='orders-item-value apartment-item-value'>
              <select
                value={order.status}
                onChange={(event) => handleChange(event, order.order_id, "status")}
              >
                <option value="Не просмотрено">Не просмотрено</option>
                <option value="Выполнено">Выполнено</option>
                <option value="На выполнении">На выполнении</option>
              </select>
            </div>
            <div className='orders-item-value apartment-item-value'>
              <input
                type='text'
                value={order.about || ''}
                onChange={(event) => handleChange(event, order.order_id, "about")}
              />
            </div>
          </div>
        ))}
      </div>
      {showSuccessNotification && (
          <div className={`success-notification`}>
            {`Сохранено успешно`}
            <progress id='progress' value='1'></progress>
          </div>
        )}
        {isAnimationActive && <div className="overlay"></div>}
    </div>
  );
}

export default Orders;