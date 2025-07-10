// File: Step9UploadedPDFReview.jsx
import React from 'react';
import '../../styles/NMCStep.css';

const Step9UploadedPDFReview = ({ formData = {} }) => {
  const extractUploads = () => {
    const files = [];

    const pushFile = (step, label, file) => {
      if (file) {
        files.push({
          step,
          label,
          name: file.name,
          type: file.type || 'application/pdf',
          size: `${(file.size / 1024).toFixed(1)} KB`
        });
      }
    };

    // Step 2: Certificates
    formData.step2?.certificates?.forEach((cert, i) =>
      cert.file && pushFile('Step 2', cert.type, cert.file)
    );

    // Step 3: FAL Forms
    ['fal4', 'fal5', 'fal6', 'fal7'].forEach((key) => {
      const form = formData.step3?.[key];
      if (form?.file) {
        pushFile('Step 3', form?.label || key.toUpperCase(), form.file);
      }
    });

    // Step 4: Cargo/Stores (assume fields cargoUpload, storesUpload)
    pushFile('Step 4', 'Cargo Declaration', formData.step4?.cargoUpload);
    pushFile('Step 4', 'Ship Stores Declaration', formData.step4?.storesUpload);

    // Step 5: MDH
    pushFile('Step 5', 'MDH Form', formData.step5?.mdhUpload);

    // Step 6: Waste
    pushFile('Step 6', 'Garbage Record Book', formData.step6?.garbageUpload);
    pushFile('Step 6', 'Ballast Declaration', formData.step6?.ballastUpload);

    // Step 8: ISPS
    pushFile('Step 8', 'SSR Certificate', formData.step8?.ssrCertificate);
    pushFile('Step 8', 'ISSC Certificate', formData.step8?.isscCertificate);
    pushFile('Step 8', 'Declaration of Security', formData.step8?.dosAgreement);

    return files;
  };

  const uploadedFiles = extractUploads();

  return (
    <div className="step-container">
      <h2>Step 9: Review All Uploaded Documents</h2>
      <p>Ensure the correct versions of all required PDF documents are uploaded before proceeding.</p>

      {uploadedFiles.length === 0 ? (
        <p>No documents have been uploaded yet.</p>
      ) : (
        <table className="file-review-table">
          <thead>
            <tr>
              <th>Step</th>
              <th>Document</th>
              <th>File Name</th>
              <th>Size</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {uploadedFiles.map((f, idx) => (
              <tr key={idx}>
                <td>{f.step}</td>
                <td>{f.label}</td>
                <td>{f.name}</td>
                <td>{f.size}</td>
                <td>{f.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Step9UploadedPDFReview;
