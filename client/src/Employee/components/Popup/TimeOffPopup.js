import React from "react";
import "./Popup.css";

const TimeOffPopup = ({ open, message, onClose, actionLabel, onAction }) => {
    if (!open) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="popup-header">
                    <h2>Notification</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="popup-body">
                    <p>{message}</p>
                    <a href="">new notification</a>

                </div>
                <div className="form-actions">
                    {actionLabel && onAction && (
                        <button type="button" className="action-button" onClick={onAction}>
                            {actionLabel}
                        </button>
                    )}
                    <button type="button" className="close-button" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimeOffPopup;

