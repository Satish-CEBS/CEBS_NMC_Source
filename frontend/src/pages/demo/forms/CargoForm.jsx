import React, { useState, useEffect } from 'react';
import './CargoForm.css';

const emptyCargoEntry = {
    description: '',
    quantity: '',
    unit: '',
    gross_weight: '',
    net_weight: '',
    volume: '',
};

const CargoForm = ({ savedData, onSave }) => {
    const [entries, setEntries] = useState([]);
    const [newEntry, setNewEntry] = useState(emptyCargoEntry);

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
        if (!newEntry.description.trim()) {
            alert('Please enter a description for the cargo.');
            return;
        }
        setEntries((prev) => [...prev, newEntry]);
        setNewEntry(emptyCargoEntry);
    };

    const deleteEntry = (index) => {
        setEntries((prev) => prev.filter((_, i) => i !== index));
    };

    const deleteAll = () => {
        if (window.confirm('Delete all cargo entries?')) {
            setEntries([]);
        }
    };

    const saveAll = () => {
        if (onSave) onSave(entries);
    };

    return (
        <div className="cargo-form-container">
            <h3>Cargo Brief Description</h3>

            <div className="cargo-new-entry">
                <input
                    name="description"
                    placeholder="Description *"
                    value={newEntry.description}
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
                    name="unit"
                    placeholder="Unit"
                    value={newEntry.unit}
                    onChange={handleChange}
                />
                <input
                    name="gross_weight"
                    placeholder="Gross Weight"
                    value={newEntry.gross_weight}
                    onChange={handleChange}
                />
                <input
                    name="net_weight"
                    placeholder="Net Weight"
                    value={newEntry.net_weight}
                    onChange={handleChange}
                />
                <input
                    name="volume"
                    placeholder="Volume"
                    value={newEntry.volume}
                    onChange={handleChange}
                />
                <button type="button" onClick={addEntry}>Add Entry</button>
            </div>

            <table className="cargo-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Gross Weight</th>
                        <th>Net Weight</th>
                        <th>Volume</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.length === 0 ? (
                        <tr>
                            <td colSpan="7" style={{ textAlign: 'center' }}>
                                There are no cargo entries in this list.
                            </td>
                        </tr>
                    ) : (
                        entries.map((entry, idx) => (
                            <tr key={idx}>
                                <td>{entry.description}</td>
                                <td>{entry.quantity}</td>
                                <td>{entry.unit}</td>
                                <td>{entry.gross_weight}</td>
                                <td>{entry.net_weight}</td>
                                <td>{entry.volume}</td>
                                <td>
                                    <button type="button" onClick={() => deleteEntry(idx)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="cargo-actions">
                <button type="button" onClick={saveAll}>Save all Cargo</button>
                <button type="button" onClick={deleteAll} className="danger">Delete all Cargo</button>
            </div>
        </div>
    );
};

export default CargoForm;
