import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Header() {
    const { isLoggedIn, username, logout } = useAuth();
  return (
    <header>
      <nav>
        {isLoggedIn ? (
          <>
            <span>Bitter - {username}</span>
            <button onClick={logout}>Logg Ut</button>          </>
        ) : (
          <>
            <span>Bitter</span>
            <Link to="/login">Logg Inn</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
