import React from "react";
import "./Modal.css"; // Create a simple CSS file for modal styling

const TimeOffModal = ({ isOpen, onClose, doc, handleApprove, handleReject }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Time Off Request</h2>
        <p><strong>Reason:</strong> {doc.reason}</p>
        <div className="modal-buttons">
          <button onClick={() => handleApprove(doc.leaveId)}>Approve</button>
          <button onClick={() => handleReject(doc.leaveId)}>Reject</button>
        </div>
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TimeOffModal;
