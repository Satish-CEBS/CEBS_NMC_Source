import React, { useState, useEffect } from 'react';
import './Step3LandingPage.css';

import DPGForm from './forms/DPGForm';
import CargoForm from './forms/CargoForm';
import ShipStoresForm from './forms/ShipStoresForm';
import CrewForm from './forms/CrewForm';
import PaxForm from './forms/PaxForm';
import SecurityForm from './forms/SecurityForm';

import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import StoreIcon from '@mui/icons-material/Store';
import GroupIcon from '@mui/icons-material/Group';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import SecurityIcon from '@mui/icons-material/Security';

const PORT_CALL_PURPOSES = [
    "Bunkering", "Loading", "Discharging", "Repairs", "Cruising",
    "Weather Restrictions", "Other", "Crew change", "Force Majeure",
    "Lifting", "Provisioning", "Processing Fish", "Arrested", "For Orders",
    "Stand By", "Lay Up", "Anchoring", "Towing", "Testing",
    "Medical Assistance", "Wrecked Ship", "Ship To Ship Operations",
    "Research", "Seismic Activity", "Diving", "Underwater Work",
];

const REPORTING_CATEGORIES = [
    { id: 'dpg', label: 'Dangerous Goods (DPG)' },
    { id: 'cargo', label: 'Cargo' },
    { id: 'shipStores', label: 'Ship Stores' },
    { id: 'crew', label: 'Crew' },
    { id: 'pax', label: 'Pax' },
    { id: 'security', label: 'Security' },
];

const REPORTING_ICONS = {
    dpg: <ReportProblemIcon className="icon-danger" />,
    cargo: <Inventory2Icon className="icon-cargo" />,
    shipStores: <StoreIcon className="icon-shipstores" />,
    crew: <GroupIcon className="icon-crew" />,
    pax: <AirlineSeatReclineNormalIcon className="icon-pax" />,
    security: <SecurityIcon className="icon-security" />,
};

const Step3LandingPage = ({ formData, setFormData, goToStep }) => {
    // Basic port call info persisted locally in component state
    const [crewCount, setCrewCount] = useState(formData.crew_count || '');
    const [passengerCount, setPassengerCount] = useState(formData.passenger_count || '');
    const [actualDraught, setActualDraught] = useState(formData.actual_draught || '');
    const [airDraught, setAirDraught] = useState(formData.air_draught || '');
    const [cargoBrief, setCargoBrief] = useState(formData.cargo_brief || '');
    const [portCallPurpose, setPortCallPurpose] = useState(formData.port_call_purpose || '');

    // Reporting selections and form data persisted locally here
    const [selectedReports, setSelectedReports] = useState({});
    const [formStatus, setFormStatus] = useState({
        dpg: 'pending',
        cargo: 'pending',
        shipStores: 'pending',
        crew: 'pending',
        pax: 'pending',
        security: 'pending',
    });

    // Form data storage per reporting category (simulate local persistence)
    const [formsData, setFormsData] = useState({
        dpg: null,
        cargo: null,
        shipStores: null,
        crew: null,
        pax: null,
        security: null,
    });

    // Success messages for basics and each form
    const [basicSaveMessage, setBasicSaveMessage] = useState('');
    const [formSaveMessages, setFormSaveMessages] = useState({});

    // Save basics: update parent and show message
    const onSaveBasics = () => {
        setFormData({
            ...formData,
            crew_count: crewCount,
            passenger_count: passengerCount,
            actual_draught: actualDraught,
            air_draught: airDraught,
            cargo_brief: cargoBrief,
            port_call_purpose: portCallPurpose,
        });
        setBasicSaveMessage('Basic port call info saved locally.');
        setTimeout(() => setBasicSaveMessage(''), 3000);
    };

    // Toggle reporting checkbox
    const toggleReport = (id) => {
        setSelectedReports((prev) => {
            const newVal = { ...prev, [id]: !prev[id] };
            return newVal;
        });
    };

    // Save individual form data locally
    const onSaveForm = (id, data) => {
        setFormsData((prev) => ({ ...prev, [id]: data }));
        setFormStatus((prev) => ({ ...prev, [id]: 'completed' }));
        setFormSaveMessages((prev) => ({ ...prev, [id]: `${id.toUpperCase()} form saved locally.` }));
        setTimeout(() => {
            setFormSaveMessages((prev) => ({ ...prev, [id]: '' }));
        }, 3000);
    };

    // Map ids to components, passing saved data and onSave callback
    const renderForm = (id) => {
        const commonProps = {
            savedData: formsData[id],
            onSave: (data) => onSaveForm(id, data),
        };
        switch (id) {
            case 'dpg': return <DPGForm {...commonProps} />;
            case 'cargo': return <CargoForm {...commonProps} />;
            case 'shipStores': return <ShipStoresForm {...commonProps} />;
            case 'crew': return <CrewForm {...commonProps} />;
            case 'pax': return <PaxForm {...commonProps} />;
            case 'security': return <SecurityForm {...commonProps} />;
            default: return null;
        }
    };

    // Sidebar summary
    const summaryItems = [
        { label: 'Ship Name', value: formData.name || 'N/A' },
        { label: 'IMO Number', value: formData.imo_no || 'N/A' },
        { label: 'MMSI Number', value: formData.mmsi_no || 'N/A' },
        { label: 'Voyage Number', value: formData.voyage_number || 'N/A' },
        { label: 'Port of Call', value: formData.call_port?.name || 'N/A' },
        { label: 'ETA', value: formData.eta || 'N/A' },
        { label: 'ETD', value: formData.etd || 'N/A' },
    ];

    const onBack = () => goToStep(2);
    const onConfirm = () => alert('Confirm & Activate functionality to be implemented');

    return (
        <div className="step3-container">
            <header className="step3-header">
                <h2>Port Call Registration - Reporting Forms</h2>
            </header>

            <div className="step3-content">
                <main className="step3-main">
                    <section className="card basics-card">
                        <h3 className="card-title">Crew, Passengers and Dimensions</h3>
                        <div className="input-row">
                            <label>
                                Number of Crew
                                <input
                                    type="number"
                                    min="0"
                                    value={crewCount}
                                    onChange={(e) => setCrewCount(e.target.value)}
                                    placeholder="Enter number of crew"
                                />
                            </label>
                            <label>
                                Number of Passengers
                                <input
                                    type="number"
                                    min="0"
                                    value={passengerCount}
                                    onChange={(e) => setPassengerCount(e.target.value)}
                                    placeholder="Enter number of passengers"
                                />
                            </label>
                        </div>
                        <div className="input-row">
                            <label>
                                Actual Draught
                                <input
                                    type="text"
                                    value={actualDraught}
                                    onChange={(e) => setActualDraught(e.target.value)}
                                    placeholder="Enter actual draught"
                                />
                            </label>
                            <label>
                                Air Draught
                                <input
                                    type="text"
                                    value={airDraught}
                                    onChange={(e) => setAirDraught(e.target.value)}
                                    placeholder="Enter air draught"
                                />
                            </label>
                        </div>
                    </section>

                    <section className="card cargo-brief-card">
                        <h3 className="card-title">Cargo Brief Description</h3>
                        <textarea
                            rows="4"
                            value={cargoBrief}
                            onChange={(e) => setCargoBrief(e.target.value)}
                            placeholder="Brief description of cargo"
                            className="cargo-textarea"
                        />
                    </section>

                    <section className="card port-purpose-card">
                        <h3 className="card-title">Port Call Purpose</h3>
                        <select
                            className="port-call-purpose-select"
                            value={portCallPurpose}
                            onChange={(e) => {
                                setPortCallPurpose(e.target.value);
                                setFormData({ ...formData, port_call_purpose: e.target.value });
                            }}
                        >
                            <option value="">Select purpose</option>
                            {PORT_CALL_PURPOSES.map((purpose) => (
                                <option key={purpose} value={purpose}>{purpose}</option>
                            ))}
                        </select>
                    </section>

                    {basicSaveMessage && (
                        <div className="save-message">{basicSaveMessage}</div>
                    )}

                    <button className="btn save-basics-btn" onClick={onSaveBasics}>
                        Save Port Call Basic Info
                    </button>

                    <section className="card reporting-checkboxes-card">
                        <h3 className="card-title">Reporting for this Port Call</h3>
                        <div className="checkboxes-container">
                            {REPORTING_CATEGORIES.map(({ id, label }) => (
                                <label key={id} className="reporting-label">
                                    <input
                                        type="checkbox"
                                        checked={!!selectedReports[id]}
                                        onChange={() => toggleReport(id)}
                                        className="reporting-checkbox"
                                    />
                                    {REPORTING_ICONS[id]}
                                    <span>{label}</span>
                                    <span className={`status-indicator ${formStatus[id]}`}>
                                        {formStatus[id]}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </section>

                    {Object.entries(selectedReports).map(
                        ([id, selected]) =>
                            selected && (
                                <section key={id} className="card form-wrapper">
                                    {renderForm(id)}
                                    {formSaveMessages[id] && (
                                        <div className="save-message">{formSaveMessages[id]}</div>
                                    )}
                                </section>
                            )
                    )}

                    <div className="step3-navigation">
                        <button className="btn btn-back" onClick={onBack}>
                            ← Back
                        </button>
                        <button className="btn btn-confirm" onClick={onConfirm}>
                            Confirm & Activate Port Call
                        </button>
                    </div>
                </main>

                <aside className="step3-sidebar">
                    <h3>Port Call Summary</h3>
                    <ul className="summary-list">
                        {summaryItems.map(({ label, value }) => (
                            <li key={label}>
                                <strong>{label}:</strong> {value}
                            </li>
                        ))}
                    </ul>

                    <h4>Form Status</h4>
                    <ul className="status-list">
                        {REPORTING_CATEGORIES.map(({ id, label }) => (
                            <li key={id}>
                                {label}:{" "}
                                <span className={`status-indicator ${formStatus[id]}`}>
                                    {formStatus[id]}
                                </span>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>
        </div>
    );
};

export default Step3LandingPage;
