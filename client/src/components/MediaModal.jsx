import React from 'react';
import './MediaModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const MediaModal = ({ file, onClose }) => {
  if (!file) return null;

  const renderMedia = () => {
    if (file.fileType.startsWith('image')) {
      return <img src={file.url} alt={file.fileName} className="modal-image" />;
    } else if (file.fileType.startsWith('video')) {
      return (
        <video controls className="modal-video">
          <source src={file.url} type={file.fileType} />
          Your browser does not support the video tag.
        </video>
      );
    } else if (file.fileType === 'application/pdf') {
      return (
        <iframe src={file.url} title="PDF Viewer" className="modal-pdf" />
      );
    }
    return <p>Unsupported file type</p>;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="media-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        {renderMedia()}
        <p className="modal-filename">{file.fileName}</p>
        <p className="modal-views">👁️ Views: {file.views}</p>
      </div>
    </div>
  );
};

export default MediaModal;
