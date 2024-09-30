import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PerksSuperAdmin.css";
import Header from "../../../components/SuperAdminNavbar/SuperAdminNavbar";
import Checkbox from "@mui/material/Checkbox";
import { TablePagination } from "@mui/material";
import CommonHeader from "../../../../components/CommonHeader/index";
import IconMapper from "../../../../components/IconMapper/IconMapper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadPopup from "../SuperPerksPopup/uploadPerks";
import { Link } from "react-router-dom";
import { fetchAllPerksData, deletePerk } from "../../../ApiServices";
import ConfirmationModal from "../../../../components/ConfirmationModal/ConfirmationModal";
const profileImage = "/assets/images/profile.jpg";

const AdminPerksPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);

  const fetchData = async () => {
    try {
      const data = await fetchAllPerksData();
      console.log(data);
      setFilteredDocuments(data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
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

  const handleAddClick = () => {
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
    // console.log("Form Submitted", data);
    setIsPopupOpen(false);
  };

  const handleDelete = async (id) => {
    console.log(id)
    try {
        await deletePerk(id); 
        await fetchData();
        setFilteredDocuments((prevDocuments) => prevDocuments.filter((doc) => doc.perkId !== id));
    } catch (error) {
        toast.error("Failed to delete perk"); 
    }
}
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

  

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedDocuments.map((id) => axios.delete(`/api/employees/${id}`))
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
        siteName={"Perks Admin"}
        profileImage={profileImage}
        showLinks={["perks"]}
      />
      <div className="perks-table-container">
        <CommonHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleDeleteSelected={handleDeleteSelected}
          selectedPayslips={selectedDocuments}
          handleAddClick={handleAddClick}
          showIcons={{ plus: true, trash: true, rotate: true }}
        />
        <div className="perks-tablebody">
          <table className="perks-table-data">
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
                <th>Image</th>
                <th>TitlePerks</th>
                <th>Descriptions</th>
                <th>Category</th>
                <th>Url</th>
                <th>Actions</th>
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
                  <td data-label="PerksIcon">
                    <img
                       src={`${process.env.REACT_APP_API_URL}/${doc.image}`}
                      alt={doc.title}
                      className="perk-image"
                    />
                  </td>
                  <td data-label="Title">{doc.perkName}</td>
                  <td data-label="Description">{doc.description?.length > 5 ? doc.description.slice(0, 5) + '...' : doc.description}</td>
                  <td data-label="Category">{doc.perkType}</td>

                  <td data-label="Url">
                    <Link target="_blank" to={doc.url}>
                      {" "}
                      {doc.url}{" "}
                    </Link>
                  </td>

                  <td data-label="Action">
                    <div className="perks-Action-DataButon">
                      <button className="perks-Text-delete"  onClick={() =>
                            handleOpenConfirmationModal(doc.perkId)
                          }>
                        <IconMapper
                          iconName="Deletebtn"
                          className="perks-DeletebtnView"
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
        <UploadPopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          onSubmit={handleFormSubmit}
          fetchData={fetchData}
        />
      </div>
      <ToastContainer />
      <ConfirmationModal
          open={showConfirmationModal}
          onClose={handleCloseConfirmationModal}
          onConfirm={handleConfirmDelete}
          title="Delete Perk"
          message="Are you sure you want to delete this perk?"
        />
    </div>
  );
};

export default AdminPerksPage;
