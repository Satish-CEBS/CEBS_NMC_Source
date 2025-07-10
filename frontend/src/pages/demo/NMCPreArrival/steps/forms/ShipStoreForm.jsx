import React, { useState, useEffect } from 'react';
import './ModalForm.css';

const ShipStoreForm = ({ onSave, onClose, editingItem }) => {
  const [formData, setFormData] = useState({
    item: '',
    quantity: '',
    location: ''
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

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Fill Ship Store Manually</h3>
        <p>Provide information about onboard stores.</p>

        {['item', 'quantity', 'location'].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.toUpperCase()}</label>
            <input
              type={field === 'quantity' ? 'number' : 'text'}
              name={field}
              value={formData[field] || ''}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="modal-actions">
          <button className="save-btn" onClick={handleSubmit}>Save</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ShipStoreForm;
