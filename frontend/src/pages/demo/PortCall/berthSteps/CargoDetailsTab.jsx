import React, { useEffect } from "react";
import "../BerthFormTabs.css";

const useSampleData = true;

const CargoDetailsTab = ({ formData, setFormData }) => {
    useEffect(() => {
        if (useSampleData && !formData.cargo_type) {
            setFormData(prev => ({
                ...prev,
                cargo_type: "Dry Bulk",
                cargo_description: "Wheat - 25,000 MT",
                cargo_weight: "25000"
            }));
        }
    }, [setFormData]);

    return (
        <div className="berth-tab">
            <div className="form-row">
                <label>Cargo Type</label>
                <input
                    type="text"
                    value={formData.cargo_type || ""}
                    onChange={(e) => setFormData({ ...formData, cargo_type: e.target.value })}
                />
            </div>
            <div className="form-row">
                <label>Description</label>
                <textarea
                    value={formData.cargo_description || ""}
                    onChange={(e) => setFormData({ ...formData, cargo_description: e.target.value })}
                />
            </div>
            <div className="form-row">
                <label>Weight (in MT)</label>
                <input
                    type="number"
                    value={formData.cargo_weight || ""}
                    onChange={(e) => setFormData({ ...formData, cargo_weight: e.target.value })}
                />
            </div>
        </div>
    );
};

export default CargoDetailsTab;
