import React, { useState } from 'react';
import '../../styles/NMCStep.css';

const Step6WasteManagement = ({ data = {}, update, goToStep }) => {
    const [form, setForm] = useState({
        garbageDeclaration: data.garbageDeclaration || null,
        garbageType: data.garbageType || '',
        garbageQty: data.garbageQty || '',
        garbageDate: data.garbageDate || '',

        ballastReport: data.ballastReport || null,
        ballastPort: data.ballastPort || '',
        ballastVolume: data.ballastVolume || '',
        ballastTreatment: data.ballastTreatment || 'No',

        wasteRecord: data.wasteRecord || null,
        wasteType: data.wasteType || '',
        wasteQty: data.wasteQty || '',
        wasteMethod: data.wasteMethod || ''
    });

    const handleChange = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleFileUpload = (key, file) => {
        setForm(prev => ({ ...prev, [key]: file }));
    };

    const handleNext = () => {
        update(form);
        goToStep(9);
    };

    const handleBack = () => goToStep(7);

    return (
        <div className="step-container">
            <h2>Step 6: Ballast, Garbage & Waste Declarations</h2>

            <div className="subsection">
                <h3>♻️ Garbage Declaration</h3>
                <div className="form-group">
                    <label>Upload Garbage Declaration (PDF)</label>
                    <input type="file" accept="application/pdf" onChange={e => handleFileUpload('garbageDeclaration', e.target.files[0])} />
                    {form.garbageDeclaration && <p className="file-name">Uploaded: {form.garbageDeclaration.name}</p>}
                </div>

                <div className="row-3">
                    <div className="form-group">
                        <label>Type of Garbage</label>
                        <select value={form.garbageType} onChange={e => handleChange('garbageType', e.target.value)}>
                            <option value="">-- Select --</option>
                            <option>Food Waste</option>
                            <option>Plastic</option>
                            <option>Domestic Waste</option>
                            <option>Cooking Oil</option>
                            <option>Incinerator Ash</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Quantity Disposed (kg)</label>
                        <input type="number" value={form.garbageQty} onChange={e => handleChange('garbageQty', e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Date of Disposal</label>
                        <input type="date" value={form.garbageDate} onChange={e => handleChange('garbageDate', e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="subsection">
                <h3>🌊 Ballast Water Management</h3>
                <div className="form-group">
                    <label>Upload Ballast Water Report (PDF)</label>
                    <input type="file" accept="application/pdf" onChange={e => handleFileUpload('ballastReport', e.target.files[0])} />
                    {form.ballastReport && <p className="file-name">Uploaded: {form.ballastReport.name}</p>}
                </div>

                <div className="row-3">
                    <div className="form-group">
                        <label>Port of Discharge</label>
                        <input value={form.ballastPort} onChange={e => handleChange('ballastPort', e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Volume Discharged (m³)</label>
                        <input type="number" value={form.ballastVolume} onChange={e => handleChange('ballastVolume', e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Treatment System Used?</label>
                        <select value={form.ballastTreatment} onChange={e => handleChange('ballastTreatment', e.target.value)}>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="subsection">
                <h3>🗑️ Waste Disposal</h3>
                <div className="form-group">
                    <label>Upload Waste Record Sheet (PDF)</label>
                    <input type="file" accept="application/pdf" onChange={e => handleFileUpload('wasteRecord', e.target.files[0])} />
                    {form.wasteRecord && <p className="file-name">Uploaded: {form.wasteRecord.name}</p>}
                </div>

                <div className="row-3">
                    <div className="form-group">
                        <label>Waste Type</label>
                        <select value={form.wasteType} onChange={e => handleChange('wasteType', e.target.value)}>
                            <option value="">-- Select --</option>
                            <option>Oily Waste</option>
                            <option>Sewage</option>
                            <option>Hazardous Chemicals</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Quantity Disposed (kg)</label>
                        <input type="number" value={form.wasteQty} onChange={e => handleChange('wasteQty', e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Method</label>
                        <select value={form.wasteMethod} onChange={e => handleChange('wasteMethod', e.target.value)}>
                            <option value="">-- Select --</option>
                            <option>Incineration</option>
                            <option>Port Reception</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step6WasteManagement;
