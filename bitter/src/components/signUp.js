import React, { useState } from 'react';
import axios from 'axios';
import '../css/AuthForm.css'
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
      const response = await axios.post('http://localhost:3001/api/signup', { username, password });
      console.log(response.data);
      // Redirect to login page or dashboard after successful sign-up
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Feil ved registrering');
    }
  };

  return (
    <div className="sign-up-container">
    <h2>Registrer deg</h2>
    <form onSubmit={handleSignUp} className="sign-up-form">
        <label>
          Brukernavn:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Passord:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Bekreft passord:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        <button type="submit">Registrer</button>
        {errorMessage && <div className="feedback-message">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default SignUp;
