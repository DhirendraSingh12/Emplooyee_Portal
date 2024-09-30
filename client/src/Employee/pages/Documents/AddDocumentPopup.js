import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { AddDocumentValidation } from "../../../Utils/validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconMapper from "../../../components/IconMapper/IconMapper";
import "./AddDocumentPopup.css";
import { DocumentUpload } from "../../EmpApiServices";

const AddDocumentPopup = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    documentName: "",
    uploadDate: "",
    uploaded: "",
    documentFile: null,
    Status: "PENDING",
  });
  const [errors, setErrors] = useState({});
  const [dragging, setDragging] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
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
    const file = e.dataTransfer.files[0];

    // File type validation
    const validTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        documentFile:
          "Invalid file type. Please upload a PDF, JPEG, or PNG file.",
      }));
      setDragging(false);
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      documentFile: file,
    }));
    setDragging(false);
    setErrors((prevErrors) => ({ ...prevErrors, documentFile: null }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AddDocumentValidation.validate(formData, { abortEarly: false });
      setErrors({});
      
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("employeeId", formData.employeeId);
      formDataToSend.append("documentName", formData.documentName);
      formDataToSend.append("uploadDate", formData.uploadDate);
      formDataToSend.append("uploaded", formData.uploaded);
      formDataToSend.append("state", formData.Status);
      
      if (formData.documentFile) {
        formDataToSend.append("documentFile", formData.documentFile);
      }
      
      const response = await DocumentUpload(formDataToSend); // pass formDataToSend
      onClose();
      console.log(response.data);
      toast.success("Document sent successfully");
    } catch (err) {
      console.error("Error:", err);
      if (err.response) {
        const errorMessage =
          err.response.data.error || "An unexpected error occurred";
        toast.error(errorMessage);
      } else if (err.name === "ValidationError") {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
        toast.error("Please fill in the required fields.");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: "dialog" }}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add New Document</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            id="name"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            margin="dense"
            id="employeeId"
            name="employeeId"
            label="Employee ID"
            value={formData.employeeId}
            onChange={handleChange}
            error={Boolean(errors.employeeId)}
            helperText={errors.employeeId}
          />
          <TextField
            fullWidth
            margin="dense"
            id="documentName"
            name="documentName"
            label="Document Name"
            value={formData.documentName}
            onChange={handleChange}
            error={Boolean(errors.documentName)}
            helperText={errors.documentName}
          />
          <TextField
            fullWidth
            margin="dense"
            id="uploadDate"
            name="uploadDate"
            label="Upload Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.uploadDate}
            onChange={handleChange}
            error={Boolean(errors.uploadDate)}
            helperText={errors.uploadDate}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Uploaded</InputLabel>
            <Select
              id="uploaded"
              name="uploaded"
              label="Uploaded"
              value={formData.uploaded}
              onChange={handleChange}
            >
              <MenuItem value="Upload">
                <IconMapper
                  iconName="UploadIcon"
                  style={{ width: "25px", marginRight: "8px" }}
                />
              </MenuItem>
              <MenuItem value="Not Upload">
                <IconMapper
                  iconName="Close"
                  style={{ width: "25px", marginRight: "8px" }}
                />
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="dense"
            id="Status"
            name="Status"
            label="Status"
            type="text"
            InputLabelProps={{ shrink: true }}
            value={formData.Status}
            onChange={handleChange}
            error={Boolean(errors.Status)}
            helperText={errors.Status}
          />
          <div
            className={`dropzone ${dragging ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="icon-wrapper">
              <IconMapper style={{ width: "15%" }} iconName={"UploadFile"} />
            </div>
            <p>Drag and drop Files Here to Upload</p>
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

        <DialogActions>
          <div className="form-button-employee">
            <button
              type="button"
              onClick={onClose}
              className="cancel-button-employee"
            >
              Cancel
            </button>
            <button type="submit" className="save-button-employee">
              Save
            </button>
          </div>
        </DialogActions>
        <ToastContainer />
      </form>
    </Dialog>
  );
};

export default AddDocumentPopup;
