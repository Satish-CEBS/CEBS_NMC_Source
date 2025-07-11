import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../styles/NMCStep.css";

const Step8ISPSDocuments = ({
  data = {},
  updateData,
  goToNextStep,
  goToPreviousStep,
}) => {
  const [form, setForm] = useState({
    ssrCertificate: data.ssrCertificate || null,
    isscCertificate: data.isscCertificate || null,
    dosAgreement: data.dosAgreement || null,
    shipSecurityOfficer: data.shipSecurityOfficer || "",
    companySecurityOfficer: data.companySecurityOfficer || "",
    securityLevel: data.securityLevel || "1",
    remarks: data.remarks || "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field, file) => {
    setForm((prev) => ({ ...prev, [field]: file }));
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
        <h2>Step 8: ISPS & Security Documents</h2>
        <p className="step-description">
          Complete all ISPS Code compliance documentation and security
          information
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
            <i className="fas fa-file-contract"></i> Required Security Documents
          </h3>
        </div>

        <div className="document-upload-group">
          <div className="form-group">
            <label>Upload SSR Certificate (Ship Security Report)</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="ssr-upload"
                accept="application/pdf"
                onChange={(e) =>
                  handleFileChange("ssrCertificate", e.target.files[0])
                }
              />
              <label htmlFor="ssr-upload" className="file-upload-label">
                <i className="fas fa-cloud-upload-alt"></i> Choose File
              </label>
            </div>
            {form.ssrCertificate && (
              <div className="file-info">
                <i className="fas fa-file-pdf"></i> {form.ssrCertificate.name}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>
              Upload ISSC Certificate (International Ship Security Certificate)
            </label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="issc-upload"
                accept="application/pdf"
                onChange={(e) =>
                  handleFileChange("isscCertificate", e.target.files[0])
                }
              />
              <label htmlFor="issc-upload" className="file-upload-label">
                <i className="fas fa-cloud-upload-alt"></i> Choose File
              </label>
            </div>
            {form.isscCertificate && (
              <div className="file-info">
                <i className="fas fa-file-pdf"></i> {form.isscCertificate.name}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Upload DoS Agreement (Declaration of Security)</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="dos-upload"
                accept="application/pdf"
                onChange={(e) =>
                  handleFileChange("dosAgreement", e.target.files[0])
                }
              />
              <label htmlFor="dos-upload" className="file-upload-label">
                <i className="fas fa-cloud-upload-alt"></i> Choose File
              </label>
            </div>
            {form.dosAgreement && (
              <div className="file-info">
                <i className="fas fa-file-pdf"></i> {form.dosAgreement.name}
              </div>
            )}
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
            <i className="fas fa-user-shield"></i> Security Personnel
          </h3>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Ship Security Officer Name</label>
            <input
              type="text"
              value={form.shipSecurityOfficer}
              onChange={(e) =>
                handleChange("shipSecurityOfficer", e.target.value)
              }
              placeholder="Enter SSO name"
            />
          </div>
          <div className="form-group">
            <label>Company Security Officer Name</label>
            <input
              type="text"
              value={form.companySecurityOfficer}
              onChange={(e) =>
                handleChange("companySecurityOfficer", e.target.value)
              }
              placeholder="Enter CSO name"
            />
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
            <i className="fas fa-shield-alt"></i> Security Status
          </h3>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Security Level Declared</label>
            <select
              value={form.securityLevel}
              onChange={(e) => handleChange("securityLevel", e.target.value)}
              className="select-dropdown"
            >
              <option value="1">Level 1 – Normal</option>
              <option value="2">Level 2 – Heightened</option>
              <option value="3">Level 3 – Exceptional</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Additional Remarks or Notes</label>
          <textarea
            rows="4"
            value={form.remarks}
            onChange={(e) => handleChange("remarks", e.target.value)}
            placeholder="Enter any security-related remarks..."
            className="remarks-textarea"
          />
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
          onClick={goToPreviousStep}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <i className="fas fa-arrow-left"></i> Previous
        </motion.button>
        <motion.button
          className="submit-button"
          onClick={handleSave}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <i className="fas fa-check-circle"></i> Complete Submission
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Step8ISPSDocuments;
