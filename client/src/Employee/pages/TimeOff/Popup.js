import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { LeaveRequestValidationTimeOff } from "../../../Utils/validation"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TimeoffPup.css";
import { submitLeaveRequest } from "../../EmpApiServices";

const AssestAdmin = ({ open, onClose, fetchData }) => {
  const [formData, setFormData] = useState({
    endDate: "",
    partialDays: "",
    reason: "",
    startDate: "",
    type: "",
    status: "Pending",
  });

  const [errors, setErrors] = useState({});

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
      await LeaveRequestValidationTimeOff.validate(formData, {
        abortEarly: false,
      });
      setErrors({});

      const formDataToSend = new FormData();
      formDataToSend.append("endDate", formData.endDate);
      formDataToSend.append("partialDays", formData.partialDays);
      formDataToSend.append("reason", formData.reason);
      formDataToSend.append("startDate", formData.startDate);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("status", formData.status);
      const employeeId = localStorage.getItem("employeeId");
      console.log(employeeId);
      formDataToSend.append("employeeId", employeeId);
      const jwtToken = localStorage.getItem("jwtToken");
      console.log("JWT Token Retrieved: ", jwtToken);
      await submitLeaveRequest(formDataToSend,jwtToken);
      toast.success("Leave request submitted successfully!");

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
      <div className="timeoff-Container">
        <form onSubmit={handleSubmit}>
          <DialogTitle>{"New Leave Request"}</DialogTitle>
          <DialogContent>

            <TextField
              fullWidth
              margin="dense"
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              error={Boolean(errors.startDate)}
              helperText={errors.startDate}
            />
            <TextField
              fullWidth
              margin="dense"
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              error={Boolean(errors.endDate)}
              helperText={errors.endDate}
            />
            <Select
              fullWidth
              margin="dense"
              id="partialDays"
              name="partialDays"
              value={formData.partialDays}
              onChange={handleChange}
              error={Boolean(errors.partialDays)}
              displayEmpty
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value="halfday">Halfday</MenuItem>
              <MenuItem value="fullday">Fullday</MenuItem>
            </Select>
            {errors.partialDays && (
              <p className="error-message">{errors.partialDays}</p>
            )}
            <FormControl fullWidth margin="dense">
              {/* <InputLabel>Reason</InputLabel> */}
              <TextField
                fullWidth
                margin="dense"
                id="reason"
                name="reason"
                label="reason"
                value={formData.reason}
                onChange={handleChange}
                error={Boolean(errors.reason)}
                helperText={errors.reason}
                multiline // Enables multiple lines
                rows={4} // Sets the number of visible rows
              />
            </FormControl>


            <Select
              fullWidth
              margin="dense"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              error={Boolean(errors.type)}
              displayEmpty // Allows showing a placeholder when no option is selected
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value="sick">Sick</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
            </Select>
            {errors.type && <p className="error-message">{errors.type}</p>}
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
