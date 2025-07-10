// File: Step10DynamicCompliance.jsx
import React from 'react';
import '../../styles/NMCStep.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import rulesConfig from '../RulesEngine/rulesConfig';

const Step10DynamicCompliance = ({ formData = {} }) => {
  const findFileForKey = (key) => {
    switch (key) {
      case 'fal1':
      case 'fal2':
      case 'fal3':
        return formData.step4?.[`${key}Upload`] || null;
      case 'fal4':
      case 'fal5':
      case 'fal6':
      case 'fal7':
        return formData.step3?.[key]?.file || null;
      case 'mdhUpload':
        return formData.step5?.mdhUpload || null;
      case 'ssrCertificate':
      case 'isscCertificate':
      case 'dosAgreement':
        return formData.step8?.[key] || null;
      default:
        return null;
    }
  };

  const evaluate = () => {
    return rulesConfig.map(rule => {
      const required = rule.required || (rule.requiredIf && rule.requiredIf(formData));
      const value = findFileForKey(rule.key);
      return {
        label: rule.label,
        key: rule.key,
        required,
        exists: !!value,
        fileName: value?.name || ''
      };
    });
  };

  const results = evaluate();
  const mandatory = results.filter(r => r.required);
  const complianceScore = Math.round((mandatory.filter(r => r.exists).length / mandatory.length) * 100);

  return (
    <div className="step-container with-sidebar">
      <div className="compliance-main">
        <h2>Step 10: IMO Compliance Evaluation</h2>
        <div className="compliance-bar">
           <div className="bar" style={{ width: `${complianceScore}%` }}></div>
          <span className="score-text">{complianceScore}% IMO Compliance</span>
        </div>

        <table className="file-review-table">
          <thead>
            <tr>
              <th>Document</th>
              <th>Required</th>
              <th>Status</th>
              <th>File</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, idx) => (
              <tr key={idx}>
                <td>{r.label}</td>
                <td>{r.required ? 'Yes' : 'Conditional'}</td>
                <td>
                  {r.exists ? (
                    <CheckCircleIcon style={{ color: 'green' }} />
                  ) : r.required ? (
                    <ErrorIcon style={{ color: 'red' }} />
                  ) : (
                    <WarningIcon style={{ color: 'orange' }} />
                  )}
                </td>
                <td>{r.fileName || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="compliance-sidebar">
        <h3>📘 IMO Rules Engine</h3>
        <p>📘 Powered by CEBS Worldwide</p>
        <ul>
          <li>FAL 1–3 are always mandatory</li>
          <li>FAL 6 required if passengers > 0</li>
          <li>DoS required if ISPS Level ≥ 2</li>
          <li>Ballast/Garbage applies for tanker cargo</li>
          <li>MDH required for all international arrivals</li>
        </ul>
      </div>
    </div>
  );
};

export default Step10DynamicCompliance;
