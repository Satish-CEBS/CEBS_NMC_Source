import React from 'react';
import '../BerthDashboard.css';

const ReviewAndSubmitTab = ({ formData }) => {
    const {
        berth_id, terminal, vcn, eta, etd, status,
        vessel_name, call_sign, imo_no, mmsi_no, flag,
        cargo_type, cargo_description, weight,
        grab_type, grab_quantity, grab_capacity,
        accident_occurred,
        consignee_name, consignee_address, consignee_contact,
    } = formData;

    return (
        <div className="review-section">
            <div className="section-title">Berth Details</div>
            <div className="grid-3col">
                <div><strong>VCN:</strong> {vcn}</div>
                <div><strong>Berth ID:</strong> {berth_id}</div>
                <div><strong>Terminal:</strong> {terminal}</div>
            </div>

            <div className="section-title">Vessel Information</div>
            <div className="grid-3col">
                <div><strong>Vessel Name:</strong> {vessel_name}</div>
                <div><strong>IMO Number:</strong> {imo_no}</div>
                <div><strong>Call Sign:</strong> {call_sign}</div>
                <div><strong>MMSI:</strong> {mmsi_no}</div>
                <div><strong>Flag:</strong> {flag}</div>
                <div><strong>ETA:</strong> {eta}</div>
            </div>

            <div className="section-title">Cargo Information</div>
            <div className="grid-3col">
                <div><strong>Cargo Type:</strong> {cargo_type}</div>
                <div><strong>Description:</strong> {cargo_description}</div>
                <div><strong>Weight (MT):</strong> {weight}</div>
            </div>

            <div className="section-title">Grab Equipment</div>
            <div className="grid-3col">
                <div><strong>Grab Type:</strong> {grab_type}</div>
                <div><strong>Quantity:</strong> {grab_quantity}</div>
                <div><strong>Capacity:</strong> {grab_capacity}</div>
            </div>

            <div className="section-title">Accident History</div>
            <div><strong>Accidents Occurred:</strong> {accident_occurred ? 'Yes' : 'No'}</div>

            <div className="section-title">Consignee Information</div>
            <div className="grid-3col">
                <div><strong>Name:</strong> {consignee_name}</div>
                <div><strong>Address:</strong> {consignee_address}</div>
                <div><strong>Contact:</strong> {consignee_contact}</div>
            </div>
        </div>
    );
};

export default ReviewAndSubmitTab;
