import React from 'react';
import './StepperControls.css';
import { format } from 'date-fns';
import { CheckCircle, Cancel } from '@mui/icons-material';

const Step5_Review = ({ formData, setFormData }) => {
    const {
        vessel_name, call_sign, imo_no, mmsi_no, gross_tonnage, voyage_number, flag,
        last_port_id, next_port_id, eta, purpose_id, services,
        prearrival_checklist, security_certificate, portCallId
    } = formData;

    // ✅ Called by StepperControls
    const triggerBackendDraft = async () => {
        console.log('📤 Attempting draft creation with formData:', formData);

        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/prearrival/create-draft`, {
                method: 'POST',
                body: createFormData(formData)
            });

            if (!res.ok) throw new Error(`❌ Server returned ${res.status}`);

            const data = await res.json();
            const cleanedId = typeof data.portCallId === 'object'
                ? data.portCallId?.port_call_id
                : data.portCallId;

            console.log('✅ Draft saved with ID:', cleanedId);
            setFormData(prev => ({ ...prev, portCallId: cleanedId }));
            return cleanedId;
        } catch (err) {
            console.error('❌ Error submitting draft:', err);
            alert('Failed to save draft');
            return null;
        }
    };

    const createFormData = (data) => {
        const formData = new FormData();
        formData.append('shipId', data.vessel_id);  // ✅ shipId to match DB
        formData.append('voyageNumber', data.voyage_number);
        formData.append('flag', data.flag);
        formData.append('callSign', data.call_sign);
        formData.append('grossTonnage', data.gross_tonnage);
        formData.append('portOfArrival', data.location_id);
        formData.append('terminal', data.terminal_id);
        formData.append('berth', data.berth_id);
        formData.append('agent', data.agent_id);
        formData.append('eta', data.eta);
        formData.append('etd', data.etd);
        formData.append('services', JSON.stringify(data.services || []));

        if (data.prearrival_checklist) {
            formData.append('checklist', data.prearrival_checklist);
        }
        if (data.security_certificate) {
            formData.append('securityCert', data.security_certificate);
        }

        return formData;
    };

    const renderServices = () =>
        services?.length > 0
            ? services.map((s, i) => (
                <li key={i}><CheckCircle fontSize="small" style={{ color: 'green' }} /> {s}</li>
            ))
            : <li><Cancel fontSize="small" style={{ color: 'red' }} /> No services selected</li>;

    return (
        <div className="step-review-container">
            <h2>Step 5: Review & Submit</h2>

            <div className="review-section">
                <h3>Vessel Information</h3>
                <p><strong>Name:</strong> {vessel_name}</p>
                <p><strong>Call Sign:</strong> {call_sign}</p>
                <p><strong>IMO No:</strong> {imo_no}</p>
                <p><strong>MMSI:</strong> {mmsi_no}</p>
                <p><strong>Gross Tonnage:</strong> {gross_tonnage}</p>
                <p><strong>Voyage Number:</strong> {voyage_number}</p>
            </div>

            <div className="review-section">
                <h3>Port Information</h3>
                <p><strong>Previous Port:</strong> {last_port_id}</p>
                <p><strong>Next Port:</strong> {next_port_id}</p>
                <p><strong>ETA:</strong> {format(new Date(eta), 'yyyy-MM-dd HH:mm')}</p>
                <p><strong>Purpose:</strong> {purpose_id}</p>
            </div>

            <div className="review-section">
                <h3>Requested Services</h3>
                <ul>{renderServices()}</ul>
            </div>

            <div className="review-section">
                <h3>Uploaded Documents</h3>
                <p>
                    Pre-arrival Checklist: {prearrival_checklist ? <CheckCircle style={{ color: 'green' }} /> : <Cancel style={{ color: 'red' }} />}
                </p>
                <p>
                    Security Certificate: {security_certificate ? <CheckCircle style={{ color: 'green' }} /> : <Cancel style={{ color: 'red' }} />}
                </p>
            </div>
        </div>
    );
};

export default Step5_Review;
export { Step5_Review }; // ⬅️ so StepperControls can import trigger function if needed
