// src/pages/demo/PortCall/ScheduleTab.jsx
import React, { useState, useEffect } from 'react';

const ScheduleTab = ({ formData, updateForm }) => {
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errs = {};
        if (!formData.eta) errs.eta = 'ETA is required';
        if (!formData.etd) errs.etd = 'ETD is required';
        if (!formData.anchorageEntry) errs.anchorageEntry = 'Anchorage entry time is required';
        if (!formData.pilotBoarding) errs.pilotBoarding = 'Pilot boarding time is required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    useEffect(() => {
        validate();
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateForm({ [name]: value });
    };

    return (
        <div className="schedule-tab">
            <div className="form-group">
                <label>ETA</label>
                <input
                    type="datetime-local"
                    name="eta"
                    value={formData.eta || ''}
                    onChange={handleChange}
                />
                {errors.eta && <span className="error">{errors.eta}</span>}
            </div>

            <div className="form-group">
                <label>ETD</label>
                <input
                    type="datetime-local"
                    name="etd"
                    value={formData.etd || ''}
                    onChange={handleChange}
                />
                {errors.etd && <span className="error">{errors.etd}</span>}
            </div>

            <div className="form-group">
                <label>Anchorage Entry</label>
                <input
                    type="datetime-local"
                    name="anchorageEntry"
                    value={formData.anchorageEntry || ''}
                    onChange={handleChange}
                />
                {errors.anchorageEntry && <span className="error">{errors.anchorageEntry}</span>}
            </div>

            <div className="form-group">
                <label>Pilot Boarding</label>
                <input
                    type="datetime-local"
                    name="pilotBoarding"
                    value={formData.pilotBoarding || ''}
                    onChange={handleChange}
                />
                {errors.pilotBoarding && <span className="error">{errors.pilotBoarding}</span>}
            </div>
        </div>
    );
};

export default ScheduleTab;
