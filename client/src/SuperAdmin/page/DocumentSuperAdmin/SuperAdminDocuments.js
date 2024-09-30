import React, { useState, useEffect } from "react";
import './SuperAdminDocuments.css'
import Header from "../../components/SuperAdminNavbar/SuperAdminNavbar";
import Footer from "../../../components/Footer/footer";
import Checkbox from "@mui/material/Checkbox";
import TablePagination from "@mui/material/TablePagination";
import CommonHeader from "../../../components/CommonHeader/index";
import DownloadButton from "../../../Employee/components/DownloadButton";
import SuperAdminDocumentPopup from "./SuperAdminDocumentPopup";
import { Link } from "react-router-dom";

// Constants
const ITEMS_PER_PAGE = 6;
const statusColors = {
  VERIFIED: "green",
  NOT_VERIFIED: "red",
  PENDING: "orange",
};

const AdminMyDocuments = () => {
  const [documentsData, setDocumentsData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ITEMS_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch("/api/emoployeedocuments"); // Replace with your API endpoint
        const data = await response.json();
        console.log(data); // Log the fetched documents for debugging purposes
        if (response.ok) {
          setDocumentsData(data.documents);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  // Update current items based on filters and pagination
  useEffect(() => {
    const filteredData = documentsData.filter((document) => {
      const matchesSearch = document.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter
        ? document.state === statusFilter
        : true;

      return matchesSearch && matchesStatus;
    });
    const newOffset = page * rowsPerPage;
    setCurrentItems(filteredData.slice(newOffset, newOffset + rowsPerPage));
  }, [searchQuery, page, rowsPerPage, documentsData, statusFilter]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectDocuments = (id) => {
    setSelectedDocuments((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedDocuments(currentItems.map((item) => item._id));
    } else {
      setSelectedDocuments([]);
    }
  };

  const handleDelete = () => {
    const newDocumentsData = documentsData.filter(
      (document) => !selectedDocuments.includes(document._id)
    );
    setDocumentsData(newDocumentsData);
    setSelectedDocuments([]);
    setPage(0);
  };

  const handleDownload = () => {
    console.log("Downloading:", selectedDocuments);
  };
  const handleAddClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleFormSubmit = (data) => {
    console.log("Form Submitted", data);
    setIsPopupOpen(false);
  };



  const profileImage = "/assets/images/profile.jpg";
  return (
    <div>
      <Header
        siteName={"My Documents"}
        userName={"Jaideep"}
        profileImage={profileImage}
        showLinks={["documentss"]}
      />
      <div className="AdminDocument-table-container">
        <CommonHeader
          searchTerm={searchQuery}
          setSearchTerm={setSearchQuery}
          handleDeleteSelected={handleDelete}
          selectedPayslips={selectedDocuments}
          showIcons={{ plus: true, trash: true, rotate: true }}
          handleSelectAll={handleSelectAll}
          currentDocuments={currentItems}
          selectedDocuments={selectedDocuments}
          setStatusFilter={setStatusFilter}
          statusFilter={statusFilter}
          showStatusFilter={true}
          handleAddClick={handleAddClick}
        />

        <div className="AdminDocument-tablebody">
          <table className="AdminDocument-table-data">
            <thead>
              <tr>
                <th style={{ padding: "5px" }}>
                  <Checkbox
                    checked={
                      selectedDocuments.length === currentItems.length &&
                      currentItems.length > 0
                    }
                    indeterminate={
                      selectedDocuments.length > 0 &&
                      selectedDocuments.length < currentItems.length
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Document Name</th>
                <th>Employee Name</th>
                <th>EmployeeId</th>
                <th>Upload Date</th>
                <th>Status</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((document) => (
                <tr key={document._id}>
                  <td
                    style={{
                      padding: "5px",
                      textAlign: "left",
                    }}
                  >
                    <Checkbox
                      checked={selectedDocuments.includes(document._id)}
                      onChange={() => handleSelectDocuments(document._id)}
                    />
                  </td>
                  <td data-label="Document Name">{document.documentName}</td>
                  <td data-label="Document Name">{document.name}</td>
                  <td data-label="Document Name">{document.employeeId}</td>

                  <td data-label="Upload Date">
                    {new Date(document.uploadDate).toLocaleDateString()}
                  </td>
                  <td
                    data-label="Status"
                    style={{ color: statusColors[document.state] }}
                  >
                    {document.state}
                  </td>
                  <td data-label="View">
                    <Link to={`/admin/documents/${document._id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="AdminDocument-pagination-table-container">
            <DownloadButton
              onClick={handleDownload}
              className="AdminDocument-download-button-table-data"
            />
            <TablePagination
              rowsPerPageOptions={[ITEMS_PER_PAGE, 10, 25]}
              component="div"
              count={documentsData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </div>
        </div>
        <Footer
          paragraph="If you have any questions or concerns regarding payroll, please feel
          free to write an email to payroll@hireflex247.com. Our dedicated
          payroll team is available to assist you with any inquiries or issues
          you may have."
        />
      </div>
      <SuperAdminDocumentPopup
        open={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default AdminMyDocuments;
