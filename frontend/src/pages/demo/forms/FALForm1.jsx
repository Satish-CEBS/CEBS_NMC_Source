import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PageWrapper from '../layout/PageWrapper';
import './FALForm1.css';

const FALForm1 = () => {
    const [form, setForm] = useState({ shipName: '', imoNumber: '', callSign: '', voyageNumber: '', port: '', arrivalDateTime: '', master: '' });
    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('FAL Form 1 - General Declaration', 14, 10);
        doc.autoTable({ head: [['Field', 'Value']], body: Object.entries(form) });
        doc.save(`FAL_Form1_${form.shipName}.pdf`);
    };

    return (
        <PageWrapper title="FAL Form 1 – General Declaration">
            <div className="fal-form1">
                {Object.entries(form).map(([k, v]) => (
                    <div key={k}>
                        <label>{k}</label>
                        <input name={k} value={v} onChange={handleChange} />
                    </div>
                ))}
                <button onClick={generatePDF}>Export PDF</button>
            </div>
        </PageWrapper>
    );
};

export default FALForm1;