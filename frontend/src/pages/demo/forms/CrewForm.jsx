import React, { useState, useEffect } from 'react';
import './CrewForm.css';

const emptyCrewMember = {
    id: '',
    familyName: '',
    givenName: '',
    nationality: '',
    gender: '',
    dateOfBirth: '',
    rank: '',
    rankCode: '',
    isMaster: false,
    identityDocType: '',
    identityDocNumber: '',
    identityDocIssueDate: '',
    identityDocExpiryDate: '',
    issuingNation: '',
};

const CrewForm = ({ savedData, onSave }) => {
    const [crewList, setCrewList] = useState([]);
    const [newMember, setNewMember] = useState(emptyCrewMember);

    useEffect(() => {
        if (savedData && Array.isArray(savedData)) {
            setCrewList(savedData);
        }
    }, [savedData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewMember((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const addMember = () => {
        if (!newMember.familyName.trim() || !newMember.givenName.trim()) {
            alert('Please enter both family and given names.');
            return;
        }
        setCrewList((prev) => [...prev, newMember]);
        setNewMember(emptyCrewMember);
    };

    const deleteMember = (index) => {
        setCrewList((prev) => prev.filter((_, i) => i !== index));
    };

    const deleteAll = () => {
        if (window.confirm('Delete all crew members?')) {
            setCrewList([]);
        }
    };

    const saveAll = () => {
        if (onSave) onSave(crewList);
    };

    return (
        <div className="crew-form-container">
            <h3>Crew Members</h3>

            <div className="crew-new-member">
                <input
                    name="familyName"
                    placeholder="Family Name *"
                    value={newMember.familyName}
                    onChange={handleChange}
                    required
                />
                <input
                    name="givenName"
                    placeholder="Given Name *"
                    value={newMember.givenName}
                    onChange={handleChange}
                    required
                />
                <input
                    name="nationality"
                    placeholder="Nationality"
                    value={newMember.nationality}
                    onChange={handleChange}
                />
                <select
                    name="gender"
                    value={newMember.gender}
                    onChange={handleChange}
                >
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input
                    name="dateOfBirth"
                    type="date"
                    value={newMember.dateOfBirth}
                    onChange={handleChange}
                />
                <input
                    name="rank"
                    placeholder="Rank/Rating"
                    value={newMember.rank}
                    onChange={handleChange}
                />
                <input
                    name="rankCode"
                    placeholder="Rank/Rating Code"
                    value={newMember.rankCode}
                    onChange={handleChange}
                />
                <label>
                    Is Master
                    <input
                        name="isMaster"
                        type="checkbox"
                        checked={newMember.isMaster}
                        onChange={handleChange}
                    />
                </label>

                <input
                    name="identityDocType"
                    placeholder="Identity Document Type"
                    value={newMember.identityDocType}
                    onChange={handleChange}
                />
                <input
                    name="identityDocNumber"
                    placeholder="Identity Document Number"
                    value={newMember.identityDocNumber}
                    onChange={handleChange}
                />
                <input
                    name="identityDocIssueDate"
                    type="date"
                    placeholder="Issue Date"
                    value={newMember.identityDocIssueDate}
                    onChange={handleChange}
                />
                <input
                    name="identityDocExpiryDate"
                    type="date"
                    placeholder="Expiry Date"
                    value={newMember.identityDocExpiryDate}
                    onChange={handleChange}
                />
                <input
                    name="issuingNation"
                    placeholder="Issuing Nation"
                    value={newMember.issuingNation}
                    onChange={handleChange}
                />

                <button type="button" onClick={addMember}>
                    Add Crew Member
                </button>
            </div>

            <table className="crew-table">
                <thead>
                    <tr>
                        <th>Family Name</th>
                        <th>Given Name</th>
                        <th>Nationality</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>Rank/Rating</th>
                        <th>Is Master</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {crewList.length === 0 ? (
                        <tr>
                            <td colSpan="8" style={{ textAlign: 'center' }}>
                                There are no crew members in this list.
                            </td>
                        </tr>
                    ) : (
                        crewList.map((member, idx) => (
                            <tr key={idx}>
                                <td>{member.familyName}</td>
                                <td>{member.givenName}</td>
                                <td>{member.nationality}</td>
                                <td>{member.gender}</td>
                                <td>{member.dateOfBirth}</td>
                                <td>{member.rank}</td>
                                <td>{member.isMaster ? 'Yes' : 'No'}</td>
                                <td>
                                    <button type="button" onClick={() => deleteMember(idx)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="crew-actions">
                <button type="button" onClick={saveAll}>
                    Save Crew List
                </button>
                <button type="button" onClick={deleteAll} className="danger">
                    Delete all Crew
                </button>
            </div>
        </div>
    );
};

export default CrewForm;
