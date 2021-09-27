const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can uplod only image files!'), false);
    }
    cb(null, true);
}

const upload = multer({storage: storage, 
    fileFilter: imageFileFilter});

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.get(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('get operation not allowed for image upload');
})
.post(authenticate.verifyUser, upload.single('imageFile'), (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file)
})
.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('put operation not allowed for image upload');
})
.delete(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('delete operation not allowed for image upload');
})

module.exports = uploadRouter;