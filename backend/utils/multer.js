const multerUploads = (multer) => {
  // const storage = multer.memoryStorage();
  return multer({
    dest: "uploads/",
    limits: { fileSize: 10000000 },
  }).array("pictures", 3);
};

module.exports = multerUploads;
