// Step4CargoStores.jsx
import React, { useState, useEffect } from 'react';
import CargoDeclarationForm from './forms/CargoDeclarationForm';
import ShipStoreForm from './forms/ShipStoreForm';
import './Step4CargoStores.css';
import * as XLSX from 'xlsx';

const Step4CargoStores = () => {
  const [activeTab, setActiveTab] = useState('cargo');
  const [cargoList, setCargoList] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [showCargoModal, setShowCargoModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [editCargoIndex, setEditCargoIndex] = useState(null);
  const [editStoreIndex, setEditStoreIndex] = useState(null);

  useEffect(() => {
    const savedCargo = JSON.parse(localStorage.getItem('cargoList')) || [];
    const savedStore = JSON.parse(localStorage.getItem('storeList')) || [];
    setCargoList(savedCargo);
    setStoreList(savedStore);
  }, []);

  useEffect(() => {
    localStorage.setItem('cargoList', JSON.stringify(cargoList));
  }, [cargoList]);

  useEffect(() => {
    localStorage.setItem('storeList', JSON.stringify(storeList));
  }, [storeList]);

  const handleCargoFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsed = XLSX.utils.sheet_to_json(sheet);
      setCargoList((prev) => [...prev, ...parsed]);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleStoreFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsed = XLSX.utils.sheet_to_json(sheet);
      setStoreList((prev) => [...prev, ...parsed]);
    };
    reader.readAsArrayBuffer(file);
  };

  const deleteRow = (type, index) => {
    if (type === 'cargo') {
      const copy = [...cargoList];
      copy.splice(index, 1);
      setCargoList(copy);
    } else {
      const copy = [...storeList];
      copy.splice(index, 1);
      setStoreList(copy);
    }
  };

  const renderTable = (type) => {
    const list = type === 'cargo' ? cargoList : storeList;
    const columns =
      type === 'cargo'
        ? ['B/L No.', 'Description', 'HS Code', 'Weight (kg)', 'Volume (m³)']
        : ['Item', 'Quantity', 'Location'];

    return (
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((entry, idx) => (
            <tr key={idx}>
              {columns.map((col) => {
                const key = Object.keys(entry).find((k) =>
                  col.toLowerCase().includes(k.toLowerCase())
                );
                return <td key={col}>{entry[key]}</td>;
              })}
              <td>
                <button onClick={() => {
                  if (type === 'cargo') {
                    setEditCargoIndex(idx);
                    setShowCargoModal(true);
                  } else {
                    setEditStoreIndex(idx);
                    setShowStoreModal(true);
                  }
                }}>Edit</button>
                <button onClick={() => deleteRow(type, idx)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <div className="tab-header">
        <button
          className={activeTab === 'cargo' ? 'active' : ''}
          onClick={() => setActiveTab('cargo')}
        >
          Cargo Declaration
        </button>
        <button
          className={activeTab === 'store' ? 'active' : ''}
          onClick={() => setActiveTab('store')}
        >
          Ship’s Stores
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'cargo' && (
          <>
            <p>Submit a file or fill data manually.</p>
            <input type="file" accept=".csv,.xlsx" onChange={handleCargoFile} />
            <button onClick={() => {
              setEditCargoIndex(null);
              setShowCargoModal(true);
            }}>Fill Manually</button>
            {renderTable('cargo')}
          </>
        )}
        {activeTab === 'store' && (
          <>
            <p>Submit a file or fill data manually.</p>
            <input type="file" accept=".csv,.xlsx" onChange={handleStoreFile} />
            <button onClick={() => {
              setEditStoreIndex(null);
              setShowStoreModal(true);
            }}>Fill Manually</button>
            {renderTable('store')}
          </>
        )}
      </div>

      {showCargoModal && (
        <CargoDeclarationForm
          initialData={editCargoIndex != null ? cargoList[editCargoIndex] : null}
          onClose={() => {
            setShowCargoModal(false);
            setEditCargoIndex(null);
          }}
          onSave={(data) => {
            const updated = [...cargoList];
            if (editCargoIndex != null) {
              updated[editCargoIndex] = data;
            } else {
              updated.push(data);
            }
            setCargoList(updated);
            setShowCargoModal(false);
          }}
        />
      )}

      {showStoreModal && (
        <ShipStoreForm
          initialData={editStoreIndex != null ? storeList[editStoreIndex] : null}
          onClose={() => {
            setShowStoreModal(false);
            setEditStoreIndex(null);
          }}
          onSave={(data) => {
            const updated = [...storeList];
            if (editStoreIndex != null) {
              updated[editStoreIndex] = data;
            } else {
              updated.push(data);
            }
            setStoreList(updated);
            setShowStoreModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Step4CargoStores;
