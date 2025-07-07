// src/pages/demo/PreArrival/Step5SecurityClearance.jsx

import React, { useState } from 'react';
import './Step5SecurityClearance.css';

const Step5SecurityClearance = ({ data = {}, update, goToStep }) => {
    const [securityLevel, setSecurityLevel] = useState(data.securityLevel || '');
    const [remarks, setRemarks] = useState(data.remarks || '');
    const [files, setFiles] = useState(data.files || {});

    const handleFileChange = (e, docKey) => {
        const file = e.target.files[0];
        if (file) {
            const updated = { ...files, [docKey]: file };
            setFiles(updated);
        }
    };

    const handleNext = () => {
        if (!securityLevel) {
            alert('Please select Security Level');
            return;
        }

        update({
            securityLevel,
            remarks,
            files
        });

        goToStep(6);
    };

    return (
        <div className="step-panel">
            <h2>Step 5: Security & Port Clearance</h2>
            <p>Please provide the required ISPS & port clearance documents.</p>

            <div className="security-grid">
                <div className="form-group">
                    <label>ISPS Security Level</label>
                    <select
                        value={securityLevel}
                        onChange={(e) => setSecurityLevel(e.target.value)}
                    >
                        <option value="">-- Select Level --</option>
                        <option value="Level 1">Level 1 – Normal</option>
                        <option value="Level 2">Level 2 – Heightened</option>
                        <option value="Level 3">Level 3 – Exceptional</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>ISPS Certificate</label>
                    <input type="file" onChange={(e) => handleFileChange(e, 'ispsCertificate')} />
                    <p>{files.ispsCertificate?.name || 'No file selected'}</p>
                </div>

                <div className="form-group">
                    <label>Last Port State Control Inspection Report</label>
                    <input type="file" onChange={(e) => handleFileChange(e, 'pscReport')} />
                    <p>{files.pscReport?.name || 'No file selected'}</p>
                </div>

                <div className="form-group">
                    <label>Other Security Document</label>
                    <input type="file" onChange={(e) => handleFileChange(e, 'otherSecurity')} />
                    <p>{files.otherSecurity?.name || 'No file selected'}</p>
                </div>

                <div className="form-group full-width">
                    <label>Remarks</label>
                    <textarea
                        rows="4"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Enter any security-related notes or alerts..."
                    />
                </div>
            </div>

            <div className="wizard-header-buttons">
                <button className="reset-button" onClick={() => goToStep(4)}>← Back</button>
                <button className="submit-button" onClick={handleNext}>Continue to Final Review →</button>
            </div>
        </div>
    );
};

export default Step5SecurityClearance;
