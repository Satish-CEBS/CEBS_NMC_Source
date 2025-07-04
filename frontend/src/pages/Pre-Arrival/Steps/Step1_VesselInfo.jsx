import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './StepperControls.css';
import '../PreArrivalCreatePage.css';

const alpha3To2Map = {
    ARE: 'ae', IND: 'in', PAN: 'pa', USA: 'us', FRA: 'fr', CHN: 'cn',
    DNK: 'dk', BHS: 'bs', BMU: 'bm', MHL: 'mh'
};

const Step1_VesselInfo = ({ formData, setFormData, validationErrors }) => {
    const [vesselOptions, setVesselOptions] = useState([]);
    const [selectedVessel, setSelectedVessel] = useState(null);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/lookup/vessels`)
            .then((res) => {
                const options = res.data.map((v) => {
                    const alpha2 = alpha3To2Map[v.flag?.toUpperCase()] || '';
                    const flagImage = alpha2 ? require(`../../../assets/images/flags/${alpha2}.png`) : null;

                    return {
                        value: v.ship_id,
                        label: `${v.vessel_name || 'Unnamed'} (${v.call_sign || '-'}) ${v.flag || ''}`.replace('?', ''),
                        flagImage,
                        ...v,
                    };
                });
                setVesselOptions(options);
            })
            .catch((err) => console.error('Failed to load vessels', err));
    }, []);

    const handleVesselChange = (selected) => {
        setSelectedVessel(selected);
        setFormData({
            ...formData,
            vessel_id: selected.ship_id,
            vessel_name: selected.vessel_name,
            call_sign: selected.call_sign,
            flag: selected.flag,
            imo_no: selected.imo_no,
            mmsi_no: selected.mmsi_no,
            gross_tonnage: selected.gross_tonnage,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="step-container">
            <h3 className="step-title">Step 1 – Vessel Information</h3>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="vessel">Select Vessel <span className="required">*</span></label>
                    <Select
                        options={vesselOptions}
                        value={selectedVessel}
                        onChange={handleVesselChange}
                        placeholder="Search by vessel name, call sign, IMO or MMSI"
                        isSearchable
                        classNamePrefix="react-select"
                        className={validationErrors?.vessel_id ? 'select-error' : ''}
                        formatOptionLabel={(data) => (
                            <div className="flag-option">
                                {data.flagImage && <img src={data.flagImage} alt="flag" className="flag-icon" />}
                                {data.label}
                            </div>
                        )}
                        filterOption={(option, input) => {
                            const text = input.toLowerCase();
                            const imo = option.data?.imo_no?.toString() || '';
                            const mmsi = option.data?.mmsi_no?.toString() || '';
                            return (
                                option.label.toLowerCase().includes(text) ||
                                imo.includes(text) ||
                                mmsi.includes(text)
                            );
                        }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="voyage_number">Voyage Number <span className="required">*</span></label>
                    <input
                        type="text"
                        id="voyage_number"
                        name="voyage_number"
                        value={formData.voyage_number || ''}
                        onChange={handleInputChange}
                        className={validationErrors?.voyage_number ? 'input-error' : ''}
                        placeholder="e.g., VOY12345"
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Call Sign</label>
                    <input type="text" value={formData.call_sign || ''} readOnly />
                </div>

                <div className="form-group">
                    <label>Flag</label>
                    <div className="flag-display">
                        {selectedVessel?.flagImage && (
                            <img src={selectedVessel.flagImage} alt="flag" className="flag-icon" />
                        )}
                        <span>{formData.flag || '-'}</span>
                    </div>
                </div>

                <div className="form-group">
                    <label>Gross Tonnage</label>
                    <input type="text" value={formData.gross_tonnage || ''} readOnly />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>IMO Number</label>
                    <div className="vessel-info-highlight">{formData.imo_no || '-'}</div>
                </div>

                <div className="form-group">
                    <label>MMSI Number</label>
                    <div className="vessel-info-highlight">{formData.mmsi_no || '-'}</div>
                </div>
            </div>
        </div>
    );
};

export default Step1_VesselInfo;
