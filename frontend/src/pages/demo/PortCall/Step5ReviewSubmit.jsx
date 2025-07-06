import React from 'react';
import './Step5ReviewSubmit.css';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Step5ReviewSubmit = ({ data, goToStep }) => {
    const handleFinalSubmit = () => {
        localStorage.setItem('NMC_FORM_DATA_FINAL', JSON.stringify(data));
        window.location.href = '/dashboard';
    };

    const renderField = (label, value) => (
        <p><strong>{label}:</strong> {value || 'N/A'}</p>
    );

    return (
        <div className="step-container">
            <h2>Step 5: Review & Submit</h2>

            {/* Basic Info */}
            <div className="summary-card">
                <div className="summary-header">
                    <h4>Voyage Details</h4>
                    <EditIcon onClick={() => goToStep(1)} style={{ cursor: 'pointer' }} />
                </div>
                {renderField('Vessel Name', data.basicInfo?.vessel_name)}
                {renderField('IMO Number', data.basicInfo?.imo_no)}
                {renderField('MMSI', data.basicInfo?.mmsi_no)}
                {renderField('Call Sign', data.basicInfo?.call_sign)}
                {renderField('Flag', data.basicInfo?.flag)}
                {renderField('Voyage Number', data.basicInfo?.voyage_number)}
                {renderField('Gross Tonnage', data.basicInfo?.gross_tonnage)}
            </div>

            {/* Port Call Details */}
            <div className="summary-card">
                <div className="summary-header">
                    <h4>Port Call Details</h4>
                    <EditIcon onClick={() => goToStep(2)} style={{ cursor: 'pointer' }} />
                </div>
                {renderField('ETA', data.formsData?.eta)}
                {renderField('ETD', data.formsData?.etd)}
                {renderField('Previous Port', data.formsData?.previous_port)}
                {renderField('Next Port', data.formsData?.next_port)}
                {renderField('Purpose', data.formsData?.purpose)}
                {renderField('Cargo Description', data.formsData?.cargo_description)}
            </div>

            {/* Reports Summary */}
            <div className="summary-card">
                <div className="summary-header">
                    <h4>Reports & Crew/Pax</h4>
                    <EditIcon onClick={() => goToStep(3)} style={{ cursor: 'pointer' }} />
                </div>
                {renderField('DPG Report', data.selectedReports?.dpg ? 'Yes' : 'No')}
                {renderField('Cargo Report', data.selectedReports?.cargo ? 'Yes' : 'No')}
                {renderField('Ship Stores', data.selectedReports?.ship_stores ? 'Yes' : 'No')}
                {renderField('Crew Effects', data.selectedReports?.crew ? 'Yes' : 'No')}
                {renderField('Passengers', data.selectedReports?.pax ? 'Yes' : 'No')}
                {renderField('Security', data.selectedReports?.security ? 'Yes' : 'No')}
                {renderField('Crew Count', data.formsData?.crew_count)}
                {renderField('Passenger Count', data.formsData?.pax_count)}
            </div>

            {/* Clearance & Billing */}
            <div className="summary-card">
                <div className="summary-header">
                    <h4>Clearance & Billing</h4>
                    <EditIcon onClick={() => goToStep(4)} style={{ cursor: 'pointer' }} />
                </div>
                {renderField('Customs Clearance', data.clearance?.customs_clearance)}
                {renderField('Immigration', data.clearance?.immigration_cleared ? 'Cleared' : 'Not Cleared')}
                {renderField('Berth Allocation', data.clearance?.berth_allocation)}
                {renderField('Tariff Group', data.clearance?.tariff_group)}
                <p><strong>Charges Applied:</strong></p>
                <ul>
                    {Object.entries(data.clearance?.charges_applied || {}).map(([key, val]) => (
                        val ? <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</li> : null
                    ))}
                </ul>
            </div>

            {/* Final Submit Button */}
            <div className="step-actions" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button className="next-step-btn" onClick={handleFinalSubmit}>
                    Submit Port Call <CheckCircleIcon style={{ marginLeft: '0.5rem' }} />
                </button>
            </div>
        </div>
    );
};

export default Step5ReviewSubmit;
