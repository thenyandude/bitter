import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../css/Header.css'

function Header() {
    const { isLoggedIn, username, logout } = useAuth();
    return (
        <header>
            <div className="header-logo">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Logo
            </Link>
            </div>  
            <div className="header-title">
        {isLoggedIn ? (
          <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
            Bitter - {username}
          </Link>
        ) : (
          'Bitter'
        )}
      </div>            <div className="header-auth">
                {isLoggedIn ? (
                    <button onClick={logout} className="auth-link">Logg Ut</button>
                ) : (
                    <Link to="/login" className="auth-link">Logg Inn</Link>
                )}
            </div>
        </header>
    );
}

export default Header;
