const multer = require("multer");
const path = require("path");

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir = "";
    if (req.baseUrl.includes("teachers")) {
      dir = "upload_teacher";
    } else if (req.baseUrl.includes("student")) {
      dir = "upload_student";
    } else if (req.baseUrl.includes("parents")) {
      dir = "upload_parent";
    }
    cb(null, path.join(__dirname, `../assets/${dir}`)); // Upload to the appropriate folder
  }, // Upload to 'upload_teacher' folder

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for unique filenames
  },
});

// File filter to accept specific file types
const fileFilter = (req, file, cb) => {
  console.log("Uploaded file MIME type:", file.mimetype);
  const allowedTypes = [
    "image/jpeg", // JPG
    "image/jpg", // JPG

    "image/png", // PNG
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPG and PNG are allowed."), false);
  }
};

// Set up multer middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
});

module.exports = upload;
