// File: rulesConfig.js

const rulesConfig = [
  { key: 'fal1', label: 'FAL Form 1 – General Declaration', required: true },
  { key: 'fal2', label: 'FAL Form 2 – Cargo Declaration', required: true },
  { key: 'fal3', label: 'FAL Form 3 – Ship Stores', required: true },
  { key: 'fal4', label: 'FAL Form 4 – Crew Effects', required: true },
  { key: 'fal5', label: 'FAL Form 5 – Crew List', required: true },
  {
    key: 'fal6',
    label: 'FAL Form 6 – Passenger List',
    requiredIf: (data) => parseInt(data?.step1?.passengerCount || '0') > 0
  },
  { key: 'fal7', label: 'FAL Form 7 – Dangerous Goods', required: true },
  { key: 'mdhUpload', label: 'Maritime Declaration of Health (MDH)', required: true },
  { key: 'ssrCertificate', label: 'Ship Security Registration (SSR)', required: true },
  { key: 'isscCertificate', label: 'ISSC Certificate', required: true },
  {
    key: 'dosAgreement',
    label: 'Declaration of Security (DoS)',
    requiredIf: (data) => data?.step1?.ispsLevel >= 2
  }
];

export default rulesConfig;
