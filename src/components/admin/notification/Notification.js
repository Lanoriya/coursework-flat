import React, { useEffect } from 'react';

const Notification = () => {
  useEffect(() => {
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
  }, []);

  return (
    <div className={`success-notification`}>
      Сохранено успешно
      <progress id='progress' value='1'></progress>
    </div>
  );
};


export default Notification;
