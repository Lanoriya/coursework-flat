import React, { useState, useEffect } from 'react';
import UserProfile from './ProfileLogin/UserProfile';
import UserLogin from './ProfileLogin/UserLogin';
import '../styles/userlogin.css'

function ProfilePage() {
  return (
    <div className='user-login'>
      <UserProfile />
      <UserLogin />
    </div>
  );
}

export default ProfilePage;
