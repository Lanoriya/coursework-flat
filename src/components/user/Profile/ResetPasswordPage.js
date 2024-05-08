import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { email, token } = useParams(); // Получаем токен и почту из параметров URL
  const navigate = useNavigate();
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, resetToken: token, newPassword: password }), // Передаем email, токен сброса пароля и новый пароль
      });

      if (response.ok) {
        console.log('Password reset successful');
        navigate('/profile');
        // Redirect user to login page or any other desired page
      } else {
        const errorData = await response.text();
        setErrorMessage(`Password reset failed: ${errorData}`);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setErrorMessage('Error resetting password');
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default ResetPasswordPage;
