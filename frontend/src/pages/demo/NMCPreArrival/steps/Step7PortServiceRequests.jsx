// File: Step7PortServiceRequests.jsx
import React, { useState } from 'react';
import '../../styles/NMCStep.css';

const Step7PortServiceRequests = ({ data = {}, updateData }) => {
  const [form, setForm] = useState({
    tugRequired: data.tugRequired || false,
    pilotRequired: data.pilotRequired || false,
    medicalAssistance: data.medicalAssistance || false,
    garbageReception: data.garbageReception || false,
    crewChange: data.crewChange || false,
    bunkering: data.bunkering || false,
    provisioning: data.provisioning || false,
    sludgeDisposal: data.sludgeDisposal || false,
    shorePower: data.shorePower || false,
    otherRequest: data.otherRequest || '',
  });

  const handleChange = (field) => {
    setForm((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (e) => {
    setForm((prev) => ({ ...prev, otherRequest: e.target.value }));
  };

  const handleSave = () => {
    updateData(form);
    alert('✅ Port service requests saved.');
  };

  return (
    <div className="step-container">
      <h2>Step 7: Port Services Requested</h2>
      <p>Please indicate the port services you are requesting at the port of call:</p>

      <div className="checkbox-grid">
        <label>
          <input type="checkbox" checked={form.tugRequired} onChange={() => handleChange('tugRequired')} />
          Tug Assistance
        </label>
        <label>
          <input type="checkbox" checked={form.pilotRequired} onChange={() => handleChange('pilotRequired')} />
          Pilotage
        </label>
        <label>
          <input type="checkbox" checked={form.medicalAssistance} onChange={() => handleChange('medicalAssistance')} />
          Medical Assistance
        </label>
        <label>
          <input type="checkbox" checked={form.garbageReception} onChange={() => handleChange('garbageReception')} />
          Garbage Reception
        </label>
        <label>
          <input type="checkbox" checked={form.crewChange} onChange={() => handleChange('crewChange')} />
          Crew Change
        </label>
        <label>
          <input type="checkbox" checked={form.bunkering} onChange={() => handleChange('bunkering')} />
          Bunkering
        </label>
        <label>
          <input type="checkbox" checked={form.provisioning} onChange={() => handleChange('provisioning')} />
          Provisioning
        </label>
        <label>
          <input type="checkbox" checked={form.sludgeDisposal} onChange={() => handleChange('sludgeDisposal')} />
          Sludge Disposal
        </label>
        <label>
          <input type="checkbox" checked={form.shorePower} onChange={() => handleChange('shorePower')} />
          Shore Power Connection
        </label>
      </div>

      <div className="form-group">
        <label>Other Requests or Notes</label>
        <textarea rows="3" value={form.otherRequest} onChange={handleInputChange} placeholder="Specify any other port service needed..." />
      </div>
    </div>
  );
};

export default Step7PortServiceRequests;
