import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './components/admin/AdminLogin';
import AdminPanel from './components/admin/AdminPanel';
import Main from './components/user/Main/Main';
import UserProfile from './components/user/Profile/UserProfile';
import './App.css';

function App() {
  const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(false);

  useEffect(() => {
    const adminToken = document.cookie.split('; ').find(row => row.startsWith('adminToken='));
    if (adminToken) {
      setIsAuthenticatedAdmin(!!adminToken);
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={isAuthenticatedAdmin ? <Navigate to="/admin" /> : <AdminLogin />} />
      <Route path="/admin/*" element={isAuthenticatedAdmin ? <AdminPanel /> : <Navigate to="/login" />} />
      <Route path="/profile/*" element={<UserProfile />} />
      <Route path="*" element={<Main />} />
    </Routes>
  );
}

export default App;
