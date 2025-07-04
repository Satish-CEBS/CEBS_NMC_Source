// prearrivalHelpers.js
export const triggerBackendDraft = async (formData, setFormData) => {
    console.log('📤 Attempting draft creation with formData:', formData);

    try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/prearrival/create-draft`, {
            method: 'POST',
            body: createFormData(formData)
        });

        if (!res.ok) throw new Error(`❌ Server returned ${res.status}`);
        const data = await res.json();

        const cleanedId = typeof data.portCallId === 'object'
            ? data.portCallId?.port_call_id
            : data.portCallId;

        console.log('✅ Draft saved with ID:', cleanedId);
        setFormData(prev => ({ ...prev, portCallId: cleanedId }));
        return cleanedId;
    } catch (err) {
        console.error('❌ Error submitting draft:', err);
        alert('Failed to save draft');
        return null;
    }
};

const createFormData = (data) => {
    const formData = new FormData();
    formData.append('shipId', data.vessel_id);
    formData.append('voyageNumber', data.voyage_number);
    formData.append('flag', data.flag);
    formData.append('callSign', data.call_sign);
    formData.append('grossTonnage', data.gross_tonnage);
    formData.append('portOfArrival', data.location_id);
    formData.append('terminal', data.terminal_id);
    formData.append('berth', data.berth_id);
    formData.append('agent', data.agent_id);
    formData.append('eta', data.eta);
    formData.append('etd', data.etd);
    formData.append('services', JSON.stringify(data.services || []));

    if (data.prearrival_checklist) {
        formData.append('checklist', data.prearrival_checklist);
    }
    if (data.security_certificate) {
        formData.append('securityCert', data.security_certificate);
    }

    return formData;
};
