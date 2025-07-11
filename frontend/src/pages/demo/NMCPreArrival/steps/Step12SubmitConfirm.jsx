import React from "react";
import { motion } from "framer-motion";
import "../../styles/NMCStep.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const Step12SubmitConfirm = ({
  agreed,
  setAgreed,
  complianceScore = 0,
  summaryData = {},
  onSubmit,
  onBack,
}) => {
  return (
    <motion.div
      className="step-container enhanced"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="step-header">
        <h2>Final Submission Confirmation</h2>
        <p className="step-description">
          Review and confirm your pre-arrival notification submission
        </p>
        <div className="step-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "100%" }}></div>
          </div>
          <span>Ready to Submit</span>
        </div>
      </div>

      <motion.div
        className="compliance-summary-card"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="summary-header">
          <InfoOutlinedIcon className="summary-icon" />
          <h3>Final IMO Compliance Score</h3>
        </div>
        <div className="compliance-display">
          <div className="compliance-score">
            <span className="score-value">{complianceScore}%</span>
            <span className="score-label">Compliance</span>
          </div>
          <div className="compliance-bar">
            <div
              className="bar"
              style={{ width: `${complianceScore}%` }}
              data-score={complianceScore}
            ></div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="summary-snapshot-card"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h3>Submission Summary</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Vessel:</span>
            <span className="summary-value">
              {summaryData.vesselName || "N/A"}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Call Sign:</span>
            <span className="summary-value">
              {summaryData.callSign || "N/A"}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">ETA:</span>
            <span className="summary-value">{summaryData.eta || "N/A"}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Next Port:</span>
            <span className="summary-value">
              {summaryData.nextPort || "N/A"}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Flag:</span>
            <span className="summary-value">{summaryData.flag || "N/A"}</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="declaration-section"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="declaration-card">
          <h3>Legal Declaration</h3>
          <div className="declaration-content">
            <label className="declaration-checkbox">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="styled-checkbox"
              />
              <span className="checkmark"></span>
              <span className="declaration-text">
                I hereby declare that the information provided is true and
                complete to the best of my knowledge.
              </span>
            </label>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="disclaimer-note"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <VerifiedUserIcon className="disclaimer-icon" />
        <span>
          Once submitted, the record will be finalized and cannot be modified.
        </span>
      </motion.div>

      <motion.div
        className="form-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          className="prev-button"
          onClick={onBack}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Back to Review
        </motion.button>
        <motion.button
          className="submit-button"
          onClick={onSubmit}
          disabled={!agreed}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Submit Pre-Arrival Notification
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Step12SubmitConfirm;
