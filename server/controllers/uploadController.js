const File = require('../models/File');
const { cloudinary } = require('../config/cloudinary'); // 🔥 This was missing


exports.uploadFile = async (req, res) => {
  try {
    const { originalname, mimetype, size, path } = req.file;
    const tags = req.body.tags?.split(',') || [];

    const file = new File({
      url: req.file.path,
      fileType: mimetype,
      fileName: originalname,
      size,
      tags,
      userId: req.userId,
    });

    await file.save();
    res.status(201).json({ message: 'File uploaded successfully', file });
    console.log(req.file); // Check what properties you have exactly

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteFile = async (req, res) => {
  try {
    console.log('DELETE Request for:', req.params.id, 'by user:', req.userId);
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });

    if (file.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Extract publicId
    const urlParts = file.url.split('/');
    const filenameWithExt = urlParts[urlParts.length - 1];
    const publicId = filenameWithExt.substring(0, filenameWithExt.lastIndexOf('.'));
    const fullPublicId = `uploads/${publicId}`;

    // Correct resource type mapping
    const mime = file.fileType;
    let resourceType = 'raw'; // fallback

    if (mime.startsWith('image/')) resourceType = 'image';
    else if (mime.startsWith('video/')) resourceType = 'video';
    else if (mime.startsWith('audio/')) resourceType = 'video'; // Cloudinary treats audio as video
    else if (mime === 'application/pdf') resourceType = 'raw';

    console.log('Cloudinary delete publicId:', fullPublicId);
    console.log('Resource type:', resourceType);

    const result = await cloudinary.uploader.destroy(fullPublicId, {
      resource_type: resourceType,
    });

    console.log('Cloudinary response:', result);

    await file.deleteOne();
    console.log('File deleted from MongoDB');
    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: err.message });
  }
};
exports.incrementView = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });

    file.views += 1;
    await file.save();

    res.json({ message: 'View count updated', views: file.views });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




