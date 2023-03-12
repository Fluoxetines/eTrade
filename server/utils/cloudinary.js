const cloudinary = require("cloudinary");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadController = {
  uploadAvatar: async (req, res) => {
    try {
      const file = req.file;

      cloudinary.v2.uploader.upload(
        file.path,
        {
          folder: "eTrade/avatar",
          width: 150,
          height: 150,
          crop: "fill",
        },
        (err, result) => {
          if (err) throw err;
          fs.unlinkSync(file.path);
          res.status(200).json({
            message: "uploaded successfully.",
            url: result.secure_url,
          });
        }
      );
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = uploadController;
