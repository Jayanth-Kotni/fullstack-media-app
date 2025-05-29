const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  url:       { type: String, required: true },
  fileType:  { type: String, required: true },
  fileName:  { type: String, required: true },
  size:      { type: Number, required: true },
  tags:      { type: [String], default: [] },
  views:     { type: Number, default: 0 },
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  uploadedAt:{ type: Date, default: Date.now },
});

module.exports = mongoose.model('File', fileSchema);
