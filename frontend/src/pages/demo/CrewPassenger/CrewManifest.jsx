import React, { useState } from 'react';
import Papa from 'papaparse';
import PageWrapper from '../layout/PageWrapper';
import './CrewManifest.css';

const CrewManifest = () => {
    const [file, setFile] = useState(null);
    const [crewData, setCrewData] = useState([]);

    const handleUpload = () => {
        if (!file) return alert('Upload a CSV file');
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => setCrewData(result.data)
        });
    };

    return (
        <PageWrapper title="Crew Manifest Upload">
            <div className="crew-manifest">
                <input type="file" accept=".csv" onChange={e => setFile(e.target.files[0])} />
                <button onClick={handleUpload}>Parse & View</button>
                {crewData.length > 0 && (
                    <table>
                        <thead>
                            <tr>{Object.keys(crewData[0]).map(col => <th key={col}>{col}</th>)}</tr>
                        </thead>
                        <tbody>
                            {crewData.map((row, i) => (
                                <tr key={i}>{Object.values(row).map((v, j) => <td key={j}>{v}</td>)}</tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </PageWrapper>
    );
};

export default CrewManifest;