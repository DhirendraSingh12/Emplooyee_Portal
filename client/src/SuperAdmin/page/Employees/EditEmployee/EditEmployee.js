import React, { useState, useEffect } from "react";
import {
  editEmployeeValidation,
} from "../../../../Utils/validation";
import { useParams } from "react-router-dom";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditEmployee.css";
import { editEmployee, fetchEmployeeById } from "../../../ApiServices";
import { useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    employeeName: "",
    gender: "",
    mobile: "",
    department: "",
    address: "",
    email: "",
    dob: "",
    education: "",
  });
  
  const { employeeId } = useParams(); 
  const [errors, setErrors] = useState({});
  
  const fetchEmployee = async (employeeId) => {
    if (!employeeId) {
      console.error("Employee ID is missing.");
      return;
    }
    try {
      const employeeData = await fetchEmployeeById(employeeId);
      console.log(employeeData); // Check API response
      
      const normalizedGender = employeeData.gender.toLowerCase();
      const normalizedDepartment = employeeData.department.toLowerCase();

      
      // Format DOB to YYYY-MM-DD for the date input
      const formattedDOB = employeeData.dob.split("/").reverse().join("-");
      
      setFormValues({
        employeeName: employeeData.employeeName || "",
        gender: normalizedGender || "",
        mobile: employeeData.mobile || "",
        department: normalizedDepartment || "",
        address: employeeData.address || "",
        dob: formattedDOB || "",
        education: employeeData.education || "",
      });
    } catch (error) {
      console.error("Failed to fetch employee data", error);
    }
  };
  
  useEffect(() => {
    if (employeeId) {
      fetchEmployee(employeeId); 
    }
  }, [employeeId]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editEmployeeValidation.validate(formValues, { abortEarly: false });
      setErrors({});
      const response = await editEmployee(employeeId, formValues);
      console.log(response);
      navigate("/superadmin/allemployees");
    } catch (err) {
      if (err.name === "ValidationError") {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = '';
        });
        setErrors(validationErrors);
        toast.error("Please fill in the required fields.");
      }
    }
  };
  
  const handleCancel = () => {
    navigate("/superadmin/allemployees");
  };

  return (
    <div className="form-editemployee">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="employeeName"
              value={formValues.employeeName}
              onChange={handleChange}
              error={!!errors.employeeName}
              helperText={errors.employeeName}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.gender}>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                name="gender"
                value={formValues.gender}
                onChange={handleChange}
                label="Gender"
              >
                <MenuItem value="">
                  <em>Select Gender</em>
                </MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
              {errors.gender && (
                <span className="error-text">{errors.gender}</span>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mobile"
              name="mobile"
              value={formValues.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.department}>
              <InputLabel id="department-label">Department</InputLabel>
              <Select
                labelId="department-label"
                name="department"
                value={formValues.department}
                onChange={handleChange}
                label="Department"
              >
                <MenuItem value="">
                  <em>Select Department</em>
                </MenuItem>
                <MenuItem value="hr">HR</MenuItem>
                <MenuItem value="engineering">Engineering</MenuItem>
                <MenuItem value="sales">Sales</MenuItem>
                <MenuItem value="marketing">Marketing</MenuItem>
              </Select>
              {errors.department && (
                <span className="error-text">{errors.department}</span>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              multiline
              rows={4}
              value={formValues.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="dob"
              type="date"
              value={formValues.dob}
              onChange={handleChange}
              error={!!errors.dob}
              helperText={errors.dob}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Education"
              name="education"
              multiline
              rows={4}
              value={formValues.education}
              onChange={handleChange}
              error={!!errors.education}
              helperText={errors.education}
            />
          </Grid>

          <Grid item xs={12} className="upload-image-addemployee">
            <label htmlFor="upload-photo" className="upload-label">
              Upload Photo
            </label>
            <input type="file" id="upload-photo" className="field" />
          </Grid>
          
          <div className="form-button-employee">
            <button type="button" onClick={handleCancel} className="cancel-button-employee">
              Cancel
            </button>
            <button type="submit" className="save-button-employee">
              Save
            </button>
          </div>
        </Grid>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditEmployee;
