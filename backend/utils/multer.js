const multerUploads = (multer) => {
  return multer({
    dest: "uploads/",
  }).array("pictures", 3);
};

module.exports = multerUploads;
