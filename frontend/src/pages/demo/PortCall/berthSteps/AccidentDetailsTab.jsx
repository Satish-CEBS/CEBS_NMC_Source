import React, { useEffect } from "react";
import "../BerthFormTabs.css";

const useSampleData = true;

const AccidentDetailsTab = ({ formData, setFormData }) => {
    useEffect(() => {
        if (useSampleData && !formData.accident_summary) {
            setFormData(prev => ({
                ...prev,
                accident_occurred: "No",
                accident_summary: ""
            }));
        }
    }, [setFormData]);

    return (
        <div className="berth-tab">
            <div className="form-row">
                <label>Any Past Accidents?</label>
                <select
                    value={formData.accident_occurred || ""}
                    onChange={(e) => setFormData({ ...formData, accident_occurred: e.target.value })}
                >
                    <option value="">Select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>
            {formData.accident_occurred === "Yes" && (
                <div className="form-row">
                    <label>Accident Summary</label>
                    <textarea
                        value={formData.accident_summary || ""}
                        onChange={(e) =>
                            setFormData({ ...formData, accident_summary: e.target.value })
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default AccidentDetailsTab;
