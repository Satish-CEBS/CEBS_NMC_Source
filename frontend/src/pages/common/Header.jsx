/**
 * ------------------------------------------------------------------------
 * @author      CEBS Worldwide
 * @copyright   © 2025 CEBS Worldwide. All rights reserved.
 * @license     STRICTLY CONFIDENTIAL
 * ------------------------------------------------------------------------
 */
import React from 'react';
import '../../pages/common/Header.css';
import moeiLogo from '../../assets/moei-logo.png';

const Header = () => {
    return (
        <div className="header-wrapper">
            <div className="header-logo-container">
                <img src={moeiLogo} alt="MOEI Logo" className="header-logo" />
            </div>
            <div className="header-title">
                National Maritime Center
            </div>
        </div>
    );
};

export default Header;
