/**
 * ------------------------------------------------------------------------
 * @author      CEBS Worldwide
 * @copyright   © 2025 CEBS Worldwide. All rights reserved.
 * @license     STRICTLY CONFIDENTIAL
 * ------------------------------------------------------------------------
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import './i18n';
import './App.css';
//import ViewPreArrival from './pages/Pre-Arrival/ViewPreArrival';
//import PreArrivalCreatePage from './pages/Pre-Arrival/PreArrivalCreatePage';
//import axios from 'axios';

import DemoPortCallWizard from './pages/demo/PortCall/DemoPortCallWizard';
import PortCallListPage from './pages/demo/PortCall/PortCallListPage';
import PortCallViewPage from './pages/demo/PortCall/PortCallViewPage';

import PreArrivalWizard from './pages/demo/PreArrival/PreArrivalWizard';
import PreArrivalDashboard from './pages/demo/PreArrival/PreArrivalDashboard';
import PreArrivalListPage from './pages/demo/PreArrival/PreArrivalListPage';
import PreArrivalViewPage from './pages/demo/PreArrival/PreArrivalViewPage';


import VesselRegistration from './pages/demo/Vessel/VesselRegistration';
import VesselListPage from './pages/demo/Vessel/VesselListPage';
import VesselViewPage from './pages/demo/Vessel/VesselViewPage';

import ReportsExport from './pages/demo/reports/ReportsExport';
import EmiratesDashboard from './pages/demo/emirates/EmiratesDashboard';
import AuditLogs from './pages/demo/audit/AuditLogs';

const App = () => (

    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />

            
            <Route path="/portcall-wizard" element={<DemoPortCallWizard />} />
            <Route path="/portcall-dashboard" element={<PortCallListPage />} />
            <Route path="/portCall-view/:id" element={<PortCallViewPage />} />

            <Route path="/prearrival-wizard" element={<PreArrivalWizard />} />
            <Route path="/prearrival-dashboard" element={<PreArrivalDashboard />} />
            <Route path="/prearrival-list" element={<PreArrivalListPage />} />
            <Route path="/prearrival-view/:id" element={<PreArrivalViewPage />} />

            <Route path="/vessel-registration" element={<VesselRegistration />} />
            <Route path="/vessel-dashboard" element={<VesselListPage />} />
            <Route path="/vessel/view/:id" element={<VesselViewPage />} />

            {/* Analytics & Reports */}
            <Route path="/reports" element={<ReportsExport />} />
            <Route path="/emirates-dashboard" element={<EmiratesDashboard />} />
            <Route path="/audit-logs" element={<AuditLogs />} />


        </Routes>
    </Router>
);

export default App;
