import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Step3CrewPassenger.css";

const formTabs = [
  { id: "crewEffects", label: "FAL 4 - Crew Effects" },
  { id: "crewList", label: "FAL 5 - Crew List" },
  { id: "passengerList", label: "FAL 6 - Passenger List" },
  { id: "dangerousGoods", label: "FAL 7 - Dangerous Goods" },
];

const Step3CrewPassenger = ({
  data,
  updateData,
  goToNextStep,
  goToPreviousStep,
  resetStep,
}) => {
  const [activeTab, setActiveTab] = useState("crewEffects");
  const [formData, setFormData] = useState({});
  const [manualEntry, setManualEntry] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (data?.step3) {
      setFormData(data.step3);
    }
  }, [data]);

  useEffect(() => {
    updateData("step3", formData);
  }, [formData]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      [activeTab]: { type: "file", fileName: file.name, size: file.size },
    }));
  };

  const saveManualEntry = () => {
    setFormData((prev) => ({
      ...prev,
      [activeTab]: {
        type: "manual",
        content: manualEntry || "Manually filled",
      },
    }));
    setManualEntry("");
    setModalVisible(false);
  };

  const renderMetadata = () => {
    const entry = formData[activeTab];
    if (!entry) return null;

    if (entry.type === "file") {
      return (
        <motion.div
          className="file-info-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <i className="fas fa-file-pdf pdf-icon"></i>
          <div className="file-details">
            <strong>{entry.fileName}</strong>
            <span>{(entry.size / 1024).toFixed(2)} KB</span>
          </div>
        </motion.div>
      );
    } else {
      return (
        <motion.div
          className="manual-info-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <i className="fas fa-edit manual-icon"></i>
          <div className="manual-details">
            <strong>Manual Entry</strong>
            <p>{entry.content}</p>
          </div>
        </motion.div>
      );
    }
  };

  return (
    <motion.div
      className="step3-container enhanced"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="step-header">
        <h2>Step 3: Crew & Passenger Forms</h2>
        <p className="step-description">
          Submit required crew and passenger information forms
        </p>
        <div className="step-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "75%" }}></div>
          </div>
          <span>Step 3 of 4</span>
        </div>
      </div>

      <div className="form-section">
        <div className="section-title">
          <span className="section-number">1</span>
          <h3>Select Form Type</h3>
        </div>

        <div className="tabs-container">
          {formTabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="form-section">
        <div className="section-title">
          <span className="section-number">2</span>
          <h3>{formTabs.find((t) => t.id === activeTab).label}</h3>
        </div>

        <div className="upload-section">
          <div className="file-upload-wrapper">
            <input
              type="file"
              id={`file-upload-${activeTab}`}
              accept="application/pdf"
              onChange={handleFileUpload}
            />
            <label
              htmlFor={`file-upload-${activeTab}`}
              className="file-upload-label"
            >
              <i className="fas fa-cloud-upload-alt"></i> Upload PDF
            </label>
          </div>

          <motion.button
            className="manual-btn"
            onClick={() => setModalVisible(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="fas fa-edit"></i> Fill Manually
          </motion.button>

          {renderMetadata()}
        </div>
      </div>

      {modalVisible && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="modal-header">
              <h3>{formTabs.find((f) => f.id === activeTab)?.label}</h3>
              <button
                className="close-btn"
                onClick={() => setModalVisible(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <textarea
              rows={8}
              value={manualEntry}
              onChange={(e) => setManualEntry(e.target.value)}
              placeholder={`Enter data for ${
                formTabs.find((f) => f.id === activeTab)?.label
              }...`}
              className="manual-entry-textarea"
            />
            <div className="modal-actions">
              <motion.button
                onClick={saveManualEntry}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-save"></i> Save
              </motion.button>
              <motion.button
                className="cancel"
                onClick={() => setModalVisible(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-times"></i> Cancel
              </motion.button>
            </div>
          </motion.div>
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
          Next Step <i className="fas fa-arrow-right"></i>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Step3CrewPassenger;
