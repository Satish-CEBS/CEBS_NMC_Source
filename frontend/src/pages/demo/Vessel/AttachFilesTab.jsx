import React from 'react';

const AttachFilesTab = ({ formData, setFormData }) => {
    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            documents: {
                ...prev.documents,
                [field]: file
            }
        }));
    };

    const renderFileInput = (label, field, required = false) => (
        <div className="form-group full-width">
            <label>
                {label} {required && <span className="required">*</span>}
            </label>
            <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(e, field)}
                required={required}
            />
            {formData?.documents?.[field] && (
                <p className="file-info">📎 {formData.documents[field].name}</p>
            )}
        </div>
    );

    return (
        <div className="vessel-tab">
            <p className="tab-instruction">
                Upload all required vessel documents in PDF or image format. Fields marked <span className="required">*</span> are mandatory.
            </p>

            <div className="form-grid-2">
                {renderFileInput('Certificate of Registry', 'registry_certificate', true)}
                {renderFileInput('Classification Certificate', 'classification_certificate', true)}
                {renderFileInput('Safety Management Certificate', 'safety_certificate', true)}
                {renderFileInput('Insurance Certificate (Hull)', 'hull_insurance', true)}
                {renderFileInput('Insurance Certificate (P&I)', 'pandi_insurance', true)}
                {renderFileInput('Load Line Certificate', 'load_line_certificate')}
                {renderFileInput('Stability Booklet', 'stability_booklet')}
                {renderFileInput('International Tonnage Certificate', 'tonnage_certificate')}
                {renderFileInput('ISM Document of Compliance', 'ism_doc')}
                {renderFileInput('ISPS Certificate', 'isps_certificate')}
                {renderFileInput('Other Relevant Documents', 'other_documents')}
            </div>
        </div>
    );
};

export default AttachFilesTab;
