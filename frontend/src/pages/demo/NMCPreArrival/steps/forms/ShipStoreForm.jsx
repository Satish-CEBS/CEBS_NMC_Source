// File: forms/ShipStoreForm.jsx
import React, { useState, useEffect } from 'react';
import './ModalForm.css';

const ShipStoreForm = ({ onSave, onCancel, initialData }) => {
  const [form, setForm] = useState({ item: '', quantity: '', location: '' });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleSubmit = () => onSave(form);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Manual Entry – Ship Store</h3>
        <p>List ship’s stores quantity and location</p>
        {['item', 'quantity', 'location'].map((field, i) => (
          <label key={i}>{field}:
            <input value={form[field]} onChange={(e) => handleChange(field, e.target.value)} />
          </label>
        ))}
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Save</button>
          <button className="reset-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ShipStoreForm;
