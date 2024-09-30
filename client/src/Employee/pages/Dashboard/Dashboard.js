import React, { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import IconMapper from "../../../components/IconMapper/IconMapper";
import "./Dashboard.css";
import ChatBox from "../../../components/ChatBox/Chatbox";
import { ProfileImage } from "../../../components/Profile/profile";
import {jwtDecode} from 'jwt-decode'; // Correct import

  const Dashboard = () => {
    const [employeeName, setEmployeeName] = useState("");
    const [employeeRole, setEmployeeRole] = useState("");

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken");
        if (jwtToken) {
            try {
                const decodedToken = jwtDecode(jwtToken); // Decode the token
                console.log("Decoded Token:", decodedToken); // Log the decoded token

                setEmployeeName(decodedToken.employeeName || "Unknown User"); // Set employee name from token
                setEmployeeRole(decodedToken.designation || "Unknown Role"); // Set employee role from token
            } catch (error) {
                console.error("Invalid token", error);
            }
        } else {
            console.log("No JWT token found. Using default values.");
        }
    }, []);  // Runs once on component mount

  return (
    <Box className="dashboard">
      <Box className="dashboard-header">
        <Box className="left-side">
          <ProfileImage
            src="/assets/images/profile.jpg"
            alt={"User Avatar"}
            width={"80px"}
            height={"80px"}
          />
          <Box ml={2} className="text-white">
            <Typography variant="h5">{employeeName}</Typography> {/* Display employee name */}
            <Typography variant="subtitle1">{employeeRole}</Typography> {/* Display employee role */}
          </Box>
        </Box>
        <Box>
          <div className="header-logo">
            <img
              src="/assets/logo/hirefleX247.com-light.png"
              className="user-avatar"
              alt="avatar"
            />
          </div>
          <Box className="flex items-center gap-2 text-white">
            <div className="linkedin-icon">
              <IconMapper iconName={"linkedin"} isFontAwesome={true} />
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                startIcon={<IconMapper iconName={"plus"} isFontAwesome={true} />}
                className="follow-button"
              >
                Follow
              </Button>
            </div>
          </Box>
        </Box>
        <Box className="announcement mt-4 text-white">
          <Typography variant="body1" className="parygrap-dasboard">
            I'm pleased to announce that the payslips for January 2024 are now
            ready and available for your review. You can view your payslip by
            logging into our payroll system. As always, we are committed to
            ensuring timely and accurate salary payments. If you have any
            questions or encounter any issues accessing your payslip, please do
            not hesitate to contact the HR department.
          </Typography>
        </Box>
      </Box>
      <Box>
        <ChatBox />
      </Box>
    </Box>
  );
};

export default Dashboard;
