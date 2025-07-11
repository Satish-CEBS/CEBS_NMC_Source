import React, { useState } from "react";
import "./ModalForm.css";

const emptyEffect = {
  crewName: "",
  rank: "",
  article: "",
  quantity: "",
  value: "",
  remarks: "",
};

const CrewEffects = ({ onClose, onSubmit, initialData = [] }) => {
  const [effects, setEffects] = useState(
    initialData.length ? initialData : [emptyEffect]
  );

  const handleChange = (index, field, value) => {
    const updated = [...effects];
    updated[index][field] = value;
    setEffects(updated);
  };

  const addRow = () => setEffects([...effects, { ...emptyEffect }]);
  const removeRow = (index) =>
    setEffects(effects.filter((_, i) => i !== index));

  const handleSubmit = () => {
    // Validate if onSubmit is a function before calling it
    if (typeof onSubmit === "function") {
      onSubmit(effects);
    } else {
      console.error("onSubmit is not a function");
    }

    // Always close the modal
    if (typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Crew Effects Declaration (FAL Form 4)</h3>

        {effects.map((entry, index) => (
          <div key={index} className="crew-entry">
            <h4>Entry #{index + 1}</h4>

            <div className="form-row">
              <input
                placeholder="Crew Member Name"
                value={entry.crewName}
                onChange={(e) =>
                  handleChange(index, "crewName", e.target.value)
                }
              />
              <input
                placeholder="Rank"
                value={entry.rank}
                onChange={(e) => handleChange(index, "rank", e.target.value)}
              />
            </div>

            <div className="form-row">
              <input
                placeholder="Article Description"
                value={entry.article}
                onChange={(e) => handleChange(index, "article", e.target.value)}
              />
              <input
                placeholder="Quantity"
                type="number"
                value={entry.quantity}
                onChange={(e) =>
                  handleChange(index, "quantity", e.target.value)
                }
              />
              <input
                placeholder="Value"
                type="number"
                value={entry.value}
                onChange={(e) => handleChange(index, "value", e.target.value)}
              />
            </div>

            <div className="form-row">
              <input
                placeholder="Remarks (optional)"
                value={entry.remarks}
                onChange={(e) => handleChange(index, "remarks", e.target.value)}
              />
            </div>

            {effects.length > 1 && (
              <button className="remove-btn" onClick={() => removeRow(index)}>
                Remove
              </button>
            )}
            <hr />
          </div>
        ))}

        <div className="modal-actions">
          <button onClick={addRow}>+ Add Another</button>
          <button className="save-btn" onClick={handleSubmit}>
            Save
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Add default props to ensure the component works even if props are not passed
CrewEffects.defaultProps = {
  onClose: () => console.warn("onClose function not provided"),
  onSubmit: () => console.warn("onSubmit function not provided"),
  initialData: [],
};

export default CrewEffects;
