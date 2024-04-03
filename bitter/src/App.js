import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SignUp from './components/signUp';
import Login from './components/logIn';
import UserHome from './components/userHome';
import Home from './components/Home';
import FindPosts from './components/FindPosts'; // Import the FindPosts component

import { AuthProvider } from './context/AuthContext';

function App() {
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
            <Route path="/:username" element={<FindPosts />} /> {/* New route for FindPosts */}
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
