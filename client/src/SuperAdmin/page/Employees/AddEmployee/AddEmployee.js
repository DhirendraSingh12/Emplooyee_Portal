import React, { useState } from "react";
import { TextField, MenuItem, Grid, Box } from "@mui/material";
import { addEmployeeValidation } from "../../../../Utils/validation";
import AddBulkEmployee from './AddBulkEmployee'
import {  useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddEmployee.css";
import { addEmployee } from "../../../ApiServices";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    mobile: "",
    password: "",
    designation: "",
    department: "",
    address: "",
    email: "",
    dob: "",
    education: "",
   
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleAddClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleFormSubmit = (data) => {
    console.log("Form Submitted", data);
    setIsPopupOpen(false);
  };  
  const handleCancel = () => {
    navigate("/superadmin/allemployees");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addEmployeeValidation.validate(formData, { abortEarly: false });
      setErrors({});
      const response = await addEmployee(formData);
      console.log(response);
      navigate("/superadmin/addemployee");
    } catch (err) {
      if (err.name === "ValidationError") {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
        toast.error("Please fill in the required fields.");
      }
    }
  };
  return (
    <Box className="AdminAdd-employee">
      <div className="file-uploaded-header">
        <h2 >Add Employee</h2>
        <div className={"Admindropzone"} onClick={handleAddClick}>
          <label htmlFor="pp" className="Adminuploadfilebutton">
            Upload Bulk File
          
          </label>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              label="First Name"
              variant="outlined"
              fullWidth
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              className="Add-TextField"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              label="Last Name"
              variant="outlined"
              fullWidth
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="gender"
              select
              label="Gender"
              variant="outlined"
              fullWidth
              value={formData.gender}
              onChange={handleChange}
              error={!!errors.gender}
              helperText={errors.gender}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="mobile"
              label="Mobile"
              variant="outlined"
              fullWidth
              value={formData.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              name="designation"
              label="Designation"
              variant="outlined"
              fullWidth
              value={formData.designation}
              onChange={handleChange}
              error={!!errors.designation}
              helperText={errors.designation}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="department"
              select
              label="Select Department"
              variant="outlined"
              fullWidth
              value={formData.department}
              onChange={handleChange}
              error={!!errors.department}
              helperText={errors.department}
            >
              <MenuItem value="hr">HR</MenuItem>
              <MenuItem value="engineering">Engineering</MenuItem>
              <MenuItem value="sales">Sales</MenuItem>
              <MenuItem value="marketing">Marketing</MenuItem>
            </TextField>
          </Grid>
          
          
          <Grid item xs={12} sm={6}>
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="address"
              label="Address"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="dob"
              label="Date of Birth"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.dob}
              onChange={handleChange}
              error={!!errors.dob}
              helperText={errors.dob}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="education"
              label="Education"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={formData.education}
              onChange={handleChange}
              error={!!errors.education}
              helperText={errors.education}
            />
          </Grid>
          <Grid container spacing={2} className="Admin-upload-container">
            <Grid item xs={6} className="Admin-upload-image-addemployee">
              <label htmlFor="upload-photo" className="Admin-upload-label">
                Upload Photo
              </label>
              <input type="file" id="upload-photo" className="field" />
            </Grid>
          </Grid>
          <div className="AdminAdd-button-employee">
            <button type="button"  onClick={handleCancel} className="Admin-cancel-button-employee">
              Cancel
            </button>
            <button type="submit" className="Admin-save-button-employee">
              Save
            </button>
          </div>
        </Grid>
      </form>
      <ToastContainer />
      <>
      <AddBulkEmployee
        open={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleFormSubmit}
      />
      </>
    </Box>
  );
};

export default AddEmployee;
