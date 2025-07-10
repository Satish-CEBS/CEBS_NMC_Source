// File: SubmissionSuccess.jsx
import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import '../../styles/NMCStep.css';
import { useNavigate } from 'react-router-dom';

const SubmissionSuccess = ({ submissionID, timestamp }) => {
  const [showAlertOptions, setShowAlertOptions] = useState(false);
  const [selectedDepts, setSelectedDepts] = useState([]);
  const navigate = useNavigate();

  const toggleDept = (dept) => {
    setSelectedDepts((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  const handleSendAlerts = () => {
    alert(`Notification sent to: ${selectedDepts.join(', ')}`);
    setShowAlertOptions(false);
  };

  return (
    <div className="step-container success-container">
      <h2>Submission Complete</h2>
      <div className="success-card">
        <p>Your Pre-Arrival Notification has been submitted successfully.</p>
        <p><strong>Submission ID:</strong> {submissionID}</p>
        <p><strong>Timestamp:</strong> {timestamp}</p>
        <p>A digital receipt has been saved.</p>
      </div>

      <div className="success-actions">
        <Button
          variant="contained"
          color="info"
          startIcon={<NotificationsActiveIcon />}
          onClick={() => setShowAlertOptions(!showAlertOptions)}
        >
          Alert Agencies / Departments
        </Button>

        {showAlertOptions && (
          <div className="alert-options">
            <FormGroup row>
              {['Immigration', 'Customs', 'Health Department', 'Maritime Authorities'].map((dept) => (
                <FormControlLabel
                  key={dept}
                  control={
                    <Checkbox
                      checked={selectedDepts.includes(dept)}
                      onChange={() => toggleDept(dept)}
                    />
                  }
                  label={dept}
                />
              ))}
            </FormGroup>
            <Button variant="outlined" onClick={handleSendAlerts}>Send Alert</Button>
          </div>
        )}

        <Button
          variant="contained"
          color="success"
          startIcon={<RestartAltIcon />}
          onClick={() => navigate('/nmc-prearrival-wizard')}
        >
          Start New Submission
        </Button>

        <Button
          variant="contained"
          color="primary"
          startIcon={<DashboardIcon />}
          onClick={() => navigate('/prearrival-dashboard')}
        >
          Return to Pre-Arrival Dashboard
        </Button>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
