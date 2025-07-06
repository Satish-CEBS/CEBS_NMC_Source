// src/pages/demo/PreArrival/Step3CrewPassenger.jsx

import React, { useState, useEffect } from 'react';
import '../Voyages/VoyagesStep.css';

const crewDocs = [
    { key: 'fal_form_4', label: 'FAL Form 4 – Crew Effects Declaration', required: false },
    { key: 'fal_form_5', label: 'FAL Form 5 – Crew List', required: true },
    { key: 'fal_form_6', label: 'FAL Form 6 – Passenger List', required: false },
    { key: 'fal_form_7', label: 'FAL Form 7 – Dangerous Goods Manifest', required: false }
];

const Step3CrewPassenger = ({ data = {}, update, goToStep }) => {
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
        const missing = crewDocs.filter(doc => doc.required && !localData[doc.key]);
        if (missing.length > 0) {
            setErrors(missing.map(doc => `Please upload ${doc.label}`));
            return;
        }

        goToStep(4);
    };

    const handleBack = () => {
        goToStep(2);
    };

    return (
        <div className="step-panel">
            <h2>Step 3: Upload Crew & Passenger Documentation</h2>

            {crewDocs.map((doc) => (
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
                <button className="submit-button" onClick={handleNext}>Continue to Step 4 →</button>
            </div>
        </div>
    );
};

export default Step3CrewPassenger;
