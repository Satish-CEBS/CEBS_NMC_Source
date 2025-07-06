// src/pages/demo/PreArrival/PreArrivalWizard.jsx

import React, { useState, useEffect } from 'react';
import InnerHeader from '../../common/InnerHeader';
import InnerSubHeader from '../../common/InnerSubHeader';
import SidebarMenu from '../../common/SidebarMenu';
import Footer from '../../common/Footer';

import Step1VoyageDetails from './Step1VoyageDetails';
import Step2VesselDocuments from './Step2VesselDocuments';
import Step3CrewPassenger from './Step3CrewPassenger';
import Step4ServicesRequested from './Step4ServicesRequested';
import Step5FinalReview from './Step5FinalReview';

import './PreArrivalWizard.css';

const STORAGE_KEY = 'PRE_ARRIVAL_DRAFT';

const PreArrivalWizard = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved
            ? JSON.parse(saved)
            : {
                basicInfo: {},
                vesselDocuments: {},
                crewPassengerDocs: {},
                servicesRequested: [],
                isSubmitted: false
            };
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }, [formData]);

    const updateSection = (section, data) => {
        setFormData((prev) => ({
            ...prev,
            [section]: { ...prev[section], ...data }
        }));
    };

    const updateArrayField = (section, array) => {
        setFormData((prev) => ({
            ...prev,
            [section]: array
        }));
    };

    const saveDraft = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        alert('Draft saved!');
    };

    const resetDraft = () => {
        if (window.confirm('Are you sure you want to clear all entered data?')) {
            localStorage.removeItem(STORAGE_KEY);
            setFormData({
                basicInfo: {},
                vesselDocuments: {},
                crewPassengerDocs: {},
                servicesRequested: [],
                isSubmitted: false
            });
            setCurrentStep(1);
        }
    };

    const goToStep = (step) => {
        setCurrentStep(step);
    };

    const handleFinalSubmit = () => {
        const updatedData = { ...formData, isSubmitted: true };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
        setFormData(updatedData);
        alert('Pre-Arrival Notification Submitted!');
        window.location.href = '/dashboard';
    };

    const updateBasicInfo = (basicInfo) => {
        setFormData((prev) => {
            const updated = { ...prev, basicInfo };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            console.log('[Pre-Arrival] Updated basicInfo:', basicInfo);
            return updated;
        });
    };

    return (
        <div className="dashboard">
            <InnerHeader />
            <InnerSubHeader />
            <div className="dashboard-body">
                <SidebarMenu />
                <main className="dashboard-content">
                    <div className="wizard-header">
                        <h2>Pre-Arrival Notification Wizard</h2>
                        <div className="wizard-controls">
                            <button className="draft-btn" onClick={saveDraft}>Save Draft</button>
                            <button className="draft-btn" onClick={resetDraft}>Reset Draft</button>
                        </div>
                    </div>

                    {currentStep === 1 && (
                        <Step1VoyageDetails
                            formData={formData.voyageDetails}
                            updateBasicInfo={(data) => updateSection('voyageDetails', data)}
                            goToStep={goToStep}
                        />
                    )}

                    {currentStep === 2 && (
                        <Step2VesselDocuments
                            data={formData.vesselDocuments}
                            update={(data) => updateSection('vesselDocuments', data)}
                            goToStep={goToStep}
                        />
                    )}

                    {currentStep === 3 && (
                        <Step3CrewPassenger
                            data={formData.crewPassengerDocs}
                            update={(data) => updateSection('crewPassengerDocs', data)}
                            goToStep={goToStep}
                        />
                    )}

                    {currentStep === 4 && (
                        <Step4ServicesRequested
                            selected={formData.servicesRequested}
                            update={(arr) => updateArrayField('servicesRequested', arr)}
                            goToStep={goToStep}
                        />
                    )}

                    {currentStep === 5 && (
                        <Step5FinalReview
                            formData={formData}
                            goToStep={goToStep}
                            onSubmit={handleFinalSubmit}
                        />
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default PreArrivalWizard;
