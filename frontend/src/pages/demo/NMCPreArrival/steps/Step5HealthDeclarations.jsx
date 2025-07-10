// File: NMCPreArrival/steps/Step5HealthDeclarations.jsx
import React, { useState } from 'react';
import '../../styles/NMCStep.css';

const Step5HealthDeclarations = ({ data = {}, update, goToStep }) => {
    const [form, setForm] = useState({
        mdhUpload: data.mdhUpload || null,
        captainName: data.captainName || '',
        crewSymptoms: data.crewSymptoms || 0,
        passengerSymptoms: data.passengerSymptoms || 0,
        lastPortSanitation: data.lastPortSanitation || '',
        vesselSanitizedDate: data.vesselSanitizedDate || '',
        reportedToAuthority: data.reportedToAuthority || false,
        falForm1: data.falForm1 || null,
        falForm1Notes: data.falForm1Notes || '',
        securityForm: data.securityForm || null,
        securityLevel: data.securityLevel || '',
        securityNotes: data.securityNotes || ''
    });

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (field, file) => {
        setForm(prev => ({ ...prev, [field]: file }));
    };

    return (
        <div className="step-container">
            <h2>Step 5: General Declaration, Health & Security</h2>

            <h3>🧾 FAL Form 1 – General Declaration</h3>
            <div className="form-grid">
                <label>Upload General Declaration (PDF)</label>
                <input type="file" accept="application/pdf" onChange={e => handleFileChange('falForm1', e.target.files[0])} />
                {form.falForm1 && <span>Uploaded: {form.falForm1.name}</span>}

                <label>General Declaration Notes (optional)</label>
                <textarea rows="3" value={form.falForm1Notes} onChange={e => handleChange('falForm1Notes', e.target.value)} />
            </div>

            <h3>🩺 Maritime Declaration of Health (MDH)</h3>
            <div className="form-grid">
                <label>Upload Signed MDH Form</label>
                <input type="file" accept="application/pdf" onChange={e => handleFileChange('mdhUpload', e.target.files[0])} />
                {form.mdhUpload && <span>Uploaded: {form.mdhUpload.name}</span>}

                <label>Captain's Full Name</label>
                <input value={form.captainName} onChange={e => handleChange('captainName', e.target.value)} />

                <label>Number of Crew with Symptoms</label>
                <input type="number" min="0" value={form.crewSymptoms} onChange={e => handleChange('crewSymptoms', e.target.value)} />

                <label>Number of Passengers with Symptoms</label>
                <input type="number" min="0" value={form.passengerSymptoms} onChange={e => handleChange('passengerSymptoms', e.target.value)} />

                <label>Last Port Sanitation Certificate Port</label>
                <input value={form.lastPortSanitation} onChange={e => handleChange('lastPortSanitation', e.target.value)} />

                <label>Date of Last Vessel Sanitation</label>
                <input type="date" value={form.vesselSanitizedDate} onChange={e => handleChange('vesselSanitizedDate', e.target.value)} />

                <label>Reported to Port Authority?</label>
                <select value={form.reportedToAuthority} onChange={e => handleChange('reportedToAuthority', e.target.value === 'true')}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>

            <h3>🛡️ Security Information</h3>
            <div className="form-grid">
                <label>Upload Ship Security Form (PDF)</label>
                <input type="file" accept="application/pdf" onChange={e => handleFileChange('securityForm', e.target.files[0])} />
                {form.securityForm && <span>Uploaded: {form.securityForm.name}</span>}

                <label>Current Security Level</label>
                <select value={form.securityLevel} onChange={e => handleChange('securityLevel', e.target.value)}>
                    <option value="">-- Select --</option>
                    <option value="1">Level 1 – Normal</option>
                    <option value="2">Level 2 – Heightened</option>
                    <option value="3">Level 3 – Exceptional</option>
                </select>

                <label>Security Notes / Concerns</label>
                <textarea rows="3" value={form.securityNotes} onChange={e => handleChange('securityNotes', e.target.value)} />
            </div>
        </div>
    );
};

export default Step5HealthDeclarations;
