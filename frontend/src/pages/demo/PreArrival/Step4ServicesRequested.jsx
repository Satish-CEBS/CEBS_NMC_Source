// src/pages/demo/PreArrival/Step4ServicesRequested.jsx

import React, { useState, useEffect } from 'react';
import '../Voyages/VoyagesStep.css';
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
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

const Step4ServicesRequested = ({ selected = [], update, goToStep }) => {
    const [selectedServices, setSelectedServices] = useState(selected || []);
    const [otherNote, setOtherNote] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setSelectedServices(selected || []);
    }, [selected]);

    const toggleService = (service) => {
        const isSelected = selectedServices.includes(service);
        const updated = isSelected
            ? selectedServices.filter((s) => s !== service)
            : [...selectedServices, service];

        setSelectedServices(updated);
        update(updated);

        // Reset Other note if deselected
        if (service === 'Other' && isSelected) {
            setOtherNote('');
        }
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

        // Save "Other" note
        const updatedWithNote = [...selectedServices];
        if (selectedServices.includes('Other')) {
            updatedWithNote.push(`Other: ${otherNote.trim()}`);
        }

        update(updatedWithNote);
        goToStep(5);
    };

    const handleBack = () => {
        goToStep(3);
    };

    return (
        <div className="step-panel">
            <h2>Step 4: Services Requested at Port</h2>

            <p>Select all port services required for this vessel's call:</p>
            <FormGroup className="checkbox-group">
                {portServicesList.map((service) => (
                    <FormControlLabel
                        key={service}
                        control={
                            <Checkbox
                                checked={selectedServices.includes(service)}
                                onChange={() => toggleService(service)}
                            />
                        }
                        label={service}
                    />
                ))}
            </FormGroup>

            {selectedServices.includes('Other') && (
                <TextField
                    label="Specify Other Service"
                    fullWidth
                    value={otherNote}
                    onChange={(e) => setOtherNote(e.target.value)}
                    margin="normal"
                />
            )}

            {errors.length > 0 && (
                <div className="error-box">
                    {errors.map((err, idx) => (
                        <p className="error-text" key={idx}>{err}</p>
                    ))}
                </div>
            )}

            <div className="wizard-header-buttons">
                <button className="reset-button" onClick={handleBack}>← Back</button>
                <button className="submit-button" onClick={handleNext}>Continue to Step 5 →</button>
            </div>
        </div>
    );
};

export default Step4ServicesRequested;
