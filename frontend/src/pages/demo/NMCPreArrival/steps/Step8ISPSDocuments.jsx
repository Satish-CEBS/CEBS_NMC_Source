// File: Step8ISPSDocuments.jsx
import React, { useState } from 'react';
import '../../styles/NMCStep.css';

const Step8ISPSDocuments = ({ data = {}, updateData }) => {
  const [form, setForm] = useState({
    ssrCertificate: data.ssrCertificate || null,
    isscCertificate: data.isscCertificate || null,
    dosAgreement: data.dosAgreement || null,
    shipSecurityOfficer: data.shipSecurityOfficer || '',
    companySecurityOfficer: data.companySecurityOfficer || '',
    securityLevel: data.securityLevel || '1',
    remarks: data.remarks || ''
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field, file) => {
    setForm((prev) => ({ ...prev, [field]: file }));
  };

  const handleSave = () => {
    updateData(form);
    alert('✅ ISPS security documentation saved.');
  };

  return (
    <div className="step-container">
      <h2>Step 8: ISPS & Security Documents</h2>
      <p>This section ensures compliance with the IMO ISPS Code. Upload valid documents and provide security officer details.</p>

      <div className="form-group">
        <label>Upload SSR Certificate (Ship Security Report)</label>
        <input type="file" accept="application/pdf" onChange={(e) => handleFileChange('ssrCertificate', e.target.files[0])} />
        {form.ssrCertificate && <p className="upload-preview">📄 {form.ssrCertificate.name}</p>}
      </div>

      <div className="form-group">
        <label>Upload ISSC Certificate (International Ship Security Certificate)</label>
        <input type="file" accept="application/pdf" onChange={(e) => handleFileChange('isscCertificate', e.target.files[0])} />
        {form.isscCertificate && <p className="upload-preview">📄 {form.isscCertificate.name}</p>}
      </div>

      <div className="form-group">
        <label>Upload DoS Agreement (Declaration of Security)</label>
        <input type="file" accept="application/pdf" onChange={(e) => handleFileChange('dosAgreement', e.target.files[0])} />
        {form.dosAgreement && <p className="upload-preview">📄 {form.dosAgreement.name}</p>}
      </div>

      <div className="form-group">
        <label>Ship Security Officer Name</label>
        <input type="text" value={form.shipSecurityOfficer} onChange={(e) => handleChange('shipSecurityOfficer', e.target.value)} />
      </div>

      <div className="form-group">
        <label>Company Security Officer Name</label>
        <input type="text" value={form.companySecurityOfficer} onChange={(e) => handleChange('companySecurityOfficer', e.target.value)} />
      </div>

      <div className="form-group">
        <label>Security Level Declared</label>
        <select value={form.securityLevel} onChange={(e) => handleChange('securityLevel', e.target.value)}>
          <option value="1">Level 1 – Normal</option>
          <option value="2">Level 2 – Heightened</option>
          <option value="3">Level 3 – Exceptional</option>
        </select>
      </div>

      <div className="form-group">
        <label>Additional Remarks or Notes</label>
        <textarea rows="3" value={form.remarks} onChange={(e) => handleChange('remarks', e.target.value)} />
      </div>
    </div>
  );
};

export default Step8ISPSDocuments;
