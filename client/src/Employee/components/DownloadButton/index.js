import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "./Button.css";

const DownloadButton = ({ onClick }) => {
  return (
    <button className="download-button-payslips" onClick={onClick}>
      <ArrowDownwardIcon />
      Download
    </button>
  );
};

export default DownloadButton;
