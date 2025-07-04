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
import ViewPreArrival from './pages/Pre-Arrival/ViewPreArrival';
import PreArrivalCreatePage from './pages/Pre-Arrival/PreArrivalCreatePage';
import axios from 'axios';
import DemoPortCallWizard from './pages/demo/DemoPortCallWizard';

const App = () => (

    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/prearrival/view/:id" element={<ViewPreArrival />} />
            <Route path="/prearrival/create" element={<PreArrivalCreatePage />} />
            <Route path="/portcall-wizard" element={<DemoPortCallWizard />} />

        </Routes>
    </Router>
);

axios.interceptors.request.use((config) => {
    console.log(`🔍 Axios request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
});


export default App;
