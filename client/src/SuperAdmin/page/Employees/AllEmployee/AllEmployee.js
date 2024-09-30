import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AllEmployee.css";
import Header from "../../../components/SuperAdminNavbar/SuperAdminNavbar";
import Checkbox from "@mui/material/Checkbox";
import { TablePagination } from "@mui/material";
import CommonHeader from "../../../../components/CommonHeader/index";
import IconMapper from "../../../../components/IconMapper/IconMapper";
import DownloadButton from "../../../../Employee/components/DownloadButton";
import debounce from "lodash/debounce";
import ProfileImage from "../../../components/ProfileImage/ProfileImage";
import { ToastContainer, toast } from "react-toastify";
import ConfirmationModal from "../../../../components/ConfirmationModal/ConfirmationModal";
import {
  deleteUser,
  deleteSelectedUsers,
  getAllEmployees,
} from "../../../ApiServices"; 
import "react-toastify/dist/ReactToastify.css";
// const profileImage = "/assets/images/profile.jpg";

const AllEmployee = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);

  const fetchData = async () => {
    try {
      const data = await getAllEmployees();
      console.log(data)
      setFilteredDocuments(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      setFilteredDocuments((prevDocuments) =>
        prevDocuments.filter(
          (doc) =>
            (doc.name &&
              doc.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (doc.department &&
              doc.department
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (doc.role &&
              doc.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (doc.degree &&
              doc.degree.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (doc.mobile && doc.mobile.includes(searchTerm)) ||
            (doc.email &&
              doc.email.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      );
    }, 300);

    debouncedSearch();

    return () => {
      debouncedSearch.cancel();
    };
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
      setSelectedDocuments(currentDocuments.map((doc) => doc.id));
    } else {
      setSelectedDocuments([]);
    }
  };

  const handleSelectDocument = (id) => {
    setSelectedDocuments((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setFilteredDocuments(filteredDocuments.filter((doc) => doc.id !== id));
      toast.success("Employee deleted successfully")
    } catch (error) {
      console.error("Error deleting document:", error);
      setError("Failed to delete document");
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await deleteSelectedUsers(selectedDocuments);
      const newFilteredDocuments = filteredDocuments.filter(
        (doc) => !selectedDocuments.includes(doc.id)
      );
      setFilteredDocuments(newFilteredDocuments);
      setSelectedDocuments([]);
      setCurrentPage(0);
    } catch (error) {
      console.error("Error deleting selected documents:", error);
      setError("Failed to delete selected documents");
    }
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

  return (
    <div>
      <Header
        siteName={"All Employee"}
        profileImage={""}
        showLinks={["allemp"]}
      />
      <div className="Admintable-container">
        <CommonHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleDeleteSelected={handleDeleteSelected}
          selectedPayslips={selectedDocuments}
          showIcons={{ plus: false, trash: true, rotate: true }}
        />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="Admintablebody">
            <table className="Admintable-data">
              <thead>
                <tr>
                  <th>
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
                  <th>EmployeeName</th>
                  <th>EmployeeId</th>
                  <th>Department</th>
                  {/* <th>Role</th> */}
                  <th>Degree</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  {/* <th>Joining Date</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentDocuments.map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <Checkbox
                        checked={selectedDocuments.includes(doc.id)}
                        onChange={() => handleSelectDocument(doc.id)}
                      />
                    </td>
                    <td data-label="Profile">
                      <ProfileImage
                       
                        src={doc.image || "/assets/images/profile.jpg"}
                        alt="profile"
                        size={"55px"}
                      />
                    </td>
                    <td data-label="FirstName">{doc.employeeName}</td>
                    <td data-label="EmployeeId">{doc.employeeId}</td>
                    <td data-label="Department">{doc.department}</td>
                    {/* <td data-label="Role">{doc.role}</td> */}
                    <td data-label="Designation">{doc.designation}</td>
                    <td data-label="Mobile">{doc.mobile}</td>
                    <td data-label="Email">{doc.email}</td>
                    {/* <td data-label="JoiningDate">{doc.joiningDate}</td> */}
                    <td data-label="Action">
                      <div className="AdminAction-DataButon">
                        <Link to={`/superadmin/editemployees/${doc.employeeId}`}>
                          {" "}
                          <button className="Adminedit-button">
                            <IconMapper iconName={"pen"} isFontAwesome={true} />
                          </button>
                        </Link>

                        <button
                          className="AdminText-delete"
                          onClick={() =>
                            handleOpenConfirmationModal(doc.employeeId)
                          }
                        >
                          <IconMapper
                            iconName="Deletebtn"
                            className="AdminDeletebtnView"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="pagination-table-container">
          <div>
            <DownloadButton
              onClick={() => alert("Download")}
              className="Admindownload-button-table-data"
            />
          </div>
          <div className="flex gap-3">
            <TablePagination
              component="div"
              count={filteredDocuments.length}
              page={currentPage}
              onPageChange={handlePageChange}
              rowsPerPage={itemsPerPage}
              rowsPerPageOptions={[6, 10, 25]}
              onRowsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        </div>

        <ConfirmationModal
          open={showConfirmationModal}
          onClose={handleCloseConfirmationModal}
          onConfirm={handleConfirmDelete}
          title="Delete Employee"
          message="Are you sure you want to delete this employee?"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default AllEmployee;
