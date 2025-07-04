import React, { useEffect } from 'react';
import '../PreArrivalCreatePage.css';

const availableServices = [
    'Pilotage',
    'Tug Assistance',
    'Garbage Collection',
    'Fresh Water Supply',
    'Medical Inspection',
    'Provisions Supply',
    'Mooring Assistance'
];

const Step3_Services = ({ formData, setFormData }) => {
    // Initialize the services array if not already done
    useEffect(() => {
        if (!Array.isArray(formData.services)) {
            setFormData({ ...formData, services: [] });
        }
    }, []);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        let updatedServices = [...(formData.services || [])];

        if (checked) {
            if (!updatedServices.includes(value)) {
                updatedServices.push(value);
            }
        } else {
            updatedServices = updatedServices.filter((s) => s !== value);
        }

        setFormData({ ...formData, services: updatedServices });
    };

    return (
        <div className="step-container">
            <h3 className="step-title">Step 3 – Requested Services</h3>

            <div className="form-group">
                <label><strong>Select Requested Services:</strong></label>
                {availableServices.map((service) => (
                    <div key={service} className="checkbox-row">
                        <input
                            type="checkbox"
                            id={service}
                            value={service}
                            checked={formData.services?.includes(service)}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor={service}>{service}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Step3_Services;
