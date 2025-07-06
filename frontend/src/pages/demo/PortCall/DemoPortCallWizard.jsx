import React, { useState, useEffect } from 'react';
import InnerHeader from '../../common/InnerHeader';
import InnerSubHeader from '../../common/InnerSubHeader';
import SidebarMenu from '../../common/SidebarMenu';
import Footer from '../../common/Footer';

import VoyagesStep from '../Voyages/VoyagesStep';
import PortCallDetailsStep from './PortCallDetailsStep';
import Step3LandingPage from './Step3LandingPage';
import Step4ClearanceBilling from './Step4ClearanceBilling';
import Step5ReviewSubmit from './Step5ReviewSubmit';

import './DemoPortCallWizard.css';

const STORAGE_KEY = 'NMC_FORM_DATA';

const DemoPortCallWizard = () => {
    const [currentStep, setCurrentStep] = useState(1);

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
            clearance: {},
            isActivated: false,
        };
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        console.log('Saved formData to localStorage:', formData);
    }, [formData]);

    const updateFormData = (updatedData) => {
        setFormData((prev) => {
            const newData = { ...prev, ...updatedData };
            console.log('Updated centralized formData:', newData);
            return newData;
        });
    };

    const updateBasicInfo = (basicInfo) => {
        setFormData((prev) => {
            const newData = { ...prev, basicInfo };
            console.log('Updated basicInfo:', basicInfo);
            return newData;
        });
    };

    const updateClearance = (clearance) => {
        setFormData((prev) => {
            const newData = { ...prev, clearance };
            console.log('Updated clearance info:', clearance);
            return newData;
        });
    };

    const activateAndSubmit = () => {
        const finalData = { ...formData, isActivated: true };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(finalData));
        setFormData(finalData);
        console.log('Port Call Final Submission:', finalData);
        window.location.href = '/dashboard';
    };

    const saveDraft = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        console.log('Draft saved:', formData);
    };

    const resetDraft = () => {
        if (window.confirm('Are you sure you want to reset the entire draft? This will erase all your data.')) {
            localStorage.removeItem(STORAGE_KEY);
            setFormData({
                basicInfo: {},
                selectedReports: {},
                formsData: {},
                formStatus: {},
                clearance: {},
                isActivated: false,
            });
            setCurrentStep(1);
            console.log('Draft reset and localStorage cleared');
        }
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
                    <div className="wizard-controls" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginBottom: '1rem' }}>
                        <button onClick={saveDraft}>Save Draft</button>
                        <button onClick={resetDraft}>Reset Draft</button>
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

                    {currentStep === 4 && (
                        <Step4ClearanceBilling
                            data={formData.clearance || {}}
                            updateClearance={updateClearance}
                            goToStep={goToStep}
                        />
                    )}

                    {currentStep === 5 && (
                        <Step5ReviewSubmit
                            data={formData}
                            goToStep={goToStep}
                            onFinalSubmit={activateAndSubmit}
                        />
                    )}
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default DemoPortCallWizard;
