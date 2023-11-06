import { Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import './styles/AdminPanel.css';
import burger from './imgs/burger.svg';
import Orders from './orders/Orders';
import Editor from './editor/Editor';
import AdminMain from './admin-main/AdminMain';

function AdminPanel() {
  return (
    <div className='admin-page'>
      <header className='admin-header'>
        <p className='admin-header--p'>Developed by Lanoriya</p>
      </header>

      <aside className='admin-aside'>
        <button className='admin-aside-btn'>
          <img className='admin-aside-img' src={burger} alt='burger'/>
        </button>
        <nav className='admin-aside-nav'>
          <Link to='' className='aside-nav-btn'>Main</Link>
          <Link to='editor' className='aside-nav-btn'>Editor</Link>
          <Link to='orders' className='aside-nav-btn'>Orders</Link>
        </nav>
      </aside>

      <main className='admin-main'>
        <Routes>
          <Route path='/' element={<AdminMain />} />
          <Route path='editor' element={<Editor />} />
          <Route path='orders' element={<Orders />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminPanel;
