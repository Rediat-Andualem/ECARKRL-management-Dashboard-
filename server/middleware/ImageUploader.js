import multer from 'multer';
import path from 'path';

// Function to create uploader for images + PDFs
const createUploader = (directory) => {
 
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, directory);
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}_${file.originalname}`);
        }
    });

    const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/pdf'
    ];

    const fileChecker = function (req, file, cb) {
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(new Error('Only JPG, PNG, GIF and PDF files are allowed'));
        }
        cb(null, true);
    };



    return multer({
        storage: storage,
        fileFilter: fileChecker
    });

   
};

export default createUploader;
