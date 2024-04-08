import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './css/App.css';
import Header from './components/Header';
import SignUp from './components/SignUp';
import Login from './components/LogIn';
import UserHome from './components/UserHome';
import Home from './components/Home';
import FindPosts from './components/FindPosts';
import Guide from './components/Guide';
import { AuthProvider } from './context/AuthContext';

function App() {
  let navigate = useNavigate();

  useEffect(() => {
    // Check if the 'firstVisit' flag is set to 'yes'
    const isFirstVisit = localStorage.getItem('firstVisit') === 'yes';

    if (isFirstVisit) {
      // Navigate to the guide page
      navigate('/guide');

      // Update 'firstVisit' in local storage
      localStorage.setItem('firstVisit', 'no');
    }
  }, [navigate]);


  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<UserHome userId={localStorage.getItem('userId')} />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/:username" element={<FindPosts />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
