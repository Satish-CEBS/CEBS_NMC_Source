import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../styles/NMCStep.css";

const Step5HealthDeclarations = ({ data = {}, update, goToStep }) => {
  const [form, setForm] = useState({
    mdhUpload: data.mdhUpload || null,
    captainName: data.captainName || "",
    crewSymptoms: data.crewSymptoms || 0,
    passengerSymptoms: data.passengerSymptoms || 0,
    lastPortSanitation: data.lastPortSanitation || "",
    vesselSanitizedDate: data.vesselSanitizedDate || "",
    reportedToAuthority: data.reportedToAuthority || false,
    falForm1: data.falForm1 || null,
    falForm1Notes: data.falForm1Notes || "",
    securityForm: data.securityForm || null,
    securityLevel: data.securityLevel || "",
    securityNotes: data.securityNotes || "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field, file) => {
    setForm((prev) => ({ ...prev, [field]: file }));
  };

  return (
    <motion.div
      className="step-container enhanced"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="step-header">
        <h2>Step 5: General Declaration, Health & Security</h2>
        <p className="step-description">
          Complete all required health and security declarations
        </p>
        <div className="step-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "100%" }}></div>
          </div>
          <span>Final Step</span>
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
            <i className="fas fa-file-alt"></i> FAL Form 1 – General Declaration
          </h3>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Upload General Declaration (PDF)</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="falForm1-upload"
                accept="application/pdf"
                onChange={(e) =>
                  handleFileChange("falForm1", e.target.files[0])
                }
              />
              <label htmlFor="falForm1-upload" className="file-upload-label">
                <i className="fas fa-cloud-upload-alt"></i> Choose File
              </label>
            </div>
            {form.falForm1 && (
              <div className="file-info">
                <i className="fas fa-file-pdf"></i> {form.falForm1.name}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>General Declaration Notes (optional)</label>
            <textarea
              rows="3"
              value={form.falForm1Notes}
              onChange={(e) => handleChange("falForm1Notes", e.target.value)}
              placeholder="Enter any additional notes..."
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
            <i className="fas fa-heartbeat"></i> Maritime Declaration of Health
            (MDH)
          </h3>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Upload Signed MDH Form</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="mdh-upload"
                accept="application/pdf"
                onChange={(e) =>
                  handleFileChange("mdhUpload", e.target.files[0])
                }
              />
              <label htmlFor="mdh-upload" className="file-upload-label">
                <i className="fas fa-cloud-upload-alt"></i> Choose File
              </label>
            </div>
            {form.mdhUpload && (
              <div className="file-info">
                <i className="fas fa-file-pdf"></i> {form.mdhUpload.name}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Captain's Full Name</label>
            <input
              type="text"
              value={form.captainName}
              onChange={(e) => handleChange("captainName", e.target.value)}
              placeholder="Enter captain's full name"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Number of Crew with Symptoms</label>
              <input
                type="number"
                min="0"
                value={form.crewSymptoms}
                onChange={(e) => handleChange("crewSymptoms", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Number of Passengers with Symptoms</label>
              <input
                type="number"
                min="0"
                value={form.passengerSymptoms}
                onChange={(e) =>
                  handleChange("passengerSymptoms", e.target.value)
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label>Last Port Sanitation Certificate Port</label>
            <input
              type="text"
              value={form.lastPortSanitation}
              onChange={(e) =>
                handleChange("lastPortSanitation", e.target.value)
              }
              placeholder="Enter port name"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date of Last Vessel Sanitation</label>
              <input
                type="date"
                value={form.vesselSanitizedDate}
                onChange={(e) =>
                  handleChange("vesselSanitizedDate", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label>Reported to Port Authority?</label>
              <select
                value={form.reportedToAuthority}
                onChange={(e) =>
                  handleChange("reportedToAuthority", e.target.value === "true")
                }
                className="select-dropdown"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
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
            <i className="fas fa-shield-alt"></i> Security Information
          </h3>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Upload Ship Security Form (PDF)</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="security-upload"
                accept="application/pdf"
                onChange={(e) =>
                  handleFileChange("securityForm", e.target.files[0])
                }
              />
              <label htmlFor="security-upload" className="file-upload-label">
                <i className="fas fa-cloud-upload-alt"></i> Choose File
              </label>
            </div>
            {form.securityForm && (
              <div className="file-info">
                <i className="fas fa-file-pdf"></i> {form.securityForm.name}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Current Security Level</label>
            <select
              value={form.securityLevel}
              onChange={(e) => handleChange("securityLevel", e.target.value)}
              className="select-dropdown"
            >
              <option value="">-- Select Security Level --</option>
              <option value="1">Level 1 – Normal</option>
              <option value="2">Level 2 – Heightened</option>
              <option value="3">Level 3 – Exceptional</option>
            </select>
          </div>

          <div className="form-group">
            <label>Security Notes / Concerns</label>
            <textarea
              rows="3"
              value={form.securityNotes}
              onChange={(e) => handleChange("securityNotes", e.target.value)}
              placeholder="Enter any security notes or concerns..."
            />
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
          onClick={() => goToStep(4)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <i className="fas fa-arrow-left"></i> Previous Step
        </motion.button>
        <motion.button
          className="submit-button"
          onClick={() => update(form)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <i className="fas fa-check-circle"></i> Submit Application
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Step5HealthDeclarations;
