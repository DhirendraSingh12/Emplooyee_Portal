import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Adminloginvalidation } from "../../Utils/validation";
import "./AdminLogin.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { BackgroundOvrlay } from "../../components/BackgroundOverlay/BackgroundOverlay";
import { loginAdmin } from "../APIServices";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});  // Reset validation errors
    setApiError(""); // Reset API error
    setIsSubmitting(true);
  
    try {
      await Adminloginvalidation.validate(
        { username, password },
        { abortEarly: false }
      );
      const data = await loginAdmin({ username, password });
      if (data.jwtToken) {
        localStorage.setItem('jwtToken', data.jwtToken);
        toast.success(' Admin Login Success');
        navigate("/admin/dashboard");
      }
  
    } catch (error) {
      if (error.name === "ValidationError") {
        const formattedErrors = error.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      } else {
        // Handle API errors
        const errorMessage = error.response?.data?.error || "Invalid username or password";
        setApiError(errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };
  
  
  return (
    <div className="login-background">
      <BackgroundOvrlay />
      <img
        src="/assets/logo/hirefleX247.com-Light.png"
        alt="Company Logo"
        className="login-logo"
      />
      <Box className="login-form-container">
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter username"
            variant="outlined"
            className="custom-text-field"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={Boolean(errors.username)}
            helperText={errors.username}
          />
          <TextField
            label="Enter Password"
            variant="outlined"
            className="custom-text-field"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          {apiError && (
            <Typography color="error" variant="body2">
              {apiError}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="login-button"
            disabled={isSubmitting}
          >
            Login
          </Button>
        </form>
        <div className="text-black p-1">
          <Typography variant="body2">
            <Link to="/register">
              Need assistance with Login/Registration? <br />
            </Link>
          </Typography>
          <Typography variant="body2">Email: hr@hireflex247.com</Typography>
        </div>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
