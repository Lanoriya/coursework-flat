import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './components/admin/AdminLogin';
import AdminPanel from './components/admin/AdminPanel';
import Main from './components/user/Main/Main';
import UserProfile from './components/user/Profile/UserProfile';
import UserLogin from './components/user/Profile/UserLogin';
import './App.css';

function App() {
  const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(false);
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);

  useEffect(() => {
    const adminToken = document.cookie.split('; ').find(row => row.startsWith('adminToken='));
    if (adminToken) {
      setIsAuthenticatedAdmin(!!adminToken);
    }

    const userToken = document.cookie.split('; ').find(row => row.startsWith('userToken='));
    if (userToken) {
      setIsAuthenticatedUser(!!userToken);
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={isAuthenticatedAdmin ? <Navigate to="/admin" /> : <AdminLogin />} />
      <Route path="/admin/*" element={isAuthenticatedAdmin ? <AdminPanel /> : <Navigate to="/login" />} />
      <Route path="/userLogin" element={isAuthenticatedUser ? <Navigate to="/profile" /> : <UserLogin />} />
      <Route path="/profile/*" element={isAuthenticatedUser ? <UserProfile /> : <Navigate to="/userLogin" />} />
      <Route path="*" element={<Main />} />
    </Routes>
  );
}

export default App;
