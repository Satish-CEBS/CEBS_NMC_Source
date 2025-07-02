import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToPDF = (title, data) => {
    const doc = new jsPDF();
    doc.text(title, 14, 16);
    autoTable(doc, {
        startY: 20,
        head: [Object.keys(data[0])],
        body: data.map(row => Object.values(row)),
    });
    doc.save(`${title}.pdf`);
};

export const exportToCSV = (title, data) => {
    const csv = [Object.keys(data[0]).join(',')];
    data.forEach(row => {
        csv.push(Object.values(row).join(','));
    });
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.csv`;
    a.click();
};
