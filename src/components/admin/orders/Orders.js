import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Notification from '../notification/Notification';

function Orders() {

  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Все");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);


  const showNotification = (message) => {
    setNotifications([...notifications, message]);
  };

  const fetchOrders = useCallback(() => {
    let url = `http://localhost:3001/api/admin/orders`;

    if (selectedStatus && selectedStatus !== "Все") {
      url += `?status=${selectedStatus}`;
    }

    axios.get(url, {
      withCredentials: true,
    }).then((response) => {
      console.log('Orders Response:', response.data);
      setOrders(response.data);
    }).catch(error => {
      console.error('Error fetching orders:', error);
    });
  }, [selectedStatus]);

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
    if (isSaving) {
      return;
    }
    setIsSaving(true);

    axios
      .put('http://localhost:3001/api/admin/orders', orders, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        showNotification('Сохранено успешно');
        fetchOrders();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsSaving(false);
        }, 1000); // Задержка в одну секунду перед следующим кликом
      });
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleDeleteButtonClick = (orderId) => {
    setOrderToDelete(orderId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (isSaving) {
      return;
    }
    setIsSaving(true);

    axios
      .delete(`http://localhost:3001/api/admin/orders/${orderToDelete}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        showNotification('Заказ успешно удален');
        fetchOrders(); // Refresh orders after deletion
      })
      .catch((error) => {
        console.error('Error deleting order:', error);
      })
      .finally(() => {
        setOrderToDelete(null);
        setShowDeleteModal(false);
        setTimeout(() => {
          setIsSaving(false);
        }, 1000); // Задержка в одну секунду перед следующим кликом
      });
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className='order-content'>
      <div className='orders-container'>
        <div className='apartment-name orders-name'>
          <p className='orders-p'>Имя</p>
          <p className='orders-p'>Номер</p>
          <p className='orders-p'>
            <span>Статус</span>
            <select value={selectedStatus} onChange={handleStatusChange}>
              <option value="Все">Все</option>
              <option value="Не просмотрено">Не просмотрено</option>
              <option value="Выполнено">Выполнено</option>
              <option value="На выполнении">На выполнении</option>
            </select>
          </p>
          <p className='orders-p'>Комментарий</p>
          <p className='orders-p'>Дата создания</p>
          <button className='admin-btn review-btn' onClick={handleSave}>Сохранить</button>
        </div>
        <div className='orders-items'>
          {orders.map(order => (
            <div key={order.order_id} className='orders-item apartment-items'>
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
                  value={order.phone_number}
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
              <div className='orders-item-value apartment-item-value'>
                {order.created_at} {/* Выводим дату создания заказа */}
                <div className='delete-btn-overlay' onClick={() => handleDeleteButtonClick(order.order_id)}></div>
              </div>
            </div>
          ))}
        </div>
        {showDeleteModal && (
          <div className='delete-modal'>
            <div className='delete-container'>
              <h3>Вы уверены, что хотите удалить этот заказ?</h3>
              <div className='delete-buttons'>
                <button onClick={handleDeleteConfirm}>Да</button>
                <button onClick={handleDeleteCancel}>Нет</button>
              </div>
            </div>
          </div>
        )}
      </div>
      {notifications.map((message, index) => (
        <Notification key={index} message={message} />
      ))}
    </div>
  );
}

export default Orders;
