// File: src/pages/demo/NMCPreArrival/NMCPreArrivalWizard.jsx

import React, { useState, useEffect } from 'react';
import PageWrapper from '../layout/PageWrapper';

import Step1VoyageDetails from './steps/Step1VoyageDetails';
import Step2VesselCertificates from './steps/Step2VesselCertificates';
import Step3CrewPassenger from './steps/Step3CrewPassenger';
import Step4CargoStores from './steps/Step4CargoStores';
import Step5HealthDeclarations from './steps/Step5HealthDeclarations';
import Step6BallastGarbage from './steps/Step6BallastGarbage';
import Step7PortServiceRequests from './steps/Step7PortServiceRequests';
import Step8ISPSDocuments from './steps/Step8ISPSDocuments';
import Step9UploadedPDFReview from './steps/Step9UploadedPDFReview';
import Step10DynamicCompliance from './steps/Step10DynamicCompliance';
import Step11FinalReview from './steps/Step11FinalReview';
import Step12SubmitConfirm from './steps/Step12SubmitConfirm';
import SubmissionSuccess from './steps/SubmissionSuccess';

import '../styles/NMCPreArrival.css';
import '../styles/NMCStep.css';

const NMCPreArrivalWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [submissionId, setSubmissionId] = useState('');
  const [submittedAt, setSubmittedAt] = useState('');
  const [agreed, setAgreed] = useState(false);

  // Load saved draft
  useEffect(() => {
    const saved = localStorage.getItem('nmcPreArrivalData');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch {
        console.warn('Invalid saved form data.');
      }
    }
  }, []);

  // Save automatically
  useEffect(() => {
    localStorage.setItem('nmcPreArrivalData', JSON.stringify(formData));
  }, [formData]);

  const updateStepData = (stepKey, newData) => {
    setFormData((prev) => ({
      ...prev,
      [stepKey]: { ...prev[stepKey], ...newData }
    }));
  };

  const resetStep = (stepKey) => {
    const updated = { ...formData, [stepKey]: {} };
    setFormData(updated);
    localStorage.setItem('nmcPreArrivalData', JSON.stringify(updated));
  };

  const goToStep = (stepNum) => {
    setCurrentStep(Math.max(1, Math.min(stepNum, 13)));
  };

  const saveDraft = () => {
    localStorage.setItem('nmcPreArrivalData', JSON.stringify(formData));
    alert("Draft saved successfully.");
  };

  const handleFinalSubmit = () => {
    const id = 'NMC-' + Date.now();
    setSubmissionId(id);
    setSubmittedAt(new Date().toLocaleString());
    goToStep(13);
  };

  const getComplianceScore = () => {
    let score = 0;
    if (formData.step1?.vesselName) score += 10;
    if ((formData.step2?.certificates || []).length > 0) score += 10;
    if (formData.step3?.fal4 || formData.step3?.fal5 || formData.step3?.fal6 || formData.step3?.fal7) score += 20;
    if (formData.step4?.cargoList || formData.step4?.storesList) score += 10;
    if (formData.step5?.captainName) score += 10;
    if (formData.step6?.garbageUploaded || formData.step6?.ballastInfo) score += 10;
    if (formData.step7?.servicesRequested) score += 10;
    if (formData.step8?.ispsCertificate) score += 10;
    if (formData.step10?.complianceIssues?.length === 0) score += 10;
    return Math.min(score, 100);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1VoyageDetails data={formData.step1} updateData={(d) => updateStepData('step1', d)} goToStep={goToStep} />;
      case 2: return <Step2VesselCertificates data={formData.step2} updateData={(d) => updateStepData('step2', d)} goToStep={goToStep} />;
      case 3: return <Step3CrewPassenger data={formData.step3} updateData={(d) => updateStepData('step3', d)} goToStep={goToStep} />;
      case 4: return <Step4CargoStores data={formData.step4} updateData={(d) => updateStepData('step4', d)} goToStep={goToStep} />;
      case 5: return <Step5HealthDeclarations data={formData.step5} updateData={(d) => updateStepData('step5', d)} goToStep={goToStep} />;
      case 6: return <Step6BallastGarbage data={formData.step6} updateData={(d) => updateStepData('step6', d)} goToStep={goToStep} />;
      case 7: return <Step7PortServiceRequests data={formData.step7} updateData={(d) => updateStepData('step7', d)} goToStep={goToStep} />;
      case 8: return <Step8ISPSDocuments data={formData.step8} updateData={(d) => updateStepData('step8', d)} goToStep={goToStep} />;
      case 9: return <Step9UploadedPDFReview data={formData} goToStep={goToStep} />;
      case 10: return <Step10DynamicCompliance data={formData} updateData={(d) => updateStepData('step10', d)} goToStep={goToStep} />;
      case 11: return <Step11FinalReview data={formData} goToStep={goToStep} />;
      case 12: return <Step12SubmitConfirm data={formData} agreed={agreed} setAgreed={setAgreed} />;
      case 13: return <SubmissionSuccess submissionId={submissionId} submittedAt={submittedAt} />;
      default: return <p>Unknown Step</p>;
    }
  };

  return (
    <PageWrapper title="Create New Port Call Notification">
      <div className="wizard-header">
        <h1>NMC Pre-Arrival Notification</h1>
        <p>Step {currentStep} of 13</p>
      </div>

      <div className="compliance-bar">
        <p><span className="material-icons">verified</span> IMO Compliance Status: <strong>{getComplianceScore()}%</strong></p>
        <div className="bar-wrapper">
          <div className="bar-fill" style={{ width: `${getComplianceScore()}%` }}></div>
        </div>
      </div>

      {renderStep()}

      {currentStep <= 12 && (
        <div className="step-controls">
          {currentStep > 1 && <button onClick={() => goToStep(currentStep - 1)} className="prev-btn"><span className="material-icons">arrow_back</span> Previous</button>}
          <button className="reset-btn" onClick={() => resetStep(`step${currentStep}`)}><span className="material-icons">restart_alt</span> Reset Step</button>
          <button className="save-btn" onClick={saveDraft}><span className="material-icons">save</span> Save Draft</button>

          {currentStep < 12 && <button className="next-btn" onClick={() => goToStep(currentStep + 1)}>Next <span className="material-icons">arrow_forward</span></button>}

          {currentStep === 12 && (
            <button className="submit-btn" onClick={handleFinalSubmit} disabled={!agreed}>
              <span className="material-icons">check_circle</span> Confirm & Submit
            </button>
          )}
        </div>
      )}
    </PageWrapper>
  );
};

export default NMCPreArrivalWizard;
