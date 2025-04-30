const cloudinary = require('../cloudinary/config');

const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'File nahi mila' });
    }
    const maxSize = 10 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      return res.status(400).json({ message: 'File size 2MB se zyada hai' });
    }
    const allowedTypes = [ 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ message: 'File type allowed nahi hai' });
    }
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: 'image',
        folder: 'mypancard', // Specify your folder name here
        public_id: file.originalname, // Use original name to avoid overwriting
       },
      (error, result) => {
        if (error) return res.status(500).json({ error });
        return res.status(200).json({ result });
      }
    );

    result.end(file.buffer); // Send buffer to stream
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { uploadImage };
