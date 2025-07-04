// /src/utils/getFlagImage.js
const getFlagImage = (code) => {
    try {
        return require(`../assets/images/flags/${code}.png`);
    } catch {
        return require(`../assets/images/flags/zz.png`); // fallback
    }
};

export default getFlagImage;
