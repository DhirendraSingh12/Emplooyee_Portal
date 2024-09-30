import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { loginvalidation } from "../../../Utils/validation";
import "./Login.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { BackgroundOvrlay } from "../../../components/BackgroundOverlay/BackgroundOverlay";
import { loginEmployee } from "../../EmpApiServices";
import { useDispatch } from "react-redux";  
import { loginSuccess } from "../../Redux/authSlice/authSlice"; 
import {jwtDecode} from "jwt-decode"; // Import jwt-decode to decode JWT tokens

const Login = () => {
  const [employeeId, setUsemployeeID] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setApiError("");
    setIsSubmitting(true);
    try {
      await loginvalidation.validate(
        { employeeId, password },
        { abortEarly: false }
      );
      const data = await loginEmployee(employeeId, password);
      console.log(data);
      const { jwtToken, redirectUrl } = data;

      // Store JWT token in local storage
      localStorage.setItem("jwtToken", jwtToken);
      localStorage.setItem("employeeId", employeeId);

      // Decode JWT token and extract user information (optional)
      const decodedToken = jwtDecode(jwtToken);
      console.log("Decoded Token:", decodedToken); // Log the decoded token for verification

      dispatch(loginSuccess(decodedToken)); // Store user information in Redux store
      navigate(redirectUrl || "/dashboard");
      toast.success('Login successful');
    } catch (error) {
      if (error.name === "ValidationError") {
        const formattedErrors = error.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      } else {
        setApiError(error.message || "An error occurred during login."); // Ensure the error is displayed
        toast.error(error.message || "An error occurred during login.");
      }
    } finally {
      setIsSubmitting(false);
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
            label="Enter employeeID"
            variant="outlined"
            className="custom-text-field"
            fullWidth
            margin="normal"
            value={employeeId}
            onChange={(e) => setUsemployeeID(e.target.value)}
            error={Boolean(errors.employeeId)}
            helperText={errors.employeeId}
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
        <div className="text-black p-1 mt-2">
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

export default Login;
