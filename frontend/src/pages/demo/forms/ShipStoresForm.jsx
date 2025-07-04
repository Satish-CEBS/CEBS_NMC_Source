import React, { useState, useEffect } from 'react';
import './ShipStoresForm.css';

const emptyStoreEntry = {
    sequenceNumber: '',
    articleName: '',
    quantity: '',
    measurementType: '',
    locationOnBoard: '',
    locationOnBoardCode: '',
};

const ShipStoresForm = ({ savedData, onSave }) => {
    const [entries, setEntries] = useState([]);
    const [newEntry, setNewEntry] = useState(emptyStoreEntry);

    useEffect(() => {
        if (savedData && Array.isArray(savedData)) {
            setEntries(savedData);
        }
    }, [savedData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEntry((prev) => ({ ...prev, [name]: value }));
    };

    const addEntry = () => {
        if (!newEntry.articleName.trim()) {
            alert('Please enter the article name.');
            return;
        }
        setEntries((prev) => [...prev, newEntry]);
        setNewEntry(emptyStoreEntry);
    };

    const deleteEntry = (index) => {
        setEntries((prev) => prev.filter((_, i) => i !== index));
    };

    const deleteAll = () => {
        if (window.confirm('Delete all ship stores?')) {
            setEntries([]);
        }
    };

    const saveAll = () => {
        if (onSave) onSave(entries);
    };

    return (
        <div className="shipstores-form-container">
            <h3>Ship Stores List</h3>

            <div className="shipstores-new-entry">
                <input
                    name="sequenceNumber"
                    placeholder="Sequence Number"
                    value={newEntry.sequenceNumber}
                    onChange={handleChange}
                />
                <input
                    name="articleName"
                    placeholder="Article Name *"
                    value={newEntry.articleName}
                    onChange={handleChange}
                    required
                />
                <input
                    name="quantity"
                    placeholder="Quantity"
                    value={newEntry.quantity}
                    onChange={handleChange}
                />
                <input
                    name="measurementType"
                    placeholder="Measurement Type"
                    value={newEntry.measurementType}
                    onChange={handleChange}
                />
                <input
                    name="locationOnBoard"
                    placeholder="Location On Board"
                    value={newEntry.locationOnBoard}
                    onChange={handleChange}
                />
                <input
                    name="locationOnBoardCode"
                    placeholder="Location On Board Code"
                    value={newEntry.locationOnBoardCode}
                    onChange={handleChange}
                />
                <button type="button" onClick={addEntry}>Add Entry</button>
            </div>

            <table className="shipstores-table">
                <thead>
                    <tr>
                        <th>Sequence Number</th>
                        <th>Article Name</th>
                        <th>Quantity</th>
                        <th>Measurement Type</th>
                        <th>Location On Board</th>
                        <th>Location On Board Code</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.length === 0 ? (
                        <tr>
                            <td colSpan="7" style={{ textAlign: 'center' }}>
                                There are no ship stores in this list.
                            </td>
                        </tr>
                    ) : (
                        entries.map((entry, idx) => (
                            <tr key={idx}>
                                <td>{entry.sequenceNumber}</td>
                                <td>{entry.articleName}</td>
                                <td>{entry.quantity}</td>
                                <td>{entry.measurementType}</td>
                                <td>{entry.locationOnBoard}</td>
                                <td>{entry.locationOnBoardCode}</td>
                                <td>
                                    <button type="button" onClick={() => deleteEntry(idx)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="shipstores-actions">
                <button type="button" onClick={saveAll}>Save Ship Stores</button>
                <button type="button" onClick={deleteAll} className="danger">Delete all ship stores</button>
            </div>
        </div>
    );
};

export default ShipStoresForm;
