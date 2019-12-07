'use strict';

const imageFilter = (req, file, done) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return done(new Error('Only image files are allowed!'),false);
    }
    done(null, true);
};
module.exports= {
    imageFilter,
}