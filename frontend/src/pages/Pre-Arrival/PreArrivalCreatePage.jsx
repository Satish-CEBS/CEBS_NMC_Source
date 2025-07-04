/**
 * @component   PreArrivalCreatePage.jsx
 * @description Multi-step form to create a Pre-arrival Notification
 * @author      CEBS
 * @license     STRICTLY CONFIDENTIAL
 */
import React, { useState } from 'react';
import axios from 'axios';

import Step1_VesselInfo from './Steps/Step1_VesselInfo';
import Step2_PortInfo from './Steps/Step2_PortInfo';
import Step3_Services from './Steps/Step3_Services';
import Step4_UploadDocs from './Steps/Step4_UploadDocs';
import Step5_Review from './Steps/Step5_Review';
import StepperControls from './Steps/StepperControls';

import InnerHeader from '../common/InnerHeader';
import InnerSubHeader from '../common/InnerSubHeader';
import SidebarMenu from '../common/SidebarMenu';
import Footer from '../common/Footer';

import './PreArrivalCreatePage.css';

const PreArrivalCreatePage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [validationErrors, setValidationErrors] = useState({});

    const goToStep = (direction) => {
        if (direction === 'next' && step < 5) setStep(step + 1);
        if (direction === 'back' && step > 1) setStep(step - 1);
    };

    const stepProps = { formData, setFormData, validationErrors };
   


    const handleSubmitFinal = async (portCallIdRaw) => {
        const portCallId = parseInt(
            typeof portCallIdRaw === 'object' ? portCallIdRaw?.port_call_id : portCallIdRaw
        );

        console.log('🚀 Submitting with portCallId:', portCallId, 'Type:', typeof portCallId);

        if (isNaN(portCallId)) {
            console.error('❌ Invalid portCallId:', portCallIdRaw);
            alert('❌ Submission failed due to invalid ID');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/prearrival/submit/${portCallId}`, {
                method: 'POST'
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            const result = await response.json();
            console.log('✅ Submission successful:', result);
            alert('✅ Pre-arrival notification submitted successfully!');
        } catch (error) {
            console.error('❌ Final submission failed:', error);
            alert('❌ Submission failed. Please try again.');
        }
    };




    const renderStep = () => {
        switch (step) {
            case 1: return <Step1_VesselInfo {...stepProps} />;
            case 2: return <Step2_PortInfo {...stepProps} />;
            case 3: return <Step3_Services {...stepProps} />;
            case 4: return <Step4_UploadDocs {...stepProps} />;
            case 5: return (
                <Step5_Review
                    formData={formData}
                    goToStep={goToStep}
                    setFormData={setFormData}
                    submitFinal={handleSubmitFinal}
                />
            );

            default: return null;
        }
    };
    const handleSaveDraft = () => {
        console.log('📝 Save Draft clicked (dummy for now)');
        // Future enhancement: integrate draft saving API
    };


    return (
        <div className="prearrival-wrapper">
            <InnerHeader />
            <InnerSubHeader />
            <div className="prearrival-content-area">
                <SidebarMenu />
                <div className="prearrival-form-container">
                    <h2>Add New Pre-arrival Notification</h2>
                    <div className="prearrival-step-indicator">Step {step} of 5</div>
                    {renderStep()}
                    <StepperControls
                        step={step}
                        goToStep={goToStep}
                        formData={formData}
                        setValidationErrors={setValidationErrors}
                        saveDraft={handleSaveDraft}
                        submitFinal={handleSubmitFinal}
                    />

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PreArrivalCreatePage;
