import React, { useEffect } from "react";
import "../BerthFormTabs.css";

const useSampleData = true;

const GrabDetailsTab = ({ formData, setFormData }) => {
    useEffect(() => {
        if (useSampleData && !formData.grab_type) {
            setFormData(prev => ({
                ...prev,
                grab_type: "Clamshell",
                grab_quantity: "4",
                grab_capacity: "10"
            }));
        }
    }, [setFormData]);

    return (
        <div className="berth-tab">
            <div className="form-row">
                <label>Grab Type</label>
                <input
                    type="text"
                    value={formData.grab_type || ""}
                    onChange={(e) => setFormData({ ...formData, grab_type: e.target.value })}
                />
            </div>
            <div className="form-row">
                <label>Quantity</label>
                <input
                    type="number"
                    value={formData.grab_quantity || ""}
                    onChange={(e) => setFormData({ ...formData, grab_quantity: e.target.value })}
                />
            </div>
            <div className="form-row">
                <label>Capacity (Tons)</label>
                <input
                    type="number"
                    value={formData.grab_capacity || ""}
                    onChange={(e) => setFormData({ ...formData, grab_capacity: e.target.value })}
                />
            </div>
        </div>
    );
};

export default GrabDetailsTab;
