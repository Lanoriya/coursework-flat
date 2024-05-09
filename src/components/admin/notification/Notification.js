import React, { useEffect } from 'react';

const Notification = () => {
  useEffect(() => {
    try {
      const notifications = document.querySelectorAll('.success-notification');
      const progress = document.getElementById('progress');

      let interval = setInterval(() => {
        progress.value -= 0.01;
  
        if (progress.value <= 0) {
          notifications.forEach((notification) => {
            notification.remove();
          });
          clearInterval(interval);
        }
      }, 30);
    } catch (error) {
      console.log('error')
    }
  }, []);

  return (
    <div className={`success-notification`}>
      Сохранено успешно
      <progress id='progress' value='1'></progress>
    </div>
  );
};


export default Notification;
