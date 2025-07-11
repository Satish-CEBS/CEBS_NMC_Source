import React from "react";
import { motion } from "framer-motion";
import "../../styles/NMCStep.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import rulesConfig from "../RulesEngine/rulesConfig";

const Step10DynamicCompliance = ({
  formData = {},
  goToPreviousStep,
  onSubmit,
}) => {
  const findFileForKey = (key) => {
    switch (key) {
      case "fal1":
      case "fal2":
      case "fal3":
        return formData.step4?.[`${key}Upload`] || null;
      case "fal4":
      case "fal5":
      case "fal6":
      case "fal7":
        return formData.step3?.[key]?.file || null;
      case "mdhUpload":
        return formData.step5?.mdhUpload || null;
      case "ssrCertificate":
      case "isscCertificate":
      case "dosAgreement":
        return formData.step8?.[key] || null;
      default:
        return null;
    }
  };

  const evaluate = () => {
    return rulesConfig.map((rule) => {
      const required =
        rule.required || (rule.requiredIf && rule.requiredIf(formData));
      const value = findFileForKey(rule.key);
      return {
        label: rule.label,
        key: rule.key,
        required,
        exists: !!value,
        fileName: value?.name || "",
        description: rule.description || "",
      };
    });
  };

  const results = evaluate();
  const mandatory = results.filter((r) => r.required);
  const complianceScore = Math.round(
    (mandatory.filter((r) => r.exists).length / mandatory.length) * 100
  );
  const compliantCount = mandatory.filter((r) => r.exists).length;
  const nonCompliantCount = mandatory.length - compliantCount;

  return (
    <motion.div
      className="step-container enhanced with-sidebar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="step-header">
        <h2>Step 10: IMO Compliance Evaluation</h2>
        <p className="step-description">
          Automated verification of required IMO documents and regulations
        </p>
        <div className="step-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "100%" }}></div>
          </div>
          <span>Final Compliance Check</span>
        </div>
      </div>

      <div className="compliance-main">
        <motion.div
          className="compliance-summary"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="compliance-score">
            <div className="score-circle">
              <span>{complianceScore}%</span>
              <div
                className="circle-progress"
                style={{
                  background: `conic-gradient(#4CAF50 ${complianceScore}%, #f0f0f0 ${complianceScore}% 100%)`,
                }}
              ></div>
            </div>
            <div className="score-details">
              <div className="detail-item compliant">
                <CheckCircleIcon className="icon" />
                <span>{compliantCount} Compliant</span>
              </div>
              <div className="detail-item non-compliant">
                <ErrorIcon className="icon" />
                <span>{nonCompliantCount} Non-Compliant</span>
              </div>
            </div>
          </div>

          <div className="compliance-bar">
            <div className="bar" style={{ width: `${complianceScore}%` }}></div>
            <span className="score-text">
              IMO Compliance Level: {complianceScore}%
            </span>
          </div>
        </motion.div>

        <motion.div
          className="compliance-table-container"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <table className="file-review-table">
            <thead>
              <tr>
                <th>Document</th>
                <th>Requirement</th>
                <th>Status</th>
                <th>File</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx }}
                  className={!r.exists && r.required ? "non-compliant-row" : ""}
                >
                  <td>
                    <div className="document-info">
                      <span className="document-name">{r.label}</span>
                      {r.description && (
                        <span className="document-desc">{r.description}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`requirement-badge ${
                        r.required ? "required" : "conditional"
                      }`}
                    >
                      {r.required ? "Mandatory" : "Conditional"}
                    </span>
                  </td>
                  <td>
                    {r.exists ? (
                      <div className="status compliant">
                        <CheckCircleIcon className="icon" />
                        <span>Uploaded</span>
                      </div>
                    ) : r.required ? (
                      <div className="status non-compliant">
                        <ErrorIcon className="icon" />
                        <span>Missing</span>
                      </div>
                    ) : (
                      <div className="status conditional">
                        <WarningIcon className="icon" />
                        <span>Optional</span>
                      </div>
                    )}
                  </td>
                  <td>
                    {r.fileName ? (
                      <div className="file-info">
                        <i className="fas fa-file-pdf"></i>
                        <span>{r.fileName}</span>
                      </div>
                    ) : (
                      <span className="no-file">—</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>

      <motion.div
        className="compliance-sidebar"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="sidebar-card">
          <h3>
            <i className="fas fa-cogs"></i> Rules Engine
          </h3>
          <p className="engine-source">Powered by CEBS Worldwide</p>

          <div className="rules-list">
            <div className="rule-item">
              <i className="fas fa-file-alt"></i>
              <span>FAL 1–3 are always mandatory</span>
            </div>
            <div className="rule-item">
              <i className="fas fa-users"></i>
              <span>FAL 6 required if passengers ≥ 0</span>
            </div>
            <div className="rule-item">
              <i className="fas fa-shield-alt"></i>
              <span>DoS required if ISPS Level ≥ 2</span>
            </div>
            <div className="rule-item">
              <i className="fas fa-tint"></i>
              <span>Ballast/Garbage applies for tanker cargo</span>
            </div>
            <div className="rule-item">
              <i className="fas fa-heartbeat"></i>
              <span>MDH required for all international arrivals</span>
            </div>
          </div>
        </div>

        <div className="compliance-actions">
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
            disabled={nonCompliantCount > 0}
          >
            <i className="fas fa-check-circle"></i> Complete Submission
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Step10DynamicCompliance;
