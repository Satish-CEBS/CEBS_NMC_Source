// src/pages/demo/PreArrival/Step5FinalReview.jsx

import React from 'react';
import '../Voyages/VoyagesStep.css';

const SummarySection = ({ title, data }) => {
    if (!data || Object.keys(data).length === 0) return null;

    return (
        <div className="summary-section">
            <h3>{title}</h3>
            <div className="summary-grid">
                {Object.entries(data).map(([key, value]) => (
                    <div className="summary-item" key={key}>
                        <strong>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</strong>
                        <span>{Array.isArray(value) ? value.join(', ') : (value?.name || value?.label || value || '—')}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Step5FinalReview = ({ formData, goToStep, onSubmit }) => {
    const { basicInfo, vesselDocuments, crewPassengerDocs, servicesRequested } = formData;

    const handleBack = () => goToStep(4);

    return (
        <div className="step-panel">
            <h2>Step 5: Final Review & Submit</h2>
            <p>Please verify all information below before submission:</p>

            <SummarySection title="Voyage Details" data={basicInfo} />
            <SummarySection title="Vessel Documents" data={vesselDocuments} />
            <SummarySection title="Crew & Passenger Documents" data={crewPassengerDocs} />
            <SummarySection title="Port Services Requested" data={{ servicesRequested }} />

            <div className="wizard-header-buttons">
                <button className="reset-button" onClick={handleBack}>← Back</button>
                <button className="submit-button" onClick={onSubmit}>✅ Submit Pre-Arrival</button>
            </div>
        </div>
    );
};

export default Step5FinalReview;
