// src/pages/demo/Voyages/VoyagesStep.jsx

import React, { useState, useEffect } from 'react';
import vesselsList from '../../../mockData/vessels.json';
import locationsList from '../../../mockData/locations.json';
//import flagMap from '../../../assets/images/flags/flagMap'; // Assuming you have this
import './VoyagesStep.css';

const country3to2 = {
    ARE: 'ae',
    BHS: 'bs',
    PAN: 'pa',
    DNK: 'dk',
    LBR: 'lr',
    USA: 'us',
    GBR: 'gb',
    ITA: 'it',
    SGP: 'sg',
    KOR: 'kr',
    CHN: 'cn',
    BRA: 'br',
    MNE: 'me',
    FRA: 'fr',
    HKG: 'hk',
    IND: 'in',
    JPN: 'jp',
    SAU: 'sa',
    NLD: 'nl',
    DEU: 'de',
    ESP: 'es',
    PRT: 'pt',
    TUR: 'tr',
    GRC: 'gr',
    POL: 'pl',
    UKR: 'ua',
    RUS: 'ru',
    ZAF: 'za',
    OMN: 'om',
    QAT: 'qa',
    BHR: 'bh',
    KWT: 'kw',
    IRN: 'ir',
    IRQ: 'iq',
    YEM: 'ye',
    // Add more as needed
};

// Statically preload all flag images
const importAllFlags = (r) => {
    let flags = {};
    r.keys().forEach((key) => {
        const code = key.replace('./', '').replace('.png', '').toLowerCase();
        flags[code] = r(key);
    });
    return flags;
};
const flagMap = importAllFlags(require.context('../../../assets/images/flags', false, /\.png$/));

const VoyagesStep = ({ formData, setFormData, goToStep }) => {
    const [vesselQuery, setVesselQuery] = useState('');
    const [vesselResults, setVesselResults] = useState([]);
    const [callPortQuery, setCallPortQuery] = useState('');
    const [callPortResults, setCallPortResults] = useState([]);
    const [lastPortQuery, setLastPortQuery] = useState('');
    const [lastPortResults, setLastPortResults] = useState([]);
    const [nextPortQuery, setNextPortQuery] = useState('');
    const [nextPortResults, setNextPortResults] = useState([]);
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (!vesselQuery.trim()) return setVesselResults([]);
        const q = vesselQuery.toLowerCase();
        setVesselResults(
            vesselsList
                .filter(
                    (v) =>
                        v.name?.toLowerCase().includes(q) ||
                        v.imo_no?.includes(q) ||
                        v.mmsi_no?.includes(q) ||
                        v.call_sign?.toLowerCase().includes(q)
                )
                .slice(0, 10)
        );
    }, [vesselQuery]);

    const searchLocations = (query) => {
        if (!query.trim()) return [];
        const q = query.toLowerCase();
        return locationsList
            .filter(
                (loc) =>
                    loc.name?.toLowerCase().includes(q) ||
                    loc.location_code?.toLowerCase().includes(q)
            )
            .slice(0, 10);
    };

    useEffect(() => setCallPortResults(searchLocations(callPortQuery)), [callPortQuery]);
    useEffect(() => setLastPortResults(searchLocations(lastPortQuery)), [lastPortQuery]);
    useEffect(() => setNextPortResults(searchLocations(nextPortQuery)), [nextPortQuery]);

    const selectVessel = (v) => {
        setFormData({ ...formData, ...v, vessel_id: v.vessel_id });
        setVesselQuery(`${v.name} (${v.imo_no})`);
        setVesselResults([]);
        setErrors([]);
        setSuccessMessage('');
    };

    const selectLocation = (loc, fieldName) => {
        setFormData({ ...formData, [fieldName]: loc });
        if (fieldName === 'call_port') setCallPortQuery(loc.name);
        else if (fieldName === 'last_port') setLastPortQuery(loc.name);
        else if (fieldName === 'next_port') setNextPortQuery(loc.name);

        if (fieldName === 'call_port') setCallPortResults([]);
        if (fieldName === 'last_port') setLastPortResults([]);
        if (fieldName === 'next_port') setNextPortResults([]);
        setErrors([]);
        setSuccessMessage('');
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors([]);
        setSuccessMessage('');
    };

    const getFlagImage = (countryCode3) => {
        const code = country3to2[countryCode3] || countryCode3.toLowerCase();
        return flagMap[code] || null;
    };

    const validate = () => {
        const errs = [];
        if (!formData.vessel_id) errs.push('Ship selection is required.');
        if (!formData.voyage_number) errs.push('Voyage Number is required.');
        if (!formData.call_port) errs.push('Port of Call is required.');
        if (!formData.eta) errs.push('ETA is required.');
        if (!formData.etd) errs.push('ETD is required.');
        if (!formData.last_port) errs.push('Previous Port of Call is required.');
        if (!formData.last_port_etd) errs.push('Previous Port ETD is required.');
        if (!formData.next_port) errs.push('Next Port of Call is required.');
        if (!formData.next_port_eta) errs.push('Next Port ETA is required.');
        setErrors(errs);
        return errs.length === 0;
    };


    const onSubmit = () => {
        if (!validate()) return;
        setSuccessMessage('Voyage saved successfully! Proceeding to next step...');
        setErrors([]);
        setTimeout(() => {
            if (goToStep) goToStep(3);
        }, 1200);
    };

    return (
        <div className="voyage-port-call-container">
            {/* Ship selection */}
            <section className="section">
                <h3>Select Ship</h3>
                <p>Search using ship name, call sign, IMO number or MMSI number</p>
                <input
                    type="text"
                    value={vesselQuery}
                    onChange={(e) => setVesselQuery(e.target.value)}
                    placeholder="Enter search here..."
                    className="search-input"
                    disabled={!!formData.vessel_id}
                />
                {vesselResults.length > 0 && !formData.vessel_id && (
                    <ul className="dropdown-results">
                        {vesselResults.map((v) => {
                            const flagSrc = getFlagImage(v.ship_flag_code_id);
                            return (
                                <li key={v.vessel_id} onClick={() => selectVessel(v)}>
                                    {flagSrc && (
                                        <img
                                            src={flagSrc}
                                            alt={v.ship_flag_code_id}
                                            className="flag-icon"
                                        />
                                    )}
                                    <span>{v.name}</span> – IMO {v.imo_no} – MMSI {v.mmsi_no} – Call {v.call_sign}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </section>

            {/* Ship details and voyage number */}
            {formData.vessel_id && (
                <>
                    <section className="section ship-details">
                        <h3>Selected Ship Details</h3>
                        <div className="details-grid">
                            <div><strong>Name:</strong> {formData.name}</div>
                            <div><strong>IMO:</strong> {formData.imo_no}</div>
                            <div><strong>MMSI:</strong> {formData.mmsi_no}</div>
                            <div><strong>Call Sign:</strong> {formData.call_sign}</div>
                            <div><strong>Gross Tonnage:</strong> {formData.gross_tonnage}</div>
                            <div><strong>Deadweight (MT):</strong> {formData.deadweight_tonnage}</div>
                            <div><strong>Draught (m):</strong> {formData.draught}</div>
                        </div>
                    </section>

                    <section className="section">
                        <label>
                            Voyage Number:
                            <input
                                type="text"
                                name="voyage_number"
                                value={formData.voyage_number || ''}
                                onChange={onInputChange}
                                placeholder="Enter voyage number"
                            />
                        </label>
                    </section>

                    {/* Port of Call selection */}
                    <section className="section">
                        <h3>Select Port of Call</h3>
                        <p>Search using location name or UN/LOCODE code</p>
                        <input
                            type="text"
                            value={callPortQuery}
                            onChange={(e) => setCallPortQuery(e.target.value)}
                            placeholder="Enter search here..."
                            className="search-input"
                        />
                        {callPortResults.length > 0 && (
                            <ul className="dropdown-results">
                                {callPortResults.map((loc) => {
                                    const flagSrc = getFlagImage(loc.country_code);
                                    return (
                                        <li key={loc.location_id} onClick={() => selectLocation(loc, 'call_port')}>
                                            {flagSrc && (
                                                <img
                                                    src={flagSrc}
                                                    alt={loc.country_code}
                                                    className="flag-icon"
                                                />
                                            )}
                                            <span>
                                                {`${loc.name} (${loc.country}) `}
                                                {loc.flag_code && String.fromCodePoint(...[...loc.flag_code.toUpperCase()].map(c => 127397 + c.charCodeAt()))}
                                            </span>

                                        </li>
                                    );
                                })}
                            </ul>
                        )}

                        <div className="datetime-group">
                            <label>ETA</label>
                            <input
                                type="datetime-local"
                                name="eta"
                                value={formData.eta || ''}
                                onChange={onInputChange}
                            />
                            <label>ETD</label>
                            <input
                                type="datetime-local"
                                name="etd"
                                value={formData.etd || ''}
                                onChange={onInputChange}
                            />
                        </div>
                    </section>

                    {/* Previous Port of Call */}
                    <section className="section">
                        <h3>Previous Port of Call</h3>
                        <p>Search using location name or UN/LOCODE code</p>
                        <input
                            type="text"
                            value={lastPortQuery}
                            onChange={(e) => setLastPortQuery(e.target.value)}
                            placeholder="Enter search here..."
                            className="search-input"
                        />
                        {lastPortResults.length > 0 && (
                            <ul className="dropdown-results">
                                {lastPortResults.map((loc) => {
                                    const flagSrc = getFlagImage(loc.country_code);
                                    return (
                                        <li key={loc.location_id} onClick={() => selectLocation(loc, 'last_port')}>
                                            {flagSrc && (
                                                <img
                                                    src={flagSrc}
                                                    alt={loc.country_code}
                                                    className="flag-icon"
                                                />
                                            )}
                                            <span>
                                                {`${loc.name} (${loc.country}) `}
                                                {loc.flag_code && String.fromCodePoint(...[...loc.flag_code.toUpperCase()].map(c => 127397 + c.charCodeAt()))}
                                            </span>

                                        </li>
                                    );
                                })}
                            </ul>
                        )}

                        <label>
                            ETD
                            <input
                                type="datetime-local"
                                name="last_port_etd"
                                value={formData.last_port_etd || ''}
                                onChange={onInputChange}
                            />
                        </label>
                    </section>

                    {/* Next Port of Call */}
                    <section className="section">
                        <h3>Next Port of Call</h3>
                        <p>Search using location name or UN/LOCODE code</p>
                        <input
                            type="text"
                            value={nextPortQuery}
                            onChange={(e) => setNextPortQuery(e.target.value)}
                            placeholder="Enter search here..."
                            className="search-input"
                        />
                        {nextPortResults.length > 0 && (
                            <ul className="dropdown-results">
                                {nextPortResults.map((loc) => {
                                    const flagSrc = getFlagImage(loc.country_code);
                                    return (
                                        <li key={loc.location_id} onClick={() => selectLocation(loc, 'next_port')}>
                                            {flagSrc && (
                                                <img
                                                    src={flagSrc}
                                                    alt={loc.country_code}
                                                    className="flag-icon"
                                                />
                                            )}
                                            <span>
                                                {`${loc.name} (${loc.country}) `}
                                                {loc.flag_code && String.fromCodePoint(...[...loc.flag_code.toUpperCase()].map(c => 127397 + c.charCodeAt()))}
                                            </span>

                                        </li>
                                    );
                                })}
                            </ul>
                        )}

                        <label>
                            ETA
                            <input
                                type="datetime-local"
                                name="next_port_eta"
                                value={formData.next_port_eta || ''}
                                onChange={onInputChange}
                            />
                        </label>
                    </section>

                    {/* Display errors */}
                    {errors.length > 0 && (
                        <div className="error-box">
                            {errors.map((e, i) => (
                                <p key={i} className="error-text">{e}</p>
                            ))}
                        </div>
                    )}

                    {/* Display success */}
                    {successMessage && (
                        <div className="success-box">
                            {successMessage}
                        </div>
                    )}

                    {/* Submit button */}
                    <button className="submit-button" onClick={onSubmit}>Save Voyages & Continue</button>
                </>
            )}
        </div>
    );
};

export default VoyagesStep;
