import React, { useState, useEffect } from 'react';
import InnerHeader from '../common/InnerHeader';
import InnerSubHeader from '../common/InnerSubHeader';
import SidebarMenu from '../common/SidebarMenu';
import Footer from '../common/Footer';

import VoyagesStep from './Voyages/VoyagesStep';
import PortCallDetailsStep from './PortCall/PortCallDetailsStep';
import Step3LandingPage from './Step3LandingPage';

import './DemoPortCallWizard.css';

const STORAGE_KEY = 'NMC_FORM_DATA';

const DemoPortCallWizard = () => {
    const [currentStep, setCurrentStep] = useState(1);

    // Centralized form data with nested basicInfo, selectedReports, formsData, formStatus
    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            console.log('Loaded formData from localStorage:', JSON.parse(saved));
        }
        return saved ? JSON.parse(saved) : {
            basicInfo: {},
            selectedReports: {},
            formsData: {},
            formStatus: {},
            isActivated: false,
        };
    });

    // Persist formData to localStorage on change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        console.log('Saved formData to localStorage:', formData);
    }, [formData]);

    // Update entire formData object
    const updateFormData = (updatedData) => {
        setFormData((prev) => {
            const newData = { ...prev, ...updatedData };
            console.log('Updated centralized formData:', newData);
            return newData;
        });
    };

    // Specifically update basicInfo inside formData
    const updateBasicInfo = (basicInfo) => {
        setFormData((prev) => {
            const newData = { ...prev, basicInfo };
            console.log('Updated basicInfo:', basicInfo);
            return newData;
        });
    };

    // Save Draft
    const saveDraft = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        alert('Draft saved locally.');
        console.log('Draft saved:', formData);
    };

    // Reset Draft
    const resetDraft = () => {
        if (window.confirm('Are you sure you want to reset the entire draft? This will erase all your data.')) {
            localStorage.removeItem(STORAGE_KEY);
            setFormData({
                basicInfo: {},
                selectedReports: {},
                formsData: {},
                formStatus: {},
                isActivated: false,
            });
            setCurrentStep(1);
            console.log('Draft reset and localStorage cleared');
        }
    };

    // Activate & Submit
    const activateAndSubmit = () => {
        alert('Port Call Activated & Submitted (saved locally).');
        setFormData((prev) => ({ ...prev, isActivated: true }));
        console.log('Port Call Activated:', formData);
    };

    const goToStep = (stepNum) => {
        console.log(`Navigating to step ${stepNum}`);
        setCurrentStep(stepNum);
    };

    return (
        <div className="dashboard">
            <InnerHeader />
            <InnerSubHeader />

            <div className="dashboard-body">
                <SidebarMenu />

                <main className="dashboard-content">
                    <div
                        className="wizard-controls"
                        style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginBottom: '1rem' }}
                    >
                        <button onClick={saveDraft}>Save Draft</button>
                        <button onClick={resetDraft}>Reset Draft</button>
                        <button onClick={activateAndSubmit} disabled={formData.isActivated}>
                            {formData.isActivated ? 'Activated' : 'Activate & Submit'}
                        </button>
                    </div>

                    {currentStep === 1 && (
                        <VoyagesStep
                            formData={formData.basicInfo}
                            updateBasicInfo={updateBasicInfo}
                            goToStep={goToStep}
                        />
                    )}

                    {currentStep === 2 && (
                        <PortCallDetailsStep
                            formData={formData}
                            setFormData={updateFormData}
                            goToStep={goToStep}
                        />
                    )}

                    {currentStep === 3 && (
                        <Step3LandingPage
                            data={formData}
                            onDataChange={updateFormData}
                            goToStep={goToStep}
                        />
                    )}
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default DemoPortCallWizard;
