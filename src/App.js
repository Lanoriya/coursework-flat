import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './components/admin/AdminLogin';
import AdminPanel from './components/admin/AdminPanel';
import Main from './components/user/Main/Main';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const adminToken = document.cookie.split('; ').find(row => row.startsWith('adminToken='));
    if (adminToken) {
      setIsAuthenticated(!!adminToken);
    }
  }, []);



  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/admin" /> : <AdminLogin />} />
      <Route path="/admin/*" element={isAuthenticated ? <AdminPanel /> : <Navigate to="/login" />} />
      <Route path="*" element={<Main />} />
    </Routes>
  );
}

export default App;
