import React, { useState } from 'react';

function BuildingPhotosPopup({ buildingPhotos, onClose }) {

  return (
    <div className="building-photos-popup">
      <div className="building-close-btn" onClick={onClose}></div>
      <div className="building-photos-container">
        {buildingPhotos.map((photo, index) => (
          <img className='building-photo' key={index} src={'http://localhost:3001/' + photo.image_url} alt={`Photo ${index + 1}`} />
        ))}
      </div>
    </div>
  );
}

export default BuildingPhotosPopup;
