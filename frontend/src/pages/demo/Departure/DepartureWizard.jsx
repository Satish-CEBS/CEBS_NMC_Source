// --- Redesigned Responsive DepartureWizard.jsx with Vessel Flag, Auto-Fill, Port Dropdown, Responsive Button ---
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../layout/PageWrapper';
import vesselsList from '../../../mockData/vessels.json';
import portsList from '../../../mockData/locations.json';
import './DepartureWizard.css';

const country3to2 = {
    ARE: 'ae', BHS: 'bs', PAN: 'pa', DNK: 'dk', LBR: 'lr', USA: 'us', GBR: 'gb', ITA: 'it', SGP: 'sg',
    KOR: 'kr', CHN: 'cn', BRA: 'br', MNE: 'me', FRA: 'fr', HKG: 'hk', IND: 'in', JPN: 'jp', SAU: 'sa',
    NLD: 'nl', DEU: 'de', ESP: 'es', PRT: 'pt', TUR: 'tr', GRC: 'gr', POL: 'pl', UKR: 'ua', RUS: 'ru',
    ZAF: 'za', OMN: 'om', QAT: 'qa', BHR: 'bh', KWT: 'kw', IRN: 'ir', IRQ: 'iq', YEM: 'ye', PAK: 'pk'
};

const importAllFlags = (r) => {
    let flags = {};
    r.keys().forEach((key) => {
        const code = key.replace('./', '').replace('.png', '').toLowerCase();
        flags[code] = r(key);
    });
    return flags;
};
const flagMap = importAllFlags(require.context('../../../assets/images/flags', false, /\.png$/));

const getFlagImage = (countryCode3) => {
    if (!countryCode3) return flagMap['default'];
    const code = country3to2[countryCode3] || countryCode3.toLowerCase();
    return flagMap[code] || flagMap['default'];
};

const DepartureWizard = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        vesselName: '',
        imoNumber: '',
        callSign: '',
        voyageNumber: '',
        departurePort: '',
        eta: '',
        etd: ''
    });

    const [errors, setErrors] = useState({});
    const [vesselOptions, setVesselOptions] = useState([]);
    const [portOptions, setPortOptions] = useState([]);

    useEffect(() => {
        setVesselOptions(vesselsList || []);
        const filteredPorts = portsList?.filter(p =>
            (p.type && p.type.toLowerCase().includes('port')) ||
            (p.name && p.name.toLowerCase().includes('port'))
        ) || [];
        setPortOptions(filteredPorts);
    }, []);

    const handleVesselChange = (e) => {
        const selectedName = e.target.value;
        const vessel = vesselOptions.find((v) => v.name === selectedName);
        setForm({
            ...form,
            vesselName: selectedName,
            imoNumber: vessel?.imo_no || '',
            callSign: vessel?.call_sign || ''
        });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        Object.keys(form).forEach((key) => {
            if (!form[key]) newErrors[key] = 'Required';
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        alert('✅ Departure Notification Submitted!');
        console.log('Submitted Data:', form);
        navigate('/dashboard');
    };
    const [vesselSearch, setVesselSearch] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const filteredVessels = vesselOptions.filter((v) =>
    (v.name?.toLowerCase().includes(vesselSearch.toLowerCase()) ||
        v.imo_no?.toString().includes(vesselSearch) ||
        v.call_sign?.toLowerCase().includes(vesselSearch.toLowerCase()) ||
        v.mmsi_no?.toString().includes(vesselSearch))
    );
    return (
        <PageWrapper title="Departure Notification">
            <h2 className="form-heading">Departure Notification</h2>
            <form className="departure-grid" onSubmit={(e) => e.preventDefault()}>
                {/* Vessel Name, IMO Number, Call Sign in a single row */}
                <div className="form-row vessel-row">
                    <div className="form-group wide">
                        <label htmlFor="vesselSearch">Vessel Name</label>
                        <input
                            type="text"
                            id="vesselSearch"
                            placeholder="Type vessel name, IMO, MMSI or call sign"
                            value={vesselSearch}
                            onChange={(e) => {
                                setVesselSearch(e.target.value);
                                setShowDropdown(true);
                            }}
                            onFocus={() => setShowDropdown(true)}
                            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                        />
                        {showDropdown && filteredVessels.length > 0 && (
                            <ul className="dropdown-results">
                                {filteredVessels.map((vessel) => {
                                    const flagSrc = getFlagImage(vessel.ship_flag_code_id);
                                    return (
                                        <li
                                            key={vessel.vessel_id}
                                            onClick={() => {
                                                setForm({
                                                    ...form,
                                                    vesselName: vessel.name,
                                                    imoNumber: vessel.imo_no,
                                                    callSign: vessel.call_sign
                                                });
                                                setVesselSearch(vessel.name);
                                                setShowDropdown(false);
                                            }}
                                        >
                                            {flagSrc && (
                                                <img
                                                    src={flagSrc}
                                                    alt="flag"
                                                    className="flag-icon"
                                                />
                                            )}
                                            <span>{vessel.name} – IMO {vessel.imo_no} – MMSI {vessel.mmsi_no} – Call {vessel.call_sign}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                    <div className="form-group">
                        <label>IMO Number</label>
                        <input type="text" value={form.imoNumber} readOnly />
                    </div>

                    <div className="form-group">
                        <label>Call Sign</label>
                        <input type="text" value={form.callSign} readOnly />
                    </div>
                </div>



                {['imoNumber', 'callSign', 'voyageNumber', 'eta', 'etd'].map((key) => (
                    <div className="form-field" key={key}>
                        <label htmlFor={key}>
                            {key === 'imoNumber' ? 'IMO Number' : key === 'eta' ? 'ETA' : key === 'etd' ? 'ETD' : key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase())}
                        </label>
                        <input
                            id={key}
                            name={key}
                            type={key === 'eta' || key === 'etd' ? 'datetime-local' : 'text'}
                            value={form[key]}
                            onChange={handleChange}
                            className={errors[key] ? 'error-input' : ''}
                            disabled={key === 'imoNumber' || key === 'callSign'}
                        />
                        {errors[key] && <span className="error-text">{errors[key]}</span>}
                    </div>
                ))}

                <div className="form-field">
                    <label htmlFor="departurePort">Departure Port</label>
                    <div className="flag-select-wrapper">
                        <select
                            id="departurePort"
                            name="departurePort"
                            value={form.departurePort}
                            onChange={handleChange}
                            className={errors.departurePort ? 'error-input' : ''}
                        >
                            <option value="">-- Select Port --</option>
                            {portOptions.map((port, idx) => (
                                <option key={idx} value={port.name}>
                                    {port.name}
                                </option>
                            ))}
                        </select>
                        {form.departurePort && (
                            <img src={getFlagImage(portOptions.find((p) => p.name === form.departurePort)?.countryCode)} alt="flag" className="dropdown-flag" />
                        )}
                    </div>
                    {errors.departurePort && <span className="error-text">{errors.departurePort}</span>}
                </div>

                <div className="form-button-wrapper">
                    <button type="submit" onClick={handleSubmit} className="submit-btn">
                        Submit Departure
                    </button>
                </div>
            </form>
        </PageWrapper>
    );
};

export default DepartureWizard;
