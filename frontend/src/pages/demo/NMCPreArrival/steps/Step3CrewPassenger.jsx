import React, { useState, useEffect } from 'react';
import './Step3CrewPassenger.css';

const formTabs = [
    { id: 'crewEffects', label: 'FAL 4 - Crew Effects' },
    { id: 'crewList', label: 'FAL 5 - Crew List' },
    { id: 'passengerList', label: 'FAL 6 - Passenger List' },
    { id: 'dangerousGoods', label: 'FAL 7 - Dangerous Goods' },
];

const Step3CrewPassenger = ({ data, updateData, goToNextStep, goToPreviousStep, resetStep }) => {
    const [activeTab, setActiveTab] = useState('crewEffects');
    const [formData, setFormData] = useState({});
    const [manualEntry, setManualEntry] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (data?.step3) {
            setFormData(data.step3);
        }
    }, [data]);

    useEffect(() => {
        updateData('step3', formData);
    }, [formData]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFormData((prev) => ({
            ...prev,
            [activeTab]: { type: 'file', fileName: file.name, size: file.size },
        }));
    };

    const saveManualEntry = () => {
        setFormData((prev) => ({
            ...prev,
            [activeTab]: { type: 'manual', content: manualEntry || 'Manually filled' },
        }));
        setManualEntry('');
        setModalVisible(false);
    };

    const renderMetadata = () => {
        const entry = formData[activeTab];
        if (!entry) return null;

        if (entry.type === 'file') {
            return (
                <p className="file-info">
                    <strong>{entry.fileName}</strong> ({entry.size} bytes)
                </p>
            );
        } else {
            return (
                <p className="file-info">
                    <strong>Manual Entry:</strong> {entry.content}
                </p>
            );
        }
    };

    return (
        <div className="step3-container">
            <h2>Step 3: Crew & Passenger Forms</h2>

            <div className="tabs">
                {formTabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="upload-section">
                <label>{formTabs.find((t) => t.id === activeTab).label}</label>
                <input type="file" accept="application/pdf" onChange={handleFileUpload} />
                <button className="manual-btn" onClick={() => setModalVisible(true)}>
                    Fill Manually
                </button>
                {renderMetadata()}
            </div>

            {modalVisible && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Manual Entry – {formTabs.find((f) => f.id === activeTab)?.label}</h3>
                        <textarea
                            rows={6}
                            value={manualEntry}
                            onChange={(e) => setManualEntry(e.target.value)}
                            placeholder="Enter data for this form"
                        />
                        <div className="modal-actions">
                            <button onClick={saveManualEntry}>Save</button>
                            <button className="cancel" onClick={() => setModalVisible(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Step3CrewPassenger;
