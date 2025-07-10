import React, { useState } from 'react';
import './Stowage.css';

const AddStowageRowModal = ({ isOpen, onClose, onSave }) => {
    const initialForm = {
        billOfLading: '',
        cargoDescription: '',
        equipmentStatusCode: '',
        flashPoint: '',
        hatchNo: '',
        portOfLoading: '',
        portOfDischarge: '',
        imoClass: '',
        unImdgNo: '',
        noOfPackages: '',
        tonnage: '',
        locationPartition: '',
        typeOfPackages: '',
        stowageInstructions: '',
        lashingInstruction: ''
    };

    const [form, setForm] = useState(initialForm);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSave(form);
        setForm(initialForm);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Add Stowage Row</h2>
                <div className="modal-form">
                    {Object.keys(initialForm).map((key) => (
                        <div key={key} className="form-group">
                            <label>{key.replace(/([A-Z])/g, ' $1')}</label>
                            <input
                                name={key}
                                value={form[key]}
                                onChange={handleChange}
                                type="text"
                            />
                        </div>
                    ))}
                </div>
                <div className="modal-actions">
                    <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default AddStowageRowModal;
