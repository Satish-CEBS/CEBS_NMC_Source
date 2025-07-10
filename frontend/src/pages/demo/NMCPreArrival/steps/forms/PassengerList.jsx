// src/pages/demo/PreArrival/FAL/PassengerList.jsx

import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import countries from './countryList.json'; // Ensure you have a JSON list of all UN countries
import './ModalForm.css';

const genders = ['Male', 'Female', 'Other'];
const idTypes = ['Passport', 'Seaman Book', 'National ID'];
const yesNo = ['Yes', 'No'];

const PassengerList = ({ open, onClose, onSave, existingData = [] }) => {
    const [form, setForm] = useState({
        givenName: '',
        familyName: '',
        gender: '',
        nationality: '',
        dateOfBirth: '',
        placeOfBirth: '',
        idType: '',
        idNumber: '',
        idIssuer: '',
        idExpiry: '',
        embarkPort: '',
        visaNumber: '',
        disembarkPort: '',
        isTransit: ''
    });

    const [data, setData] = useState(existingData);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleAdd = () => {
        const required = ['givenName', 'familyName', 'gender', 'nationality', 'idType'];
        const errs = {};
        required.forEach(field => {
            if (!form[field]) errs[field] = 'Required';
        });

        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        setData(prev => [...prev, form]);
        setForm({
            givenName: '',
            familyName: '',
            gender: '',
            nationality: '',
            dateOfBirth: '',
            placeOfBirth: '',
            idType: '',
            idNumber: '',
            idIssuer: '',
            idExpiry: '',
            embarkPort: '',
            visaNumber: '',
            disembarkPort: '',
            isTransit: ''
        });
        setErrors({});
    };

    const handleSave = () => {
        onSave(data);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div className="modal-container">
                <h2>Passenger List (FAL Form 6)</h2>

                <div className="form-row">
                    <TextField
                        label="Given Name"
                        name="givenName"
                        value={form.givenName}
                        onChange={handleChange}
                        error={!!errors.givenName}
                        helperText={errors.givenName}
                    />
                    <TextField
                        label="Family Name"
                        name="familyName"
                        value={form.familyName}
                        onChange={handleChange}
                        error={!!errors.familyName}
                        helperText={errors.familyName}
                    />
                </div>

                <div className="form-row">
                    <TextField
                        label="Gender"
                        name="gender"
                        select
                        value={form.gender}
                        onChange={handleChange}
                        error={!!errors.gender}
                        helperText={errors.gender}
                    >
                        {genders.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                    </TextField>

                    <Autocomplete
                        options={countries.map(c => c.name)}
                        value={form.nationality}
                        onChange={(e, val) => setForm(prev => ({ ...prev, nationality: val }))}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Nationality"
                                error={!!errors.nationality}
                                helperText={errors.nationality}
                            />
                        )}
                    />
                </div>

                <div className="form-row">
                    <TextField
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={form.dateOfBirth}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Place of Birth"
                        name="placeOfBirth"
                        value={form.placeOfBirth}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-row">
                    <TextField
                        label="ID Type"
                        name="idType"
                        select
                        value={form.idType}
                        onChange={handleChange}
                        error={!!errors.idType}
                        helperText={errors.idType}
                    >
                        {idTypes.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                    </TextField>

                    <TextField
                        label="ID Number"
                        name="idNumber"
                        value={form.idNumber}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-row">
                    <TextField
                        label="Issuing State"
                        name="idIssuer"
                        value={form.idIssuer}
                        onChange={handleChange}
                    />
                    <TextField
                        label="ID Expiry"
                        name="idExpiry"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={form.idExpiry}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-row">
                    <TextField
                        label="Port of Embarkation"
                        name="embarkPort"
                        value={form.embarkPort}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Port of Disembarkation"
                        name="disembarkPort"
                        value={form.disembarkPort}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-row">
                    <TextField
                        label="Visa Number (if applicable)"
                        name="visaNumber"
                        value={form.visaNumber}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Transit Passenger?"
                        name="isTransit"
                        select
                        value={form.isTransit}
                        onChange={handleChange}
                    >
                        {yesNo.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                    </TextField>
                </div>

                <div className="form-actions">
                    <button className="btn" onClick={handleAdd}>Add Entry</button>
                    <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleSave}>Save Form</button>
                </div>

                {data.length > 0 && (
                    <div className="summary-table">
                        <p>✅ Digitally filled ({data.length} entries)</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Gender</th>
                                    <th>Nationality</th>
                                    <th>ID Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{row.givenName} {row.familyName}</td>
                                        <td>{row.gender}</td>
                                        <td>{row.nationality}</td>
                                        <td>{row.idType}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default PassengerList;
