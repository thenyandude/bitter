import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

function Login() {
  const { setIsLoggedIn, setUsername, setUserId } = useAuth(); // Update to include setUserId
  const [loginUsername, setLoginUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', { username: loginUsername, password });
      setIsLoggedIn(true);
      setUsername(loginUsername);
      setUserId(response.data.userId); // Store the user ID in the context
      localStorage.setItem('userId', response.data.userId); // Store the user ID in local storage
      // Redirect to the user's home page or dashboard
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Error logging in');
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Login;
