import React, { useState, useEffect } from 'react';
import '../../styles/NMCStep.css';

const certificateTypes = [
    'IMO General Declaration (FAL Form 1)',
    'International Ship Security Certificate (ISSC)',
    'Certificate of Registry',
    'Classification Certificate',
    'Minimum Safe Manning Certificate',
    'Safety Equipment Certificate',
    'Radio Certificate',
    'Load Line Certificate',
    'Other'
];

const Step2VesselCertificates = ({ data = {}, updateData = () => { }, nextStep }) => {
    const [uploadedCerts, setUploadedCerts] = useState([]);

    useEffect(() => {
        if (data.certificates) setUploadedCerts(data.certificates);
    }, [data.certificates]);

    const [selectedType, setSelectedType] = useState('');
    const [errors, setErrors] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file || !selectedType) return;

        const newCert = {
            type: selectedType,
            name: file.name,
            uploadedAt: new Date().toISOString()
            // ⚠️ Not storing file content in formData/localStorage
        };

        const updated = [...uploadedCerts, newCert];
        setUploadedCerts(updated);
        updateData({ certificates: updated });
        setSelectedType('');
    };

    const removeCertificate = (index) => {
        const updated = [...uploadedCerts];
        updated.splice(index, 1);
        setUploadedCerts(updated);
        updateData({ certificates: updated });
    };

    const handleNext = () => {
        if (uploadedCerts.length < 3) {
            setErrors('Upload at least 3 mandatory certificates to proceed.');
        } else {
            setErrors('');
            nextStep();
        }
    };

    return (
        <div className="nmc-step">
            <h2>Step 2: Vessel Certificates</h2>

            <div className="form-row">
                <div className="form-group">
                    <label>Certificate Type</label>
                    <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                        <option value="">-- Select Certificate --</option>
                        {certificateTypes.map((type, idx) => (
                            <option key={idx} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Upload Certificate (PDF)</label>
                    <input type="file" accept="application/pdf" onChange={handleFileChange} disabled={!selectedType} />
                </div>
            </div>

            <div className="cert-table">
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>File Name</th>
                            <th>Uploaded At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uploadedCerts.map((cert, i) => (
                            <tr key={i}>
                                <td>{cert.type}</td>
                                <td>{cert.name}</td>
                                <td>{new Date(cert.uploadedAt).toLocaleString()}</td>
                                <td><button onClick={() => removeCertificate(i)}>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {errors && <p className="error">{errors}</p>}
        </div>
    );
};

export default Step2VesselCertificates;
