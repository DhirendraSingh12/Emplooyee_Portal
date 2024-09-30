import React, { useState, useEffect } from "react";
import "../../../components/css/Table.css";
import Header from "../../../Employee/components/Navbar/Navbar";
import Checkbox from "@mui/material/Checkbox";
import { TablePagination, Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton } from "@mui/material";
import CommonHeader from "../../../components/CommonHeader/index";
import DownloadButton from "../../../Employee/components/DownloadButton";
import "./SuperAdminTimeOff.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";


import { fetchalltimeoff } from "../../ApiServices";
const profileImage = "/assets/images/profile.jpg";

const statusColors = {
  APPROVED: "green",
  NOT_VERIFIED: "red",
  PENDING: "orange",
};

const AdminTimeOff = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [fromDate] = useState("");
  const [toDate] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  useEffect(() => {
    const loadTimeOffRequests = async () => {
      try {
        const data = await fetchalltimeoff();
        console.log(data);
        setFilteredDocuments(data);
      } catch (err) {
      }
    };

    loadTimeOffRequests();
  }, []);

  useEffect(() => {
    let documentsToDisplay = [...filteredDocuments];  // Spread to avoid mutation
  
    if (searchTerm) {
      documentsToDisplay = documentsToDisplay.filter(
        (doc) =>
          doc.employeeId &&
          doc.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    if (statusFilter !== "all") {
      documentsToDisplay = documentsToDisplay.filter(
        (doc) => doc.status === statusFilter
      );
    }
  
    documentsToDisplay = documentsToDisplay.filter((doc) => {
      const startDates = new Date(doc.startDate);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : new Date();
  
      if (from) {
        return startDates >= from && startDates <= to;
      }
      return true;
    });
  
    setFilteredDocuments(documentsToDisplay);
  }, [filteredDocuments, searchTerm, statusFilter, fromDate, toDate]);
  

  const currentDocuments = filteredDocuments.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(0);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedDocuments(currentDocuments.map((doc) => doc.leaveId));
    } else {
      setSelectedDocuments([]);
    }
  };

  const handleSelectDocument = (id) => {
    setSelectedDocuments((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    const newFilteredDocuments = filteredDocuments.filter(
      (doc) => !selectedDocuments.includes(doc.leaveId)
    );
    setFilteredDocuments(newFilteredDocuments);
    setSelectedDocuments([]);
    setCurrentPage(0);
  };

  // const handleStatusChange = (docId, newStatus) => {
  //   const updatedDocuments = filteredDocuments.map((doc) =>
  //     doc.leaveId === docId ? { ...doc, status: newStatus } : doc
  //   );
  //   setFilteredDocuments(updatedDocuments);
  // };



  // new

  const handleOpenDialog = (doc) => {
    setSelectedDoc(doc);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedDoc(null);
  };

  const handleStatusChange = (newStatus) => {
    const updatedDocuments = filteredDocuments.map((doc) =>
      doc.leaveId === selectedDoc.leaveId ? { ...doc, status: newStatus } : doc
    );
    setFilteredDocuments(updatedDocuments);
    handleCloseDialog();
  };

  useEffect(() => {
    const loadTimeOffRequests = async () => {
      try {
        const data = await fetchalltimeoff();
        setFilteredDocuments(data);
      } catch (err) {
       
      }
    };
    loadTimeOffRequests();
  }, []);



  return (
    <div>
      <Header siteName={"Time Off-Book"} profileImage={profileImage} showLinks={["timeoff"]} />
      <div className="table-container">
        <CommonHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleDeleteSelected={handleDeleteSelected}
          selectedPayslips={selectedDocuments}
          showIcons={{ plus: false, trash: true, rotate: true }}
          selectedDocuments={selectedDocuments}
          currentDocuments={currentDocuments}
          handleSelectAll={handleSelectAll}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          showStatusFilter={true}
          showCalendor={true}
        />
        <div className="tablebody">
          <table className="table-data">
            <thead>
              <tr>
                <th style={{ padding: "5px" }}>
                  <Checkbox
                    checked={selectedDocuments.length === currentDocuments.length && currentDocuments.length > 0}
                    indeterminate={selectedDocuments.length > 0 && selectedDocuments.length < currentDocuments.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>EmployeeId</th>
                <th>leaveId</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Partial days</th>
                <th>Type</th>
                {/* <th>Reason</th> */}
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentDocuments.map((doc) => (
                <tr key={doc.leaveId}>
                  <td style={{ padding: "5px", textAlign: 'left', marginLeft: '10px' }}>
                    <Checkbox
                      checked={selectedDocuments.includes(doc.leaveId)}
                      onChange={() => handleSelectDocument(doc.leaveId)}
                    />
                  </td>
                  <td data-label="leaveId">{doc.employeeId}</td>
                  <td data-label="leaveId">{doc.leaveId}</td>
                  <td data-label="Start Date">{doc.startDate}</td>
                  <td data-label="End Date">{doc.endDate}</td>
                  <td data-label="Partial days">{doc.partialDays}</td>
                  <td data-label="Type">{doc.type}</td>
                  {/* <td data-label="Reason">{doc.reason}</td> */}
                  <td
                    data-label="Status"
                    style={{ color: statusColors[doc.status] }}
                  >
                    {doc.status}
                    <IconButton onClick={() => handleOpenDialog(doc)}>
                      <ArrowDropDownIcon /> {/* Arrow down icon */}
                    </IconButton>
                  </td>
                  


                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-table-container">
            <div>
              <DownloadButton
                onClick={() => alert("Download")}
                className="download-button-table-data"
              />
            </div>
            <div className="flex gap-3">
              <TablePagination
                component="div"
                count={filteredDocuments.length}
                page={currentPage}
                onPageChange={handlePageChange}
                rowsPerPage={itemsPerPage}
                rowsPerPageOptions={[6, 10, 20]}
                onRowsPerPageChange={handleItemsPerPageChange}
              />
            </div>
          </div>
        </div>

        {/* Modal (popup form) */}
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>Change Status for {selectedDoc?.employeeId}</DialogTitle>
          <DialogContent>
            <p>Leave ID: {selectedDoc?.leaveId}</p>
            <p>Select status:</p>
            <Button onClick={() => handleStatusChange("APPROVED")}>Approved</Button>
            <Button onClick={() => handleStatusChange("PENDING")}>Pending</Button>
            <Button onClick={() => handleStatusChange("NOT_VERIFIED")}>Reject</Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminTimeOff;
