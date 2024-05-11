import Draggable from 'react-draggable';

function BuildingPhotosPopup({ buildingPhotos, onClose }) {

  return (
    <Draggable bounds=".admin-main" handle="strong">
      <div className="building-photos-popup">
        <strong className='mover'/>
        <div className="building-close-btn" onClick={onClose}></div>
        <div className="building-photos-container">
          {buildingPhotos.map((photo, index) => (
            <img className='building-photo' key={index} src={'http://localhost:3001/' + photo.image_url} alt={`Photo ${index + 1}`} />
          ))}
        </div>
      </div>
    </Draggable>
  );
}

export default BuildingPhotosPopup;
