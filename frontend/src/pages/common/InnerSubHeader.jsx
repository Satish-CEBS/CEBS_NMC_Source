/**
 * @component   InnerSubHeader.jsx
 * @author      CEBS
 * @license     STRICTLY CONFIDENTIAL
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './InnerSubHeader.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const InnerSubHeader = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const roleId = user?.role_id || '';

    // Roles allowed: superadmin, admin, port
    const allowedRoles = [
        '8712cc4b-b8a6-45cc-9b2b-2feced5896a3', // Superadmin
        'b22d4284-38b1-43b8-9270-d2c130285aaf', // Admin
        'f4183b29-cd17-4511-aa3b-f240987d2e99'  // Port
    ];

    const canCreatePreArrival = allowedRoles.includes(roleId);

    return (
        <div className="inner-sub-header">
            <div className="inner-sub-header-left">
                <span className="inner-tagline">
                    From Port Call to Clearance - <strong>One Window. One Nation. AI-Powered.</strong>
                </span>
            </div>

            {canCreatePreArrival && (
                <div className="inner-sub-header-right">
                    <Link to="/prearrival/create" className="inner-sub-header-btn">
                        <AddCircleOutlineIcon fontSize="small" style={{ marginRight: '6px' }} />
                        Create New Pre-arrival Notification
                    </Link>
                </div>
            )}
        </div>
    );
};

export default InnerSubHeader;
