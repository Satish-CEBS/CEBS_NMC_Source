import React, { useState, useEffect } from 'react';
import './PaxForm.css';

const emptyPaxEntry = {
    id: '',
    familyName: '',
    givenName: '',
    nationality: '',
    gender: '',
    dateOfBirth: '',
    travelDocumentType: '',
    travelDocumentNumber: '',
    travelDocumentIssueDate: '',
    travelDocumentExpiryDate: '',
    issuingNation: '',
};

const PaxForm = ({ savedData, onSave }) => {
    const [passengers, setPassengers] = useState([]);
    const [newPassenger, setNewPassenger] = useState(emptyPaxEntry);

    useEffect(() => {
        if (savedData && Array.isArray(savedData)) {
            setPassengers(savedData);
        }
    }, [savedData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPassenger((prev) => ({ ...prev, [name]: value }));
    };

    const addPassenger = () => {
        if (!newPassenger.familyName.trim() || !newPassenger.givenName.trim()) {
            alert('Please enter both family and given names.');
            return;
        }
        setPassengers((prev) => [...prev, newPassenger]);
        setNewPassenger(emptyPaxEntry);
    };

    const deletePassenger = (index) => {
        setPassengers((prev) => prev.filter((_, i) => i !== index));
    };

    const deleteAll = () => {
        if (window.confirm('Delete all passengers?')) {
            setPassengers([]);
        }
    };

    const saveAll = () => {
        if (onSave) onSave(passengers);
    };

    return (
        <div className="pax-form-container">
            <h3>Passenger List</h3>

            <div className="pax-new-entry">
                <input
                    name="familyName"
                    placeholder="Family Name *"
                    value={newPassenger.familyName}
                    onChange={handleChange}
                    required
                />
                <input
                    name="givenName"
                    placeholder="Given Name *"
                    value={newPassenger.givenName}
                    onChange={handleChange}
                    required
                />
                <input
                    name="nationality"
                    placeholder="Nationality"
                    value={newPassenger.nationality}
                    onChange={handleChange}
                />
                <select
                    name="gender"
                    value={newPassenger.gender}
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
                    value={newPassenger.dateOfBirth}
                    onChange={handleChange}
                />
                <input
                    name="travelDocumentType"
                    placeholder="Travel Document Type"
                    value={newPassenger.travelDocumentType}
                    onChange={handleChange}
                />
                <input
                    name="travelDocumentNumber"
                    placeholder="Travel Document Number"
                    value={newPassenger.travelDocumentNumber}
                    onChange={handleChange}
                />
                <input
                    name="travelDocumentIssueDate"
                    type="date"
                    placeholder="Issue Date"
                    value={newPassenger.travelDocumentIssueDate}
                    onChange={handleChange}
                />
                <input
                    name="travelDocumentExpiryDate"
                    type="date"
                    placeholder="Expiry Date"
                    value={newPassenger.travelDocumentExpiryDate}
                    onChange={handleChange}
                />
                <input
                    name="issuingNation"
                    placeholder="Issuing Nation"
                    value={newPassenger.issuingNation}
                    onChange={handleChange}
                />

                <button type="button" onClick={addPassenger}>Add Passenger</button>
            </div>

            <table className="pax-table">
                <thead>
                    <tr>
                        <th>Family Name</th>
                        <th>Given Name</th>
                        <th>Nationality</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {passengers.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center' }}>
                                There are no passengers in this list.
                            </td>
                        </tr>
                    ) : (
                        passengers.map((pax, idx) => (
                            <tr key={idx}>
                                <td>{pax.familyName}</td>
                                <td>{pax.givenName}</td>
                                <td>{pax.nationality}</td>
                                <td>{pax.gender}</td>
                                <td>{pax.dateOfBirth}</td>
                                <td>
                                    <button type="button" onClick={() => deletePassenger(idx)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="pax-actions">
                <button type="button" onClick={saveAll}>Save Passenger List</button>
                <button type="button" onClick={deleteAll} className="danger">Delete all Passengers</button>
            </div>
        </div>
    );
};

export default PaxForm;
