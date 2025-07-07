import React, { useState } from 'react';
import './Step4ServicesRequested.css';
import {
    Checkbox,
    FormControlLabel,
    TextField
} from '@mui/material';

const portServicesList = [
    'Pilotage',
    'Towage',
    'Garbage Collection',
    'Bunkering',
    'Water Supply',
    'Crew Transfer',
    'Provisioning',
    'Medical Evacuation',
    'Quarantine Boarding',
    'Port Health Inspection',
    'Immigration Boarding',
    'Customs Boarding',
    'Freshwater Delivery',
    'Cargo Survey',
    'Other'
];

const Step4ServicesRequested = ({ data = [], update, goToStep }) => {
    const [selectedServices, setSelectedServices] = useState(data || []);
    const [otherNote, setOtherNote] = useState('');
    const [errors, setErrors] = useState([]);

    const toggleService = (service) => {
        const updated = selectedServices.includes(service)
            ? selectedServices.filter(s => s !== service)
            : [...selectedServices, service];

        setSelectedServices(updated);
        setErrors([]);
    };

    const handleNext = () => {
        const errs = [];
        if (selectedServices.length === 0) {
            errs.push('Please select at least one service.');
        }
        if (selectedServices.includes('Other') && !otherNote.trim()) {
            errs.push('Please specify the "Other" service requested.');
        }

        if (errs.length > 0) {
            setErrors(errs);
            return;
        }

        const updatedWithNote = selectedServices.filter(s => s !== 'Other');
        if (selectedServices.includes('Other')) {
            updatedWithNote.push(`Other: ${otherNote.trim()}`);
        }

        update(updatedWithNote);
        goToStep(5);
    };

    return (
        <div className="step4-container">
            <h2 className="step4-title">Step 4: Services Requested at Port</h2>
            <p className="step4-subtitle">Select all port services required for this vessel's call:</p>

            <div className="services-grid">
                {portServicesList.map((service) => (
                    <div key={service} className="service-option">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedServices.includes(service)}
                                    onChange={() => toggleService(service)}
                                />
                            }
                            label={service}
                        />
                    </div>
                ))}
            </div>

            {selectedServices.includes('Other') && (
                <div className="other-service-box">
                    <TextField
                        label="Specify Other Service"
                        fullWidth
                        value={otherNote}
                        onChange={(e) => setOtherNote(e.target.value)}
                        margin="normal"
                    />
                </div>
            )}

            {errors.length > 0 && (
                <div className="error-box">
                    {errors.map((err, idx) => (
                        <p key={idx} className="error-text">❌ {err}</p>
                    ))}
                </div>
            )}

            <div className="wizard-nav">
                <button className="back-button" onClick={() => goToStep(3)}>← Back</button>
                <button className="next-button" onClick={handleNext}>Continue to Step 5 →</button>
            </div>
        </div>
    );
};

export default Step4ServicesRequested;
