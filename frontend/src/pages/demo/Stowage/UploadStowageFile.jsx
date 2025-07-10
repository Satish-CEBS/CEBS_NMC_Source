import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import PageWrapper from '../layout/PageWrapper';
import './StowageUpload.css';

const UploadStowageFile = () => {
    const [vcn, setVcn] = useState('');
    const [terminal, setTerminal] = useState('');
    const [draftFwd, setDraftFwd] = useState('');
    const [draftAft, setDraftAft] = useState('');
    const [rows, setRows] = useState([]);
    const [fileName, setFileName] = useState('');

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { defval: '' });

            const tagged = data.map((item) => ({
                ...item,
                is_dg: !!item['DG Class'] || !!item['UN No']
            }));
            setRows(tagged);
        };
        reader.readAsBinaryString(file);
    };

    const handleSave = () => {
        const key = `stowagePlan_${vcn}`;
        const plan = {
            vcn,
            terminal,
            draftFwd,
            draftAft,
            planList: rows
        };
        localStorage.setItem(key, JSON.stringify(plan));
        alert(`Draft saved for ${vcn}`);
    };

    const handleSubmit = () => {
        const key = `stowagePlan_${vcn}`;
        const plan = {
            vcn,
            terminal,
            draftFwd,
            draftAft,
            planList: rows
        };
        localStorage.setItem(key, JSON.stringify(plan));
        alert(`Stowage Plan submitted for ${vcn}`);
    };

    return (
        <PageWrapper title="Upload Stowage Plan">
            <div className="stowage-form">
                <div className="form-row">
                    <label>VCN *</label>
                    <input value={vcn} onChange={(e) => setVcn(e.target.value)} placeholder="Enter VCN" />
                </div>

                <div className="form-row">
                    <label>Terminal *</label>
                    <select value={terminal} onChange={(e) => setTerminal(e.target.value)}>
                        <option value="">-- Select Terminal --</option>
                        <option value="AEMIN1">AEMIN1</option>
                        <option value="AEAUH1">AEAUH1</option>
                        <option value="AEDXB1">AEDXB1</option>
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

                <div className="form-row">
                    <label>Upload Excel File</label>
                    <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                    {fileName && <p className="file-name">📄 {fileName}</p>}
                </div>

                {rows.length > 0 && (
                    <div className="preview-section">
                        <h4>Parsed Stowage Data</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>Container No</th>
                                    <th>BL No</th>
                                    <th>Call Sign</th>
                                    <th>IMO</th>
                                    <th>DG Class</th>
                                    <th>UN No</th>
                                    <th>Flash Point</th>
                                    <th>Discharge Port</th>
                                    <th>Tonnage</th>
                                    <th>Stowage Instruction</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, idx) => (
                                    <tr key={idx} className={row.is_dg ? 'dg-row' : ''}>
                                        <td>{row['Container No']}</td>
                                        <td>{row['BL No']}</td>
                                        <td>{row['Call Sign']}</td>
                                        <td>{row['IMO']}</td>
                                        <td>{row['DG Class']}</td>
                                        <td>{row['UN No']}</td>
                                        <td>{row['Flash Point']}</td>
                                        <td>{row['Discharge Port']}</td>
                                        <td>{row['Tonnage']}</td>
                                        <td>{row['Stowage Instruction']}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="action-buttons">
                            <button className="save-btn" onClick={handleSave}>Save as Draft</button>
                            <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                )}
            </div>
        </PageWrapper>
    );
};

export default UploadStowageFile;
