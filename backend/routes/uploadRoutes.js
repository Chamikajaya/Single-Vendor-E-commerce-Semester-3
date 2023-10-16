import path from 'path';
import express from 'express';
import multer from 'multer';
const router = express.Router();


// we want the storage to be in the uploads folder
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);  // file.fieldname = image, Date.now() = 2021-01-01, path.extname(file.originalname) = .jpg
    }
});

// check if the file is an image
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;  // regular expression (I will allow jpg, jpeg and png only)
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());  // check if the extension name is in the filetypes
    const mimetype = filetypes.test(file.mimetype);  // check if the mimetype is in the filetypes

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Only images of valid formats could be uploaded!');
    }
}

// upload the image
const upload = multer({
    storage,

});

router.post('/', upload.single('image'), (req, res) => {  // upload.single('image') = upload a single image, 'image' = the name of the field in the form
    res.send({
        message: 'Image uploaded',
        image: `/${req.file.path}`  // send the path of the image
    });  // send the path of the image
});

export default router;