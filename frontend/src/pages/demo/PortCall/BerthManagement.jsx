// src/pages/demo/PortCall/BerthManagement.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import InnerHeader from '../../common/InnerHeader';
import InnerSubHeader from '../../common/InnerSubHeader';
import SidebarMenu from '../../common/SidebarMenu';
import Footer from '../../common/Footer';

import './BerthManagement.css';

const BerthManagement = () => {
    return (
        <>
            <InnerHeader />
            <InnerSubHeader title="Berth Management" />
            <div className="main-content-container">
                <SidebarMenu />
                <main className="main-content berth-management">
                    <h2>Berth Management Actions</h2>
                    <div className="berth-actions">
                        <Link to="/berth-dashboard" className="action-card">📊 View Dashboard</Link>
                        <Link to="/berth/new" className="action-card">➕ Add New Berth</Link>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default BerthManagement;
