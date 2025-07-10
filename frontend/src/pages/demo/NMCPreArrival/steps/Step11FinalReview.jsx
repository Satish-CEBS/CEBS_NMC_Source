// File: Step11FinalReview.jsx
import React from 'react';
import '../../styles/NMCStep.css';

const Step11FinalReview = ({ formData = {}, goToStep }) => {
  const downloadDraft = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'NMC_PreArrival_Draft.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const summaryBlocks = [
    {
      title: 'Voyage Summary',
      step: 1,
      content: formData.step1
    },
    {
      title: 'Vessel Certificates',
      step: 2,
      content: formData.step2?.certificates
    },
    {
      title: 'Crew & Passenger Forms',
      step: 3,
      content: formData.step3
    },
    {
      title: 'Cargo & Ship Stores',
      step: 4,
      content: formData.step4
    },
    {
      title: 'MDH & Health Info',
      step: 5,
      content: formData.step5
    },
    {
      title: 'Waste Management',
      step: 6,
      content: formData.step6
    },
    {
      title: 'Port Service Requests',
      step: 7,
      content: formData.step7
    },
    {
      title: 'ISPS & Security Docs',
      step: 8,
      content: formData.step8
    }
  ];

  return (
    <div className="step-container">
      <h2>Step 11: Final Review Before Submission</h2>
      <p>Please verify all data below. Click “Edit” to go back and make changes.</p>

      {summaryBlocks.map((block, index) => (
        <div key={index} className="review-block">
          <div className="review-header">
            <h3>{block.title}</h3>
            <button className="edit-btn" onClick={() => goToStep(block.step)}>Edit</button>
          </div>
          <pre className="review-json">
            {block.content ? JSON.stringify(block.content, null, 2) : 'No data entered yet.'}
          </pre>
        </div>
      ))}

      <div className="review-actions">
        <button onClick={downloadDraft} className="download-btn">📥 Download Draft JSON</button>
      </div>
    </div>
  );
};

export default Step11FinalReview;
