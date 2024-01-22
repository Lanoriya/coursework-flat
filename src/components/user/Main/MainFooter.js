import { Link } from 'react-router-dom';
import Logo from '../Main/imgs/logo-white.png';

function MainFooter() {
  return(
    <footer className='main-footer'>
      <div className="container footer-container">
        <Link to='/' className='footer-logo'><img className='header-logo footer-logo' src={Logo} alt='logo' /></Link>
        <div className='footer-text-container'>
          <p className='footer-text'>Копирование любого материала с настоящего сайта допускается только с письменного разрешения администрации сайта. Информация о ценах, планировках, а также специальных предложениях, размещённых на данном сайте, носит исключительно ознакомительный характер, не является публичной офертой, определяемой положениями Статьи 437 Гражданского кодекса Российской Федерации. Представленные на сайте изображения объектов долевого строительства носят предварительный ознакомительный характер и могут отличаться от фактических проектных решений, реализуемых застройщиком.</p>
          <a className='footer-text--a' href='/policy'>Правила обработки персональных данных</a>
        </div>
      </div>
    </footer>
  )
}

export default MainFooter;