/**
 * ------------------------------------------------------------------------
 * @component   SubHeader
 * @author      CEBS Worldwide
 * @copyright   © 2025 CEBS Worldwide
 * ------------------------------------------------------------------------
 */
import React from 'react';
import './SubHeader.css';
import LanguageIcon from '@mui/icons-material/Language';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const SubHeader = () => {
    return (
        <div className="sub-header">
            <div className="sub-header-left">
                <span className="tagline">
                    From Port Call to Clearance - <strong>One Window. One Nation. AI-Powered.</strong>
                </span>
            </div>
            <div className="sub-header-right">
                <button className="sub-header-btn">
                    <LanguageIcon fontSize="small" style={{ marginRight: '6px' }} />
                </button>
                <button className="sub-header-btn">
                    <HelpOutlineIcon fontSize="small" style={{ marginRight: '6px' }} />
                </button>
            </div>
        </div>
    );
};

export default SubHeader;
