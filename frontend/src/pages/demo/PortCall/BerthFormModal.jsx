// src/pages/demo/PortCall/BerthManagement.jsx

import React, { useState } from 'react';
import SidebarMenu from '../../common/SidebarMenu';
import InnerHeader from '../../common/InnerHeader';
import InnerSubHeader from '../../common/InnerSubHeader';
import Footer from '../../common/Footer';
import AddBerthForm from './AddBerthForm';
import BerthDashboard from './BerthDashboard';

const BerthManagement = () => {
    const [view, setView] = useState('dashboard'); // 'dashboard' or 'form'

    return (
        <div className="page-wrapper">
            <SidebarMenu />
            <div className="main-content">
                <InnerHeader />
                <InnerSubHeader title="Berth Management" />

                <div className="berth-controls">
                    <button className="btn dark" onClick={() => setView('dashboard')}>🧭 View Dashboard</button>
                    <button className="btn blue" onClick={() => setView('form')}>➕ Add New Berth</button>
                </div>

                {view === 'dashboard' ? <BerthDashboard /> : <AddBerthForm />}
                <Footer />
            </div>
        </div>
    );
};

export default BerthManagement;
