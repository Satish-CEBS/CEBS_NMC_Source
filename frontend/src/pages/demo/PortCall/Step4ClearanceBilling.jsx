import React, { useState, useEffect } from 'react';
import './Step3LandingPage.css';
import { MenuItem, TextField, FormControlLabel, Checkbox } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Step4ClearanceBilling = ({ data, updateClearance, goToStep }) => {
    const [form, setForm] = useState({
        customs_clearance: 'Pending',
        immigration_cleared: false,
        berth_allocation: '',
        tariff_group: '',
        charges_applied: {
            pilotage: false,
            wharfage: false,
            towage: false,
        },
    });

    useEffect(() => {
        if (data) {
            setForm(prev => ({
                ...prev,
                ...data,
                charges_applied: {
                    ...prev.charges_applied,
                    ...data.charges_applied,
                },
            }));
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            charges_applied: {
                ...prev.charges_applied,
                [name]: checked,
            },
        }));
    };

    const handleToggle = (e) => {
        const { name, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: checked }));
    };

    const handleNext = () => {
        updateClearance(form);
        goToStep(5);
    };

    return (
        <div className="step-container">
            <h2>Step 4: Clearance & Billing</h2>
            <div className="step-form-grid">

                <TextField
                    select
                    label="Customs Clearance Status"
                    name="customs_clearance"
                    value={form.customs_clearance}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Cleared">Cleared</MenuItem>
                    <MenuItem value="Flagged">Flagged</MenuItem>
                </TextField>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={form.immigration_cleared}
                            onChange={handleToggle}
                            name="immigration_cleared"
                        />
                    }
                    label="Immigration Clearance"
                />

                <TextField
                    select
                    label="Berth Allocation"
                    name="berth_allocation"
                    value={form.berth_allocation}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="Berth A">Berth A</MenuItem>
                    <MenuItem value="Berth B">Berth B</MenuItem>
                    <MenuItem value="Berth C">Berth C</MenuItem>
                </TextField>

                <TextField
                    select
                    label="Tariff Group"
                    name="tariff_group"
                    value={form.tariff_group}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="Small Vessel">Small Vessel</MenuItem>
                    <MenuItem value="Medium Vessel">Medium Vessel</MenuItem>
                    <MenuItem value="Large Vessel">Large Vessel</MenuItem>
                </TextField>

                <div className="charges-checkboxes" style={{ marginTop: '1rem' }}>
                    <h4>Charges Applied</h4>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={form.charges_applied.pilotage}
                                onChange={handleCheckboxChange}
                                name="pilotage"
                            />
                        }
                        label="Pilotage"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={form.charges_applied.wharfage}
                                onChange={handleCheckboxChange}
                                name="wharfage"
                            />
                        }
                        label="Wharfage"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={form.charges_applied.towage}
                                onChange={handleCheckboxChange}
                                name="towage"
                            />
                        }
                        label="Towage"
                    />
                </div>
            </div>

            <div className="step-actions" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button className="next-step-btn" onClick={handleNext}>
                    Continue to Step 5 – Review & Submit
                    <ArrowForwardIcon style={{ marginLeft: '0.5rem' }} />
                </button>
            </div>
        </div>
    );
};

export default Step4ClearanceBilling;
