import React from 'react';

const EngineDetailsTab = ({ formData = {}, setFormData }) => {
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
                Fill in the engine and propulsion details of the vessel. Fields marked with <span className="required">*</span> are mandatory.
            </p>

            <div className="form-grid-4">
                <div className="form-group">
                    <label>Engine Type *</label>
                    <input
                        type="text"
                        name="engine_type"
                        value={formData?.engine_type || ''}
                        onChange={handleChange}
                        placeholder="e.g., Wärtsilä 6RT-flex96C"
                    />
                </div>

                <div className="form-group">
                    <label>No. of Engines *</label>
                    <input
                        type="number"
                        name="no_of_engines"
                        value={formData?.no_of_engines || ''}
                        onChange={handleChange}
                        placeholder="e.g., 2"
                    />
                </div>

                <div className="form-group">
                    <label>Propulsion Type *</label>
                    <input
                        type="text"
                        name="propulsion_type"
                        value={formData?.propulsion_type || ''}
                        onChange={handleChange}
                        placeholder="e.g., Diesel-electric"
                    />
                </div>

                <div className="form-group">
                    <label>No. of Propellers *</label>
                    <input
                        type="number"
                        name="no_of_propellers"
                        value={formData?.no_of_propellers || ''}
                        onChange={handleChange}
                        placeholder="e.g., 4"
                    />
                </div>

                <div className="form-group">
                    <label>Engine Power (BHP)</label>
                    <input
                        type="number"
                        name="engine_power"
                        value={formData?.engine_power || ''}
                        onChange={handleChange}
                        placeholder="e.g., 80000"
                    />
                </div>

                <div className="form-group">
                    <label>No. of Rows on Deck</label>
                    <input
                        type="number"
                        name="no_of_rows_on_deck"
                        value={formData?.no_of_rows_on_deck || ''}
                        onChange={handleChange}
                        placeholder="e.g., 5"
                    />
                </div>

                <div className="form-group">
                    <label>Bow Thruster *</label>
                    <select
                        name="bow_thruster"
                        value={formData?.bow_thruster || ''}
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Bow Thruster Power (KW)</label>
                    <input
                        type="number"
                        name="bow_thruster_power"
                        value={formData?.bow_thruster_power || ''}
                        onChange={handleChange}
                        placeholder="e.g., 2000"
                    />
                </div>

                <div className="form-group">
                    <label>Total No. of Bow Thrusters</label>
                    <input
                        type="number"
                        name="total_bow_thrusters"
                        value={formData?.total_bow_thrusters || ''}
                        onChange={handleChange}
                        placeholder="e.g., 2"
                    />
                </div>

                <div className="form-group">
                    <label>Total No. of Stern Thrusters</label>
                    <input
                        type="number"
                        name="total_stern_thrusters"
                        value={formData?.total_stern_thrusters || ''}
                        onChange={handleChange}
                        placeholder="e.g., 1"
                    />
                </div>

                <div className="form-group">
                    <label>Stern Thruster Power (KW)</label>
                    <input
                        type="number"
                        name="stern_thruster_power"
                        value={formData?.stern_thruster_power || ''}
                        onChange={handleChange}
                        placeholder="e.g., 1800"
                    />
                </div>

                <div className="form-group">
                    <label>Maximum Maneuvering Speed *</label>
                    <input
                        type="number"
                        name="maneuvering_speed"
                        value={formData?.maneuvering_speed || ''}
                        onChange={handleChange}
                        placeholder="e.g., 18"
                    />
                </div>

                <div className="form-group">
                    <label>MMSI No. (Engine Tab)</label>
                    <input
                        type="text"
                        name="mmsi_engine_tab"
                        value={formData?.mmsi_engine_tab || ''}
                        onChange={handleChange}
                        placeholder="e.g., 470123456"
                    />
                </div>
            </div>
        </div>
    );
};

export default EngineDetailsTab;
