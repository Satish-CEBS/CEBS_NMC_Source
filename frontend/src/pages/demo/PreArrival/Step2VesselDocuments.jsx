// src/pages/demo/PreArrival/Step2VesselDocuments.jsx

import React, { useState, useEffect } from 'react';
import '../Voyages/VoyagesStep.css';

const requiredDocs = [
    { key: 'fal_form_1', label: 'FAL Form 1 – General Declaration', required: true },
    { key: 'security_certificate', label: 'Security Certificate', required: false },
    { key: 'health_certificate', label: 'Maritime Health Certificate', required: false },
    { key: 'checklist', label: 'Pre-arrival Checklist', required: false }
];

const Step2VesselDocuments = ({ data = {}, update, goToStep }) => {
    const [localData, setLocalData] = useState({ ...data });
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setLocalData({ ...data });
    }, [data]);

    const handleFileChange = (e, key) => {
        const file = e.target.files[0];
        const updated = { ...localData, [key]: file };
        setLocalData(updated);
        update(updated);
    };

    const handleNext = () => {
        const missing = requiredDocs.filter(doc => doc.required && !localData[doc.key]);
        if (missing.length > 0) {
            setErrors(missing.map(doc => `Please upload ${doc.label}`));
            return;
        }

        goToStep(3);
    };

    const handleBack = () => {
        goToStep(1);
    };

    return (
        <div className="step-panel">
            <h2>Step 2: Upload Vessel Documents</h2>

            {requiredDocs.map((doc) => (
                <div key={doc.key} className="section">
                    <label>{doc.label} {doc.required && <span style={{ color: 'red' }}>*</span>}</label>
                    <p>Upload {doc.required ? 'required' : 'optional'} document as PDF or image.</p>
                    <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, doc.key)}
                    />
                    {localData[doc.key] && (
                        <p style={{ marginTop: '0.3rem', fontSize: '0.85rem' }}>
                            ✅ File selected: <strong>{localData[doc.key].name}</strong>
                        </p>
                    )}
                </div>
            ))}

            {errors.length > 0 && (
                <div className="error-box">
                    {errors.map((err, idx) => (
                        <p className="error-text" key={idx}>{err}</p>
                    ))}
                </div>
            )}

            <div className="wizard-header-buttons">
                <button className="reset-button" onClick={handleBack}>← Back</button>
                <button className="submit-button" onClick={handleNext}>Continue to Step 3 →</button>
            </div>
        </div>
    );
};

export default Step2VesselDocuments;
