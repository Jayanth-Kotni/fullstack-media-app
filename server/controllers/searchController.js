const File = require('../models/File');

exports.searchFiles = async (req, res) => {
  try {
    const { query, sortBy = 'views' } = req.query;

    const searchRegex = new RegExp(query, 'i'); // case-insensitive regex

    const files = await File.find({
      $or: [
        { fileName: { $regex: searchRegex } },
        { tags: { $in: [searchRegex] } }
      ]
    }).sort(sortBy === 'date' ? { uploadedAt: -1 } : { views: -1 });

    res.status(200).json({ count: files.length, files });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
