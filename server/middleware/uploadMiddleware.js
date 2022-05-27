
const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    console.log(file)
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-any-name-${file.originalname}`;
      return filename;
    }
    console.log(req.body)
    req.body['screenshot'] = {
      bucketName: "photos",
      filename: `${Date.now()}-any-name-${file.originalname}`,
    };
    console.log(req.body)

    return {
      bucketName: "photos",
      filename: `${Date.now()}-any-name-${file.originalname}`,
    };
  },
});

const upload = multer({ storage })

module.exports = { upload };