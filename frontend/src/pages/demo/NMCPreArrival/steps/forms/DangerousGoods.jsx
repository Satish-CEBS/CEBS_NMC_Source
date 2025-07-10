import React, { useState } from 'react';
import './ModalForm.css';

const emptyItem = {
    referenceNumber: '',
    stowagePosition: '',
    containerId: '',
    vehicleRegNo: '',
    unNumber: '',
    shippingName: '',
    imoClass: '',
    packingGroup: '',
    packages: '',
    quantity: '',
    unit: 'kg',
    flashpoint: '',
    marinePollutant: '',
    emsCode: '',
    additionalInfo: '',
    shippingAgent: ''
};

const marinePollutantOptions = ['Yes', 'No'];
const unitOptions = ['kg', 'L'];
const packingGroups = ['I', 'II', 'III'];

const DangerousGoods = ({ onClose, onSubmit, initialData = [] }) => {
    const [items, setItems] = useState(initialData.length ? initialData : [emptyItem]);

    const handleChange = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;
        setItems(updated);
    };

    const addRow = () => setItems([...items, { ...emptyItem }]);
    const removeRow = (index) => setItems(items.filter((_, i) => i !== index));

    const handleSubmit = () => {
        onSubmit(items);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content large-modal">
                <h3>Dangerous Goods Manifest (FAL Form 7)</h3>

                {items.map((entry, index) => (
                    <div key={index} className="crew-entry">
                        <h4>Item #{index + 1}</h4>

                        {/* GROUP 1: Identification & Stowage */}
                        <div className="form-group">
                            <div className="form-row">
                                <input
                                    placeholder="Reference Number"
                                    value={entry.referenceNumber}
                                    onChange={e => handleChange(index, 'referenceNumber', e.target.value)}
                                />
                                <input
                                    placeholder="Stowage Position"
                                    value={entry.stowagePosition}
                                    onChange={e => handleChange(index, 'stowagePosition', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* GROUP 2: Container & Vehicle Info */}
                        <div className="form-group">
                            <div className="form-row">
                                <input
                                    placeholder="Freight Container Identification No(s)"
                                    value={entry.containerId}
                                    onChange={e => handleChange(index, 'containerId', e.target.value)}
                                />
                                <input
                                    placeholder="Vehicle Registration No(s)"
                                    value={entry.vehicleRegNo}
                                    onChange={e => handleChange(index, 'vehicleRegNo', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* GROUP 3: Substance Details */}
                        <div className="form-group">
                            <div className="form-row">
                                <input
                                    placeholder="UN Number"
                                    value={entry.unNumber}
                                    onChange={e => handleChange(index, 'unNumber', e.target.value)}
                                />
                                <input
                                    placeholder="Proper Shipping Name / (Technical Specifications)"
                                    value={entry.shippingName}
                                    onChange={e => handleChange(index, 'shippingName', e.target.value)}
                                />
                                <input
                                    placeholder="Class / (Subsidiary Risk(s))"
                                    value={entry.imoClass}
                                    onChange={e => handleChange(index, 'imoClass', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* GROUP 4: Packaging, Quantity & Risk */}
                        <div className="form-group">
                            <div className="form-row">
                                <select
                                    value={entry.packingGroup}
                                    onChange={e => handleChange(index, 'packingGroup', e.target.value)}
                                >
                                    <option value="">Packing Group</option>
                                    {packingGroups.map(pg => (
                                        <option key={pg} value={pg}>{pg}</option>
                                    ))}
                                </select>
                                <input
                                    placeholder="Number & Type of Packages"
                                    value={entry.packages}
                                    onChange={e => handleChange(index, 'packages', e.target.value)}
                                />
                                <input
                                    placeholder="Quantity"
                                    type="number"
                                    value={entry.quantity}
                                    onChange={e => handleChange(index, 'quantity', e.target.value)}
                                    style={{ width: '100px' }}
                                />
                                <select
                                    value={entry.unit}
                                    onChange={e => handleChange(index, 'unit', e.target.value)}
                                >
                                    {unitOptions.map(unit => (
                                        <option key={unit} value={unit}>{unit}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-row">
                                <input
                                    placeholder="Flashpoint (if any)"
                                    value={entry.flashpoint}
                                    onChange={e => handleChange(index, 'flashpoint', e.target.value)}
                                />
                                <select
                                    value={entry.marinePollutant}
                                    onChange={e => handleChange(index, 'marinePollutant', e.target.value)}
                                >
                                    <option value="">Marine Pollutant?</option>
                                    {marinePollutantOptions.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                                <input
                                    placeholder="EMS Code"
                                    value={entry.emsCode}
                                    onChange={e => handleChange(index, 'emsCode', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* GROUP 5: Logistics & Shipping Agent */}
                        <div className="form-group">
                            <div className="form-row">
                                <input
                                    placeholder="Additional Information"
                                    value={entry.additionalInfo}
                                    onChange={e => handleChange(index, 'additionalInfo', e.target.value)}
                                />
                                <input
                                    placeholder="Shipping Agent"
                                    value={entry.shippingAgent}
                                    onChange={e => handleChange(index, 'shippingAgent', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Remove Row */}
                        {items.length > 1 && (
                            <button className="remove-btn" onClick={() => removeRow(index)}>Remove</button>
                        )}
                        <hr />
                    </div>
                ))}

                <div className="modal-actions">
                    <button onClick={addRow}>+ Add Another</button>
                    <button className="save-btn" onClick={handleSubmit}>Save</button>
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DangerousGoods;
