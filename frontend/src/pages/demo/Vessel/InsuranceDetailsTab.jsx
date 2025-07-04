import React from 'react';

const InsuranceDetailsTab = ({ formData = {}, setFormData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePandiChange = (index, e) => {
        const { name, value } = e.target;
        const updatedPandi = [...(formData.pandi || [])];
        updatedPandi[index] = {
            ...updatedPandi[index],
            [name]: value
        };
        setFormData((prev) => ({
            ...prev,
            pandi: updatedPandi
        }));
    };

    const addPandiRow = () => {
        const updatedPandi = [...(formData.pandi || [])];
        updatedPandi.push({ name: '', valid_upto: '', correspondent: '' });
        setFormData((prev) => ({
            ...prev,
            pandi: updatedPandi
        }));
    };

    const removePandiRow = (index) => {
        const updatedPandi = [...(formData.pandi || [])];
        updatedPandi.splice(index, 1);
        setFormData((prev) => ({
            ...prev,
            pandi: updatedPandi
        }));
    };

    return (
        <div className="vessel-tab">
            <p className="tab-instruction">
                Please fill in the insurance details and gear count for the vessel. Mandatory fields are marked with <span className="required">*</span>.
            </p>

            <div className="form-grid-3">
                <div className="form-group">
                    <label>Classification Society *</label>
                    <input
                        type="text"
                        name="classification_society"
                        value={formData?.classification_society || ''}
                        onChange={handleChange}
                        placeholder="e.g., Lloyd's Register"
                    />
                </div>

                <div className="form-group">
                    <label>Name of Hull Insurance Company *</label>
                    <input
                        type="text"
                        name="hull_insurance_company"
                        value={formData?.hull_insurance_company || ''}
                        onChange={handleChange}
                        placeholder="e.g., Emirates Marine Insurance"
                    />
                </div>

                <div className="form-group">
                    <label>Hull Insurance Company Validity *</label>
                    <input
                        type="date"
                        name="hull_insurance_validity"
                        value={formData?.hull_insurance_validity || ''}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <hr />
            <h4>P & I Details</h4>

            {(formData?.pandi || []).map((entry, index) => (
                <div key={index} className="form-grid-3 border-box padded-box">
                    <div className="form-group">
                        <label>Name of P&I Club *</label>
                        <input
                            type="text"
                            name="name"
                            value={entry.name || ''}
                            onChange={(e) => handlePandiChange(index, e)}
                            placeholder="e.g., UAE National P&I Club"
                        />
                    </div>

                    <div className="form-group">
                        <label>P&I Insurance Valid Upto *</label>
                        <input
                            type="date"
                            name="valid_upto"
                            value={entry.valid_upto || ''}
                            onChange={(e) => handlePandiChange(index, e)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Local Correspondent of P&I Club</label>
                        <input
                            type="text"
                            name="correspondent"
                            value={entry.correspondent || ''}
                            onChange={(e) => handlePandiChange(index, e)}
                            placeholder="e.g., Dubai Marine Liaison"
                        />
                    </div>

                    <div className="form-group full-width">
                        <button type="button" onClick={() => removePandiRow(index)} className="btn-secondary small">
                            Remove Row
                        </button>
                    </div>
                </div>
            ))}

            <div className="form-group">
                <button type="button" onClick={addPandiRow} className="btn-primary small">
                    + Add P&I Row
                </button>
            </div>

            <hr />
            <div className="form-grid-3">
                <div className="form-group">
                    <label>No. of Vessel Gears</label>
                    <input
                        type="number"
                        name="vessel_gears"
                        value={formData?.vessel_gears || ''}
                        onChange={handleChange}
                        placeholder="e.g., 4"
                    />
                </div>
            </div>
        </div>
    );
};

export default InsuranceDetailsTab;
