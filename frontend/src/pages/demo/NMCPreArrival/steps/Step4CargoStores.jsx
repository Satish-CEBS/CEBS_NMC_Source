import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CargoDeclarationForm from "./forms/CargoDeclarationForm";
import ShipStoreForm from "./forms/ShipStoreForm";
import "./Step4CargoStores.css";
import * as XLSX from "xlsx";

const Step4CargoStores = ({ goToNextStep, goToPreviousStep }) => {
  const [activeTab, setActiveTab] = useState("cargo");
  const [cargoList, setCargoList] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [showCargoModal, setShowCargoModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [editCargoIndex, setEditCargoIndex] = useState(null);
  const [editStoreIndex, setEditStoreIndex] = useState(null);

  useEffect(() => {
    const savedCargo = JSON.parse(localStorage.getItem("cargoList")) || [];
    const savedStore = JSON.parse(localStorage.getItem("storeList")) || [];
    setCargoList(savedCargo);
    setStoreList(savedStore);
  }, []);

  useEffect(() => {
    localStorage.setItem("cargoList", JSON.stringify(cargoList));
  }, [cargoList]);

  useEffect(() => {
    localStorage.setItem("storeList", JSON.stringify(storeList));
  }, [storeList]);

  const handleCargoFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
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
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsed = XLSX.utils.sheet_to_json(sheet);
      setStoreList((prev) => [...prev, ...parsed]);
    };
    reader.readAsArrayBuffer(file);
  };

  const deleteRow = (type, index) => {
    if (type === "cargo") {
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
    const list = type === "cargo" ? cargoList : storeList;
    const columns =
      type === "cargo"
        ? ["B/L No.", "Description", "HS Code", "Weight (kg)", "Volume (m³)"]
        : ["Item", "Quantity", "Location"];

    if (list.length === 0) {
      return (
        <div className="empty-state">
          <i className="fas fa-box-open empty-icon"></i>
          <p>No {type === "cargo" ? "cargo" : "store"} data available</p>
        </div>
      );
    }

    return (
      <div className="table-container">
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
              <motion.tr
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {columns.map((col) => {
                  const key = Object.keys(entry).find((k) =>
                    col.toLowerCase().includes(k.toLowerCase())
                  );
                  return <td key={col}>{entry[key] || "-"}</td>;
                })}
                <td className="actions-cell">
                  <motion.button
                    className="edit-btn"
                    onClick={() => {
                      if (type === "cargo") {
                        setEditCargoIndex(idx);
                        setShowCargoModal(true);
                      } else {
                        setEditStoreIndex(idx);
                        setShowStoreModal(true);
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fas fa-edit"></i> Edit
                  </motion.button>
                  <motion.button
                    className="delete-btn"
                    onClick={() => deleteRow(type, idx)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fas fa-trash-alt"></i> Delete
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <motion.div
      className="step4-container enhanced"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="step-header">
        <h2>Step 4: Cargo & Ship's Stores</h2>
        <p className="step-description">
          Declare all cargo and ship's stores information
        </p>
        <div className="step-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "100%" }}></div>
          </div>
          <span>Step 4 of 4</span>
        </div>
      </div>

      <div className="form-section">
        <div className="section-title">
          <span className="section-number">1</span>
          <h3>Select Declaration Type</h3>
        </div>

        <div className="tab-header">
          <motion.button
            className={activeTab === "cargo" ? "active" : ""}
            onClick={() => setActiveTab("cargo")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="fas fa-shipping-fast"></i> Cargo Declaration
          </motion.button>
          <motion.button
            className={activeTab === "store" ? "active" : ""}
            onClick={() => setActiveTab("store")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="fas fa-warehouse"></i> Ship's Stores
          </motion.button>
        </div>
      </div>

      <div className="form-section">
        <div className="section-title">
          <span className="section-number">2</span>
          <h3>{activeTab === "cargo" ? "Cargo" : "Ship Stores"} Data</h3>
        </div>

        <div className="tab-content">
          <div className="upload-options">
            <div className="file-upload-wrapper">
              <input
                type="file"
                id={`${activeTab}-file-upload`}
                accept=".csv,.xlsx"
                onChange={
                  activeTab === "cargo" ? handleCargoFile : handleStoreFile
                }
              />
              <label
                htmlFor={`${activeTab}-file-upload`}
                className="file-upload-label"
              >
                <i className="fas fa-file-import"></i> Import Excel/CSV
              </label>
            </div>

            <motion.button
              className="manual-btn"
              onClick={() => {
                if (activeTab === "cargo") {
                  setEditCargoIndex(null);
                  setShowCargoModal(true);
                } else {
                  setEditStoreIndex(null);
                  setShowStoreModal(true);
                }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <i className="fas fa-edit"></i> Add Manually
            </motion.button>
          </div>

          {renderTable(activeTab)}
        </div>
      </div>

      {showCargoModal && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <CargoDeclarationForm
            initialData={
              editCargoIndex != null ? cargoList[editCargoIndex] : null
            }
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
        </motion.div>
      )}

      {showStoreModal && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ShipStoreForm
            initialData={
              editStoreIndex != null ? storeList[editStoreIndex] : null
            }
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
        </motion.div>
      )}

      <div className="form-actions">
        <motion.button
          className="prev-button"
          onClick={goToPreviousStep}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <i className="fas fa-arrow-left"></i> Previous
        </motion.button>
        <motion.button
          className="next-button"
          onClick={goToNextStep}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Submit Application <i className="fas fa-check"></i>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Step4CargoStores;
