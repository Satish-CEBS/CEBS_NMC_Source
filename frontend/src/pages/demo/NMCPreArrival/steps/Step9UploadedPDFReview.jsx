import React from "react";
import { motion } from "framer-motion";
import "../../styles/NMCStep.css";

const Step9UploadedPDFReview = ({
  formData = {},
  goToPreviousStep,
  onSubmit,
}) => {
  const extractUploads = () => {
    const files = [];

    const pushFile = (step, label, file) => {
      if (file) {
        files.push({
          step,
          label,
          name: file.name,
          type: file.type || "application/pdf",
          size: `${(file.size / 1024).toFixed(1)} KB`,
          timestamp: file.lastModifiedDate || new Date(),
        });
      }
    };

    // Step 2: Certificates
    formData.step2?.certificates?.forEach(
      (cert, i) => cert.file && pushFile("Step 2", cert.type, cert.file)
    );

    // Step 3: FAL Forms
    ["fal4", "fal5", "fal6", "fal7"].forEach((key) => {
      const form = formData.step3?.[key];
      if (form?.file) {
        pushFile("Step 3", form?.label || key.toUpperCase(), form.file);
      }
    });

    // Step 4: Cargo/Stores
    pushFile("Step 4", "Cargo Declaration", formData.step4?.cargoUpload);
    pushFile("Step 4", "Ship Stores Declaration", formData.step4?.storesUpload);

    // Step 5: MDH
    pushFile("Step 5", "MDH Form", formData.step5?.mdhUpload);

    // Step 6: Waste
    pushFile("Step 6", "Garbage Record Book", formData.step6?.garbageUpload);
    pushFile("Step 6", "Ballast Declaration", formData.step6?.ballastUpload);

    // Step 8: ISPS
    pushFile("Step 8", "SSR Certificate", formData.step8?.ssrCertificate);
    pushFile("Step 8", "ISSC Certificate", formData.step8?.isscCertificate);
    pushFile("Step 8", "Declaration of Security", formData.step8?.dosAgreement);

    return files;
  };

  const uploadedFiles = extractUploads();

  return (
    <motion.div
      className="step-container enhanced"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="step-header">
        <h2>Final Review: Uploaded Documents</h2>
        <p className="step-description">
          Verify all required documents before submitting your application
        </p>
        <div className="step-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "100%" }}></div>
          </div>
          <span>Final Review</span>
        </div>
      </div>

      {uploadedFiles.length === 0 ? (
        <motion.div
          className="empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <i className="fas fa-folder-open empty-icon"></i>
          <p>No documents have been uploaded yet.</p>
        </motion.div>
      ) : (
        <motion.div
          className="document-review-container"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="document-summary">
            <div className="summary-card">
              <i className="fas fa-file-alt"></i>
              <div>
                <span className="summary-count">{uploadedFiles.length}</span>
                <span className="summary-label">Documents Uploaded</span>
              </div>
            </div>
            <div className="summary-card">
              <i className="fas fa-file-pdf"></i>
              <div>
                <span className="summary-count">
                  {
                    uploadedFiles.filter((f) => f.type === "application/pdf")
                      .length
                  }
                </span>
                <span className="summary-label">PDF Files</span>
              </div>
            </div>
          </div>

          <div className="file-review-table-container">
            <table className="file-review-table">
              <thead>
                <tr>
                  <th>Step</th>
                  <th>Document Type</th>
                  <th>File Name</th>
                  <th>Size</th>
                  <th>Uploaded</th>
                </tr>
              </thead>
              <tbody>
                {uploadedFiles.map((f, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <td>{f.step}</td>
                    <td>{f.label}</td>
                    <td>
                      <i className="fas fa-file-pdf pdf-icon"></i>
                      {f.name}
                    </td>
                    <td>{f.size}</td>
                    <td>
                      {f.timestamp.toLocaleDateString()}
                      <span className="time">
                        {f.timestamp.toLocaleTimeString()}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      <motion.div
        className="form-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          className="prev-button"
          onClick={goToPreviousStep}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <i className="fas fa-arrow-left"></i> Back to Documents
        </motion.button>
        <motion.button
          className="submit-button"
          onClick={onSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={uploadedFiles.length === 0}
        >
          <i className="fas fa-paper-plane"></i> Submit Application
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Step9UploadedPDFReview;
