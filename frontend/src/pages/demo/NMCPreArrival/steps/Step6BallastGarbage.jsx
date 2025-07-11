import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../styles/NMCStep.css";

const Step6WasteManagement = ({ data = {}, update, goToStep }) => {
  const [form, setForm] = useState({
    garbageDeclaration: data.garbageDeclaration || null,
    garbageType: data.garbageType || "",
    garbageQty: data.garbageQty || "",
    garbageDate: data.garbageDate || "",

    ballastReport: data.ballastReport || null,
    ballastPort: data.ballastPort || "",
    ballastVolume: data.ballastVolume || "",
    ballastTreatment: data.ballastTreatment || "No",

    wasteRecord: data.wasteRecord || null,
    wasteType: data.wasteType || "",
    wasteQty: data.wasteQty || "",
    wasteMethod: data.wasteMethod || "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = (key, file) => {
    setForm((prev) => ({ ...prev, [key]: file }));
  };

  const handleNext = () => {
    update(form);
    goToStep(9);
  };

  const handleBack = () => goToStep(7);

  return (
    <motion.div
      className="step-container enhanced"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="step-header">
        <h2>Step 6: Ballast, Garbage & Waste Declarations</h2>
        <p className="step-description">
          Provide details about waste management and ballast operations
        </p>
        <div className="step-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "75%" }}></div>
          </div>
          <span>Step 6 of 8</span>
        </div>
      </div>

      <motion.div
        className="form-section"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="section-title">
          <span className="section-number">1</span>
          <h3>
            <i className="fas fa-recycle"></i> Garbage Declaration
          </h3>
        </div>

        <div className="form-group">
          <label>Upload Garbage Declaration (PDF)</label>
          <div className="file-upload-wrapper">
            <input
              type="file"
              id="garbage-upload"
              accept="application/pdf"
              onChange={(e) =>
                handleFileUpload("garbageDeclaration", e.target.files[0])
              }
            />
            <label htmlFor="garbage-upload" className="file-upload-label">
              <i className="fas fa-cloud-upload-alt"></i> Choose File
            </label>
          </div>
          {form.garbageDeclaration && (
            <div className="file-info">
              <i className="fas fa-file-pdf"></i> {form.garbageDeclaration.name}
            </div>
          )}
        </div>

        <div className="row-3">
          <div className="form-group">
            <label>Type of Garbage</label>
            <select
              value={form.garbageType}
              onChange={(e) => handleChange("garbageType", e.target.value)}
              className="select-dropdown"
            >
              <option value="">-- Select --</option>
              <option>Food Waste</option>
              <option>Plastic</option>
              <option>Domestic Waste</option>
              <option>Cooking Oil</option>
              <option>Incinerator Ash</option>
            </select>
          </div>

          <div className="form-group">
            <label>Quantity Disposed (kg)</label>
            <input
              type="number"
              value={form.garbageQty}
              onChange={(e) => handleChange("garbageQty", e.target.value)}
              placeholder="Enter quantity"
            />
          </div>

          <div className="form-group">
            <label>Date of Disposal</label>
            <input
              type="date"
              value={form.garbageDate}
              onChange={(e) => handleChange("garbageDate", e.target.value)}
              className="date-input"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="form-section"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="section-title">
          <span className="section-number">2</span>
          <h3>
            <i className="fas fa-water"></i> Ballast Water Management
          </h3>
        </div>

        <div className="form-group">
          <label>Upload Ballast Water Report (PDF)</label>
          <div className="file-upload-wrapper">
            <input
              type="file"
              id="ballast-upload"
              accept="application/pdf"
              onChange={(e) =>
                handleFileUpload("ballastReport", e.target.files[0])
              }
            />
            <label htmlFor="ballast-upload" className="file-upload-label">
              <i className="fas fa-cloud-upload-alt"></i> Choose File
            </label>
          </div>
          {form.ballastReport && (
            <div className="file-info">
              <i className="fas fa-file-pdf"></i> {form.ballastReport.name}
            </div>
          )}
        </div>

        <div className="row-3">
          <div className="form-group">
            <label>Port of Discharge</label>
            <input
              value={form.ballastPort}
              onChange={(e) => handleChange("ballastPort", e.target.value)}
              placeholder="Enter port name"
            />
          </div>

          <div className="form-group">
            <label>Volume Discharged (m³)</label>
            <input
              type="number"
              value={form.ballastVolume}
              onChange={(e) => handleChange("ballastVolume", e.target.value)}
              placeholder="Enter volume"
            />
          </div>

          <div className="form-group">
            <label>Treatment System Used?</label>
            <select
              value={form.ballastTreatment}
              onChange={(e) => handleChange("ballastTreatment", e.target.value)}
              className="select-dropdown"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="form-section"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="section-title">
          <span className="section-number">3</span>
          <h3>
            <i className="fas fa-trash-alt"></i> Waste Disposal
          </h3>
        </div>

        <div className="form-group">
          <label>Upload Waste Record Sheet (PDF)</label>
          <div className="file-upload-wrapper">
            <input
              type="file"
              id="waste-upload"
              accept="application/pdf"
              onChange={(e) =>
                handleFileUpload("wasteRecord", e.target.files[0])
              }
            />
            <label htmlFor="waste-upload" className="file-upload-label">
              <i className="fas fa-cloud-upload-alt"></i> Choose File
            </label>
          </div>
          {form.wasteRecord && (
            <div className="file-info">
              <i className="fas fa-file-pdf"></i> {form.wasteRecord.name}
            </div>
          )}
        </div>

        <div className="row-3">
          <div className="form-group">
            <label>Waste Type</label>
            <select
              value={form.wasteType}
              onChange={(e) => handleChange("wasteType", e.target.value)}
              className="select-dropdown"
            >
              <option value="">-- Select --</option>
              <option>Oily Waste</option>
              <option>Sewage</option>
              <option>Hazardous Chemicals</option>
            </select>
          </div>

          <div className="form-group">
            <label>Quantity Disposed (kg)</label>
            <input
              type="number"
              value={form.wasteQty}
              onChange={(e) => handleChange("wasteQty", e.target.value)}
              placeholder="Enter quantity"
            />
          </div>

          <div className="form-group">
            <label>Method</label>
            <select
              value={form.wasteMethod}
              onChange={(e) => handleChange("wasteMethod", e.target.value)}
              className="select-dropdown"
            >
              <option value="">-- Select --</option>
              <option>Incineration</option>
              <option>Port Reception</option>
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="form-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          className="prev-button"
          onClick={handleBack}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <i className="fas fa-arrow-left"></i> Previous
        </motion.button>
        <motion.button
          className="next-button"
          onClick={handleNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Next <i className="fas fa-arrow-right"></i>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Step6WasteManagement;
