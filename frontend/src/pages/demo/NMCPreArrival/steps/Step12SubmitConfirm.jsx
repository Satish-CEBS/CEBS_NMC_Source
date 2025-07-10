// File: Step12SubmitConfirm.jsx
import React from 'react';
import '../../styles/NMCStep.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Step12SubmitConfirm = ({ agreed, setAgreed, complianceScore = 0, summaryData = {} }) => {
  return (
    <div className="step-container">
      <h2>Step 12: Submit & Confirm</h2>

      <div className="compliance-summary">
        <InfoOutlinedIcon style={{ verticalAlign: 'middle', marginRight: '6px' }} />
        <strong>Final IMO Compliance Score:</strong> {complianceScore}%
        <div className="compliance-bar">
          <div className="bar" style={{ width: `${complianceScore}%` }}></div>
          <span className="score-text">{complianceScore}% IMO Compliance</span>
        </div>
      </div>

      <div className="summary-snapshot">
        <h4>Submission Summary</h4>
        <p><strong>Vessel:</strong> {summaryData.vesselName || 'N/A'}</p>
        <p><strong>Call Sign:</strong> {summaryData.callSign || 'N/A'}</p>
        <p><strong>ETA:</strong> {summaryData.eta || 'N/A'}</p>
        <p><strong>Next Port:</strong> {summaryData.nextPort || 'N/A'}</p>
        <p><strong>Flag:</strong> {summaryData.flag || 'N/A'}</p>
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

      <div className="disclaimer-note">
        <CheckCircleOutlineIcon style={{ color: '#1976d2', verticalAlign: 'middle', marginRight: 4 }} />
        Once submitted, the record will be finalized and cannot be modified.
      </div>
    </div>
  );
};

export default Step12SubmitConfirm;
