import React from "react";
import "./footer.css";
import { Box, Typography } from "@mui/material";
const Footer = ({ paragraph }) => {
  return (
    <>
      <Box className="content-footer">
        <Typography variant="body1">{paragraph}</Typography>
      </Box>
    </>
  );
};

export default Footer;
