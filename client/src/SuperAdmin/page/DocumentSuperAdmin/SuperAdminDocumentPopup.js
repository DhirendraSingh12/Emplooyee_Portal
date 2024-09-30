
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
import "./SuperAdminDocumentPopup.css"; // Import the CSS file
import { createSession } from "../../ApiServices";

const AddDocumentPopup = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
   
    documentName: "",
    uploadDate: "",
    uploaded: "",
    documentFile: null,
    Status: "PENDING",
  });
  const [errors, setErrors] = useState({});

  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));

    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        documentName: files[0].name,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AddDocumentValidation.validate(formData, { abortEarly: false });
      setErrors({});

      const formDataToSend = new FormData();
      formDataToSend.append("documentName", formData.documentName);
      formDataToSend.append("uploadDate", formData.uploadDate);
      formDataToSend.append("uploaded", formData.uploaded);
      formDataToSend.append("state", formData.Status);

      const response = await createSession(formDataToSend); // Use the API service

      console.log(response); // Check what data is being returned
      toast.success("Document sent successfully");
      onClose(); // Call the function to close the modal or reset form if needed
    } catch (err) {
      console.error("Error:", err);
      if (err.response) {
        const errorMessage = err.response.data.error || "An unexpected error occurred";
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
                Upload
              </MenuItem>
              <MenuItem value="Not Upload">
                <IconMapper
                  iconName="NotUploadIcon"
                  style={{ width: "25px", marginRight: "8px" }}
                />
                Not Upload
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
