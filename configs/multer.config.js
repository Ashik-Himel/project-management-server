const multer = require('multer');
const path = require('path');
const { ObjectId } = require('mongodb');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const uniqueSuffix = new ObjectId().toString();
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    cb(null, uniqueSuffix + extension);
  },
});

const upload = multer({ storage });

module.exports = {
  upload,
};
