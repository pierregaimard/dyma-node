const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/images"),
  filename: function (req, file, cb) {
    const fileExt = file.mimetype.split("/")[1];
    cb(null, `${req.user._id}.${fileExt}`);
  },
});

const fileFilter = (req, file, cb) => {
  const isValidType = ["image/jpeg", "image/jpg", "image/png"].includes(
    file.mimetype
  );
  return isValidType
    ? cb(null, true)
    : new Error("This file type is ont valid");
};

const limits = {
  fields: 0,
  fileSize: 1 * 1000 * 1000, // 1 Mo
  files: 1,
};

const upload = multer({
  storage,
  fileFilter,
  limits,
});

module.exports = upload;
