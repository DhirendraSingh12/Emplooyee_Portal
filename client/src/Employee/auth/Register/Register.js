
import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Registervalidation } from "../../../Utils/validation";
import { Formik, Form, Field } from "formik";

import "./Register.css";
import { Link } from "react-router-dom";
import { BackgroundOvrlay } from "../../../components/BackgroundOverlay/BackgroundOverlay";
const Register = () => {
  const [employeeID, setEmployeeID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="register-background">
      <BackgroundOvrlay/>
      <img src="/assets/logo/hirefleX247.com-Light.png" alt="Company Logo" className="register-logo" />
      <Box className="register-form-container">
      <Formik
          initialValues={{ employeeID: "", password: "" }}
          validationSchema={Registervalidation}
        >
          {({  errors }) => (
            <Form>
          <Field
            as={TextField}
            label="Enter Employee ID"
            variant="outlined"
            className="custom-text-field"
            fullWidth
            margin="normal"
            value={employeeID}
            onChange={(e) => setEmployeeID(e.target.value)}
            helperText={errors.employeeID}
            error={Boolean(errors.employeeID)}
          />
          <Field
            as={TextField}
            label="Enter Name"
            variant="outlined"
            className="custom-text-field"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            helperText={errors.name}
            error={Boolean(errors.name)}
          />
          <Field
            as={TextField}
            label="Enter Email"
            variant="outlined"
            className="custom-text-field"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText={errors.email}
            error={Boolean(errors.email)}
          />
          <Field
            as={TextField}
            label="Enter Password"
            variant="outlined"
            className="custom-text-field"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText={errors.password}
            error={Boolean(errors.password)}
          />
         
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="register-button"
          >
            Register
          </Button>
          </Form>
          )}
        </Formik>
        <div className="text-black p-1">
        <Typography variant="body2" >
          <Link to="/login">
            Need assistance with Registration? Already registered? Please login{" "}
            <br />
          </Link>
        </Typography>
        <Typography variant="body2" >
          Email: hr@hireflex247.com
        </Typography>
        </div>
      </Box>
    </div>
  );
};

export default Register;




































































