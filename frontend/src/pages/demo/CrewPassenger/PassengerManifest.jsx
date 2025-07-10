import React, { useState } from 'react';
import Papa from 'papaparse';
import PageWrapper from '../layout/PageWrapper';
import './PassengerManifest.css';

const PassengerManifest = () => {
    const [file, setFile] = useState(null);
    const [paxData, setPaxData] = useState([]);

    const handleUpload = () => {
        if (!file) return alert('Upload a CSV file');
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => setPaxData(result.data)
        });
    };

    return (
        <PageWrapper title="Passenger Manifest Upload">
            <div className="passenger-manifest">
                <input type="file" accept=".csv" onChange={e => setFile(e.target.files[0])} />
                <button onClick={handleUpload}>Parse & View</button>
                {paxData.length > 0 && (
                    <table>
                        <thead>
                            <tr>{Object.keys(paxData[0]).map(col => <th key={col}>{col}</th>)}</tr>
                        </thead>
                        <tbody>
                            {paxData.map((row, i) => (
                                <tr key={i}>{Object.values(row).map((v, j) => <td key={j}>{v}</td>)}</tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </PageWrapper>
    );
};

export default PassengerManifest;
