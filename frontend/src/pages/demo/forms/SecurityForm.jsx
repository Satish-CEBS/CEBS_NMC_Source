import React, { useState, useEffect } from 'react';
import './SecurityForm.css';

const emptySecurityEntry = {
    hasSSP: false,
    securityLevel: '',
    additionalInformation: '',
    certificateNumber: '',
    expiryDate: '',
    issuerType: '',
    issuedBy: '',
    csoGivenName: '',
    csoSurname: '',
    csoPhone: '',
    csoEmail: '',
    csoOrganization: '',
    lastPortCalls: [],
    shipSecurityLevel: '',
    sequenceNumber: '',
    specialMeasures: '',
    shipToShipActivities: [],
};

const SecurityForm = ({ savedData, onSave }) => {
    const [securityData, setSecurityData] = useState(emptySecurityEntry);

    useEffect(() => {
        if (savedData && typeof savedData === 'object') {
            setSecurityData(savedData);
        }
    }, [savedData]);

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSecurityData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const saveSecurity = () => {
        if (onSave) onSave(securityData);
    };

    return (
        <div className="security-form-container">
            <h3>Security Details</h3>

            <label>
                <input
                    type="checkbox"
                    name="hasSSP"
                    checked={securityData.hasSSP}
                    onChange={onChange}
                />
                The ship has a valid Ship Security Plan (SSP) on board
            </label>

            <label>
                Security Level at which the ship is currently operating
                <select
                    name="securityLevel"
                    value={securityData.securityLevel}
                    onChange={onChange}
                >
                    <option value="">Select security level</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </label>

            <label>
                (Optional) Additional information
                <textarea
                    name="additionalInformation"
                    value={securityData.additionalInformation}
                    onChange={onChange}
                    rows="4"
                />
            </label>

            <label>
                Certificate Number
                <input
                    name="certificateNumber"
                    value={securityData.certificateNumber}
                    onChange={onChange}
                />
            </label>

            <label>
                Expiry Date
                <input
                    type="date"
                    name="expiryDate"
                    value={securityData.expiryDate}
                    onChange={onChange}
                />
            </label>

            <label>
                Issuer Type
                <input
                    name="issuerType"
                    value={securityData.issuerType}
                    onChange={onChange}
                />
            </label>

            <label>
                Issued By
                <input
                    name="issuedBy"
                    value={securityData.issuedBy}
                    onChange={onChange}
                />
            </label>

            {/* Additional fields can be added here */}

            <button onClick={saveSecurity}>Save Security Details</button>
        </div>
    );
};

export default SecurityForm;
