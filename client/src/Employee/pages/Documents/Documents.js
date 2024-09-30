import React, { useState, useEffect } from "react";
import Header from "../../components/Navbar/Navbar";
import "./Documents.css";
import Footer from "../../../components/Footer/footer";
import Checkbox from "@mui/material/Checkbox";
import TablePagination from "@mui/material/TablePagination";
import CommonHeader from "../../../components/CommonHeader/index";
import DownloadButton from "../../components/DownloadButton";
import AddDocumentPopup from "../Documents/AddDocumentPopup";
import IconMapper from "../../../components/IconMapper/IconMapper";
const ITEMS_PER_PAGE = 6;
const statusColors = {
  VERIFIED: "green",
  NOT_VERIFIED: "red",
  PENDING: "orange",
  UPLOADED: "green",
};

const EmployeeMyDocuments = () => {
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
        const response = await fetch("");
        const data = await response.json();
        console.log(data);
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
  const handlePageChange = ( newPage) => {
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
        showLinks={["documents"]}
      />
      <div className="Document-table-container">
        <CommonHeader
          searchTerm={searchQuery}
          setSearchTerm={setSearchQuery}
          handleDeleteSelected={handleDelete}
          selectedPayslips={selectedDocuments}
          showIcons={{ plus: true, trash: true, rotate: true, PdfIcon: false }}
          handleSelectAll={handleSelectAll}
          currentDocuments={currentItems}
          selectedDocuments={selectedDocuments}
          setStatusFilter={setStatusFilter}
          statusFilter={statusFilter}
          handleAddClick={handleAddClick}
        />

        <div className="Document-tablebody">
          <table className="Document-table-data">
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

                <th>Upload Date</th>
                <th>uploaded</th>
                <th>Status</th>
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

                  <td data-label="Upload Date">
                    {new Date(document.uploadDate).toLocaleDateString()}
                  </td>
                  <td data-label="uploaded">
                    {document.uploaded === "Upload" ? (
                      <IconMapper
                        iconName="UploadIcon"
                        style={{ width: "40px", display: "inline-block" }}
                      />
                    ) : (
                      <IconMapper
                        iconName="Close"
                        style={{ width: "40px", marginRight: "8px" }}
                      />
                    )}
                  </td>
                  <td
                    data-label="Status"
                    style={{ color: statusColors[document.state] }}
                  >
                    {document.state}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="Document-pagination-table-container">
            <DownloadButton
              onClick={handleDownload}
              className="Document-download-button-table-data"
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
      <AddDocumentPopup
        open={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default EmployeeMyDocuments;
