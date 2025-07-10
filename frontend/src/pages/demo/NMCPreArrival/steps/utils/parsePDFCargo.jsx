import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function parsePDFCargo(file, onProgress) {
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
          const regex = /B\/L No\.\:\s*([\w\d\-']+)\s*\|\s*Marks\:\s*([\w\-']+)\s*\|\s*Goods\:\s*(.*?)\(HS:\s*(\d+)\)\s*\|\s*Weight\:\s*([\d\.]+)\s*kg\s*\|\s*Volume\:\s*([\d\.]+)\s*m³/gi;
          const matches = [...content.matchAll(regex)];
          matches.forEach(match => {
            results.push({
              blNumber: match[1],
              marks: match[2],
              goods: match[3].trim(),
              hsCode: match[4],
              weight: match[5],
              volume: match[6]
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
