import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import locationData from '../../../assets/data/locations.json'; // 📍 Local JSON
import './StepperControls.css'; // Optional styles

const alpha3To2Map = {
    ARE: 'ae', IND: 'in', PAN: 'pa', USA: 'us', FRA: 'fr', CHN: 'cn',
    DNK: 'dk', BHS: 'bs', BMU: 'bm', MHL: 'mh', NOR: 'no'
};

const Step2_PortInfo = ({ formData, setFormData, validationErrors }) => {
    const [portOptions, setPortOptions] = useState([]);
    const [purposeOptions, setPurposeOptions] = useState([
        { value: 1, label: 'Loading' },
        { value: 2, label: 'Discharging' },
        { value: 3, label: 'Crew Change' },
        { value: 4, label: 'Bunkering' },
        { value: 5, label: 'Other' }
    ]);

    useEffect(() => {
        const ports = locationData.map((loc) => {
            const alpha2 = alpha3To2Map[loc.country_code?.toUpperCase()] || '';
            const flagImage = alpha2 ? require(`../../../assets/images/flags/${alpha2}.png`) : null;
            return {
                value: loc.location_id,
                label: `${loc.name} (${loc.location_code})`,
                flagImage,
                ...loc
            };
        });
        setPortOptions(ports);
    }, []);

    const handleSelectChange = (selected, field) => {
        setFormData({ ...formData, [field]: selected?.value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, eta: date });
    };

    return (
        <div className="step-container">
            <h3 className="step-title">Step 2 – Port & ETA Details</h3>

            <div className="form-row">
                <div className="form-group">
                    <label>Last Port of Call <span className="required">*</span></label>
                    <Select
                        options={portOptions}
                        placeholder="Select last port"
                        onChange={(option) => handleSelectChange(option, 'last_port_id')}
                        classNamePrefix="react-select"
                        className={validationErrors?.last_port_id ? 'react-select-error' : ''}
                        formatOptionLabel={(data) => (
                            <div className="flag-option">
                                {data.flagImage && <img src={data.flagImage} alt="flag" className="flag-icon" />}
                                {data.label}
                            </div>
                        )}
                    />
                </div>

                <div className="form-group">
                    <label>Next Port of Call <span className="required">*</span></label>
                    <Select
                        options={portOptions}
                        placeholder="Select next port"
                        onChange={(option) => handleSelectChange(option, 'next_port_id')}
                        classNamePrefix="react-select"
                        className={validationErrors?.next_port_id ? 'react-select-error' : ''}
                        formatOptionLabel={(data) => (
                            <div className="flag-option">
                                {data.flagImage && <img src={data.flagImage} alt="flag" className="flag-icon" />}
                                {data.label}
                            </div>
                        )}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Estimated Time of Arrival (ETA) <span className="required">*</span></label>
                    <DatePicker
                        selected={formData.eta || null}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        showTimeSelect
                        dateFormat="dd/MM/yyyy HH:mm"
                        className={validationErrors?.eta ? 'input-error' : ''}
                        placeholderText="Select ETA"
                    />
                </div>

                <div className="form-group">
                    <label>Purpose of Call <span className="required">*</span></label>
                    <Select
                        options={purposeOptions}
                        placeholder="Select purpose"
                        onChange={(option) => handleSelectChange(option, 'purpose_id')}
                        classNamePrefix="react-select"
                        className={validationErrors?.purpose_id ? 'react-select-error' : ''}
                    />
                </div>
            </div>
        </div>
    );
};

export default Step2_PortInfo;
