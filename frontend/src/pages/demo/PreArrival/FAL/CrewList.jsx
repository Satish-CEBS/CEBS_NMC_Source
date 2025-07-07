import React, { useState } from 'react';
import './ModalForm.css';
import countries from './countryList.json'; // Assumed utility list of country names

const idTypes = [
    'Passport',
    'Seaman\'s Book',
    'National ID',
    'Driving License',
    'Other'
];

const emptyCrew = {
    familyName: '',
    givenNames: '',
    rank: '',
    nationality: '',
    dob: '',
    pob: '',
    gender: '',
    idType: '',
    idNumber: '',
    idState: '',
    idExpiry: ''
};

const CrewList = ({ onClose, onSubmit, initialData = [] }) => {
    const [crewList, setCrewList] = useState(initialData.length ? initialData : [emptyCrew]);

    const handleChange = (index, field, value) => {
        const updated = [...crewList];
        updated[index][field] = value;
        setCrewList(updated);
    };

    const addCrew = () => setCrewList([...crewList, { ...emptyCrew }]);
    const removeCrew = (index) => setCrewList(crewList.filter((_, i) => i !== index));

    const handleSubmit = () => {
        onSubmit(crewList);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Crew List (FAL Form 5)</h3>

                {crewList.map((crew, index) => (
                    <div key={index} className="crew-entry">
                        <h4>Crew Member #{index + 1}</h4>
                        <div className="form-row">
                            <input placeholder="Family Name" value={crew.familyName} onChange={e => handleChange(index, 'familyName', e.target.value)} />
                            <input placeholder="Given Names" value={crew.givenNames} onChange={e => handleChange(index, 'givenNames', e.target.value)} />
                            <input placeholder="Rank/Rating" value={crew.rank} onChange={e => handleChange(index, 'rank', e.target.value)} />
                        </div>

                        <div className="form-row">
                            <select value={crew.nationality} onChange={e => handleChange(index, 'nationality', e.target.value)}>
                                <option value="">Select Nationality</option>
                                {countries.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                            <input type="date" value={crew.dob} onChange={e => handleChange(index, 'dob', e.target.value)} />
                            <input placeholder="Place of Birth" value={crew.pob} onChange={e => handleChange(index, 'pob', e.target.value)} />
                        </div>

                        <div className="form-row">
                            <select value={crew.gender} onChange={e => handleChange(index, 'gender', e.target.value)}>
                                <option value="">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>

                            <select value={crew.idType} onChange={e => handleChange(index, 'idType', e.target.value)}>
                                <option value="">ID Type</option>
                                {idTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>

                            <input placeholder="ID Number" value={crew.idNumber} onChange={e => handleChange(index, 'idNumber', e.target.value)} />
                        </div>

                        <div className="form-row">
                            <select value={crew.idState} onChange={e => handleChange(index, 'idState', e.target.value)}>
                                <option value="">Issuing State</option>
                                {countries.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>

                            <div className="form-group">
                                <label style={{ fontSize: '0.8rem' }}>Valid Until</label>
                                <input type="date" value={crew.idExpiry} onChange={e => handleChange(index, 'idExpiry', e.target.value)} />
                            </div>
                        </div>

                        {crewList.length > 1 && (
                            <button className="remove-btn" onClick={() => removeCrew(index)}>Remove</button>
                        )}
                        <hr />
                    </div>
                ))}

                <div className="modal-actions">
                    <button onClick={addCrew}>+ Add Another</button>
                    <button className="save-btn" onClick={handleSubmit}>Save</button>
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CrewList;
