// src/pages/demo/DemoPortCallWizard.jsx

import React, { useState } from 'react';
import InnerHeader from '../common/InnerHeader';
import InnerSubHeader from '../common/InnerSubHeader';
import SidebarMenu from '../common/SidebarMenu';
import Footer from '../common/Footer';

import VoyagesStep from './Voyages/VoyagesStep';
import PortCallDetailsStep from './PortCall/PortCallDetailsStep';
import Step3LandingPage from './Step3LandingPage'; // New Step 3 page
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';

import './DemoPortCallWizard.css';

const DemoPortCallWizard = () => {
    // Current step state
    const [currentStep, setCurrentStep] = useState(1);

    // Central form data state for all steps
    const [formData, setFormData] = useState({
        vessel_id: '',
        voyage_number: '',
        call_sign: '',
        imo_no: '',
        mmsi_no: '',
        gross_tonnage: '',
        flag: '',
        last_port_id: '',
        next_port_id: '',
        eta: '',
        etd: '',
        purpose_id: '',
        prearrival_checklist: [],
        security_certificate: '',
        portCallId: '',
        // Include any additional form state needed for reporting forms etc.
    });

    // Handler to switch steps
    const goToStep = (stepNum) => {
        setCurrentStep(stepNum);
    };

    return (
        <div className="dashboard">
            <InnerHeader />
            <InnerSubHeader />

            <div className="dashboard-body">
                <SidebarMenu />

                <main className="dashboard-content">
                    <h1>
                        <DirectionsBoatIcon style={{ verticalAlign: 'middle', marginRight: 8 }} />
                        Pre-arrival Notification Wizard
                    </h1>


                    {currentStep === 1 && (
                        <VoyagesStep
                            formData={formData}
                            setFormData={setFormData}
                            goToStep={goToStep}
                        />
                    )}

                    {currentStep === 2 && (
                        <PortCallDetailsStep
                            formData={formData}
                            setFormData={setFormData}
                            goToStep={goToStep}
                        />
                    )}

                    {currentStep === 3 && (
                        <Step3LandingPage
                            formData={formData}
                            goToStep={goToStep}
                        />
                    )}

                    {/* Future steps can be added here */}
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default DemoPortCallWizard;
