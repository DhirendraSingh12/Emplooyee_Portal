import React, { useState, useEffect } from "react";
import "./MeetingRecordPage.css";
import Header from "../../components/SuperAdminNavbar/SuperAdminNavbar";
import Checkbox from "@mui/material/Checkbox";
import { TablePagination } from "@mui/material";
import CommonHeader from "../../../components/CommonHeader/index";
import IconMapper from "../../../components/IconMapper/IconMapper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DailogPopup from "../MeetingRecordPage/MeetingRecordPopup/DailogPopup";
import { fetchMeettingRecod,deleteaDailog } from "../../ApiServices";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
const profileImage = "/assets/images/profile.jpg";

const MeetingRecordPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [isDailogFormOpen, setIsDailogFormOpen] = useState(false);
  const [dailogToEdit, setDailogToEdit] = useState(null); 
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);

  const fetchData = async () => {
    try {
      const mettingRecod = await fetchMeettingRecod();
      setFilteredDocuments(mettingRecod || []);
    } catch (error) {
      toast.error("Internal error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredDocuments((prevDocuments) =>
      prevDocuments.filter((doc) =>
        doc.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

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
      setSelectedDocuments(currentDocuments.map((doc) => doc._id));
    } else {
      setSelectedDocuments([]);
    }
  };

  const handleSelectDocument = (id) => {
    setSelectedDocuments((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddClick = () => {
    setDailogToEdit(null);  // Clear the asset to be edited (if any) before opening the form
    setIsDailogFormOpen(true);
  };
  const handleEditClick = (dailog) => {
    setDailogToEdit(dailog);  // Set the asset to be edited
    setIsDailogFormOpen(true);
  };

  const handleCloseAssetForm = () => {
    setIsDailogFormOpen(false);
  };
  const handleOpenConfirmationModal = (id) => {
    setDocumentToDelete(id);
    setShowConfirmationModal(true);
  };
  const handleCloseConfirmationModal = () => {
    setDocumentToDelete(null);
    setShowConfirmationModal(false);
  };
  const handleConfirmDelete = () => {
    if (documentToDelete) {
      handleDelete(documentToDelete);
      handleCloseConfirmationModal();
    }
  };
  const handleDelete = async (id) => {
    console.log("Deleting sessionId:", id);
    try {
      await deleteaDailog(id);
      await fetchMeettingRecod();
      const updatedDocuments = filteredDocuments.filter((doc) => doc.sessionId !== id);
      setFilteredDocuments(updatedDocuments);  // Remove the deleted document from the state
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };
  


  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedDocuments.map((id) =>deleteaDailog(id)))
      ;
      const newFilteredDocuments = filteredDocuments.filter(
        (doc) => !selectedDocuments.includes(doc._id)
      );
      setFilteredDocuments(newFilteredDocuments);
      setSelectedDocuments([]);
      setCurrentPage(0);
    } catch (error) {
      console.error("Error deleting selected documents:", error);
    }
  };

  const handleFormSubmit = (formValues) => {
    console.log("Form submitted with values:", formValues);
    // Handle form submission here, e.g., sending data to the server
    setIsDailogFormOpen(false); // Close the form after submission
  };

  return (
    <div>
      <Header
        siteName={"MeetingRecordPage"}
        profileImage={profileImage}
        showLinks={["meetingpage"]}
      />
      <div className="dailog-table-container">
        <CommonHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleDeleteSelected={handleDeleteSelected}
          selectedPayslips={selectedDocuments}
          handleAddClick={handleAddClick}
          showIcons={{ plus: true, trash: true, rotate: true }}
        />
        <div className="dailog-tablebody">
          <table className="dailog-table-data">
            <thead>
              <tr>
                <th style={{ padding: "5px" }}>
                  <Checkbox
                    checked={
                      selectedDocuments.length === currentDocuments.length &&
                      currentDocuments.length > 0
                    }
                    indeterminate={
                      selectedDocuments.length > 0 &&
                      selectedDocuments.length < currentDocuments.length
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th>MeetingType</th>
                <th>EmployeeId</th>
                <th>ReviewDate</th>
                <th>Comments</th>
                <th>NextMeetingDate</th>
                <th>MeetingUrl</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentDocuments.map((doc) => (
                <tr key={doc._id}>
                  <td>
                    <Checkbox
                      checked={selectedDocuments.includes(doc._id)}
                      onChange={() => handleSelectDocument(doc._id)}
                    />
                  </td>
                  <td data-label="MeetingType">{doc.meetingType}</td>
                  <td data-label="EmployeeId">{doc.employeeId}</td>
                  <td data-label="ReviewDate">{doc.reviewDate}</td>
                  <td data-label="Comments">{doc.commentsAndNotes}</td>
                  <td data-label="NextMeetingDate">{doc.nextMeetingDate}</td>
                  <td data-label="MettingUrl">{doc.meetingURL}</td>
                  
                  <td data-label="Action">
                    <div className="dailog-Action-DataButon">
                      <button className="dailog-edit-button" onClick={() => handleEditClick(doc)} >
                        <IconMapper iconName={"pen"} isFontAwesome={true} />
                      </button>
                      <button className="dailog-Text-delete" onClick={() =>
                            handleOpenConfirmationModal(doc.sessionId)
                          }>
                        <IconMapper
                          iconName="Deletebtn"
                          className="dailog-DeletebtnView"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <TablePagination
            component="div"
            count={filteredDocuments.length}
            page={currentPage}
            onPageChange={handlePageChange}
            rowsPerPage={itemsPerPage}
            onRowsPerPageChange={handleItemsPerPageChange}
          />
        </div>
        {isDailogFormOpen && (
          <DailogPopup
            onSubmit={handleFormSubmit}
            onClose={handleCloseAssetForm}
            dailog={dailogToEdit}
            fetchData={fetchData}
          />
        )}
      </div>
      <ConfirmationModal
          open={showConfirmationModal}
          onClose={handleCloseConfirmationModal}
          onConfirm={handleConfirmDelete}
          title="Delete Employee"
          message="Are you sure you want to delete this employee?"
        />
      <ToastContainer />
    </div>
  );
};

export default MeetingRecordPage;
