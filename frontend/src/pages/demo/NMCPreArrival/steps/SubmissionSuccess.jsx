// File: src/pages/demo/NMCPreArrival/steps/SubmissionSuccess.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/NMCStep.css';

const SubmissionSuccess = ({ submissionId, submittedAt }) => {
  const navigate = useNavigate();
  const [showAlertOptions, setShowAlertOptions] = useState(false);
  const [departments, setDepartments] = useState({
    immigration: false,
    customs: false,
    health: false,
    maritime: false,
  });

  const handleSendAlerts = () => {
    alert(`Alerts sent to: ${Object.keys(departments)
      .filter((key) => departments[key])
      .join(', ')}`);
    setShowAlertOptions(false);
  };

  return (
    <div className="nmc-step success-page">
      <h2>Submission Successful</h2>
      <p>Your Pre-Arrival Notification has been successfully submitted.</p>

      <div className="submission-details">
        <p><strong>Submission ID:</strong> {submissionId || 'N/A'}</p>
        <p><strong>Submitted At:</strong> {submittedAt || 'N/A'}</p>
      </div>

      <div className="success-actions">
        <button onClick={() => setShowAlertOptions(!showAlertOptions)}>
          <span className="material-icons">notifications</span> Alert Agencies / Departments
        </button>
        <button onClick={() => navigate('/nmc-prearrival-wizard')}>
          <span className="material-icons">restart_alt</span> Start New Submission
        </button>
        <button onClick={() => navigate('/prearrival-dashboard')}>
          <span className="material-icons">dashboard</span> Return to Pre-Arrival Dashboard
        </button>
      </div>

      {showAlertOptions && (
        <div className="alert-options">
          <label><input type="checkbox" checked={departments.immigration} onChange={(e) => setDepartments({ ...departments, immigration: e.target.checked })} /> Immigration</label>
          <label><input type="checkbox" checked={departments.customs} onChange={(e) => setDepartments({ ...departments, customs: e.target.checked })} /> Customs</label>
          <label><input type="checkbox" checked={departments.health} onChange={(e) => setDepartments({ ...departments, health: e.target.checked })} /> Health Department</label>
          <label><input type="checkbox" checked={departments.maritime} onChange={(e) => setDepartments({ ...departments, maritime: e.target.checked })} /> Maritime Authority</label>
          <button onClick={handleSendAlerts}><span className="material-icons">send</span> Send Alerts</button>
        </div>
      )}
    </div>
  );
};

export default SubmissionSuccess;
