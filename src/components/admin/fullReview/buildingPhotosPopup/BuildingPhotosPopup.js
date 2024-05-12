import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import axios from 'axios';

function BuildingPhotosPopup({ buildingPhotos, onClose }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [buildingPhotosFiltered, setBuildingPhotosFiltered] = useState([]);

  useEffect(() => {
    setBuildingPhotosFiltered(buildingPhotos);
  }, [buildingPhotos]);

  const deletePhoto = async () => {
    try {
      const updatedPhotos = buildingPhotosFiltered.filter(photo => photo.image_id !== selectedPhoto.image_id);
      setBuildingPhotosFiltered(updatedPhotos);
      
      await axios.delete(`http://localhost:3001/api/admin/building_images/${selectedPhoto.image_id}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const handlePhotoRightClick = (photo, event) => {
    event.preventDefault();
    setSelectedPhoto(photo);
  };

  const handleDeleteConfirmation = (confirm) => {
    if (confirm) {
      deletePhoto();
    }
    setSelectedPhoto(null);
  };

  return (
    <Draggable bounds=".admin-main" handle="strong">
      <div className="building-photos-popup">
        <strong className='mover' />
        <div className="building-close-btn" onClick={onClose}></div>
        <div className="building-photos-container">
          {buildingPhotosFiltered.map((photo, index) => (
            <div key={index} className="photo-wrapper" onContextMenu={(e) => handlePhotoRightClick(photo, e)}>
              {selectedPhoto === photo ? (
                <div className="delete-photo-overlay">
                  <div className="delete-photo-text">Удалить фото? </div>
                  <div className='delete-photo-btns'>
                    <button className="admin-btn delete-confirm-btn" onClick={() => handleDeleteConfirmation(true)}>Да</button>
                    <button className="admin-btn delete-cancel-btn" onClick={() => handleDeleteConfirmation(false)}>Нет</button>
                  </div>
                </div>
              ) : (
                <img className='building-photo' src={'http://localhost:3001/' + photo.image_url} alt={`Photo ${index + 1}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </Draggable>
  );
}

export default BuildingPhotosPopup;
