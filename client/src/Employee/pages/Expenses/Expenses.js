import React, { useState, useEffect } from "react";
import "./Expenses.css";
import Header from "../../components/Navbar/Navbar";
import Checkbox from "@mui/material/Checkbox";
import PopupForm from "./ExpensePopup";
import { TablePagination } from "@mui/material";
import CommonHeader from "../../../components/CommonHeader/index";
import IconMapper from "../../../components/IconMapper/IconMapper";
import DownloadButton from "../../components/DownloadButton";
import { fetchExpenses  } from "../../EmpApiServices";

const profileImage = "/assets/images/profile.jpg";

const Expenses = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  // Fetch expenses from API
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const expenses = await fetchExpenses();
        setFilteredDocuments(expenses);
      } catch (error) {
        console.error("Failed to load expenses:", error);
      }
    };
    loadExpenses();
  }, []);

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

  const handleFormSubmit = async (data) => {
    try {
      await (data);
      console.log("Expense added successfully");
      // Reload the expenses after adding a new one
      const expenses = await fetchExpenses(searchTerm);
      setFilteredDocuments(expenses);
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
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

  const handleDeleteSelected = async () => {
    try {
      await (selectedDocuments);
      console.log("Expenses deleted successfully");
      // Reload the expenses after deleting
      const expenses = await fetchExpenses(searchTerm);
      setFilteredDocuments(expenses);
      setSelectedDocuments([]);
      setCurrentPage(0);
    } catch (error) {
      console.error("Error deleting expenses:", error);
    }
  };

  return (
    <div>
      <Header
        siteName={"Submit Expenses"}
        profileImage={profileImage}
        showLinks={["expenses"]}
      />
      <div className="Expenses-table-container">
        <CommonHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleDeleteSelected={handleDeleteSelected}
          selectedPayslips={selectedDocuments}
          handleAddClick={handleAddClick}
          showIcons={{ plus: true, trash: true, rotate: true, PdfIcon: false }}
          selectedDocuments={selectedDocuments}
          currentDocuments={currentDocuments}
          handleSelectAll={handleSelectAll}
        />
        <div className="Expenses-tablebody">
          <table className="Expenses-table-data">
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
                {/* Table headers */}
                <th>EmployeeId</th>
                <th>EmployeeName</th>
                <th>ExpenseDate</th>
                {/* <th>ExpenseId</th> */}
                <th>ExpenseType</th>
                <th>Amount</th>
                <th>ExpenseDescription</th>
                <th>ReceiptFileName</th>
                <th>Status</th>
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
                  {/* Table row data */}
                  <td>{doc.employeeId}</td>
                  <td>{doc.employeeName}</td>
                  <td>{doc.expenseDate}</td>
                  {/* <td>{doc.expenseId}</td> */}
                  <td>{doc.expenseType}</td>
                  <td>{doc.amount}</td>
                  <td>{doc.expenseDescription}</td>
                  <td>{doc.receiptFileName}</td>
                  <td>{doc.status}</td>
                  <td>
                    <button className="Expenses-edit-button">
                      <IconMapper iconName={"pen"} isFontAwesome={true} />
                    </button>
                    <button className="Expenses-Text-delete">
                      <IconMapper
                        iconName="Deletebtn"
                        className="Expenses-DeletebtnView"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="Expenses-pagination-table-container">
            <div>
              <DownloadButton
                onClick={() => alert("Download")}
                className="Expenses-download-button-table-data"
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
      </div>
      <PopupForm
        open={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Expenses;
