import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import PageWrapper from '../layout/PageWrapper';
import AddContainerRowModal from './AddContainerRowModal';
import getFlagImage from '../../../utils/getFlagImage';
import locations from '../../../mockData/locations.json';
import stowagePlansJson from '../../../mockData/stowagePlans.json';
import './AddStowagePlan.css';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AddStowagePlan = () => {
    const [formData, setFormData] = useState({
        vcn: '',
        terminal: '',
        draftFwd: '',
        draftAft: '',
        portOfLoading: null,
        portOfDischarge: null,
        containers: []
    });

    const [availableVCNs, setAvailableVCNs] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fromLS = JSON.parse(localStorage.getItem('stowagePlans') || '[]');
        const all = [...stowagePlansJson, ...fromLS];
        const deduped = Array.from(new Set(all.map((p) => p.vcn)))
            .map((vcn) => ({ label: vcn, value: vcn }));
        setAvailableVCNs(deduped);
    }, []);

    const portOptions = locations.map(loc => ({
        value: loc.location_code,
        label: (
            <div className="port-option">
                <img src={getFlagImage(loc.flag_code)} alt="" />
                {`${loc.name} (${loc.location_code})`}
            </div>
        ),
        raw: loc
    }));

    const handleAddContainer = (container) => {
        setFormData((prev) => ({
            ...prev,
            containers: [...prev.containers, container]
        }));
        setShowModal(false);
    };

    const handleDelete = (index) => {
        const updated = [...formData.containers];
        updated.splice(index, 1);
        setFormData({ ...formData, containers: updated });
    };

    const handleSubmit = () => {
        const saved = JSON.parse(localStorage.getItem('stowagePlans') || '[]');
        saved.push(formData);
        localStorage.setItem('stowagePlans', JSON.stringify(saved));
        alert('✅ Stowage Plan Saved!');
    };

    return (
        <PageWrapper title="Add Stowage Plan">
            <div className="stowage-form-container">
                <div className="stowage-form-grid">
                    <div>
                        <label>VCN Number</label>
                        <Select
                            options={availableVCNs}
                            value={availableVCNs.find(o => o.value === formData.vcn)}
                            onChange={(opt) => setFormData({ ...formData, vcn: opt.value })}
                            placeholder="Select VCN"
                        />
                    </div>

                    <div>
                        <label>Terminal</label>
                        <input
                            type="text"
                            value={formData.terminal}
                            onChange={(e) => setFormData({ ...formData, terminal: e.target.value })}
                        />
                    </div>

                    <div>
                        <label>Draft FWD (m)</label>
                        <input
                            type="number"
                            value={formData.draftFwd}
                            onChange={(e) => setFormData({ ...formData, draftFwd: e.target.value })}
                        />
                    </div>

                    <div>
                        <label>Draft AFT (m)</label>
                        <input
                            type="number"
                            value={formData.draftAft}
                            onChange={(e) => setFormData({ ...formData, draftAft: e.target.value })}
                        />
                    </div>

                    <div className="port-select">
                        <label>Port of Loading</label>
                        <Select
                            options={portOptions}
                            value={formData.portOfLoading}
                            onChange={(opt) => setFormData({ ...formData, portOfLoading: opt })}
                            placeholder="Select Port"
                        />
                    </div>

                    <div className="port-select">
                        <label>Port of Discharge</label>
                        <Select
                            options={portOptions}
                            value={formData.portOfDischarge}
                            onChange={(opt) => setFormData({ ...formData, portOfDischarge: opt })}
                            placeholder="Select Port"
                        />
                    </div>
                </div>

                <div className="stowage-actions">
                    <button onClick={() => setShowModal(true)} className="btn-add">
                        ➕ Add Container Row
                    </button>
                    <button onClick={handleSubmit} className="btn-submit">
                        ✅ Submit Stowage Plan
                    </button>
                </div>

                <h4>📦 Container List</h4>
                <table className="container-table">
                    <thead>
                        <tr>
                            <th>Container No</th>
                            <th>BL No</th>
                            <th>DG Class</th>
                            <th>Discharge Port</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.containers.map((item, i) => (
                            <tr key={i}>
                                <td>{item.containerNo}</td>
                                <td>{item.blNo}</td>
                                <td>{item.dgClass}</td>
                                <td>{item.dischargePort}</td>
                                <td>
                                    <IconButton><EditIcon /></IconButton>
                                    <IconButton onClick={() => handleDelete(i)}><DeleteIcon /></IconButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showModal && (
                    <AddContainerRowModal
                        onAdd={handleAddContainer}
                        onClose={() => setShowModal(false)}
                    />
                )}
            </div>
        </PageWrapper>
    );
};

export default AddStowagePlan;
