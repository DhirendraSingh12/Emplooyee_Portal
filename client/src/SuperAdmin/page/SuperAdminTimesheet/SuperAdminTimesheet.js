import React, { useState, useEffect } from "react";
import "../DocumentSuperAdmin/SuperAdminDocumentPopup.css";
import Header from "../../components/SuperAdminNavbar/SuperAdminNavbar";
import Checkbox from "@mui/material/Checkbox";
import CommonHeader from "../../../components/CommonHeader/index";
import { Link } from "react-router-dom";
import { getAllTimesheets } from "../../ApiServices"; // Import your API service

const ITEMS_PER_PAGE = 6;

const AdminTimesheet = () => {
  const [timesheetData, setTimesheetData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [selectedTimesheets, setSelectedTimesheets] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(ITEMS_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const getStatusStyle = (status) => {
    switch (status) {
        case "Approve":
            return { color: "green", fontWeight: 600 };
        case "Pending":
            return { color: "gold", fontWeight: 600 };
        case "Reject":
            return { color: "red", fontWeight: 600 };
        default:
            return { fontWeight: 600 };
    }
};

  // Function to filter unique timesheets by employeeId
  const getUniqueTimesheets = (data) => {
    const uniqueTimesheets = {};
    data.forEach((timesheet) => {
      if (!uniqueTimesheets[timesheet.employeeId]) {
        uniqueTimesheets[timesheet.employeeId] = timesheet;
      }
    });
    return Object.values(uniqueTimesheets);
  };

  // Fetch timesheet data when the component mounts
  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const data = await getAllTimesheets();
        const uniqueData = getUniqueTimesheets(data); // Filter to unique employee IDs
        setTimesheetData(uniqueData); // Update the state with the unique data
      } catch (error) {
        console.error("Failed to fetch timesheets:", error);
      }
    };

    fetchTimesheets();
  }, []);

  // Update current items based on filters and pagination
  useEffect(() => {
    const filteredData = timesheetData.filter((timesheet) => {
      const matchesSearch = timesheet.employeeName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter
        ? timesheet.status === statusFilter
        : true;
      return matchesSearch && matchesStatus;
    });
    const newOffset = page * rowsPerPage;
    setCurrentItems(filteredData.slice(newOffset, newOffset + rowsPerPage));
  }, [searchQuery, page, rowsPerPage, timesheetData, statusFilter]);

  const handleSelectTimesheet = (id) => {
    setSelectedTimesheets((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedTimesheets(currentItems.map((item) => item._id));
    } else {
      setSelectedTimesheets([]);
    }
  };

  const handleDelete = () => {
    const newTimesheetData = timesheetData.filter(
      (timesheet) => !selectedTimesheets.includes(timesheet._id)
    );
    setTimesheetData(newTimesheetData);
    setSelectedTimesheets([]);
    setPage(0);
  };

  const profileImage = "/assets/images/profile.jpg";

  return (
    <div>
      <Header
        siteName={"Timesheet"}
        userName={"Jaideep"}
        profileImage={profileImage}
        showLinks={["timesheet"]}
      />
      <div className="AdminDocument-table-container">
        <CommonHeader
          searchTerm={searchQuery}
          setSearchTerm={setSearchQuery}
          handleDeleteSelected={handleDelete}
          selectedPayslips={selectedTimesheets}
          showIcons={{ plus: false, trash: false, rotate: true }}
          handleSelectAll={handleSelectAll}
          currentDocuments={currentItems}
          selectedDocuments={selectedTimesheets}
          setStatusFilter={setStatusFilter}
          statusFilter={statusFilter}
          showStatusFilter={true}
          showCalendor={true}
        />
        <div className="AdminDocument-tablebody">
          <table className="AdminDocument-table-data">
            <thead>
              <tr>
                <th style={{ padding: "5px" }}>
                  <Checkbox
                    checked={
                      selectedTimesheets.length === currentItems.length &&
                      currentItems.length > 0
                    }
                    indeterminate={
                      selectedTimesheets.length > 0 &&
                      selectedTimesheets.length < currentItems.length
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th>EmployeeId</th>
                <th>EmployeeName</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((timesheet) => (
                <tr key={timesheet._id}>
                  <td style={{ padding: "5px", textAlign: "left" }}>
                    <Checkbox
                      checked={selectedTimesheets.includes(timesheet._id)}
                      onChange={() => handleSelectTimesheet(timesheet._id)}
                    />
                  </td>
                  <td>
                    <Link
                      data-label="Emp_ID"
                      to={`/superadmin/timesheets/${timesheet.employeeId}`}
                    >
                      {timesheet.employeeId}
                    </Link>
                  </td>
                  <td>
                    <Link
                      data-label="Emp_Name"
                      to={"/superadmin/timesheetpopup"}
                    >
                      {timesheet.employeeName}
                    </Link>
                  </td>
                  {/* <td data-label="Status">{timesheet.status}</td> */}
                  <td data-label="Status" style={getStatusStyle(timesheet.status)}>{timesheet.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTimesheet;
