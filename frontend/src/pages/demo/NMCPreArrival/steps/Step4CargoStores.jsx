// File: Step4CargoStores.jsx
import React, { useState } from 'react';
import CargoDeclarationForm from './forms/CargoDeclarationForm';
import ShipStoreForm from './forms/ShipStoreForm';
import './Step4CargoStores.css';
import parsePDFCargo from './utils/parsePDFCargo';
import parsePDFStores from './utils/parsePDFStores';

const Step4CargoStores = ({ data = {}, updateData, goToNextStep, goToPreviousStep, resetStep }) => {
  const [activeTab, setActiveTab] = useState('cargo');
  const [showCargoModal, setShowCargoModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const cargoList = data.cargoList || [];
  const storesList = data.storesList || [];

  const handlePDFUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();
    const newData = type === 'cargo'
      ? await parsePDFCargo(text)
      : await parsePDFStores(text);

    const updated = {
      ...data,
      [type === 'cargo' ? 'cargoList' : 'storesList']: [
        ...(type === 'cargo' ? cargoList : storesList),
        ...newData
      ]
    };

    updateData(updated);
  };

  const handleManualSave = (entry) => {
    const targetKey = activeTab === 'cargo' ? 'cargoList' : 'storesList';
    const existingList = data[targetKey] || [];

    const updatedList = editIndex !== null
      ? existingList.map((item, i) => (i === editIndex ? entry : item))
      : [...existingList, entry];

    updateData({
      ...data,
      [targetKey]: updatedList
    });

    if (activeTab === 'cargo') setShowCargoModal(false);
    else setShowStoreModal(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    if (activeTab === 'cargo') setShowCargoModal(true);
    else setShowStoreModal(true);
  };

  const handleRemove = (index) => {
    const targetKey = activeTab === 'cargo' ? 'cargoList' : 'storesList';
    const updated = [...(data[targetKey] || [])];
    updated.splice(index, 1);
    updateData({ ...data, [targetKey]: updated });
  };

  const renderTable = (list) => (
    <table className="data-table">
      <thead>
        <tr>
          {activeTab === 'cargo' ? (
            <>
              <th>B/L No.</th><th>Marks</th><th>Description</th><th>HS Code</th><th>Weight</th><th>Volume</th><th>Actions</th>
            </>
          ) : (
            <>
              <th>Item</th><th>Quantity</th><th>Location</th><th>Actions</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {list.map((entry, index) => (
          <tr key={index}>
            {activeTab === 'cargo' ? (
              <>
                <td>{entry.blNumber}</td><td>{entry.marks}</td><td>{entry.description}</td>
                <td>{entry.hsCode}</td><td>{entry.weight}</td><td>{entry.volume}</td>
              </>
            ) : (
              <>
                <td>{entry.item}</td><td>{entry.quantity}</td><td>{entry.location}</td>
              </>
            )}
            <td>
              <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
              <button className="remove-btn" onClick={() => handleRemove(index)}>Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="nmc-step">
      <h2>Step 4: Cargo & Ship’s Stores</h2>
      <div className="tab-buttons">
        <button className={activeTab === 'cargo' ? 'active' : ''} onClick={() => setActiveTab('cargo')}>Cargo Declaration</button>
        <button className={activeTab === 'stores' ? 'active' : ''} onClick={() => setActiveTab('stores')}>Ship’s Stores</button>
      </div>

      <div className="upload-section">
        <input type="file" accept="application/pdf" onChange={(e) => handlePDFUpload(e, activeTab)} />
        <button className="fill-btn" onClick={() => activeTab === 'cargo' ? setShowCargoModal(true) : setShowStoreModal(true)}>
          Fill Manually
        </button>
      </div>

      {activeTab === 'cargo' ? renderTable(cargoList) : renderTable(storesList)}

      {showCargoModal && (
        <CargoDeclarationForm
          onSave={handleManualSave}
          onCancel={() => setShowCargoModal(false)}
          initialData={editIndex !== null ? cargoList[editIndex] : null}
        />
      )}

      {showStoreModal && (
        <ShipStoreForm
          onSave={handleManualSave}
          onCancel={() => setShowStoreModal(false)}
          initialData={editIndex !== null ? storesList[editIndex] : null}
        />
      )}
    </div>
  );
};

export default Step4CargoStores;
