import React, { useState, useEffect } from 'react';
import './DPGForm.css';

const emptyDPGEntry = {
    classification: '',
    un_number: '',
    name: '',
    gross_weight_volume: '',
    net_weight_volume: '',
    location_on_board: '',
    trans_unit_id: '',
    placed_in_container: false,
};

const DPGForm = ({ savedData, onSave }) => {
    const [entries, setEntries] = useState([]);
    const [newEntry, setNewEntry] = useState(emptyDPGEntry);

    useEffect(() => {
        if (savedData && Array.isArray(savedData)) {
            setEntries(savedData);
        }
    }, [savedData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewEntry((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const addEntry = () => {
        if (!newEntry.name.trim()) {
            alert('Please enter a Name for the Dangerous Good');
            return;
        }
        setEntries((prev) => [...prev, newEntry]);
        setNewEntry(emptyDPGEntry);
    };

    const deleteEntry = (index) => {
        setEntries((prev) => prev.filter((_, i) => i !== index));
    };

    const deleteAll = () => {
        if (window.confirm('Delete all Dangerous Goods entries?')) {
            setEntries([]);
        }
    };

    const saveAll = () => {
        if (onSave) onSave(entries);
    };

    return (
        <div className="dpg-form-container">
            <h3>Dangerous Goods (DPG) Form</h3>

            <div className="dpg-new-entry">
                <input
                    name="classification"
                    placeholder="Classification"
                    value={newEntry.classification}
                    onChange={handleChange}
                />
                <input
                    name="un_number"
                    placeholder="UN No/Name"
                    value={newEntry.un_number}
                    onChange={handleChange}
                />
                <input
                    name="name"
                    placeholder="Name *"
                    value={newEntry.name}
                    onChange={handleChange}
                    required
                />
                <input
                    name="gross_weight_volume"
                    placeholder="Gross Weight/Volume"
                    value={newEntry.gross_weight_volume}
                    onChange={handleChange}
                />
                <input
                    name="net_weight_volume"
                    placeholder="Net Weight/Volume"
                    value={newEntry.net_weight_volume}
                    onChange={handleChange}
                />
                <input
                    name="location_on_board"
                    placeholder="Location on Board"
                    value={newEntry.location_on_board}
                    onChange={handleChange}
                />
                <input
                    name="trans_unit_id"
                    placeholder="Trans Unit ID"
                    value={newEntry.trans_unit_id}
                    onChange={handleChange}
                />
                <label>
                    Placed in Container
                    <input
                        name="placed_in_container"
                        type="checkbox"
                        checked={newEntry.placed_in_container}
                        onChange={handleChange}
                    />
                </label>
                <button type="button" onClick={addEntry}>
                    Add Entry
                </button>
            </div>

            <table className="dpg-table">
                <thead>
                    <tr>
                        <th>Classification</th>
                        <th>UN No/Name</th>
                        <th>Name</th>
                        <th>Gross Weight/Volume</th>
                        <th>Net Weight/Volume</th>
                        <th>Location on Board</th>
                        <th>Trans Unit ID</th>
                        <th>Placed in Container</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.length === 0 ? (
                        <tr>
                            <td colSpan="9" style={{ textAlign: 'center' }}>
                                There are no DPGs in this list.
                            </td>
                        </tr>
                    ) : (
                        entries.map((entry, idx) => (
                            <tr key={idx}>
                                <td>{entry.classification}</td>
                                <td>{entry.un_number}</td>
                                <td>{entry.name}</td>
                                <td>{entry.gross_weight_volume}</td>
                                <td>{entry.net_weight_volume}</td>
                                <td>{entry.location_on_board}</td>
                                <td>{entry.trans_unit_id}</td>
                                <td>{entry.placed_in_container ? 'Yes' : 'No'}</td>
                                <td>
                                    <button type="button" onClick={() => deleteEntry(idx)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="dpg-actions">
                <button type="button" onClick={saveAll}>
                    Save all DPGs
                </button>
                <button type="button" onClick={deleteAll} className="danger">
                    Delete all DPGs
                </button>
            </div>
        </div>
    );
};

export default DPGForm;
