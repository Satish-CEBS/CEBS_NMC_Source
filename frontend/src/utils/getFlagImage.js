// /src/utils/getFlagImage.js

const country3to2 = {
    ARE: 'ae', BHS: 'bs', PAN: 'pa', DNK: 'dk', LBR: 'lr', USA: 'us', GBR: 'gb', ITA: 'it',
    SGP: 'sg', KOR: 'kr', CHN: 'cn', BRA: 'br', MNE: 'me', FRA: 'fr', HKG: 'hk', IND: 'in',
    JPN: 'jp', SAU: 'sa', NLD: 'nl', DEU: 'de', ESP: 'es', PRT: 'pt', TUR: 'tr', GRC: 'gr',
    POL: 'pl', UKR: 'ua', RUS: 'ru', ZAF: 'za', OMN: 'om', QAT: 'qa', BHR: 'bh', KWT: 'kw',
    IRN: 'ir', IRQ: 'iq', YEM: 'ye', PAK: 'pk'
};

const importAllFlags = (r) => {
    let flags = {};
    r.keys().forEach((key) => {
        const code = key.replace('./', '').replace('.png', '').toLowerCase();
        flags[code] = r(key);
    });
    return flags;
};

const flagMap = importAllFlags(require.context('../assets/images/flags', false, /\.png$/));

const getFlagImage = (countryCode3) => {
    if (!countryCode3) return flagMap['default'];
    const code2 = country3to2[countryCode3.toUpperCase()] || countryCode3.toLowerCase();
    return flagMap[code2] || flagMap['default'];
};

export default getFlagImage;
