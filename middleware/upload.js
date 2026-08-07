import multer from "multer";

// Configure file storage
const storage = multer.diskStorage({

  // Store uploaded files in public folder
  destination: (req, file, cb) => {
    cb(null, "public/");
  },

  // Generate unique file name
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },

});

// Upload a single image file
const fileUpload = multer({
  storage,
}).single("image");

export default fileUpload;
