import React, { useState, useEffect } from 'react';
import vesselsList from '../../../mockData/vessels.json';
import locationsList from '../../../mockData/locations.json';
import InfoIcon from '@mui/icons-material/Info';
import '../Voyages/VoyagesStep.css';

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

const purposesList = [
    "Anchoring", "Bunkering", "Crew Change", "Force Majeure", "Lay Up", "Loading / Discharging",
    "Medical Assistance", "Provisioning", "Repairs", "Ship To Ship Operations (STS)", "Testing", "Other"
];

const Step1VoyageDetails = ({ formData = {}, updateBasicInfo, goToStep }) => {
    const [vesselQuery, setVesselQuery] = useState('');
    const [vesselResults, setVesselResults] = useState([]);
    const [lastPortQuery, setLastPortQuery] = useState('');
    const [nextPortQuery, setNextPortQuery] = useState('');
    const [lastPortResults, setLastPortResults] = useState([]);
    const [nextPortResults, setNextPortResults] = useState([]);
    const [errors, setErrors] = useState([]);
    const [showOtherPurpose, setShowOtherPurpose] = useState(false);

    const [localData, setLocalData] = useState({
        ...formData,
        voyage_number: formData.voyage_number || '',
        last_port: formData.last_port || null,
        next_port: formData.next_port || null,
        eta: formData.eta || '',
        purposes: formData.purposes || [],
        purpose_other_note: formData.purpose_other_note || ''
    });

    const getFlagImage = (code3) => {
        const code = country3to2[code3] || code3?.toLowerCase();
        return flagMap[code] || null;
    };

    useEffect(() => {
        const q = vesselQuery.toLowerCase();
        if (q.trim() === '') return setVesselResults([]);
        setVesselResults(
            vesselsList.filter((v) =>
                v.name.toLowerCase().includes(q) ||
                v.imo_no.includes(q) ||
                v.call_sign.toLowerCase().includes(q) ||
                v.mmsi_no.includes(q)
            ).slice(0, 10)
        );
    }, [vesselQuery]);

    useEffect(() => {
        const q = lastPortQuery.toLowerCase();
        if (q.trim() === '') return setLastPortResults([]);
        setLastPortResults(
            locationsList.filter((p) =>
                p.name.toLowerCase().includes(q) || p.location_code.toLowerCase().includes(q)
            ).slice(0, 10)
        );
    }, [lastPortQuery]);

    useEffect(() => {
        const q = nextPortQuery.toLowerCase();
        if (q.trim() === '') return setNextPortResults([]);
        setNextPortResults(
            locationsList.filter((p) =>
                p.name.toLowerCase().includes(q) || p.location_code.toLowerCase().includes(q)
            ).slice(0, 10)
        );
    }, [nextPortQuery]);

    const selectVessel = (v) => {
        const updated = { ...localData, ...v };
        setLocalData(updated);
        updateBasicInfo(updated);
        setVesselQuery(`${v.name} (${v.imo_no})`);
        setVesselResults([]);
    };

    const selectPort = (port, key) => {
        const updated = { ...localData, [key]: port };
        setLocalData(updated);
        updateBasicInfo(updated);
        if (key === 'last_port') setLastPortQuery(port.name);
        if (key === 'next_port') setNextPortQuery(port.name);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updated = { ...localData, [name]: value };
        setLocalData(updated);
        updateBasicInfo(updated);
    };

    const togglePurpose = (purpose) => {
        const updated = localData.purposes.includes(purpose)
            ? localData.purposes.filter((p) => p !== purpose)
            : [...localData.purposes, purpose];

        const showOther = updated.includes("Other");
        setShowOtherPurpose(showOther);

        const newData = { ...localData, purposes: updated };
        if (!showOther) newData.purpose_other_note = '';
        setLocalData(newData);
        updateBasicInfo(newData);
    };

    const handleSubmit = () => {
        const errs = [];
        if (!localData.vessel_id) errs.push('Vessel must be selected');
        if (!localData.voyage_number) errs.push('Voyage number is required');
        if (!localData.last_port) errs.push('Last Port is required');
        if (!localData.next_port) errs.push('Next Port is required');
        if (!localData.eta) errs.push('ETA is required');
        if (localData.purposes.length === 0) errs.push('At least one Purpose of Call must be selected');
        if (localData.purposes.includes("Other") && !localData.purpose_other_note) errs.push('Please specify other purpose');

        if (errs.length > 0) return setErrors(errs);
        goToStep(2);
    };

    return (
        <div className="voyage-port-call-container">
            <div className="form-main">
                <section className="section">
                    <label><strong>Select Vessel</strong> <InfoIcon fontSize="small" /></label>
                    <input
                        className="search-input"
                        placeholder="Search vessels..."
                        value={vesselQuery}
                        onChange={(e) => setVesselQuery(e.target.value)}
                        disabled={!!localData.vessel_id}
                    />
                    {vesselResults.length > 0 && (
                        <ul className="dropdown-results">
                            {vesselResults.map((v) => (
                                <li key={v.vessel_id} onClick={() => selectVessel(v)}>
                                    {getFlagImage(v.ship_flag_code_id) && <img src={getFlagImage(v.ship_flag_code_id)} alt="flag" className="flag-icon" />}
                                    {v.name} - IMO {v.imo_no} - MMSI {v.mmsi_no} - Call {v.call_sign}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <section className="section">
                    <label>Voyage Number</label>
                    <input type="text" name="voyage_number" value={localData.voyage_number} onChange={handleChange} />
                </section>

                <section className="section">
                    <label>Last Port of Call</label>
                    <input className="search-input" value={lastPortQuery} onChange={(e) => setLastPortQuery(e.target.value)} placeholder="Type to search..." />
                    {lastPortResults.length > 0 && (
                        <ul className="dropdown-results">
                            {lastPortResults.map((p) => (
                                <li key={p.location_id} onClick={() => selectPort(p, 'last_port')}>
                                    {getFlagImage(p.country_code) && <img src={getFlagImage(p.country_code)} className="flag-icon" alt="flag" />} {p.name} ({p.country})
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <section className="section">
                    <label>Next Port of Call</label>
                    <input className="search-input" value={nextPortQuery} onChange={(e) => setNextPortQuery(e.target.value)} placeholder="Type to search..." />
                    {nextPortResults.length > 0 && (
                        <ul className="dropdown-results">
                            {nextPortResults.map((p) => (
                                <li key={p.location_id} onClick={() => selectPort(p, 'next_port')}>
                                    {getFlagImage(p.country_code) && <img src={getFlagImage(p.country_code)} className="flag-icon" alt="flag" />} {p.name} ({p.country})
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <section className="section">
                    <label>ETA</label>
                    <input type="datetime-local" name="eta" value={localData.eta} onChange={handleChange} />
                </section>

                <section className="section">
                    <label>Purpose of Call</label>
                    <div className="checkbox-group">
                        {purposesList.map((purpose) => (
                            <label key={purpose} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={localData.purposes.includes(purpose)}
                                    onChange={() => togglePurpose(purpose)}
                                />
                                {purpose}
                            </label>
                        ))}
                    </div>
                    {showOtherPurpose && (
                        <input
                            className="text-input"
                            name="purpose_other_note"
                            placeholder="Please specify other purpose"
                            value={localData.purpose_other_note}
                            onChange={handleChange}
                        />
                    )}
                </section>

                {errors.length > 0 && (
                    <div className="error-box">
                        {errors.map((e, i) => <p className="error-text" key={i}>{e}</p>)}
                    </div>
                )}

                <button className="submit-button" onClick={handleSubmit}>Continue to Step 2</button>
            </div>

            {localData.vessel_id && (
                <aside className="vessel-sidebar card">
                    <h4>Selected Vessel Details</h4>
                    <p><strong>{localData.name}</strong></p>
                    <p>IMO: {localData.imo_no}</p>
                    <p>MMSI: {localData.mmsi_no}</p>
                    <p>Call Sign: {localData.call_sign}</p>
                    <p>Type: {localData.ship_type_detailed}</p>
                    <p>Status: {localData.service_status}</p>
                    <p>Built: {localData.year_built} by {localData.builder}</p>
                    <p>Gross Tonnage: {localData.gross_tonnage}</p>
                    <p>Draft: {localData.draft_m} m</p>
                    <p>Speed: {localData.max_speed_knots} knots</p>
                    <p>Insurance: {localData.insurance_pandi_club}</p>
                </aside>
            )}
        </div>
    );
};

export default Step1VoyageDetails;
