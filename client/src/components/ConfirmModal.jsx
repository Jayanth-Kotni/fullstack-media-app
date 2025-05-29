import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{message}</h3>
        <div className="modal-actions">
          <button className="modal-button confirm" onClick={onConfirm}>Yes</button>
          <button className="modal-button cancel" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
