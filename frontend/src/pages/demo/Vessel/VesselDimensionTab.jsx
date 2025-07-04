import React from 'react';

const VesselDimensionTab = ({ formData = {}, setFormData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="vessel-tab">
            <p className="tab-instruction">
                Please enter the detailed vessel dimensions. Fields should reflect actual vessel specifications.
            </p>

            <div className="form-grid-3">
                <div className="form-group">
                    <label>Vessel Height (m)</label>
                    <input
                        type="text"
                        name="vessel_height"
                        value={formData?.vessel_height || ''}
                        onChange={handleChange}
                        placeholder="e.g., 28.5"
                    />
                </div>

                <div className="form-group">
                    <label>Beam (m)</label>
                    <input
                        type="text"
                        name="beams"
                        value={formData?.beams || ''}
                        onChange={handleChange}
                        placeholder="e.g., 32.2"
                    />
                </div>

                <div className="form-group">
                    <label>Length Overall (LOA)</label>
                    <input
                        type="text"
                        name="loa"
                        value={formData?.loa || ''}
                        onChange={handleChange}
                        placeholder="e.g., 300"
                    />
                </div>

                <div className="form-group">
                    <label>Length Between Perpendiculars (LBP)</label>
                    <input
                        type="text"
                        name="lbp"
                        value={formData?.lbp || ''}
                        onChange={handleChange}
                        placeholder="e.g., 285"
                    />
                </div>

                <div className="form-group">
                    <label>Maximum Draft (m)</label>
                    <input
                        type="text"
                        name="max_draft"
                        value={formData?.max_draft || ''}
                        onChange={handleChange}
                        placeholder="e.g., 12.5"
                    />
                </div>

                <div className="form-group">
                    <label>Parallel Body (m)</label>
                    <input
                        type="text"
                        name="parallel_body"
                        value={formData?.parallel_body || ''}
                        onChange={handleChange}
                        placeholder="e.g., 50"
                    />
                </div>

                <div className="form-group">
                    <label>Bow to Manifold (m)</label>
                    <input
                        type="text"
                        name="bow_to_manifold"
                        value={formData?.bow_to_manifold || ''}
                        onChange={handleChange}
                        placeholder="e.g., 15"
                    />
                </div>

                <div className="form-group">
                    <label>Gross Registered Tonnage (GRT)</label>
                    <input
                        type="text"
                        name="grt"
                        value={formData?.grt || ''}
                        onChange={handleChange}
                        placeholder="e.g., 55000"
                    />
                </div>

                <div className="form-group">
                    <label>Net Registered Tonnage (NRT)</label>
                    <input
                        type="text"
                        name="nrt"
                        value={formData?.nrt || ''}
                        onChange={handleChange}
                        placeholder="e.g., 30000"
                    />
                </div>

                <div className="form-group">
                    <label>Deadweight Tonnage (DWT)</label>
                    <input
                        type="text"
                        name="dwt"
                        value={formData?.dwt || ''}
                        onChange={handleChange}
                        placeholder="e.g., 62000"
                    />
                </div>

                <div className="form-group">
                    <label>Summer DWT</label>
                    <input
                        type="text"
                        name="summer_dwt"
                        value={formData?.summer_dwt || ''}
                        onChange={handleChange}
                        placeholder="e.g., 61500"
                    />
                </div>

                <div className="form-group">
                    <label>SBT (Segregated Ballast Tank)</label>
                    <input
                        type="text"
                        name="sbt"
                        value={formData?.sbt || ''}
                        onChange={handleChange}
                        placeholder="e.g., Yes/No"
                    />
                </div>

                <div className="form-group">
                    <label>Reduced GRT</label>
                    <input
                        type="text"
                        name="reduced_grt"
                        value={formData?.reduced_grt || ''}
                        onChange={handleChange}
                        placeholder="e.g., 52000"
                    />
                </div>

                <div className="form-group">
                    <label>TEU Capacity</label>
                    <input
                        type="text"
                        name="teu_capacity"
                        value={formData?.teu_capacity || ''}
                        onChange={handleChange}
                        placeholder="e.g., 8000"
                    />
                </div>

                <div className="form-group">
                    <label>Freeboard (m)</label>
                    <input
                        type="text"
                        name="freeboard"
                        value={formData?.freeboard || ''}
                        onChange={handleChange}
                        placeholder="e.g., 2.8"
                    />
                </div>
            </div>
        </div>
    );
};

export default VesselDimensionTab;
