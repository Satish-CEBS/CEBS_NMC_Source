import React, { useState } from 'react';
import PageWrapper from '../layout/PageWrapper';
import './StowageInstruction.css';

const StowageInstruction = () => {
    const [instruction, setInstruction] = useState('');

    const submitInstruction = () => {
        if (!instruction) return alert('Instruction required');
        console.log('Instruction submitted:', instruction);
    };

    return (
        <PageWrapper title="Stowage Instruction">
            <div className="stowage-instruction">
                <textarea value={instruction} onChange={e => setInstruction(e.target.value)} rows={6} placeholder="Enter stowage instructions" />
                <button onClick={submitInstruction}>Submit</button>
            </div>
        </PageWrapper>
    );
};

export default StowageInstruction;