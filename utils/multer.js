'use strict';

// filter for images
const imageFilter = (req, file, done) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return done(new Error('Only image files are allowed!'),false);
    }
    done(null, true);
};
module.exports= {
    imageFilter,
}