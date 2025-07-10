import React, { useState } from 'react';
import Select from 'react-select';
import vessels from '../../../../mockData/vessels.json';
import locations from '../../../../mockData/locations.json';
import getFlagImage from '../../../../utils/getFlagImage';
import '../../styles/NMCStep.css';

const Step1VoyageDetails = ({ data = {}, updateData = () => { }, nextStep }) => {
    const [errors, setErrors] = useState({});

    const vesselOptions = vessels.map((v) => ({
        value: v.name,
        label: (
            <div className="dropdown-option">
                <img src={getFlagImage(v.ship_flag_code_id)} alt="" className="flag-icon" />
                <span>{v.name} - IMO {v.imo_no}</span>
            </div>
        ),
        vessel: v,
    }));

    const portOptions = locations.map((p) => ({
        value: p.name,
        label: (
            <div className="dropdown-option">
                <img src={getFlagImage(p.country_code)} alt="" className="flag-icon" />
                <span>{p.name} ({p.country})</span>
            </div>
        ),
        port: p,
    }));

    const handleVesselChange = (opt) => {
        const v = opt.vessel;
        updateData({
            ...data,
            vesselName: v.name,
            callSign: v.call_sign,
            imo: v.imo_no,
            flag: v.flag,
            tonnage: v.gross_tonnage,
            type: v.ship_type_detailed
        });
    };

    const handleChange = (field, value) => {
        updateData({ ...data, [field]: value });
    };

    const validateAndNext = () => {
        const required = ['vesselName', 'callSign', 'lastPort', 'nextPort', 'eta', 'purpose'];
        const errs = {};
        required.forEach(f => { if (!data[f]) errs[f] = 'Required'; });
        setErrors(errs);
        if (Object.keys(errs).length === 0) nextStep();
    };

    return (
        <div className="nmc-step">
            <h2>Step 1: Voyage Details</h2>

            <div className="form-row">
                <div className="form-group">
                    <label><span className="required">*</span> Vessel</label>
                    <Select options={vesselOptions} onChange={handleVesselChange} />
                    {errors.vesselName && <p className="error">{errors.vesselName}</p>}
                </div>
                <div className="form-group">
                    <label><span className="required">*</span> Call Sign</label>
                    <input value={data.callSign || ''} readOnly />
                    {errors.callSign && <p className="error">{errors.callSign}</p>}
                </div>
            </div>

            <div className="vessel-details">
                <p><strong>IMO:</strong> {data.imo}</p>
                <p><strong>Flag:</strong> {data.flag}</p>
                <p><strong>Type:</strong> {data.type}</p>
                <p><strong>Tonnage:</strong> {data.tonnage}</p>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label><span className="required">*</span> Last Port of Call</label>
                    <Select options={portOptions} onChange={(opt) => handleChange('lastPort', opt.value)} />
                    {errors.lastPort && <p className="error">{errors.lastPort}</p>}
                </div>
                <div className="form-group">
                    <label><span className="required">*</span> Next Port of Call</label>
                    <Select options={portOptions} onChange={(opt) => handleChange('nextPort', opt.value)} />
                    {errors.nextPort && <p className="error">{errors.nextPort}</p>}
                </div>
                <div className="form-group">
                    <label><span className="required">*</span> ETA</label>
                    <input type="datetime-local" value={data.eta || ''} onChange={(e) => handleChange('eta', e.target.value)} />
                    {errors.eta && <p className="error">{errors.eta}</p>}
                </div>
            </div>

            <div className="form-group">
                <label><span className="required">*</span> Purpose of Call</label>
                <Select
                    isMulti
                    options={['Bunkering', 'Loading', 'Discharging', 'Crew Change', 'Repairs', 'Supplies'].map((v) => ({ value: v, label: v }))}
                    onChange={(opts) => handleChange('purpose', opts.map(o => o.value))}
                />
                {errors.purpose && <p className="error">{errors.purpose}</p>}
            </div>
        </div>
    );
};

export default Step1VoyageDetails;
