// src/pages/demo/Vessel/tabs/ReviewTab.jsx

import React from 'react';
import './VesselRegistration.css';

const ReviewTab = ({ formData, goToStep, handleSubmit }) => {
    const renderField = (label, value) => (
        <div className="review-field">
            <div className="review-label">{label}</div>
            <div className="review-value">{value || '-'}</div>
        </div>
    );

    return (
        <div className="tab-content">
            <h2>📝 Review Vessel Registration</h2>

            <div className="review-section">
                <h3>Vessel Details</h3>
                <div className="review-grid">
                    {renderField("Mode of Transport", formData.mode_of_transport)}
                    {renderField("Type of Vessel", formData.type_of_vessel)}
                    {renderField("IMO Number", formData.imo_number)}
                    {renderField("MT/MV", formData.mt_mv)}
                    {renderField("Vessel Name", formData.vessel_name)}
                    {renderField("Call Sign", formData.call_sign)}
                    {renderField("Ex Vessel Name", formData.ex_vessel_name)}
                    {renderField("Ex Call Sign", formData.ex_call_sign)}
                    {renderField("Satellite ID", formData.satellite_id)}
                    {renderField("Satcom ID", formData.satcom_id)}
                    {renderField("Date of Keel Laying", formData.keel_laying_date)}
                    {renderField("Vessel Delivery Date", formData.delivery_date)}
                    {renderField("Vessel Building Place", formData.vessel_building_place)}
                    {renderField("Permanent Ship Registry", formData.permanent_registry)}
                    {renderField("Ship Registry Validity", formData.registry_validity)}
                    {renderField("Ship Registry Certificate No.", formData.registry_cert_no)}
                    {renderField("Safety Management Certificate", formData.safety_mgmt_cert)}
                    {renderField("SMC Validity", formData.safety_mgmt_validity)}
                    {renderField("SMC No.", formData.safety_mgmt_cert_no)}
                    {renderField("ISPS Compliance", formData.isps_compliance)}
                    {renderField("CAP II Certificate", formData.cap_ii_cert)}
                    {renderField("Agency", formData.agency)}
                    {renderField("Agency Code", formData.agency_code)}
                    {renderField("Name of the Owner", formData.owner_name)}
                    {renderField("Owner Email", formData.owner_email)}
                    {renderField("Port of Registration", formData.port_registration)}
                    {renderField("Port of Submission", formData.port_submission)}
                    {renderField("Nationality", formData.nationality)}
                    {renderField("Bulbous Bow", formData.bulbous_bow)}
                    {renderField("No. of Bays", formData.no_of_bays)}
                    {renderField("No. of Hatches/Tanks", formData.no_of_hatches)}
                    {renderField("Hatch/Tank Cover Type", formData.hatch_cover_type)}
                </div>
            </div>

            <div className="review-section">
                <h3>Vessel Dimensions</h3>
                <div className="review-grid">
                    {renderField("Vessel Height", formData.vessel_height)}
                    {renderField("Beams", formData.beams)}
                    {renderField("LOA", formData.loa)}
                    {renderField("LBP", formData.lbp)}
                    {renderField("Max Draft", formData.max_draft)}
                    {renderField("Parallel Body", formData.parallel_body)}
                    {renderField("Distance Bow to Manifold", formData.bow_to_manifold)}
                    {renderField("Gross Registered Tonnage", formData.grt)}
                    {renderField("Net Registered Tonnage", formData.nrt)}
                    {renderField("Deadweight Tonnage", formData.dwt)}
                    {renderField("Segregated Ballast Tanker", formData.sbt)}
                    {renderField("Reduced GRT", formData.reduced_grt)}
                    {renderField("Summer Dead Weight", formData.summer_dwt)}
                    {renderField("TEU Capacity", formData.teu_capacity)}
                    {renderField("Freeboard", formData.freeboard)}
                </div>
            </div>

            <div className="review-section">
                <h3>Insurance & Classification</h3>
                <div className="review-grid">
                    {renderField("Classification Society", formData.classification_society)}
                    {renderField("Hull Insurance Company", formData.hull_insurance_company)}
                    {renderField("Hull Insurance Validity", formData.hull_insurance_validity)}
                </div>
            </div>

            <div className="review-section">
                <h3>P&I Details</h3>
                <div className="review-grid">
                    {renderField("P&I Certificate(s)", formData.pandi?.join(', '))}
                </div>
            </div>

            <div className="review-section">
                <h3>Gears</h3>
                <div className="review-grid">
                    {renderField("No. of Gears", formData.vessel_gears)}
                </div>
            </div>

            <div className="review-section">
                <h3>Engine Details</h3>
                <div className="review-grid">
                    {renderField("Engine Type", formData.engine_type)}
                    {renderField("No. of Engines", formData.no_of_engines)}
                    {renderField("Propulsion Type", formData.propulsion_type)}
                    {renderField("No. of Propellers", formData.no_of_propellers)}
                    {renderField("Engine Power (BHP)", formData.engine_power)}
                    {renderField("No. of Rows on Deck", formData.no_of_rows_on_deck)}
                    {renderField("Bow Thruster", formData.bow_thruster)}
                    {renderField("Bow Thruster Power (KW)", formData.bow_thruster_power)}
                    {renderField("Total No. of Bow Thrusters", formData.total_bow_thrusters)}
                    {renderField("Total No. of Stern Thrusters", formData.total_stern_thrusters)}
                    {renderField("Stern Thruster Power (KW)", formData.stern_thruster_power)}
                    {renderField("Max Maneuvering Speed", formData.maneuvering_speed)}
                    {renderField("MMSI No.", formData.mmsi_engine_tab)}
                </div>
            </div>

            <div className="tab-buttons">
                <button className="btn-secondary" onClick={() => goToStep(4)}>Back</button>
                <button className="btn-primary" onClick={handleSubmit}>Submit & Activate Vessel</button>
            </div>
        </div>
    );
};

export default ReviewTab;
