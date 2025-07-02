/**
 * @component   InnerHeader.jsx
 * @author      CEBS
 * @license     STRICTLY CONFIDENTIAL
 */

import React from 'react';
import '../../pages/common/InnerHeader.css';
import moeiLogo from '../../assets/moei-logo.png';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const InnerHeader = () => {
    const navigate = useNavigate();
    const { i18n } = useTranslation();

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    };

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
        document.body.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    };

    return (
        <div className="inner-header-wrapper">
            <div className="inner-header-container">
                <img
                    src={moeiLogo}
                    alt="MOEI Logo"
                    className="inner-header-logo"
                    onClick={() => navigate('/dashboard')}
                    style={{ cursor: 'pointer' }}
                />

                <div className="inner-header-title">National Maritime Center</div>

                <div className="inner-header-actions">
                    <button className="header-btn" onClick={() => navigate('/dashboard')}>
                        <HomeIcon fontSize="small" />
                    </button>
                    <button className="header-btn"><SearchIcon fontSize="small" /></button>
                    <button className="header-btn" onClick={toggleLanguage}><LanguageIcon fontSize="small" /></button>
                    <button className="header-btn"><HelpOutlineIcon fontSize="small" /></button>
                    <button className="header-btn" onClick={handleLogout}><LogoutIcon fontSize="small" /></button>
                </div>
            </div>
        </div>
    );
};

export default InnerHeader;
