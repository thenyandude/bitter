import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Header() {
    const { isLoggedIn, username, logout } = useAuth();
    return (
        <header>
            <div className="header-logo">Logo</div>
            <div className="header-title">{isLoggedIn ? `Bitter - ${username}` : 'Bitter'}</div>
            <div className="header-auth">
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
