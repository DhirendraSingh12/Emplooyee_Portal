import React, { useState, useCallback } from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { leaveRequestValidation } from "../../Utils/validation";

const AdminCompanyPoliciespopup = ({ open, onClose, onSubmit }) => {
    const [uploadDate, setUploadDate] = useState('');

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(leaveRequestValidation),
    });

    const onDrop = useCallback(acceptedFiles => {
        // Handle file upload
        console.log(acceptedFiles);
        const currentDate = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        setUploadDate(currentDate);
        setValue("Expense Date", currentDate); // Update the form value for "Expense Date"
    }, [setValue]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    if (!open) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="popup-header">
                    <h2>Company Policy</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-5 popupfrom">
                        <Controller
                            name="Expense Date"
                            control={control}
                            defaultValue={uploadDate}
                            render={({ field }) => (
                                <div className="form-group">
                                    <label htmlFor="fromDate">Upload Date</label>
                                    <input
                                        {...field}
                                        type="date"
                                        placeholder="Apply Date"
                                        className={errors.fromDate ? "input-error" : ""}
                                    />
                                    <span className="error-message">
                                        {errors.fromDate?.message}
                                    </span>
                                </div>
                            )}
                        />
                    </div>
                    <div className="file-uploaded">
                        <Controller
                            name="Receipt"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <div className="form-group">
                                    <label htmlFor="fromDate">Upload Policies</label>
                                    <div className="receipt-box">
                                        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                                            <input {...getInputProps()} />
                                            <CloudUploadIcon style={{ fontSize: 50, cursor: 'pointer' }} />
                                            {isDragActive ? (
                                                <p>Drop the files here ...</p>
                                            ) : <></>}
                                        </div>
                                    </div>
                                    <span className="error-message">{errors.type?.message}</span>
                                    <h3 style={{ textAlign: 'center', fontWeight: '500' }}>Drag 'n' drop files here</h3>
                                </div>
                            )}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="save-button">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminCompanyPoliciespopup;
