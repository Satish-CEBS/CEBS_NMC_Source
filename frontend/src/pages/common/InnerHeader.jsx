// src/components/common/InnerHeader.jsx

import React from 'react';
import './InnerHeader.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/moei-logo.png';
import { FaHome, FaGlobe, FaQuestionCircle, FaSignOutAlt, FaSearch } from 'react-icons/fa';

const InnerHeader = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => navigate('/dashboard');
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    // Extract user from localStorage
    let userName = '';
    let roleName = '';

    try {
        const rawUser = localStorage.getItem('user');
        const user = rawUser ? JSON.parse(rawUser) : null;

        if (user) {
            userName = `${user.given_name || ''} ${user.surname || ''}`.trim();
            roleName = (user.normalized_role || user.role_name || '').replace(/_/g, ' ').toUpperCase();
        }
    } catch (err) {
        console.warn('Could not parse user:', err);
    }

    return (
        <header className="inner-header">
            <div className="left-section" onClick={handleHomeClick}>
                <img src={logo} alt="MOEI Logo" className="moei-logo" />
                <div className="title-container">
                    <div className="main-title">National Maritime Center</div>
                </div>
            </div>

            <div className="right-section">
                {userName && (
                    <span className="user-info">
                        {userName} ({roleName})
                    </span>
                )}
                <FaHome title="Home" className="header-icon" onClick={handleHomeClick} />
                <FaSearch title="Search" className="header-icon" />
                <FaGlobe title="Language" className="header-icon" />
                <FaQuestionCircle title="Help" className="header-icon" />
                <FaSignOutAlt title="Logout" className="header-icon" onClick={handleLogout} />
            </div>
        </header>
    );
};

export default InnerHeader;
