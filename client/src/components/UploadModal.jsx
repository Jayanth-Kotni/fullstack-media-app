import React, { useState } from 'react';
import './UploadModal.css';

const UploadModal = ({ onClose, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState('');

 const handleUpload = async () => {
  if (!file) return alert("Please select a file");

  const formData = new FormData();
  formData.append('file', file);
  formData.append('tags', tags);

  try {
    const res = await fetch('/api/upload/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      onUploadSuccess();
      onClose();
    } else {
      console.error('Upload failed:', data);
      alert(data.message || "Upload failed");
    }
  } catch (err) {
    console.error('Error uploading:', err);
    alert("Upload failed: " + err.message);
  }
};


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Upload File</h2>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="modal-input"
        />
        <input
          type="text"
          placeholder="Enter tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="modal-input"
        />
        <div className="modal-actions">
          <button className="modal-button upload" onClick={handleUpload}>Upload</button>
          <button className="modal-button cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
