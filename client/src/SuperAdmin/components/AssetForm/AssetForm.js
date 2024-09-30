import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { AssetsValidation } from "../../../Utils/validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AssetForm.css";
import { addAsset, updateAsset } from "../../ApiServices"; 

const AssestAdmin = ({ open, onClose, asset,fetchData }) => {
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    assetType: "",
    dateGiven: getCurrentDate(),
    estimatedValue: "",
    serialNumber: "",
    insuranceDetails: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (asset) {
      setFormData({
        employeeId: asset.employeeId || "",
        employeeName: asset.employeeName || "",
        assetType: asset.assetType || "",
        dateGiven: asset.dateGiven || getCurrentDate(),
        estimatedValue: asset.estimatedValue || "",
        serialNumber: asset.serialNumber || "",
        insuranceDetails: asset.insuranceDetails || "",
      });
    } else {
      setFormData({
        employeeId: "",
        employeeName: "",
        assetType: "",
        dateGiven: getCurrentDate(),
        estimatedValue: "",
        serialNumber: "",
        insuranceDetails: "",
      });
    }
  }, [asset, open]);  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AssetsValidation.validate(formData, { abortEarly: false });
      setErrors({});

      const formDataToSend = new FormData();
      formDataToSend.append("employeeId", formData.employeeId);
      formDataToSend.append("employeeName", formData.employeeName);
      formDataToSend.append("assetType", formData.assetType);
      formDataToSend.append("dateGiven", formData.dateGiven);
      formDataToSend.append("estimatedValue", formData.estimatedValue);
      formDataToSend.append("serialNumber", formData.serialNumber);
      formDataToSend.append("insuranceDetails", formData.insuranceDetails);

      if (asset) {
        await updateAsset(asset.assetId, formDataToSend);
        toast.success("Asset updated successfully!");
      } else {
        await addAsset(formDataToSend);
        toast.success("Asset added successfully!");
      }

      onClose(); 
      await fetchData(); 
    } catch (err) {
      if (err.name === "ValidationError") {
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
      <div className="AssestForm-Container">
        <form onSubmit={handleSubmit}>
          <DialogTitle>{asset ? "Edit Asset" : "Add Asset"}</DialogTitle>
          <DialogContent>
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
              id="employeeName"
              name="employeeName"
              label="employee Name"
              value={formData.employeeName}
              onChange={handleChange}
              error={Boolean(errors.employeeName)}
              helperText={errors.employeeName}
            />
            <TextField
              fullWidth
              margin="dense"
              id="assetType"
              name="assetType"
              label="Asset Type"
              value={formData.assetType}
              onChange={handleChange}
              error={Boolean(errors.assetType)}
              helperText={errors.assetType}
            />
            <TextField
              fullWidth
              margin="dense"
              id="dateGiven"
              name="dateGiven"
              type="date"
              value={formData.dateGiven}
              onChange={handleChange}
              error={Boolean(errors.dateGiven)}
              helperText={errors.dateGiven}
            />
            <TextField
              fullWidth
              margin="dense"
              id="estimatedValue"
              name="estimatedValue"
              label="Estimated Value"
              value={formData.estimatedValue}
              onChange={handleChange}
              error={Boolean(errors.estimatedValue)}
              helperText={errors.estimatedValue}
            />
            <TextField
              fullWidth
              margin="dense"
              id="serialNumber"
              name="serialNumber"
              label="Serial Number"
              type="text"
              value={formData.serialNumber}
              onChange={handleChange}
              error={Boolean(errors.serialNumber)}
              helperText={errors.serialNumber}
            />
            <TextField
              fullWidth
              margin="dense"
              id="insuranceDetails"
              name="insuranceDetails"
              label="Insurance Details"
              value={formData.insuranceDetails}
              onChange={handleChange}
              error={Boolean(errors.insuranceDetails)}
              helperText={errors.insuranceDetails}
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
      </div>
    </Dialog>
  );
};

export default AssestAdmin;
