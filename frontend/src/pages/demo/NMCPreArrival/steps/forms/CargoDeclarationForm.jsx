// File: forms/CargoDeclarationForm.jsx
import React, { useState, useEffect } from 'react';
import '../../../styles/ModalForm.css';

const CargoDeclarationForm = ({ onSave, onCancel, initialData }) => {
  const [form, setForm] = useState({
    blNumber: '', marks: '', description: '', hsCode: '', weight: '', volume: ''
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleSubmit = () => onSave(form);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Manual Entry – Cargo Declaration</h3>
        <p>Fill cargo details as per uploaded manifest or B/L</p>
        {['blNumber', 'marks', 'description', 'hsCode', 'weight', 'volume'].map((field, i) => (
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

export default CargoDeclarationForm;
