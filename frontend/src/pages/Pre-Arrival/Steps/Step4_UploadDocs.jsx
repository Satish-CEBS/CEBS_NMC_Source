/**
 * @component   Step4_UploadDocs.jsx
 * @description Step 4 - Upload Pre-arrival Checklist and Security Certificate
 */

import React from 'react';
import './StepperControls.css'; 

const Step4_UploadDocs = ({ formData, setFormData }) => {
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        }
    };

    return (
        <div className="step-container">
            <h3 className="step-title">Step 4 of 5 – Document Uploads</h3>

            <div className="form-group">
                <label htmlFor="prearrival_checklist">Pre-arrival Checklist (PDF)</label>
                <input
                    type="file"
                    id="prearrival_checklist"
                    name="prearrival_checklist"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="security_certificate">Security Certificate (PDF)</label>
                <input
                    type="file"
                    id="security_certificate"
                    name="security_certificate"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
};


export default Step4_UploadDocs;
