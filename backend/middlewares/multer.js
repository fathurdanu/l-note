const path = require('path');
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: function (req, file, cb) {
        if (!file) { cb(null, true) };
        (file.mimetype.includes("image")) ? cb(null, true) : cb(Error("Image only"), false)
    }
})


module.exports = upload