// src/components/common/InnerSubHeader.jsx

import React from 'react';
import './InnerSubHeader.css';
import { FaPlusCircle } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const InnerSubHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const rawUser = localStorage.getItem('user');
    let user = {};
    try {
        user = rawUser ? JSON.parse(rawUser) : {};
    } catch (err) {
        console.warn('Could not parse user from localStorage:', err);
    }

    const role = (user.normalized_role || user.role || '').toUpperCase();

    const isPrivileged = ['SUPER_ADMIN', 'ADMIN', 'PORT'].includes(role);

    const showButton = isPrivileged && !location.pathname.includes('/prearrival/create');

    const handleCreateNew = () => {
        navigate('/portcall-wizard');
    };

    return (
        <div className="inner-subheader">
            {showButton && (
                <button
                    variant="contained"
                    color="primary"
                    startIcon={<FaPlusCircle />}
                    onClick={handleCreateNew}
                >
                    Create New Port Call Notification
                </button>
            )}
            <div className="nmc-tagline">
                From Port Call to Clearance – <strong>One Window. One Nation. AI-Powered.</strong>
            </div>
        </div>
    );
};

export default InnerSubHeader;
