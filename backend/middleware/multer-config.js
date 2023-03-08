const multer = require('multer');

const path = require('path');

/* Save image */ 
module.exports = (req, res, next) => {
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'images');
        },
        filename: (req, file, callback) => {
            const name = file.originalname.split(' ').join('_').toLowerCase();
            callback(null, name);
        }
    });

    const fileFilter = function fileFilter(req, file, callback) {
        const fileTypes = /png|jpeg|jpg/;
        const extensionName = fileTypes.test(path.extname(file.originalname));
        const mimeType = fileTypes.test(file.mimetype);

        if (extensionName && mimeType) {
            callback(null, true);
        } else {
            callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE'));
        } 
    };

    multer({storage: storage, fileFilter: fileFilter}).single('image') (req, res, (error) => {
        if (error instanceof multer.MulterError) {
            next(error.message);
        } else {
            next(error);
        }
    })
}