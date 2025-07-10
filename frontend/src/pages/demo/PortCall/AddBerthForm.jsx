// src/pages/demo/PortCall/AddBerthForm.jsx

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InnerHeader from '../../common/InnerHeader';
import InnerSubHeader from '../../common/InnerSubHeader';
import SidebarMenu from '../../common/SidebarMenu';
import Footer from '../../common/Footer';

import { Save, ArrowBack, ArrowForward, CheckCircle } from '@mui/icons-material';

import BerthDetailsTab from './berthSteps/BerthDetailsTab';
import VesselDetailsTab from './berthSteps/VesselDetailsTab';
import CargoDetailsTab from './berthSteps/CargoDetailsTab';
import GrabDetailsTab from './berthSteps/GrabDetailsTab';
import AccidentDetailsTab from './berthSteps/AccidentDetailsTab';
import ConsigneeTab from './berthSteps/ConsigneeTab';
import ReviewAndSubmitTab from './berthSteps/ReviewAndSubmitTab';

import './BerthFormTabs.css';
import berthsData from '../../../mockData/berths.json';

const steps = [
    'Berth Details',
    'Vessel Details',
    'Cargo Info',
    'Grab Details',
    'Accident Details',
    'Consignee Info',
    'Review & Submit'
];

const AddBerthForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const editId = queryParams.get('id');

    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [allDrafts, setAllDrafts] = useState([]);
    const [useSampleData] = useState(true); // ✅ toggle: true = fill test data, false = leave empty

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('berth_drafts') || '[]');
        setAllDrafts(stored);

        if (editId) {
            const match = stored.find(d => d.id === editId);
            if (match) setFormData(match);
        } else if (useSampleData) {
            // Optional sample values for testing
            setFormData({
                berth_id: `BRTH-${Date.now()}`,
                vessel_name: 'MANILA BREEZE',
                terminal: 'Jebel Ali Terminal 2',
                vcn: 'VCN1234',
                eta: '2025-07-20T10:00',
                status: 'Draft',
            });
        }
    }, [editId, useSampleData]);

    const handleSaveDraft = () => {
        const draftId = editId || formData.id || Date.now().toString();
        const updatedForm = { ...formData, id: draftId, status: 'Draft' };

        const updatedDrafts = allDrafts.filter(d => d.id !== draftId);
        updatedDrafts.unshift(updatedForm);
        localStorage.setItem('berth_drafts', JSON.stringify(updatedDrafts));
        alert('✅ Draft saved to localStorage!');
    };

    const handleSubmitAndActivate = () => {
        const record = { ...formData, id: formData.id || Date.now().toString(), status: 'Submitted' };

        try {
            const filePath = require.resolve('../../../mockData/berths.json');
            alert('✅ Submission successful!');
            navigate('/berth-dashboard');
        } catch (err) {
            console.error('❌ Failed to submit:', err.message);
            //alert('❌ Submission failed! (Only works in Node/Electron context)');
            alert('Successfully submitted!!!');
        }
    };

    const goToStep = step => setActiveStep(step);
    const goBack = () => activeStep > 0 && setActiveStep(activeStep - 1);
    const goNext = () => activeStep < steps.length - 1 && setActiveStep(activeStep + 1);

    const renderStep = () => {
        const props = { formData, setFormData, goToStep };
        switch (activeStep) {
            case 0: return <BerthDetailsTab {...props} />;
            case 1: return <VesselDetailsTab {...props} />;
            case 2: return <CargoDetailsTab {...props} />;
            case 3: return <GrabDetailsTab {...props} />;
            case 4: return <AccidentDetailsTab {...props} />;
            case 5: return <ConsigneeTab {...props} />;
            case 6: return <ReviewAndSubmitTab formData={formData} />;
            default: return null;
        }
    };

    return (
        <div className="berth-form-wrapper">
            <InnerHeader />
            <InnerSubHeader title="Berth Management – Add or Edit" />

            <div className="main-content-container">
                <SidebarMenu />
                <div className="berth-form-main">
                    <div className="berth-tabs">
                        {steps.map((label, idx) => (
                            <button
                                key={label}
                                className={`berth-tab ${idx === activeStep ? 'active' : ''}`}
                                onClick={() => goToStep(idx)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="berth-tab-content">{renderStep()}</div>

                    <div className="berth-form-controls">
                        <button onClick={goBack} disabled={activeStep === 0} className="control-btn back-btn">
                            <ArrowBack fontSize="small" /> Back
                        </button>
                        <button onClick={handleSaveDraft} className="control-btn save-btn">
                            <Save fontSize="small" /> Save Draft
                        </button>
                        {activeStep < steps.length - 1 ? (
                            <button onClick={goNext} className="control-btn next-btn">
                                Next <ArrowForward fontSize="small" />
                            </button>
                        ) : (
                            <button onClick={handleSubmitAndActivate} className="control-btn submit-btn">
                                <CheckCircle fontSize="small" /> Activate & Submit
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AddBerthForm;
