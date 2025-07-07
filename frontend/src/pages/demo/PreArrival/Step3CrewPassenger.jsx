import React, { useState } from 'react';
import './Step3CrewPassenger.css';
import CrewList from './FAL/CrewList';
import PassengerList from './FAL/PassengerList';
import CrewEffects from './FAL/CrewEffects';
import DangerousGoods from './FAL/DangerousGoods';

const Step3CrewPassenger = ({ data = {}, update, goToStep }) => {
    const [activeModal, setActiveModal] = useState(null);

    const handleFileChange = (e, key) => {
        const file = e.target.files[0];
        update({
            ...data,
            [key]: {
                ...data[key],
                file,
                filename: file.name,
            },
        });
    };

    const handleFormSubmit = (key, formEntries) => {
        update({
            ...data,
            [key]: {
                ...data[key],
                data: formEntries,
            },
        });
        setActiveModal(null);
    };

    const forms = [
        {
            key: 'crewEffectsForm',
            label: 'FAL Form 4 – Crew Effects Declaration',
            component: CrewEffects,
        },
        {
            key: 'crewListForm',
            label: 'FAL Form 5 – Crew List',
            component: CrewList,
        },
        {
            key: 'passengerListForm',
            label: 'FAL Form 6 – Passenger List',
            component: PassengerList,
        },
        {
            key: 'dangerousGoodsForm',
            label: 'FAL Form 7 – Dangerous Goods Manifest',
            component: DangerousGoods,
        },
    ];

    return (
        <div className="step3crew-layout">
            <div className="step3crew-main-content">
                <h2>Step 3: Crew & Passenger Documentation</h2>
                <p>Upload the official IMO FAL Forms or fill them digitally below.</p>

                {forms.map(({ key, label, component: Component }) => (
                    <div className="form-card" key={key}>
                        <div className="form-card-header">
                            <h3>{label}</h3>
                            <div className="form-card-actions">
                                <input
                                    type="file"
                                    className="form-file-input"
                                    onChange={(e) => handleFileChange(e, key)}
                                />
                                <button className="btn-fill" onClick={() => setActiveModal(key)}>
                                    Fill Form Digitally
                                </button>
                            </div>
                            <div className="form-filename">
                                {data?.[key]?.filename || 'No file uploaded'}
                            </div>
                        </div>

                        {data?.[key]?.data?.length > 0 && (
                            <div className="summary-table">
                                <table>
                                    <thead>
                                        <tr>
                                            {Object.keys(data[key].data[0]).map((col, idx) => (
                                                <th key={idx}>{col}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data[key].data.map((row, idx) => (
                                            <tr key={idx}>
                                                {Object.values(row).map((val, idy) => (
                                                    <td key={idy}>{val}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeModal === key && (
                            <Component
                                open={true}
                                initialData={data?.[key]?.data || []}
                                onClose={() => setActiveModal(null)}
                                onSave={(entries) => handleFormSubmit(key, entries)}
                            />
                        )}
                    </div>
                ))}

                <div className="step-navigation">
                    <button className="nav-button back" onClick={() => goToStep(2)}>
                        ← Back to Step 2
                    </button>
                    <button className="nav-button next" onClick={() => goToStep(4)}>
                        Continue to Step 4 →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Step3CrewPassenger;
