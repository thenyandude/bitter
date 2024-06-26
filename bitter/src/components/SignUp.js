import React, { useState } from 'react';
import axios from 'axios';
import '../css/AuthForm.css';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passordene matcher ikke.");
      return;
    }

    try {
      const response = await axios.post('http://10.12.5.206/api/signup', { username, password });
      if (response.status === 201) {
        navigate('/login'); // Redirect to login on successful signup
      }
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Eroor during registering');
    }
  };

  return (
    <div className="auth-container">
      <h2>Make an account</h2>
      <form onSubmit={handleSignUp} className="auth-form">
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        <button type="submit">Register</button>
        {errorMessage && <div className="feedback-message">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default SignUp;