// File: Step12SubmitConfirm.jsx
import React from 'react';
import '../../styles/NMCStep.css';

const Step12SubmitConfirm = ({ agreed, setAgreed, complianceScore = 0, summaryData = {} }) => {
  return (
    <div className="step-container">
      <h2>Step 12: Submit & Confirm</h2>

      <div className="compliance-summary">
        <p>📊 <strong>Final IMO Compliance Score:</strong> {complianceScore}%</p>
        <div className="compliance-bar">
          <div className="bar" style={{ width: `${complianceScore}%` }}></div>
          <span className="score-text">{complianceScore}% IMO Compliance</span>
        </div>
      </div>

      <div className="summary-snapshot">
        <p><strong>Vessel:</strong> {summaryData.vesselName || 'N/A'}</p>
        <p><strong>Call Sign:</strong> {summaryData.callSign || 'N/A'}</p>
        <p><strong>ETA:</strong> {summaryData.eta || 'N/A'}</p>
      </div>

      <div className="declaration-section">
        <label>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          &nbsp; I hereby declare that the information provided is true and complete to the best of my knowledge.
        </label>
      </div>
    </div>
  );
};

export default Step12SubmitConfirm;
