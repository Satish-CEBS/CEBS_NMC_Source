// File: parsePDFStores.jsx
const parsePDFStores = async (text) => {
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
  const storeEntries = [];

  let startIndex = lines.findIndex(line => line.toLowerCase().includes("item")) + 1;

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i];

    // Try format: Item | Quantity | Location
    const parts = line.split(/\s{2,}|\t+/);
    if (parts.length >= 3) {
      const [item, quantity, ...locationParts] = parts;
      const location = locationParts.join(' ');
      storeEntries.push({
        item: item.trim(),
        quantity: quantity.trim(),
        location: location.trim()
      });
    }
  }

  return storeEntries;
};

export default parsePDFStores;
