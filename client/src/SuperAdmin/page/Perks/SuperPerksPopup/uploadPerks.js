import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Close } from "@mui/icons-material";
import { AddPerksValidations } from "../../../../Utils/validation";
import "./uploadPerks.css";
import IconMapper from "../../../../components/IconMapper/IconMapper";
import { addPerk } from "../../../ApiServices";

const UploadPopup = ({ isOpen, onClose, onSubmit, fetchData}) => {
  const [formdata, setFormData] = useState({
    image: null,
    perkName: "",
    perkType: "",
    description: "",
    url: "",
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setFormData({ ...formdata, image: e.target.files[0] });
      console.log("Selected image:", e.target.files[0]); 
    } else {
      setFormData({ ...formdata, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AddPerksValidations.validate(formdata, { abortEarly: false });
      setErrors({});
            const formDataToSend = new FormData();
      formDataToSend.append("image", formdata.image);
      formDataToSend.append("perkName", formdata.perkName);
      formDataToSend.append("description", formdata.description);
      formDataToSend.append("url", formdata.url);
      formDataToSend.append("perkType", formdata.perkType);
      const response = await addPerk(formDataToSend);
      console.log("Perks added successfully:", response);
      toast.success(response.message);
      onSubmit(); 
     await fetchData();
    } catch (err) {
     
       if (err.name === "ValidationError") {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
        toast.error("Please fill in the following");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };


  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <div className="upload-popup-header">
          <Typography variant="h6">Upload Image and Details</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers >
        <form onSubmit={handleSubmit}>
          <div className="upload-popup-content">
            <div className="dropzone">
              <div className="icon-wrapper">
                <IconMapper style={{ width: "15%" }} className="uploadfilecolor" iconName={"UploadFile"} />
              </div>
              <p> Image Here to Upload</p>
              <label htmlFor="upload-button-file" className="uploadfilebutton">
                Upload Image
                <input
                  id="upload-button-file"
                  type="file"
                  name="image"
                  onChange={handleChange}
                />
              </label>
            </div>
            {errors.image && (
              <Typography color="error">{errors.image}</Typography>
            )}
            <TextField
              label="perkName"
              variant="outlined"
              fullWidth
              name="perkName"
              value={formdata.perkName}
              onChange={handleChange}
              error={!!errors.perkName}
              helperText={errors.perkName}
              margin="normal"
            />
            <TextField
              label="Url"
              variant="outlined"
              fullWidth
              multiline
              name="url"
              value={formdata.url}
              onChange={handleChange}
              error={!!errors.url}
              helperText={errors.url}
              margin="normal"
            />
            {/* <TextField
              label="Color" // New field for color
              variant="outlined"
              fullWidth
              name="color"
              type="text"
              value={formdata.color}
              onChange={handleChange}
              error={!!errors.color}
              helperText={errors.color}
              margin="normal"
            /> */}
             <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>perkType</InputLabel>
              <Select
                label="perkType" // Associate the label with the Select
                name="perkType"
                value={formdata.perkType}
                onChange={handleChange}
                error={!!errors.perkType}
              >
                <MenuItem value="Internal">Internal</MenuItem>
                <MenuItem value="External">External</MenuItem>
              </Select>
              {errors.perkType && (
                <Typography color="error">{errors.perkType}</Typography>
              )}
            </FormControl>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              name="description"
              value={formdata.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
              margin="normal"
            />
           
          </div>
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
        </form>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
};

export default UploadPopup;

