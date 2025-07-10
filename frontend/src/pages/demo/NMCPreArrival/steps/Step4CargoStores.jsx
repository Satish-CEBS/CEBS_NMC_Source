// File: NMCPreArrival/steps/Step4CargoStores.jsx
import React, { useState } from 'react';
import '../../styles/NMCStep.css';

const Step4CargoStores = ({
  data = { cargo: {}, stores: {} }, // ✅ Safe default for undefined `data`
  updateData,
  goToNextStep,
  goToPreviousStep,
  resetStep
}) => {
  const [activeTab, setActiveTab] = useState('cargo'); // 'cargo' or 'stores'
  const [modalVisible, setModalVisible] = useState(false);
  const [manualData, setManualData] = useState({ description: '', quantity: '' });

  // ✅ Handles PDF upload for either 'cargo' or 'stores'
  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const updated = {
        ...data,
        [field]: {
          ...data[field], // Retain existing fields like description, quantity if present
          file,
          uploadedAt: new Date().toISOString(),
          name: file.name
        }
      };
      updateData(updated);
    }
  };

  // ✅ Handles manual metadata entry
  const handleManualSave = () => {
    const updated = {
      ...data,
      [activeTab]: {
        ...data[activeTab], // Keep file if already uploaded
        ...manualData,
        uploadedAt: new Date().toISOString(),
        name: `${activeTab}_manual_entry.json`
      }
    };
    updateData(updated);
    setManualData({ description: '', quantity: '' });
    setModalVisible(false);
  };

  // ✅ Renders tab content (PDF upload + manual + metadata)
  const renderTabContent = () => {
    const field = activeTab;
    const entry = data?.[field] || {};

    return (
      <>
        <div className="form-group">
          <label>Upload PDF</label>
          <input type="file" accept="application/pdf" onChange={(e) => handleFileUpload(e, field)} />
        </div>

        <div className="form-group">
          <button type="button" className="fill-btn" onClick={() => setModalVisible(true)}>
            Fill Manually
          </button>
        </div>

        {entry?.name && (
          <div className="metadata-preview">
            <p><strong>Filename:</strong> {entry.name}</p>
            <p><strong>Uploaded At:</strong> {new Date(entry.uploadedAt).toLocaleString()}</p>
            {entry.description && <p><strong>Description:</strong> {entry.description}</p>}
            {entry.quantity && <p><strong>Quantity:</strong> {entry.quantity}</p>}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="nmc-step">
      <h2>Step 4: Cargo & Ship’s Stores</h2>

      {/* ✅ Tab Switcher */}
      <div className="tab-buttons">
        <button className={activeTab === 'cargo' ? 'active' : ''} onClick={() => setActiveTab('cargo')}>
          Cargo Declaration
        </button>
        <button className={activeTab === 'stores' ? 'active' : ''} onClick={() => setActiveTab('stores')}>
          Ship’s Stores
        </button>
      </div>

      {/* ✅ File Upload + Metadata */}
      {renderTabContent()}

      {/* ✅ Manual Entry Modal */}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Manual Entry – {activeTab === 'cargo' ? 'Cargo Declaration' : 'Ship’s Stores'}</h3>

            <label>Description:
              <input
                type="text"
                value={manualData.description}
                onChange={(e) => setManualData({ ...manualData, description: e.target.value })}
              />
            </label>

            <label>Quantity:
              <input
                type="number"
                value={manualData.quantity}
                onChange={(e) => setManualData({ ...manualData, quantity: e.target.value })}
              />
            </label>

            <div className="modal-buttons">
              <button onClick={handleManualSave}>Save</button>
              <button className="reset-btn" onClick={() => setModalVisible(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step4CargoStores;
