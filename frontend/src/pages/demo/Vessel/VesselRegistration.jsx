// src/pages/demo/Vessel/VesselRegistration.jsx

import React, { useState, useEffect } from 'react';
import SidebarMenu from '../../common/SidebarMenu';
import InnerHeader from '../../common/InnerHeader';
import InnerSubHeader from '../../common/InnerSubHeader';
import Footer from '../../common/Footer';

import VesselDetailsTab from './VesselDetailsTab';
import VesselDimensionTab from './VesselDimensionTab';
import InsuranceDetailsTab from './InsuranceDetailsTab';
import EngineDetailsTab from './EngineDetailsTab';
import AttachFilesTab from './AttachFilesTab';
import ReviewTab from './ReviewTab'; // New tab

import './VesselRegistration.css';

const VesselRegistration = () => {
    const [formData, setFormData] = useState({});
    const [currentTab, setCurrentTab] = useState(0);

    // Load draft from localStorage on mount
    useEffect(() => {
        const draft = localStorage.getItem('vesselDraft');
        if (draft) {
            setFormData(JSON.parse(draft));
        }
    }, []);

    const handleNext = () => {
        if (currentTab < 5) {
            setCurrentTab(currentTab + 1);
        }
    };

    const handleBack = () => {
        if (currentTab > 0) {
            setCurrentTab(currentTab - 1);
        }
    };

    const handleSave = () => {
        localStorage.setItem('vesselDraft', JSON.stringify(formData));
        alert('✅ Draft saved successfully.');
    };

    const handleSubmit = () => {
        localStorage.setItem('submittedVessel', JSON.stringify(formData));
        localStorage.removeItem('vesselDraft');
        alert('✅ Vessel Registered & Activated!');
        setCurrentTab(0);
    };

    const tabList = [
        'Vessel Details',
        'Vessel Dimensions',
        'Insurance Details',
        'Engine Details',
        'Attach Files',
        'Review & Submit'
    ];

    const renderTab = () => {
        switch (currentTab) {
            case 0:
                return <VesselDetailsTab formData={formData} setFormData={setFormData} />;
            case 1:
                return <VesselDimensionTab formData={formData} setFormData={setFormData} />;
            case 2:
                return <InsuranceDetailsTab formData={formData} setFormData={setFormData} />;
            case 3:
                return <EngineDetailsTab formData={formData} setFormData={setFormData} />;
            case 4:
                return <AttachFilesTab formData={formData} setFormData={setFormData} />;
            case 5:
                return <ReviewTab formData={formData} handleSubmit={handleSubmit} goToStep={setCurrentTab} />;
            default:
                return null;
        }
    };

    return (
        <div className="vessel-registration-layout">
            <SidebarMenu />
            <div className="main-content">
                <InnerHeader />
                <InnerSubHeader title="Vessel Registration" />

                <div className="tab-navigation">
                    {tabList.map((label, index) => (
                        <div
                            key={index}
                            className={`tab-item ${index === currentTab ? 'active' : ''}`}
                            onClick={() => setCurrentTab(index)}
                        >
                            {label}
                        </div>
                    ))}
                </div>

                <div className="tab-content">
                    {renderTab()}

                    {currentTab < 5 && (
                        <div className="tab-buttons">
                            {currentTab > 0 && (
                                <button className="btn-secondary" onClick={handleBack}>Back</button>
                            )}
                            <button className="btn-secondary" onClick={handleSave}>Save Draft</button>
                            <button className="btn-primary" onClick={handleNext}>Next</button>
                        </div>
                    )}
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default VesselRegistration;
