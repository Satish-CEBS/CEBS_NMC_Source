import React, { useState, useEffect } from 'react';
import './ModalForm.css';

const CargoDeclarationForm = ({ onSave, onClose, editingItem }) => {
  const [formData, setFormData] = useState({
    blno: '',
    description: '',
    hsCode: '',
    weight: '',
    volume: ''
  });

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  const handleCancel = () => {
    onClose(); // ✅ Ensure modal is closed properly
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Fill Cargo Declaration Manually</h3>
        <p>Enter details for each cargo item accurately.</p>

        {['blno', 'description', 'hsCode', 'weight', 'volume'].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.toUpperCase()}</label>
            <input
              type={field === 'weight' || field === 'volume' ? 'number' : 'text'}
              name={field}
              value={formData[field] || ''}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="modal-actions">
          <button className="save-btn" onClick={handleSubmit}>Save</button>
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CargoDeclarationForm;
