const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');

const serviceAccount = require('../config/firebase-key.json');
const bucketName = process.env.BUCKET;

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: bucketName
});

const bucket = getStorage().bucket();

const uploadImage = async (req, res, next) => {
  if (!req.file) return next();

  const image = req.file;
  const filename = Date.now() + '--' + image.originalname.replace(" ", "-")

  const file = bucket.file("images/profiles/" + filename);

  const stream = file.createWriteStream({
    public: true,
    metadata: {
      contentType: image.mimetype,
    }
  })

  stream.on("error", (e) => {
    console.log(e)
  })

  stream.on("finish", async (e) => {
    req.file.url = `https://storage.googleapis.com/l-note-3634a.appspot.com/images/profiles/${filename}`
    next();
  })

  stream.end(image.buffer)
}

const uploadImages = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    res.status(400).json({ message: "Please insert some images!" });
  } else {
    let index;
    for (index = 0; index < req.files.length; index++) {
      const image = req.files[index];
      const filename = Date.now() + '--' + image.originalname.replace(" ", "-")

      const file = bucket.file("images/products/" + filename);

      const stream = file.createWriteStream({
        public: true,
        metadata: {
          contentType: image.mimetype,
        }
      })

      stream.on("error", (e) => {
        console.log(e)
      })

      stream.on("finish", (e) => {
      })

      stream.end(image.buffer)

      req.files[index].url = `https://storage.googleapis.com/l-note-3634a.appspot.com/images/products/${filename}`;
    }

    (index === req.files.length) ? next() : res.status(400).json({ message: "Something error!" });
  }

}

module.exports = { uploadImage, uploadImages };