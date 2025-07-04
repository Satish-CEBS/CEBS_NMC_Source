import React from 'react';

const VesselDetailsTab = ({ formData = {}, setFormData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="vessel-tab">
            <p className="tab-instruction">
                Provide vessel identity details. Fields marked <span className="required">*</span> are mandatory.
            </p>

            <div className="form-grid-3">
                <div className="form-group">
                    <label>Mode of Transport <span className="required">*</span></label>
                    <select name="mode_of_transport" value={formData.mode_of_transport || ''} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="Sea">Sea</option>
                        <option value="River">River</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Type of Vessel <span className="required">*</span></label>
                    <input
                        type="text"
                        name="type_of_vessel"
                        value={formData.type_of_vessel || ''}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Oil Tanker, Container"
                    />
                </div>

                <div className="form-group">
                    <label>IMO Number <span className="required">*</span></label>
                    <input
                        type="text"
                        name="imo_number"
                        value={formData.imo_number || ''}
                        onChange={handleChange}
                        required
                        placeholder="e.g., 9576891"
                    />
                </div>

                <div className="form-group">
                    <label>MT/MV</label>
                    <input
                        type="text"
                        name="mt_mv"
                        value={formData.mt_mv || ''}
                        onChange={handleChange}
                        placeholder="e.g., MV"
                    />
                </div>

                <div className="form-group">
                    <label>Vessel Name <span className="required">*</span></label>
                    <input
                        type="text"
                        name="vessel_name"
                        value={formData.vessel_name || ''}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Gulf Trader"
                    />
                </div>

                <div className="form-group">
                    <label>Call Sign <span className="required">*</span></label>
                    <input
                        type="text"
                        name="call_sign"
                        value={formData.call_sign || ''}
                        onChange={handleChange}
                        required
                        placeholder="e.g., A6E1234"
                    />
                </div>

                <div className="form-group">
                    <label>Ex Vessel Name</label>
                    <input
                        type="text"
                        name="ex_vessel_name"
                        value={formData.ex_vessel_name || ''}
                        onChange={handleChange}
                        placeholder="e.g., Former Sea King"
                    />
                </div>

                <div className="form-group">
                    <label>Ex Call Sign</label>
                    <input
                        type="text"
                        name="ex_call_sign"
                        value={formData.ex_call_sign || ''}
                        onChange={handleChange}
                        placeholder="e.g., ZD5678"
                    />
                </div>

                <div className="form-group">
                    <label>Satellite ID</label>
                    <input
                        type="text"
                        name="satellite_id"
                        value={formData.satellite_id || ''}
                        onChange={handleChange}
                        placeholder="e.g., SAT1234567"
                    />
                </div>

                <div className="form-group">
                    <label>Satcom ID</label>
                    <input
                        type="text"
                        name="satcom_id"
                        value={formData.satcom_id || ''}
                        onChange={handleChange}
                        placeholder="e.g., SC567843"
                    />
                </div>

                <div className="form-group">
                    <label>Keel Laying Date</label>
                    <input
                        type="date"
                        name="keel_laying_date"
                        value={formData.keel_laying_date || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Delivery Date</label>
                    <input
                        type="date"
                        name="delivery_date"
                        value={formData.delivery_date || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Vessel Building Place</label>
                    <input
                        type="text"
                        name="vessel_building_place"
                        value={formData.vessel_building_place || ''}
                        onChange={handleChange}
                        placeholder="e.g., Abu Dhabi Shipyard"
                    />
                </div>

                <div className="form-group">
                    <label>Permanent Registry</label>
                    <input
                        type="text"
                        name="permanent_registry"
                        value={formData.permanent_registry || ''}
                        onChange={handleChange}
                        placeholder="e.g., Dubai Port Registry"
                    />
                </div>

                <div className="form-group">
                    <label>Registry Validity</label>
                    <input
                        type="date"
                        name="registry_validity"
                        value={formData.registry_validity || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Registry Certificate Number</label>
                    <input
                        type="text"
                        name="registry_cert_no"
                        value={formData.registry_cert_no || ''}
                        onChange={handleChange}
                        placeholder="e.g., REG-9876543"
                    />
                </div>
            </div>
        </div>
    );
};

export default VesselDetailsTab;
