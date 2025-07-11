import React from "react";
import { motion } from "framer-motion";
import "../../styles/NMCStep.css";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";

const Step11FinalReview = ({ formData = {}, goToStep, onSubmit }) => {
  const downloadDraft = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "NMC_PreArrival_Draft.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const summaryBlocks = [
    {
      title: "Voyage Summary",
      step: 1,
      icon: "fas fa-ship",
      content: formData.step1,
    },
    {
      title: "Vessel Certificates",
      step: 2,
      icon: "fas fa-certificate",
      content: formData.step2?.certificates,
    },
    {
      title: "Crew & Passenger Forms",
      step: 3,
      icon: "fas fa-users",
      content: formData.step3,
    },
    {
      title: "Cargo & Ship Stores",
      step: 4,
      icon: "fas fa-boxes",
      content: formData.step4,
    },
    {
      title: "MDH & Health Info",
      step: 5,
      icon: "fas fa-heartbeat",
      content: formData.step5,
    },
    {
      title: "Waste Management",
      step: 6,
      icon: "fas fa-trash-alt",
      content: formData.step6,
    },
    {
      title: "Port Service Requests",
      step: 7,
      icon: "fas fa-concierge-bell",
      content: formData.step7,
    },
    {
      title: "ISPS & Security Docs",
      step: 8,
      icon: "fas fa-shield-alt",
      content: formData.step8,
    },
  ];

  return (
    <motion.div
      className="step-container enhanced"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="step-header">
        <h2>Final Review Before Submission</h2>
        <p className="step-description">
          Verify all information before submitting your pre-arrival notification
        </p>
        <div className="step-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "100%" }}></div>
          </div>
          <span>Ready to Submit</span>
        </div>
      </div>

      <div className="review-grid">
        {summaryBlocks.map((block, index) => (
          <motion.div
            key={index}
            className="review-block"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="review-header">
              <div className="block-title">
                <i className={block.icon}></i>
                <h3>{block.title}</h3>
              </div>
              <motion.button
                className="edit-btn"
                onClick={() => goToStep(block.step)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <EditIcon fontSize="small" />
                Edit Section
              </motion.button>
            </div>
            <div className="review-content">
              {block.content ? (
                <pre className="review-json">
                  {JSON.stringify(block.content, null, 2)}
                </pre>
              ) : (
                <div className="empty-section">
                  <i className="fas fa-exclamation-circle"></i>
                  No data entered for this section
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="review-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          className="download-btn"
          onClick={downloadDraft}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <DownloadIcon />
          Download Draft JSON
        </motion.button>
        <motion.button
          className="submit-button"
          onClick={onSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Submit Pre-Arrival Notification
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Step11FinalReview;
