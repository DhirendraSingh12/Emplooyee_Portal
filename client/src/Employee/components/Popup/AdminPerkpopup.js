import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './AdminperkPopup.css';

const AdminPerkPopup = ({ open, onClose }) => {
    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    if (!open) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="popup-header">
                    <h2>Add New Perk</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="popup-body">
                    {/* Form or content for adding a new perk */}
                    <form>
                        <div className="form-group">
                            <label htmlFor="perkTitle">Title</label>
                            <input type="text" id="perkTitle" name="perkTitle" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="perkDescription">Description</label>
                            <textarea id="perkDescription" name="perkDescription"></textarea>
                        </div>
                        <div
                            {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                            <input {...getInputProps()} />
                            <label htmlFor="perkIcondrag">Icon Drag n Drop</label>
                            <div className="drag-drop-content">
                                <CloudUploadIcon style={{ fontSize: 50, cursor: 'pointer' }} />
                                <p>{isDragActive ? 'Drop the files here ...' : 'Drag & drop Icon here, or click to select files'}</p>
                            </div>
                        </div>
                        <div className="admin-perk-btn">
                            <button type="submit" className="admin-perk-submit-button">Add Perk</button>
                            <button type="button" className="admin-perk-cancel-btn" onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminPerkPopup;
