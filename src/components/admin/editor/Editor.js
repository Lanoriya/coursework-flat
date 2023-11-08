import './styles/Editor.css';
import AddItem from './additem/AddItem';

function Editor() {
  return (
    <div className='editor-content'>
      <AddItem
        endpoint="addApartment"
        fields={[
          { name: 'room_count', label: 'Количество комнат' },
          { name: 'area', label: 'Площадь' },
          { name: 'floor', label: 'Этаж' },
          { name: 'price', label: 'Цена' },
          { name: 'apartment_number', label: 'Номер квартиры' },
          { name: 'building_id', label: 'Номер здания' },
          { name: 'entrance', label: '№ подъезда' },
        ]}
        successMessage="Квартиру"
      />
      <AddItem
        endpoint="addBuilding"
        fields={[
          { name: 'total_apartments', label: 'Количество квартир' },
          { name: 'total_entrances', label: 'Количество подъездов' },
        ]}
        successMessage="Здание"
      />
    </div>
  );
}

export default Editor;
