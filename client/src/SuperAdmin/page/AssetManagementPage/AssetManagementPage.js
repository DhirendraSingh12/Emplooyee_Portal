import React, { useState, useEffect } from "react";
import "./AssetManagementPage.css";
import Header from "../../../Employee/components/Navbar/Navbar";
import Checkbox from "@mui/material/Checkbox";
import { TablePagination } from "@mui/material";
import CommonHeader from "../../../components/CommonHeader/index";
import IconMapper from "../../../components/IconMapper/IconMapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssetForm from "../../components/AssetForm/AssetForm";
import { deleteAllassets, deleteassets, fetchAllAssets } from "../../ApiServices";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
const profileImage = "/assets/images/profile.jpg";

const AssetManagementPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [assetToEdit, setAssetToEdit] = useState(null); 
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);


  const fetchData = async () => {
    try {
      const assets = await fetchAllAssets();
      setFilteredDocuments(assets || []);
    } catch (error) {
      
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
    setAssetToEdit(null);  
    setIsPopupOpen(true);
  };

  const handleEditClick = (asset) => {
    setAssetToEdit(asset);  
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
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
  const handleFormSubmit = (data) => {
    setIsPopupOpen(false);
  };
  const handleDelete = async (id) => {
    try {
      await deleteassets(id);
      await fetchData();
      setFilteredDocuments(filteredDocuments.filter((doc) => doc.assetId !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedDocuments.map((id) => deleteAllassets(id))
      );
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

  return (
    <div>
      <Header
        siteName={"AssetManagement"}
        profileImage={profileImage}
        showLinks={["timeoff"]}
      />
      <div className="assets-table-container">
        <CommonHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleDeleteSelected={handleDeleteSelected}
          selectedPayslips={selectedDocuments}
          handleAddClick={handleAddClick}
          showIcons={{ plus: true, trash: true, rotate: true }}
        />
        <div className="assets-tablebody">
          <table className="assets-table-data">
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
                <th>EmployeeId</th>
                <th>Employee Name</th>
                <th>Asset Type</th>
                <th>Date Given</th>
                <th>Estimated Value</th>
                <th>Serial Number</th>
                <th>Insurance Details</th>
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
                  <td data-label="EmployeeID">{doc.employeeId}</td>
                  <td data-label="EmployeeName">{doc.employeeName}</td>
                  <td data-label="AssetType">{doc.assetType}</td>
                  <td data-label="dateGiven">{doc.dateGiven}</td>
                  <td data-label="estimatedValue">{doc.estimatedValue}</td>
                  <td data-label="insuranceDetails">{doc.insuranceDetails}</td>
                  <td data-label="serialNumber">{doc.serialNumber}</td>
                  <td data-label="Action">
                    <div className="assets-Action-DataButon">
                      <button
                        className="assets-edit-button"
                        onClick={() => handleEditClick(doc)}  
                      >
                        <IconMapper iconName={"pen"} isFontAwesome={true} />
                      </button>
                      <button className="assets-Text-delete"  onClick={() =>
                            handleOpenConfirmationModal(doc.assetId)
                          }>
                        <IconMapper
                          iconName="Deletebtn"
                          className="assets-DeletebtnView"
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
        <AssetForm
          open={isPopupOpen}
          onClose={handleClosePopup}
          onSubmit={handleFormSubmit}
          asset={assetToEdit}
          fetchData={fetchData}  
        />
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

export default AssetManagementPage;
