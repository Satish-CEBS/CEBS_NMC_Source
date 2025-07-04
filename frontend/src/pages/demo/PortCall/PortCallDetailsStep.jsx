// src/components/PortCall/PortCallDetailsStep.jsx
import React, { useEffect, useState } from 'react';
import './PortCallDetailsStep.css';

const PortCallDetailsStep = ({ formData, setFormData, goToStep }) => {
    const [ports, setPorts] = useState([]);
    const [purposeOptions] = useState([
        'Cargo Operations',
        'Crew Change',
        'Repairs',
        'Bunkering',
        'Medical',
        'Other'
    ]);

    useEffect(() => {
        fetch('/mockData/ports.json')
            .then(res => res.json())
            .then(data => setPorts(data));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...formData, [name]: value };

        if (name === 'last_port_id') {
            const selected = ports.find(p => p.port_id.toString() === value);
            if (selected) updatedData.arrival_from_country = selected.country;
        }
        if (name === 'next_port_id') {
            const selected = ports.find(p => p.port_id.toString() === value);
            if (selected) updatedData.destination_country = selected.country;
        }

        setFormData(updatedData);
    };

    return (
        <div className="port-call-details-container">
            <h2>Port Call Details</h2>

            <div className="form-grid">
                <label>
                    Voyage Number:
                    <input
                        type="text"
                        name="voyage_number"
                        value={formData.voyage_number || ''}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    ETA to Port:
                    <input
                        type="datetime-local"
                        name="eta"
                        value={formData.eta || ''}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    ETD from Port:
                    <input
                        type="datetime-local"
                        name="etd"
                        value={formData.etd || ''}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Purpose of Call:
                    <select
                        name="purpose_id"
                        value={formData.purpose_id || ''}
                        onChange={handleChange}
                    >
                        <option value="">-- Select --</option>
                        {purposeOptions.map((p, idx) => (
                            <option key={idx} value={p}>{p}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Last Port Visited:
                    <select
                        name="last_port_id"
                        value={formData.last_port_id || ''}
                        onChange={handleChange}
                    >
                        <option value="">-- Select --</option>
                        {ports.map(port => {
                            const flagEmoji = port.flag_code
                                ? String.fromCodePoint(...[...port.flag_code.toUpperCase()].map(c => 127397 + c.charCodeAt()))
                                : '';
                            return (
                                <option key={port.port_id} value={port.port_id}>
                                    {`${port.port_name} (${port.country}) ${flagEmoji}`}
                                </option>
                            );
                        })}
                    </select>
                </label>

                <label>
                    Next Port of Call:
                    <select
                        name="next_port_id"
                        value={formData.next_port_id || ''}
                        onChange={handleChange}
                    >
                        <option value="">-- Select --</option>
                        {ports.map(port => {
                            const flagEmoji = port.flag_code
                                ? String.fromCodePoint(...[...port.flag_code.toUpperCase()].map(c => 127397 + c.charCodeAt()))
                                : '';
                            return (
                                <option key={port.port_id} value={port.port_id}>
                                    {`${port.port_name} (${port.country}) ${flagEmoji}`}
                                </option>
                            );
                        })}
                    </select>
                </label>

                <label>
                    Arrival From Country:
                    <input
                        type="text"
                        name="arrival_from_country"
                        value={formData.arrival_from_country || ''}
                        readOnly
                    />
                </label>

                <label>
                    Destination Country:
                    <input
                        type="text"
                        name="destination_country"
                        value={formData.destination_country || ''}
                        readOnly
                    />
                </label>

                <label>
                    Number of Crew:
                    <input
                        type="number"
                        name="number_of_crew"
                        value={formData.number_of_crew || ''}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Number of Passengers:
                    <input
                        type="number"
                        name="number_of_passengers"
                        value={formData.number_of_passengers || ''}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div className="wizard-buttons">
                <button onClick={() => goToStep(1)}>← Prev</button>
                <button onClick={() => goToStep(3)}>Next →</button>
            </div>
        </div>
    );
};

export default PortCallDetailsStep;
