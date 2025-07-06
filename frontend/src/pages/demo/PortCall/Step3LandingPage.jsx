import React, { useState, useEffect } from 'react';
import './Step3LandingPage.css';
import Step3Sidebar from './Step3Sidebar';

import DPGForm from '../forms/DPGForm';
import CargoForm from '../forms/CargoForm';
import ShipStoresForm from '../forms/ShipStoresForm';
import CrewForm from '../forms/CrewForm';
import PaxForm from '../forms/PaxForm';
import SecurityForm from '../forms/SecurityForm';

import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import StoreIcon from '@mui/icons-material/Store';
import GroupIcon from '@mui/icons-material/Group';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import SecurityIcon from '@mui/icons-material/Security';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const STORAGE_KEY = 'NMC_DRAFT_DATA';


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

    const Step3LandingPage = ({ data, onDataChange, goToPrev, goToStep }) => {
    // Destructure with default empty objects to avoid undefined errors
    const {
        basicInfo = {},
        selectedReports = {},
        formsData = {},
        formStatus = {},
        isActivated = false,
    } = data || {};

    // Local state mirrors data to allow form interaction
    const [crewCount, setCrewCount] = useState(basicInfo.crew_count || '');
    const [passengerCount, setPassengerCount] = useState(basicInfo.passenger_count || '');
    const [actualDraught, setActualDraught] = useState(basicInfo.actual_draught || '');
    const [airDraught, setAirDraught] = useState(basicInfo.air_draught || '');
    const [cargoBrief, setCargoBrief] = useState(basicInfo.cargo_brief || '');
    const [portCallPurpose, setPortCallPurpose] = useState(basicInfo.port_call_purpose || '');

    const [localSelectedReports, setLocalSelectedReports] = useState(selectedReports);
    const [localFormsData, setLocalFormsData] = useState(formsData);
    const [localFormStatus, setLocalFormStatus] = useState(formStatus);

    // Feedback messages
    const [basicSaveMessage, setBasicSaveMessage] = useState('');
    const [formSaveMessages, setFormSaveMessages] = useState({});
   // console.log('Step3LandingPage basicInfo:', basicInfo);
  //  console.log('Step3LandingPage formStatus:', formStatus);
    // Sync local states with incoming data props
    useEffect(() => {
        setCrewCount(basicInfo.crew_count || '');
        setPassengerCount(basicInfo.passenger_count || '');
        setActualDraught(basicInfo.actual_draught || '');
        setAirDraught(basicInfo.air_draught || '');
        setCargoBrief(basicInfo.cargo_brief || '');
        setPortCallPurpose(basicInfo.port_call_purpose || '');

        setLocalSelectedReports(selectedReports);
        setLocalFormsData(formsData);
        setLocalFormStatus(formStatus);
    }, [basicInfo, selectedReports, formsData, formStatus]);

    // Save all data to localStorage + propagate to parent
    const saveAllData = (overrides = {}) => {
        const updatedData = {
            basicInfo: {
                crew_count: crewCount,
                passenger_count: passengerCount,
                actual_draught: actualDraught,
                air_draught: airDraught,
                cargo_brief: cargoBrief,
                port_call_purpose: portCallPurpose,
                ...overrides.basicInfo,
            },
            selectedReports: { ...localSelectedReports, ...overrides.selectedReports },
            formsData: { ...localFormsData, ...overrides.formsData },
            formStatus: { ...localFormStatus, ...overrides.formStatus },
            isActivated: overrides.isActivated !== undefined ? overrides.isActivated : isActivated,
        };

        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));

        // Propagate to parent component (wizard)
        if (onDataChange) onDataChange(updatedData);

        return updatedData;
    };

    // Save basics handler
    const onSaveBasics = () => {
        saveAllData();
        setBasicSaveMessage('Basic port call info saved locally.');
        setTimeout(() => setBasicSaveMessage(''), 3000);
    };

    // Toggle reporting checkbox
    const toggleReport = (id) => {
        const newSelected = { ...localSelectedReports, [id]: !localSelectedReports[id] };
        setLocalSelectedReports(newSelected);
        saveAllData({ selectedReports: newSelected });
    };

    // Save individual form data
    const onSaveForm = (id, formData) => {
        const newFormsData = { ...localFormsData, [id]: formData };
        const newFormStatus = { ...localFormStatus, [id]: 'completed' };
        setLocalFormsData(newFormsData);
        setLocalFormStatus(newFormStatus);
        saveAllData({ formsData: newFormsData, formStatus: newFormStatus });
        setFormSaveMessages((prev) => ({ ...prev, [id]: `${id.toUpperCase()} form saved locally.` }));
        setTimeout(() => {
            setFormSaveMessages((prev) => ({ ...prev, [id]: '' }));
        }, 3000);
    };

    // Reset all step 3 data locally and in localStorage
    const resetStep3Data = () => {
        if (window.confirm('Reset all Step 3 data? This cannot be undone.')) {
            const resetData = {
                basicInfo: {},
                selectedReports: {},
                formsData: {},
                formStatus: {},
                isActivated: false,
            };
            localStorage.removeItem(STORAGE_KEY);
            setCrewCount('');
            setPassengerCount('');
            setActualDraught('');
            setAirDraught('');
            setCargoBrief('');
            setPortCallPurpose('');
            setLocalSelectedReports({});
            setLocalFormsData({});
            setLocalFormStatus({});
            setBasicSaveMessage('');
            setFormSaveMessages({});
            if (onDataChange) onDataChange(resetData);
        }
    };

    // Mark draft as activated and saved permanently locally
    const activateAndSubmit = () => {
        saveAllData({ isActivated: true });
        alert('Port Call Activated & Submitted (saved locally).');
    };

    // Render forms dynamically
    const renderForm = (id) => {
        const props = {
            savedData: localFormsData[id],
            onSave: (data) => onSaveForm(id, data),
        };
        switch (id) {
            case 'dpg':
                return <DPGForm {...props} />;
            case 'cargo':
                return <CargoForm {...props} />;
            case 'shipStores':
                return <ShipStoresForm {...props} />;
            case 'crew':
                return <CrewForm {...props} />;
            case 'pax':
                return <PaxForm {...props} />;
            case 'security':
                return <SecurityForm {...props} />;
            default:
                return null;
        }
    };
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
                                onDataChange({ ...data, basicInfo: { ...basicInfo, port_call_purpose: e.target.value } });
                            }}
                        >
                            <option value="">Select purpose</option>
                            {PORT_CALL_PURPOSES.map((purpose) => (
                                <option key={purpose} value={purpose}>
                                    {purpose}
                                </option>
                            ))}
                        </select>
                    </section>

                    {basicSaveMessage && <div className="save-message">{basicSaveMessage}</div>}

                    <button className="btn save-basics-btn" onClick={onSaveBasics}>
                        Save Basic Info
                    </button>

                    <section className="card reporting-checkboxes-card">
                        <h3 className="card-title">Reporting for this Port Call</h3>
                        <div className="checkboxes-container">
                            {REPORTING_CATEGORIES.map(({ id, label }) => (
                                <label key={id} className="reporting-label">
                                    <input
                                        type="checkbox"
                                        checked={!!localSelectedReports[id]}
                                        onChange={() => toggleReport(id)}
                                        className="reporting-checkbox"
                                    />
                                    {REPORTING_ICONS[id]}
                                    <span>{label}</span>
                                    <span className={`status-indicator ${localFormStatus[id]}`}>{localFormStatus[id]}</span>
                                </label>
                            ))}
                        </div>
                    </section>

                    {Object.entries(localSelectedReports).map(
                        ([id, selected]) =>
                            selected && (
                                <section key={id} className="card form-wrapper">
                                    {renderForm(id)}
                                    {formSaveMessages[id] && <div className="save-message">{formSaveMessages[id]}</div>}
                                </section>
                            )
                    )}

                    <div className="step3-navigation">
                        <button className="btn btn-back" onClick={goToPrev}>
                            ← Back
                        </button>
                    </div>

                    <div className="step3-actions" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                        <button className="btn btn-confirm"
                            variant="contained"
                            color="primary"
                            endIcon={<ArrowForwardIcon />}
                            onClick={() => goToStep(4)}
                            disabled={isActivated}
                        >
                            Continue
                        </button>
                    </div>


                    <div style={{ marginTop: '1rem' }}>
                        <button
                            className="btn btn-reset"
                            onClick={() => {
                                if (window.confirm('Reset all Step 3 data? This cannot be undone.')) {
                                    localStorage.removeItem(STORAGE_KEY);
                                    window.location.reload();
                                }
                            }}
                        >
                            Reset Data
                        </button>
                    </div>
                </main>

                <Step3Sidebar formData={basicInfo} formStatus={formStatus} />
            </div>
        </div>
    );
};

export default Step3LandingPage;
