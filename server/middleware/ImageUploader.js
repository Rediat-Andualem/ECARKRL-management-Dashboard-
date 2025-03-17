import multer from 'multer';
import path from 'path';

// Function to create an image uploader with a specific directory
const createImageUploader = (directory) => {
    // Define storage settings for images
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, directory); 
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}_${file.originalname}`);
        }
    });

    // File checker to ensure only certain file types are allowed
    const fileChecker = function (req, file, cb) {
        if (
            file.mimetype !== 'image/jpeg' &&
            file.mimetype !== 'image/png' &&
            file.mimetype !== 'image/gif'
        ) {
            return cb(new Error('Only JPG, PNG, and GIF files are allowed'));
        }
        cb(null, true);
    };

    // Create multer instance with storage and file filter settings
    return multer({
        storage: storage,
        fileFilter: fileChecker
    });
};

export default createImageUploader;
