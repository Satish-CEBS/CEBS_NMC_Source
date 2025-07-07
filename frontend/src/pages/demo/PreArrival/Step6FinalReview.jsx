import React from 'react';
import './Step5SecurityClearance.css';

const Step6FinalReview = ({ formData = {}, goToStep, onSubmit }) => {
    const {
        voyageDetails = {},
        vesselDocuments = {},
        crewPassenger = {},
        servicesRequested = [],
        securityClearance = {},
    } = formData;

    const handleReset = () => {
        localStorage.removeItem('preArrivalForm');
        window.location.reload();
    };

    const handleSaveDraft = () => {
        localStorage.setItem('preArrivalForm', JSON.stringify(formData));
        alert('Draft saved locally.');
    };

    const renderCard = (title, content) => (
        <div className="review-card">
            <h3>{title}</h3>
            {content}
        </div>
    );

    return (
        <div className="step5-container">
            <h2 className="step5-title">🧭 Pre-Arrival Wizard – Step 6</h2>
            <p className="step5-subtitle">Step 6: Final Review & Submit</p>
            <p className="step5-subtext">Review all submitted information below before final submission:</p>

            {/* Voyage Details */}
            {renderCard(
                'Voyage Details',
                <div className="review-grid">
                    <div><strong>Voyage Number:</strong> {voyageDetails.voyage_number}</div>
                    <div><strong>ETA:</strong> {voyageDetails.eta}</div>
                    <div><strong>Vessel Name:</strong> {voyageDetails.vessel?.name}</div>
                    <div><strong>Call Sign:</strong> {voyageDetails.vessel?.call_sign}</div>
                    <div><strong>Last Port:</strong> {voyageDetails.last_port?.name}</div>
                    <div><strong>Next Port:</strong> {voyageDetails.next_port?.name}</div>
                    <div><strong>Purposes:</strong> {voyageDetails.purposes?.join(', ')}</div>
                </div>
            )}

            {/* Vessel Documents */}
            {renderCard(
                'Vessel Documents',
                <ul>
                    {Object.entries(vesselDocuments).map(([key, val]) => (
                        <li key={key}><strong>{key}:</strong> {val?.name || 'Not uploaded'}</li>
                    ))}
                </ul>
            )}

            {/* Crew & Passenger */}
            {renderCard(
                'Crew & Passenger Forms',
                <ul>
                    {crewPassenger?.crewList?.length ? (
                        <li>👨‍✈️ Crew List Entries: {crewPassenger.crewList.length}</li>
                    ) : (
                        <li>No crew list entries</li>
                    )}
                    {crewPassenger?.passengerList?.length ? (
                        <li>🧍 Passenger List Entries: {crewPassenger.passengerList.length}</li>
                    ) : (
                        <li>No passenger list entries</li>
                    )}
                    {crewPassenger?.crewEffects?.length ? (
                        <li>🎒 Crew Effects Entries: {crewPassenger.crewEffects.length}</li>
                    ) : (
                        <li>No crew effects declared</li>
                    )}
                    {crewPassenger?.dangerousGoods?.length ? (
                        <li>☣️ Dangerous Goods Items: {crewPassenger.dangerousGoods.length}</li>
                    ) : (
                        <li>No dangerous goods declared</li>
                    )}
                </ul>
            )}

            {/* Services */}
            {renderCard(
                'Requested Services',
                servicesRequested?.length ? (
                    <ul>
                        {servicesRequested.map((srv, idx) => <li key={idx}>🛠 {srv}</li>)}
                    </ul>
                ) : (
                    <p>No services selected</p>
                )
            )}

            {/* Security */}
            {renderCard(
                'Security & Clearance',
                <div className="review-grid">
                    <div><strong>ISSC No:</strong> {securityClearance.issc_number}</div>
                    <div><strong>Issued By:</strong> {securityClearance.issuing_authority}</div>
                    <div><strong>Valid Until:</strong> {securityClearance.valid_until}</div>
                    <div><strong>Security Level:</strong> {securityClearance.security_level}</div>
                </div>
            )}

            {/* Buttons */}
            <div className="step-navigation">
                <button className="nav-button back" onClick={() => goToStep(5)}>← Back to Step 5</button>
                <button className="nav-button next" onClick={onSubmit}>✅ Submit Pre-Arrival Notification</button>
            </div>
        </div>
    );
};

export default Step6FinalReview;
