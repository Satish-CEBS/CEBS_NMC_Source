import React, { useState, useEffect } from 'react';
import PageWrapper from '../../layout/PageWrapper';
import AddStowageRowModal from './AddStowageRowModal';
import './StowageUpload.css';

const STORAGE_KEY = 'stowagePlanDraft';

const StowageUploadPlan = () => {
    const [vcn, setVcn] = useState('');
    const [terminal, setTerminal] = useState('');
    const [draftFwd, setDraftFwd] = useState('');
    const [draftAft, setDraftAft] = useState('');
    const [file, setFile] = useState(null);
    const [planList, setPlanList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            setVcn(data.vcn || '');
            setTerminal(data.terminal || '');
            setDraftFwd(data.draftFwd || '');
            setDraftAft(data.draftAft || '');
            setPlanList(data.planList || []);
        }
    }, []);

    const handleUpload = () => {
        if (!file) return alert('Please upload a file!');
        setPlanList([
            {
                billOfLading: '1234',
                statusCode: 'Loaded',
                shippingBill: 'SB1001',
                portLoading: 'INBOM1',
                portDischarge: 'INKOC1'
            }
        ]);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleAddRow = (rowData) => {
        if (editIndex !== null) {
            setPlanList((prev) => prev.map((item, idx) => idx === editIndex ? rowData : item));
            setEditIndex(null);
        } else {
            setPlanList((prev) => [...prev, rowData]);
        }
    };

    const handleEditClick = (idx) => {
        setEditIndex(idx);
        setShowModal(true);
    };

    const handleDelete = () => {
        const updated = [...planList];
        updated.pop();
        setPlanList(updated);
    };

    const handleSaveDraft = () => {
        const draft = { vcn, terminal, draftFwd, draftAft, planList };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
        alert('Draft saved locally');
    };

    const handleSubmit = () => {
        const submission = { vcn, terminal, draftFwd, draftAft, planList };
        console.log('Submitted:', submission);
        alert('Stowage Plan submitted. Check console for output.');
    };

    return (
        <PageWrapper title="Upload Stowage Plan Document">
            <div className="stowage-upload-form">
                <div className="form-row">
                    <label>VCN *</label>
                    <input value={vcn} onChange={(e) => setVcn(e.target.value)} placeholder="Enter VCN" />
                </div>

                <div className="form-row">
                    <label>Terminal Code *</label>
                    <select value={terminal} onChange={(e) => setTerminal(e.target.value)}>
                        <option value="">-- Select Terminal --</option>
                        <option value="INBOM1">INBOM1</option>
                        <option value="AEJEB1">AEJEB1</option>
                    </select>
                </div>

                <div className="form-row">
                    <label>Draft FWD (m)</label>
                    <input type="number" value={draftFwd} onChange={(e) => setDraftFwd(e.target.value)} />
                </div>

                <div className="form-row">
                    <label>Draft AFT (m)</label>
                    <input type="number" value={draftAft} onChange={(e) => setDraftAft(e.target.value)} />
                </div>

                <div className="upload-section">
                    <label>Upload Excel File</label>
                    <input type="file" onChange={handleFileChange} />
                    <button className="upload-btn" onClick={handleUpload}>Upload</button>
                    <button className="sample-btn">Download Sample</button>
                </div>

                <h4 className="section-title">Stowage Plan List</h4>
                <table className="plan-table">
                    <thead>
                        <tr>
                            <th>Bill Of Lading</th>
                            <th>Status Code</th>
                            <th>Shipping Bill</th>
                            <th>Port Of Loading</th>
                            <th>Port Of Discharge</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {planList.length === 0 ? (
                            <tr><td colSpan="6" style={{ textAlign: 'center' }}>No data uploaded.</td></tr>
                        ) : (
                            planList.map((row, idx) => (
                                <tr key={idx}>
                                    <td>{row.billOfLading}</td>
                                    <td>{row.statusCode}</td>
                                    <td>{row.shippingBill}</td>
                                    <td>{row.portLoading}</td>
                                    <td>{row.portDischarge}</td>
                                    <td><button className="view-btn" onClick={() => handleEditClick(idx)}>✏️</button></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                <div className="footer-buttons">
                    <button className="add-btn" onClick={() => { setEditIndex(null); setShowModal(true); }}>+ Add Row</button>
                    <button className="delete-btn" onClick={handleDelete}>Delete Row</button>
                    <button className="draft-btn" onClick={handleSaveDraft}>Save as Draft</button>
                    <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                </div>

                <AddStowageRowModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onSave={handleAddRow}
                    editData={editIndex !== null ? planList[editIndex] : null}
                />
            </div>
        </PageWrapper>
    );
};

export default StowageUploadPlan;
