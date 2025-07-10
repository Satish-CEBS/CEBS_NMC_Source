// File: parsePDFCargo.jsx
const parsePDFCargo = async (text) => {
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
  const cargoEntries = [];

  let current = {};
  let inTable = false;

  for (let line of lines) {
    if (line.toLowerCase().includes("b/l no") || line.toLowerCase().includes("bill of lading")) {
      inTable = true;
      continue;
    }

    if (inTable) {
      // Expect line in format: B/L, Marks, Description, HS Code, Weight, Volume
      const parts = line.split(/\s{2,}|\t+/); // Split by multiple spaces or tabs
      if (parts.length >= 4) {
        const [blNumber, marks, descriptionRaw, weight, volume] = parts;

        let hsCodeMatch = descriptionRaw.match(/\b\d{6,10}\b/); // HS code embedded
        let hsCode = hsCodeMatch ? hsCodeMatch[0] : '';

        cargoEntries.push({
          blNumber: blNumber || '',
          marks: marks || '',
          description: descriptionRaw.replace(hsCode, '').trim(),
          hsCode,
          weight: weight || '',
          volume: volume || ''
        });
      }
    }
  }

  return cargoEntries;
};

export default parsePDFCargo;
