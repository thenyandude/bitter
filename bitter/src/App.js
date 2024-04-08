import React, { useEffect } from 'react';
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

function RedirectToGuide() {
  let navigate = useNavigate();

  useEffect(() => {
    const isFirstVisit = localStorage.getItem('firstVisit') === 'yes';
    if (isFirstVisit) {
      navigate('/guide');
      localStorage.setItem('firstVisit', 'no');
    }
  }, [navigate]);

  return null; // This component does not render anything
}

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <RedirectToGuide /> {/* Place the navigation logic here */}
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
