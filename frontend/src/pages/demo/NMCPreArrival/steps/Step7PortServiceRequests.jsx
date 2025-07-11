import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../styles/NMCStep.css";

const Step7PortServiceRequests = ({
  data = {},
  updateData,
  goToNextStep,
  goToPreviousStep,
}) => {
  const [form, setForm] = useState({
    tugRequired: data.tugRequired || false,
    pilotRequired: data.pilotRequired || false,
    medicalAssistance: data.medicalAssistance || false,
    garbageReception: data.garbageReception || false,
    crewChange: data.crewChange || false,
    bunkering: data.bunkering || false,
    provisioning: data.provisioning || false,
    sludgeDisposal: data.sludgeDisposal || false,
    shorePower: data.shorePower || false,
    otherRequest: data.otherRequest || "",
  });

  const handleChange = (field) => {
    setForm((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (e) => {
    setForm((prev) => ({ ...prev, otherRequest: e.target.value }));
  };

  const handleSave = () => {
    updateData(form);
    goToNextStep();
  };

  return (
    <motion.div
      className="step-container enhanced"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="step-header">
        <h2>Step 7: Port Services Requested</h2>
        <p className="step-description">
          Please indicate the port services you are requesting at the port of
          call:
        </p>
        <div className="step-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "87.5%" }}></div>
          </div>
          <span>Step 7 of 8</span>
        </div>
      </div>

      <div className="checkbox-grid-container">
        <div className="checkbox-grid">
          <motion.label
            className="checkbox-label"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="checkbox"
              checked={form.tugRequired}
              onChange={() => handleChange("tugRequired")}
              className="enhanced-checkbox"
            />
            <span className="checkmark"></span>
            <i className="fas fa-ship checkbox-icon"></i>
            Tug Assistance
          </motion.label>

          <motion.label
            className="checkbox-label"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="checkbox"
              checked={form.pilotRequired}
              onChange={() => handleChange("pilotRequired")}
              className="enhanced-checkbox"
            />
            <span className="checkmark"></span>
            <i className="fas fa-user-tie checkbox-icon"></i>
            Pilotage
          </motion.label>

          <motion.label
            className="checkbox-label"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="checkbox"
              checked={form.medicalAssistance}
              onChange={() => handleChange("medicalAssistance")}
              className="enhanced-checkbox"
            />
            <span className="checkmark"></span>
            <i className="fas fa-briefcase-medical checkbox-icon"></i>
            Medical Assistance
          </motion.label>

          <motion.label
            className="checkbox-label"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="checkbox"
              checked={form.garbageReception}
              onChange={() => handleChange("garbageReception")}
              className="enhanced-checkbox"
            />
            <span className="checkmark"></span>
            <i className="fas fa-trash-alt checkbox-icon"></i>
            Garbage Reception
          </motion.label>

          <motion.label
            className="checkbox-label"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="checkbox"
              checked={form.crewChange}
              onChange={() => handleChange("crewChange")}
              className="enhanced-checkbox"
            />
            <span className="checkmark"></span>
            <i className="fas fa-users checkbox-icon"></i>
            Crew Change
          </motion.label>

          <motion.label
            className="checkbox-label"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="checkbox"
              checked={form.bunkering}
              onChange={() => handleChange("bunkering")}
              className="enhanced-checkbox"
            />
            <span className="checkmark"></span>
            <i className="fas fa-gas-pump checkbox-icon"></i>
            Bunkering
          </motion.label>

          <motion.label
            className="checkbox-label"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="checkbox"
              checked={form.provisioning}
              onChange={() => handleChange("provisioning")}
              className="enhanced-checkbox"
            />
            <span className="checkmark"></span>
            <i className="fas fa-utensils checkbox-icon"></i>
            Provisioning
          </motion.label>

          <motion.label
            className="checkbox-label"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="checkbox"
              checked={form.sludgeDisposal}
              onChange={() => handleChange("sludgeDisposal")}
              className="enhanced-checkbox"
            />
            <span className="checkmark"></span>
            <i className="fas fa-oil-can checkbox-icon"></i>
            Sludge Disposal
          </motion.label>

          <motion.label
            className="checkbox-label"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="checkbox"
              checked={form.shorePower}
              onChange={() => handleChange("shorePower")}
              className="enhanced-checkbox"
            />
            <span className="checkmark"></span>
            <i className="fas fa-plug checkbox-icon"></i>
            Shore Power Connection
          </motion.label>
        </div>
      </div>

      <div className="form-group">
        <label>Other Requests or Notes</label>
        <textarea
          rows="3"
          value={form.otherRequest}
          onChange={handleInputChange}
          placeholder="Specify any other port service needed..."
          className="enhanced-textarea"
        />
      </div>

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
          onClick={handleSave}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Save & Continue <i className="fas fa-arrow-right"></i>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Step7PortServiceRequests;
