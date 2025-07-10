import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function parsePDFStores(file, onProgress) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const arrayBuffer = reader.result;
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const results = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const text = await page.getTextContent();
          const content = text.items.map(item => item.str).join(' ');
          const regex = /([A-Za-z0-9 &\(\)\-]+)\s+([\d,\.]+)\s+(Engine Room|Cold Storage Room|Water Tanks|Bonded Store|Deck Locker|Utility Locker|Food Storage Room|Infirmary)/gi;
          const matches = [...content.matchAll(regex)];
          matches.forEach(match => {
            results.push({
              item: match[1].trim(),
              quantity: match[2],
              location: match[3]
            });
          });
          if (onProgress) onProgress(Math.round((i / pdf.numPages) * 100));
        }
        resolve(results);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
