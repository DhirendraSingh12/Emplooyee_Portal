import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { AddDocumentValidation } from "../../../../Utils/validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconMapper from "../../../../components/IconMapper/IconMapper";
import "./AddBulkEmployee.css"; // Import the CSS file
import { addBulkEmployees } from "../../../ApiServices";

const AddDocumentPopup = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    documentFile: null,
    Status: "PENDING",
  });
  const [errors, setErrors] = useState({});
  const [dragging, setDragging] = useState(false);

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const validateAndSetFile = async (file) => {
    const validTypes = ["text/csv", "application/vnd.ms-excel"];
    if (!validTypes.includes(file.type)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        documentFile: "Invalid file type. Please upload a CSV file.",
      }));
      return;
    }

    try {
      const base64File = await convertFileToBase64(file);
      setFormData((prevData) => ({
        ...prevData,
        documentFile: base64File,
        documentName: file.name,
      }));
      setErrors((prevErrors) => ({ ...prevErrors, documentFile: null }));
    } catch (error) {
      console.error("File conversion error:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        documentFile: "Error converting file to Base64.",
      }));
    }
  };

  const handleChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      validateAndSetFile(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AddDocumentValidation.validate(formData, { abortEarly: false });
      setErrors({});

      const formDataToSend = new FormData();
      formDataToSend.append("documentName", formData.documentName);
      formDataToSend.append("Status", formData.Status);
      formDataToSend.append("documentFile", formData.documentFile);
      const response = await addBulkEmployees(formDataToSend);
      onClose();
      console.log(response.data); // Check what data is being returned
      toast.success("Document sent successfully");
    } catch (err) {
      console.error("Error:", err);
      if (err.name === "ValidationError") {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
        toast.error("Please fill in the required fields.");
      } else {
        const errorMessage =
          err.response?.data?.error || "An unexpected error occurred";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <Dialog open={open} classes={{ paper: "dialog" }}>
      <form onSubmit={handleSubmit}>
        <div className="UploadBulkImployess">
        <DialogTitle>Upload Bulk Employee</DialogTitle>
        <IconMapper onClick={onClose} className='UploadIconBulk' iconName={'close'} isFontAwesome={true}/>
        </div>
        <DialogContent>
          <div
            className={`dropzone ${dragging ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="icon-wrapper">
              <IconMapper style={{ width: "15%" }} iconName={"UploadFile"} />
            </div>
            <p>Upload Only CSV Mandatory File</p>
            <label htmlFor="file-upload" className="uploadfilebutton">
              Upload File
              <input
                id="file-upload"
                type="file"
                name="documentFile"
                onChange={handleChange}
                style={{ display: "none" }} // Hide the actual input element
              />
            </label>
          </div>

          {errors.documentFile && (
            <div style={{ color: "red" }}>{errors.documentFile}</div>
          )}
        </DialogContent>
      </form>
      <ToastContainer/>
    </Dialog>
  );
};

export default AddDocumentPopup;
