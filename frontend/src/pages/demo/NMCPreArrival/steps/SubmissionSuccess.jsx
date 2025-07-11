// File: src/pages/demo/NMCPreArrival/steps/SubmissionSuccess.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/NMCStep.css";
import { motion } from "framer-motion";

const SubmissionSuccess = ({ submissionId, submittedAt }) => {
  const navigate = useNavigate();
  const [showAlertOptions, setShowAlertOptions] = useState(false);
  const [departments, setDepartments] = useState({
    immigration: false,
    customs: false,
    health: false,
    maritime: false,
  });
  const [isSent, setIsSent] = useState(false);

  const handleSendAlerts = () => {
    setIsSent(true);
    setTimeout(() => {
      alert(
        `Alerts sent to: ${Object.keys(departments)
          .filter((key) => departments[key])
          .join(", ")}`
      );
      setShowAlertOptions(false);
      setIsSent(false);
    }, 1500);
  };

  const toggleDepartment = (department) => {
    setDepartments({
      ...departments,
      [department]: !departments[department],
    });
  };

  return (
    <motion.div
      className="nmc-step success-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="success-header">
        <motion.div
          className="success-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4CAF50"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </motion.div>
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Submission Successful!
        </motion.h2>
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="success-message"
        >
          Your Pre-Arrival Notification has been successfully submitted and
          recorded.
        </motion.p>
      </div>

      <motion.div
        className="submission-details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="detail-card">
          <div className="detail-icon">
            <span className="material-icons">receipt</span>
          </div>
          <div>
            <h3>Submission ID</h3>
            <p>{submissionId || "N/A"}</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">
            <span className="material-icons">schedule</span>
          </div>
          <div>
            <h3>Submitted At</h3>
            <p>{submittedAt || "N/A"}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="success-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <button
          className="action-btn alert-btn"
          onClick={() => setShowAlertOptions(!showAlertOptions)}
        >
          <span className="material-icons">notifications_active</span>
          <span>Alert Agencies / Departments</span>
        </button>

        <button
          className="action-btn new-submission"
          onClick={() => navigate("/nmc-prearrival-wizard")}
        >
          <span className="material-icons">add_circle</span>
          <span>Start New Submission</span>
        </button>

        <button
          className="action-btn dashboard-btn"
          onClick={() => navigate("/prearrival-dashboard")}
        >
          <span className="material-icons">dashboard</span>
          <span>Return to Dashboard</span>
        </button>
      </motion.div>

      {showAlertOptions && (
        <motion.div
          className="alert-options"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3>Select Departments to Alert</h3>

          <div className="department-options">
            {Object.keys(departments).map((dept) => (
              <div
                key={dept}
                className={`department-option ${
                  departments[dept] ? "selected" : ""
                }`}
                onClick={() => toggleDepartment(dept)}
              >
                <div className="checkbox">
                  {departments[dept] && (
                    <span className="material-icons">check</span>
                  )}
                </div>
                <span className="department-name">
                  {dept.charAt(0).toUpperCase() +
                    dept.slice(1).replace(/([A-Z])/g, " $1")}
                </span>
              </div>
            ))}
          </div>

          <button
            className={`send-btn ${isSent ? "sent" : ""}`}
            onClick={handleSendAlerts}
            disabled={isSent || !Object.values(departments).some((v) => v)}
          >
            {isSent ? (
              <>
                <span className="material-icons">check</span>
                <span>Sent!</span>
              </>
            ) : (
              <>
                <span className="material-icons">send</span>
                <span>Send Alerts</span>
              </>
            )}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SubmissionSuccess;
