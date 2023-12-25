import { useLocation, Link, Routes, Route } from 'react-router-dom';
import Logo from '../Main/imgs/logo-white.png';
import '../Main/Main.css';
import About from '../AboutHeader/About-header';

function MainHeader() {
  const location = useLocation();
  const isApartmentsPage = location.pathname === '/apartments';

  return (
    <header className={`main-header ${isApartmentsPage ? 'apartments-header' : ''}`}>
      <div className={`header-container ${isApartmentsPage ? 'apartments-container' : ''}`}>
        <div className='container header-block'>
          <nav className='main-header-nav'>
            <ul className='header-ul'>
              <Link to='/' className='header-ul-li'><img className='header-logo' src={Logo} alt='header-logo' /></Link>
              <li className='header-ul-li'><a href='/'>О проекте</a></li>
              <Link to='/apartments' className='header-ul-li'>Поиск квартир</Link>
              <li className='header-ul-li'><a href='/'>Контакты</a></li>
              <li className='header-ul-li'><a href='/'>Расположение</a></li>
            </ul>
          </nav>
          <div className='header-callback'>
            <a href='tel:79504925990' className='callback-tel'>+79504925990</a>
            <a href='/' className='callback-tel-pop'>Заказать звонок</a>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<About />} />
      </Routes>
    </header>
  )
}

export default MainHeader;