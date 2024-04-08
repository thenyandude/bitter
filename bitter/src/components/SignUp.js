import React, { useState } from 'react';
import axios from 'axios';
import '../css/AuthForm.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passordene matcher ikke.");
      return;
    }

    try {
      const response = await axios.post('http://10.12.5.206/api/signup', { username, password });
      if (response.data.redirectTo) {
        // Redirect to the login page
        window.location.href = response.data.redirectTo;
      }    } catch (error) {
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