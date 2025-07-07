import React, { useState, useEffect } from 'react';
import InnerHeader from '../../common/InnerHeader';
import InnerSubHeader from '../../common/InnerSubHeader';
import SidebarMenu from '../../common/SidebarMenu';
import Footer from '../../common/Footer';

import Step1VoyageDetails from './Step1VoyageDetails';
import Step2VesselDocuments from './Step2VesselDocuments';
import Step3CrewPassenger from './Step3CrewPassenger';
import Step4ServicesRequested from './Step4ServicesRequested';
import Step5SecurityClearance from './Step5SecurityClearance';
import Step6FinalReview from './Step6FinalReview';

import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import './PreArrivalWizard.css';

const STORAGE_KEY = 'PRE_ARRIVAL_DRAFT';

const PreArrivalWizard = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved
            ? JSON.parse(saved)
            : {
                voyageDetails: {},
                vesselDocuments: {},
                crewPassengerDocs: {},
                servicesRequested: [],
                securityClearance: {},
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
                voyageDetails: {},
                vesselDocuments: {},
                crewPassengerDocs: {},
                servicesRequested: [],
                securityClearance: {},
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
        alert('✅ Pre-Arrival Notification Submitted!');
        window.location.href = '/dashboard';
    };

    return (
        <div className="dashboard">
            <InnerHeader />
            <InnerSubHeader title="Pre-Arrival Notification Wizard" />
            <div className="dashboard-body">
                <SidebarMenu />
                <main className="dashboard-content">
                    <div className="wizard-header">
                        <h2>🧭 Pre-Arrival Wizard – Step {currentStep}</h2>
                        <div className="wizard-controls">
                            <button className="draft-btn" onClick={saveDraft}>
                                <SaveIcon style={{ fontSize: 18, marginRight: 6 }} />
                                Save Draft
                            </button>
                            <button className="draft-btn" onClick={resetDraft}>
                                <RestartAltIcon style={{ fontSize: 18, marginRight: 6 }} />
                                Reset Draft
                            </button>
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
                        <Step5SecurityClearance
                            data={formData.securityClearance}
                            update={(data) => updateSection('securityClearance', data)}
                            goToStep={goToStep}
                        />
                    )}

                    {currentStep === 6 && (
                        <Step6FinalReview
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
