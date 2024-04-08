import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

  const [firstVisit, setFirstVisit] = useState(false);

  useEffect(() => {
    // Check if it's the user's first visit
    const isFirstVisit = localStorage.getItem('firstVisit') === null;
    setFirstVisit(isFirstVisit);

    // Set 'firstVisit' in local storage
    if (isFirstVisit) {
      localStorage.setItem('firstVisit', 'no');
    }
  }, []);


  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Header />
          <Routes>
          <Route path="/" element={firstVisit ? <Navigate to="/guide" /> : <Home />} />            <Route path="/signup" element={<SignUp />} />
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
