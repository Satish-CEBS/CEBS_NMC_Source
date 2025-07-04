import React from 'react';
import './StepperControls.css';
import { ArrowForwardIos, ArrowBackIos, Save } from '@mui/icons-material';
import { triggerBackendDraft } from '../../../utils/prearrivalHelpers'; // ✅ Use helper

const StepperControls = ({
    step,
    goToStep,
    formData,
    setValidationErrors,
    saveDraft,
    submitFinal,
    setFormData
}) => {
    const handleNext = () => {
        const errors = {};

        // Step 1 validations
        if (step === 1) {
            if (!formData.vessel_id) errors.vessel_id = true;
            if (!formData.voyage_number || formData.voyage_number.trim() === '') {
                errors.voyage_number = true;
            }
        }

        // Step 2 validations
        if (step === 2) {
            if (!formData.last_port_id) errors.last_port_id = true;
            if (!formData.next_port_id) errors.next_port_id = true;
            if (!formData.eta) errors.eta = true;
            if (!formData.purpose_id) errors.purpose_id = true;
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        setValidationErrors({});
        goToStep('next'); // ✅ Original working navigation
    };

    const handleBack = () => {
        goToStep('back');
    };

    const handleSubmit = async () => {
        console.log('🚀 Submitting final with formData:', formData);

        if (formData.portCallId) {
            submitFinal(formData.portCallId);
        } else {
            try {
                const draftId = await triggerBackendDraft(formData, setFormData);
                if (draftId) {
                    submitFinal(draftId);
                } else {
                    alert('❌ Draft creation failed.');
                }
            } catch (err) {
                console.error('❌ Submission error:', err);
                alert('❌ Could not submit. Try again.');
            }
        }
    };

    return (
        <div className="stepper-controls">
            {step > 1 && (
                <button className="stepper-btn back-btn" onClick={handleBack}>
                    <ArrowBackIos fontSize="small" /> Back
                </button>
            )}

            {step < 5 && (
                <>
                    <button className="stepper-btn draft-button" onClick={saveDraft}>
                        <Save fontSize="small" /> Save Draft
                    </button>
                    <button className="stepper-btn next-btn" onClick={handleNext}>
                        Next <ArrowForwardIos fontSize="small" />
                    </button>
                </>
            )}

            {step === 5 && (
                <button className="stepper-btn submit-button" onClick={handleSubmit}>
                    Submit Pre-arrival
                </button>
            )}
        </div>
    );
};

export default StepperControls;
