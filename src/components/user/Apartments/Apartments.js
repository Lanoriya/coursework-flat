import './Apartments.css';


function Apartments() {
  return(
    <div className='container apartments-container'>
      <aside className='apartments-filter'>
        <div className='filter-flat'>
          <div className='flat-item'></div>
          <div className='flat-item'></div>
          <div className='flat-item'></div>
        </div>
        <div className='filter-area'>
          <h4>Площадь м²</h4>
          <div className='fitler-area-numbers'>
            <div className='area-numbers-score'><span>от</span> 27</div>
            <div className='area-numbers-score'><span>до</span> 80</div>
          </div>
        </div>
        <div className='filter-floor'>
          <h4>Этаж</h4>
          <div className='filter-floor-numbers'><span>от</span> 1</div>
          <div className='filter-floor-numbers'><span>до</span> 20</div>
        </div>
        <div className='filter-reset'>
          <a href='/apartments'>Сбросить параметры
            <svg width="8" height="8" viewBox="0 0 8 8" fill="000" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.99996 5.22229L1.37727 7.84498C1.12213
                8.10013 0.641687 8.03336 0.304183 7.69586C-0.0333213 7.35836 -0.100086 6.87792
                0.15506 6.62277L2.77775 4.00008L0.155017 1.37735C-0.100129 1.1222 -0.0333644
                0.641762 0.30414 0.304258C0.641644 -0.0332461 1.12208 -0.100011 1.37723
                0.155135L3.99996 2.77787L6.62282 0.155017C6.87796 -0.100129 7.3584
                -0.0333646 7.6959 0.30414C8.03341 0.641644 8.10017 1.12208 7.84503
                1.37723L5.22217 4.00008L7.84498 6.62289C8.10013 6.87804 8.03336 7.35847 7.69586
                7.69598C7.35836 8.03348 6.87792 8.10025 6.62277 7.8451L3.99996 5.22229Z">
              </path>
            </svg>
          </a>
        </div>
      </aside>
      <div className='apartments-main'>
        <h1>Квартиры</h1>
      </div>
    </div>
  )
}

export default Apartments;