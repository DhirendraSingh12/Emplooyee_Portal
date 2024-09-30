import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import { AddExpensesValidation } from "../../../Utils/validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ExpensePopup.css"; 
import { submitExpenseRequest } from "../../EmpApiServices";

const AddDocumentPopup = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    expenseDate: "",
    expenseDescription: "",
    expenseType: "",
    amount:"",
    receiptFileName: "",
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
        receiptFileName: files[0].name, 
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AddExpensesValidation.validate(formData, { abortEarly: false });
      setErrors({}); 

      const formDataToSend = new FormData();
      formDataToSend.append("employeeName", formData.employeeName);
      formDataToSend.append("employeeId", formData.employeeId);
      formDataToSend.append("expenseDate", formData.expenseDate);
      formDataToSend.append("expenseDescription", formData.expenseDescription);
      formDataToSend.append("expenseType", formData.expenseType);
      formDataToSend.append("receiptFileName", formData.receiptFileName);
      formDataToSend.append("Status", formData.Status);
      const response = await submitExpenseRequest(formDataToSend);
      
    
      console.log(response); 
      toast.success("Document sent successfully");
      onClose(); 
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
          {/* Employee Name */}
          <TextField
            fullWidth
            margin="dense"
            id="employeeName"
            name="employeeName"
            label="Employee Name"
            value={formData.employeeName}
            onChange={handleChange}
            error={Boolean(errors.employeeName)}
            helperText={errors.employeeName}
          />

          {/* Employee ID */}
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

          {/* Expense Date */}
          <TextField
            fullWidth
            margin="dense"
            id="expenseDate"
            name="expenseDate"
            label="Expense Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.expenseDate}
            onChange={handleChange}
            error={Boolean(errors.expenseDate)}
            helperText={errors.expenseDate}
          />

          {/* Expense Description */}
          <TextField
            fullWidth
            margin="dense"
            id="expenseDescription"
            name="expenseDescription"
            label="Expense Description"
            value={formData.expenseDescription}
            onChange={handleChange}
            error={Boolean(errors.expenseDescription)}
            helperText={errors.expenseDescription}
          />

          {/* Expense Type */}
          <TextField
            fullWidth
            margin="dense"
            id="expenseType"
            name="expenseType"
            label="Expense Type"
            value={formData.expenseType}
            onChange={handleChange}
            error={Boolean(errors.expenseType)}
            helperText={errors.expenseType}
          />
           <TextField
             fullWidth
            margin="dense"
            id="amount"
            name="amount"
            label="amount"
            value={formData.amount}
            onChange={handleChange}
            error={Boolean(errors.amount)}
            helperText={errors.amount}
          />
          
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
