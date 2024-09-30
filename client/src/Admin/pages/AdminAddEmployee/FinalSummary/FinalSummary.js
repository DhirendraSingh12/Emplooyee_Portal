import React, { useState } from "react";
import "./FinalSummary.css";
import Header from "../../../components/AdminHeader/AdminNavbar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import SkipNextIcon from "@mui/icons-material/SkipNext";

const profileImage = "/assets/images/profile.jpg";

const FinalSummary = () => {
  const [activeBtn, setActiveBtn] = useState("added");

  const handleButtonClick = (btn) => {
    setActiveBtn(btn);
  };

  const [selectedSummary, setSelectedSummary] = useState([]);
  const [currentItems] = useState([
    { id: 1, name: "John Doe", email: "johndoe@example.com" },
  ]);

  const navigate = useNavigate();

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedSummary(currentItems.map((item) => item.id));
    } else {
      setSelectedSummary([]);
    }
  };

  const handleSelectSummary = (id) => {
    setSelectedSummary((prev) =>
      prev.includes(id)
        ? prev.filter((payslipId) => payslipId !== id)
        : [...prev, id]
    );
  };

  return (
    <>
      <Header
        siteName={"Summary"}
        profileImage={profileImage}
        showLinks={["emppayslip"]}
      />
      <div className="multi-header-employee-summary">
        <p>Employee Details</p>
        <p>Employment Details</p>
        <p>Summary</p>
      </div>
      <div className="added-failed-container">
        <Button
          className={`added-btn ${activeBtn === "added" ? "underline" : ""}`}
          onClick={() => handleButtonClick("added")}
        >
          Added
        </Button>
        <Button
          className={`failed-btn ${activeBtn === "failed" ? "underline" : ""}`}
          onClick={() => handleButtonClick("failed")}
        >
          Failed
        </Button>

        {activeBtn === "added" && (
          <div className="final-summary-tablebody">
            <table className="final-summary-table-data">
              <thead>
                <tr>
                  <th style={{ padding: "5px" }}>
                    <Checkbox
                      checked={
                        selectedSummary.length === currentItems.length &&
                        currentItems.length > 0
                      }
                      indeterminate={
                        selectedSummary.length > 0 &&
                        selectedSummary.length < currentItems.length
                      }
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Name</th>
                  <th>Email address</th>
                  <th>Personal Information</th>
                  <th>Contact Information</th>
                  <th>Sensitive Information</th>
                  <th>Emergency Contact</th>
                  <th>Bank Details</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((Summary) => (
                  <tr key={Summary.id}>
                    <td
                      className="w-[10px]"
                      style={{ padding: "5px", textAlign: "left" }}
                    >
                      <Checkbox
                        checked={selectedSummary.includes(Summary.id)}
                        onChange={() => handleSelectSummary(Summary.id)}
                      />
                    </td>
                    <td data-label="Name">{Summary.name}</td>
                    <td data-label="Email address">{Summary.email}</td>
                    <td data-label="Personal Information">
                      {" "}
                      <CheckCircleIcon style={{ color: "green" }} />
                      {Summary.personalInfo}
                    </td>
                    <td data-label="Contact Information">
                      {" "}
                      <CheckCircleIcon style={{ color: "green" }} />
                      {Summary.contactInfo}
                    </td>
                    <td data-label="Sensitive Information">
                      <SkipNextIcon style={{ color: "black" }} />
                      {Summary.sensitiveInfo}
                    </td>
                    <td data-label="Emergency Contact">
                      <SkipNextIcon style={{ color: "black" }} />
                      {Summary.emergencyContact}
                    </td>
                    <td data-label="Bank Details">
                      <ErrorIcon style={{ color: "red" }} />
                      {Summary.bankDetails}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeBtn === "failed" && (
          <div className="final-summary-tablebody">
            <table className="final-summary-table-data">
              <thead>
                <tr>
                  <th style={{ padding: "5px" }}>
                    <Checkbox
                      checked={
                        selectedSummary.length === currentItems.length &&
                        currentItems.length > 0
                      }
                      indeterminate={
                        selectedSummary.length > 0 &&
                        selectedSummary.length < currentItems.length
                      }
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Name</th>
                  <th>Email address</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((Summary) => (
                  <tr key={Summary.id}>
                    <td
                      className="w-[10px]"
                      style={{ padding: "5px", textAlign: "left" }}
                    >
                      <Checkbox
                        checked={selectedSummary.includes(Summary.id)}
                        onChange={() => handleSelectSummary(Summary.id)}
                      />
                    </td>
                    <td data-label="Name">{Summary.name}</td>
                    <td data-label="Email address">{Summary.email}</td>
                    <td data-label="Description">{Summary.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="icon-knowing">
          <p>
            <CheckCircleIcon style={{ color: "green" }} /> Successful
          </p>
          <p>
            <ErrorIcon style={{ color: "red" }} /> Unsuccessful
          </p>
          <p>
            <SkipNextIcon style={{ color: "black" }} /> Skipped
          </p>
        </div>
      </div>

      <div className="add-all-hireflex-footer">
        <div className="personal-button-container">
          <button
            className="start-and-over-btn"
            onClick={() => navigate("/admin/empdetails")}
          >
            Start Over
          </button>
          <button
            className="back-btn-final-summary"
            onClick={() => navigate("/admin/empsummary")}
          >
            Back
          </button>
          <button
            className="save-and-continue-btn"
            onClick={() => navigate("/admin/emp-add-successfully")}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default FinalSummary;
