import React, { useState, useEffect } from "react";
import Select from "react-select";
import { motion } from "framer-motion";
import "../../styles/NMCStep.css";

const certificateTypes = [
  {
    value: "IMO General Declaration (FAL Form 1)",
    label: "IMO General Declaration (FAL Form 1)",
  },
  {
    value: "International Ship Security Certificate (ISSC)",
    label: "International Ship Security Certificate (ISSC)",
  },
  { value: "Certificate of Registry", label: "Certificate of Registry" },
  { value: "Classification Certificate", label: "Classification Certificate" },
  {
    value: "Minimum Safe Manning Certificate",
    label: "Minimum Safe Manning Certificate",
  },
  {
    value: "Safety Equipment Certificate",
    label: "Safety Equipment Certificate",
  },
  { value: "Radio Certificate", label: "Radio Certificate" },
  { value: "Load Line Certificate", label: "Load Line Certificate" },
  { value: "Other", label: "Other" },
];

const mandatoryCertificates = [
  "IMO General Declaration (FAL Form 1)",
  "International Ship Security Certificate (ISSC)",
  "Certificate of Registry",
];

const Step2VesselCertificates = ({
  data = {},
  updateData = () => {},
  nextStep,
}) => {
  const [uploadedCerts, setUploadedCerts] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [errors, setErrors] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (data.certificates) setUploadedCerts(data.certificates);
  }, [data.certificates]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file || !selectedType) return;

    const newCert = {
      type: selectedType.value,
      name: file.name,
      uploadedAt: new Date().toISOString(),
      isMandatory: mandatoryCertificates.includes(selectedType.value),
    };

    const updated = [...uploadedCerts, newCert];
    setUploadedCerts(updated);
    updateData({ certificates: updated });
    setSelectedType(null);
    e.target.value = ""; // Reset file input
  };

  const removeCertificate = (index) => {
    const updated = [...uploadedCerts];
    updated.splice(index, 1);
    setUploadedCerts(updated);
    updateData({ certificates: updated });
  };

  const handleNext = () => {
    setIsSubmitted(true);
    const missingMandatory = mandatoryCertificates.filter(
      (cert) => !uploadedCerts.some((u) => u.type === cert)
    );

    if (missingMandatory.length > 0) {
      setErrors(
        `Missing mandatory certificates: ${missingMandatory.join(", ")}`
      );
      document.querySelector(".cert-table")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else if (uploadedCerts.length < 3) {
      setErrors("Upload at least 3 certificates to proceed.");
    } else {
      setErrors(null);
      nextStep();
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="nmc-step enhanced"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="step-header">
        <h2>Vessel Certificates</h2>
        <p className="step-description">
          Upload required vessel certificates to proceed with your NMC
          application
        </p>
        <div className="step-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "50%" }}></div>
          </div>
          <span>Step 2 of 4</span>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="form-section">
        <div className="section-title">
          <span className="section-number">1</span>
          <h3>Upload Certificates</h3>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Certificate Type</label>
            <Select
              options={certificateTypes}
              value={selectedType}
              onChange={setSelectedType}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Select certificate type..."
            />
          </div>
          <div className="form-group">
            <label>Upload Certificate (PDF)</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="certificate-upload"
                accept="application/pdf"
                onChange={handleFileChange}
                disabled={!selectedType}
              />
              <label
                htmlFor="certificate-upload"
                className={`file-upload-label ${
                  !selectedType ? "disabled" : ""
                }`}
              >
                <i className="fas fa-cloud-upload-alt"></i> Choose File
              </label>
              {selectedType && (
                <div className="file-upload-hint">
                  Ready to upload: {selectedType.label}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="form-section">
        <div className="section-title">
          <span className="section-number">2</span>
          <h3>Uploaded Certificates</h3>
        </div>

        <div className="cert-table-container">
          {uploadedCerts.length > 0 ? (
            <table className="cert-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>File Name</th>
                  <th>Uploaded At</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {uploadedCerts.map((cert, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td>
                      {cert.type}
                      {cert.isMandatory && (
                        <span className="mandatory-badge">Mandatory</span>
                      )}
                    </td>
                    <td>
                      <i className="fas fa-file-pdf pdf-icon"></i> {cert.name}
                    </td>
                    <td>{new Date(cert.uploadedAt).toLocaleString()}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          cert.isMandatory
                            ? "status-mandatory"
                            : "status-optional"
                        }`}
                      >
                        {cert.isMandatory ? "Required" : "Optional"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="remove-button"
                        onClick={() => removeCertificate(i)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <i className="fas fa-trash-alt"></i> Remove
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <i className="fas fa-folder-open empty-icon"></i>
              <p>No certificates uploaded yet</p>
            </div>
          )}
        </div>

        {isSubmitted && errors && (
          <motion.div
            className="error-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <i className="fas fa-exclamation-circle"></i> {errors}
          </motion.div>
        )}
      </motion.div>

      <motion.div className="form-actions" variants={itemVariants}>
        <button
          className="next-button"
          onClick={handleNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Next Step <i className="fas fa-arrow-right"></i>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Step2VesselCertificates;
