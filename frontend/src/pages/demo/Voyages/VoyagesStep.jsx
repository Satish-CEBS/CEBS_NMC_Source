import React, { useState, useEffect } from 'react';
import vesselsList from '../../../mockData/vessels.json';
import locationsList from '../../../mockData/locations.json';
import './VoyagesStep.css';

const country3to2 = {
    ARE: 'ae', BHS: 'bs', PAN: 'pa', DNK: 'dk', LBR: 'lr',
    USA: 'us', GBR: 'gb', ITA: 'it', SGP: 'sg', KOR: 'kr',
    CHN: 'cn', BRA: 'br', MNE: 'me', FRA: 'fr', HKG: 'hk',
    IND: 'in', JPN: 'jp', SAU: 'sa', NLD: 'nl', DEU: 'de',
    ESP: 'es', PRT: 'pt', TUR: 'tr', GRC: 'gr', POL: 'pl',
    UKR: 'ua', RUS: 'ru', ZAF: 'za', OMN: 'om', QAT: 'qa',
    BHR: 'bh', KWT: 'kw', IRN: 'ir', IRQ: 'iq', YEM: 'ye',
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

const VoyagesStep = ({ formData = {}, updateBasicInfo, goToStep }) => {
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

    // Initialize form local state from formData prop
    const [localFormData, setLocalFormData] = useState({
        vessel_id: formData.vessel_id || '',
        name: formData.name || '',
        imo_no: formData.imo_no || '',
        mmsi_no: formData.mmsi_no || '',
        call_sign: formData.call_sign || '',
        gross_tonnage: formData.gross_tonnage || '',
        deadweight_tonnage: formData.deadweight_tonnage || '',
        draught: formData.draught || '',
        voyage_number: formData.voyage_number || '',
        call_port: formData.call_port || null,
        eta: formData.eta || '',
        etd: formData.etd || '',
        last_port: formData.last_port || null,
        last_port_etd: formData.last_port_etd || '',
        next_port: formData.next_port || null,
        next_port_eta: formData.next_port_eta || '',
    });

    // Sync local form state when formData prop changes
    useEffect(() => {
        setLocalFormData({
            vessel_id: formData.vessel_id || '',
            name: formData.name || '',
            imo_no: formData.imo_no || '',
            mmsi_no: formData.mmsi_no || '',
            call_sign: formData.call_sign || '',
            gross_tonnage: formData.gross_tonnage || '',
            deadweight_tonnage: formData.deadweight_tonnage || '',
            draught: formData.draught || '',
            voyage_number: formData.voyage_number || '',
            call_port: formData.call_port || null,
            eta: formData.eta || '',
            etd: formData.etd || '',
            last_port: formData.last_port || null,
            last_port_etd: formData.last_port_etd || '',
            next_port: formData.next_port || null,
            next_port_eta: formData.next_port_eta || '',
        });
    }, [formData]);

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


    /*const getFlagImage = (countryCode3) => {
        const code = country3to2[countryCode3] || countryCode3.toLowerCase();
        //return flagMap[code] || null;
   };*/
    const getFlagImage = (countryCode3) => {
        if (!countryCode3) return flagMap['default']; // fallback default flag image
        const code = country3to2[countryCode3] || countryCode3.toLowerCase();
        console.log('Looking up flag for code:', code);
        console.log('Available flag keys:', Object.keys(flagMap));
        return flagMap[code] || flagMap['default'];
    };

    /*const getFlagImage = (countryCode3) => {
        if (!countryCode3) return null; // early return if undefined or null
        const code = country3to2[countryCode3] || countryCode3.toLowerCase();
        return flagMap[code] || null;
    };*/


    // Handler for selecting vessel from search dropdown
    const selectVessel = (v) => {
        const updatedForm = {
            ...localFormData,
            ...v,
            vessel_id: v.vessel_id,
        };
        setLocalFormData(updatedForm);
        updateBasicInfo(updatedForm);
        setVesselQuery(`${v.name} (${v.imo_no})`);
        setVesselResults([]);
        setErrors([]);
        setSuccessMessage('');
        console.log('Selected vessel saved:', updatedForm);
    };

    // Handler for selecting location (port)
    const selectLocation = (loc, fieldName) => {
        const updatedForm = {
            ...localFormData,
            [fieldName]: loc,
        };
        setLocalFormData(updatedForm);
        updateBasicInfo(updatedForm);
        if (fieldName === 'call_port') setCallPortQuery(loc.name);
        else if (fieldName === 'last_port') setLastPortQuery(loc.name);
        else if (fieldName === 'next_port') setNextPortQuery(loc.name);

        if (fieldName === 'call_port') setCallPortResults([]);
        if (fieldName === 'last_port') setLastPortResults([]);
        if (fieldName === 'next_port') setNextPortResults([]);
        setErrors([]);
        setSuccessMessage('');
        console.log(`Selected location (${fieldName}) saved:`, updatedForm);
    };

    // Generic input change handler
    const onInputChange = (e) => {
        const { name, value } = e.target;
        const updatedForm = {
            ...localFormData,
            [name]: value,
        };
        setLocalFormData(updatedForm);
        updateBasicInfo(updatedForm);
        setErrors([]);
        setSuccessMessage('');
        console.log(`Input changed (${name}):`, updatedForm);
    };

    // Validation before proceeding
    const validate = () => {
        const errs = [];
        if (!localFormData.vessel_id) errs.push('Ship selection is required.');
        if (!localFormData.voyage_number) errs.push('Voyage Number is required.');
        if (!localFormData.call_port) errs.push('Port of Call is required.');
        if (!localFormData.eta) errs.push('ETA is required.');
        if (!localFormData.etd) errs.push('ETD is required.');
        if (!localFormData.last_port) errs.push('Previous Port of Call is required.');
        if (!localFormData.last_port_etd) errs.push('Previous Port ETD is required.');
        if (!localFormData.next_port) errs.push('Next Port of Call is required.');
        if (!localFormData.next_port_eta) errs.push('Next Port ETA is required.');
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
            <section className="section">
                <h3>Select Ship</h3>
                <p>Search using ship name, call sign, IMO number or MMSI number</p>
                <input
                    type="text"
                    value={vesselQuery}
                    onChange={(e) => setVesselQuery(e.target.value)}
                    placeholder="Enter search here..."
                    className="search-input"
                    disabled={!!localFormData.vessel_id}
                />
                {vesselResults.length > 0 && !localFormData.vessel_id && (
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

            {localFormData.vessel_id && (
                <>
                    <section className="section ship-details">
                        <h3>Selected Ship Details</h3>
                        <div className="details-grid">
                            <div><strong>Name:</strong> {localFormData.name}</div>
                            <div><strong>IMO:</strong> {localFormData.imo_no}</div>
                            <div><strong>MMSI:</strong> {localFormData.mmsi_no}</div>
                            <div><strong>Call Sign:</strong> {localFormData.call_sign}</div>
                            <div><strong>Gross Tonnage:</strong> {localFormData.gross_tonnage}</div>
                            <div><strong>Deadweight (MT):</strong> {localFormData.deadweight_tonnage}</div>
                            <div><strong>Draught (m):</strong> {localFormData.draught}</div>
                        </div>
                    </section>

                    <section className="section">
                        <label>
                            Voyage Number:
                            <input
                                type="text"
                                name="voyage_number"
                                value={localFormData.voyage_number || ''}
                                onChange={onInputChange}
                                placeholder="Enter voyage number"
                            />
                        </label>
                    </section>

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
                                value={localFormData.eta || ''}
                                onChange={onInputChange}
                            />
                            <label>ETD</label>
                            <input
                                type="datetime-local"
                                name="etd"
                                value={localFormData.etd || ''}
                                onChange={onInputChange}
                            />
                        </div>
                    </section>

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
                                value={localFormData.last_port_etd || ''}
                                onChange={onInputChange}
                            />
                        </label>
                    </section>

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
                                value={localFormData.next_port_eta || ''}
                                onChange={onInputChange}
                            />
                        </label>
                    </section>

                    {errors.length > 0 && (
                        <div className="error-box">
                            {errors.map((e, i) => (
                                <p key={i} className="error-text">{e}</p>
                            ))}
                        </div>
                    )}

                    {successMessage && (
                        <div className="success-box">
                            {successMessage}
                        </div>
                    )}

                    <button className="submit-button" onClick={onSubmit}>Save Voyages & Continue</button>
                </>
            )}
        </div>
    );
};

export default VoyagesStep;
