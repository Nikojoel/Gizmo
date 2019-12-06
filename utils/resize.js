'use strict';
const sharp = require('sharp');

const makeThumbnail = async (file,thumbname,size) => {
    await sharp(file).resize(size.width, size.height).png().toFile(thumbname);
};

module.exports = {
    makeThumbnail,
};