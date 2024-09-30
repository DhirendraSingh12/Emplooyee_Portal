
// import React, { useState, useEffect } from "react";
// import "../../../components/css/Table.css";
// import Header from "../../../Employee/components/Navbar/Navbar";
// import { EmployeeExpenses } from "../../../Employee/data/Table";
// import Checkbox from "@mui/material/Checkbox";
// import { TablePagination } from "@mui/material";
// import CommonHeader from "../../../components/CommonHeader/index";
// import DownloadButton from "../../../Employee/components/DownloadButton";


// const profileImage = "/assets/images/profile.jpg";
// const ITEMS_PER_PAGE = 6;
// const statusColors = {
//   APPROVED: "green",
//   REJECTED: "red",
//   PENDING: "orange",
// };

// const AdminExpense = () => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredDocuments, setFilteredDocuments] = useState(EmployeeExpenses);
//   const [allDocuments] = useState(EmployeeExpenses); // Store all documents
//   const [selectedDocuments, setSelectedDocuments] = useState([]);
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   const parseDate = (dateStr) => {
//     const [day, month, year] = dateStr.split("/");
//     return new Date(`${year}-${month}-${day}`);
//   };

//   useEffect(() => {
//     let documentsToDisplay = allDocuments;

//     if (searchTerm) {
//       documentsToDisplay = documentsToDisplay.filter(
//         (doc) =>
//           (doc.Emp_name &&
//             doc.Emp_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (doc.Category &&
//             doc.Category.toLowerCase().includes(searchTerm.toLowerCase()))
//       );
//     }

//     if (statusFilter !== "all") {
//       documentsToDisplay = documentsToDisplay.filter(
//         (doc) => doc.Status === statusFilter
//       );
//     }

//     documentsToDisplay = documentsToDisplay.filter((doc) => {
//       const appliedDate = parseDate(doc.AppliedDate); // Parse the date
//       const from = fromDate ? new Date(fromDate) : null; // Only use fromDate if it's not empty
//       const to = toDate ? new Date(toDate) : new Date(); // If toDate is empty, use current date

//       if (from) {
//         return appliedDate >= from && appliedDate <= to;
//       }
//       return true;
//     });

//     setFilteredDocuments(documentsToDisplay);
//   }, [searchTerm, statusFilter, fromDate, toDate, allDocuments]);

//   const currentDocuments = filteredDocuments.slice(
//     currentPage * itemsPerPage,
//     currentPage * itemsPerPage + itemsPerPage
//   );

//   const handlePageChange = (event, newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleItemsPerPageChange = (event) => {
//     setItemsPerPage(Number(event.target.value));
//     setCurrentPage(0);
//   };

//   const handleSelectAll = (event) => {
//     if (event.target.checked) {
//       setSelectedDocuments(currentDocuments.map((doc) => doc.id));
//     } else {
//       setSelectedDocuments([]);
//     }
//   };

//   const handleSelectDocument = (id) => {
//     setSelectedDocuments((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const handleDeleteSelected = () => {
//     const newFilteredDocuments = filteredDocuments.filter(
//       (doc) => !selectedDocuments.includes(doc.id)
//     );
//     setFilteredDocuments(newFilteredDocuments);
//     setSelectedDocuments([]);
//     setCurrentPage(0);
//   };

//   const handleResetFilters = () => {
//     setFromDate("");
//     setToDate("");
//     setSearchTerm("");
//     setStatusFilter("all");
//     setSelectedDocuments([]);
//     setCurrentPage(0);
//     setFilteredDocuments(allDocuments);
//   };

//   return (
//     <div>
//       <Header
//         siteName={"Expense"}
//         profileImage={profileImage}
//         showLinks={["expenses"]}
//       />
//       <div className="payslip-table-container">
//         <CommonHeader
//           title="Expense Management"
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           handleDeleteSelected={handleDeleteSelected}
//           selectedDocuments={selectedDocuments}
//           currentDocuments={currentDocuments}
//           handleSelectAll={handleSelectAll}
//           setStatusFilter={setStatusFilter}
//           statusFilter={statusFilter}
//           showStatusFilter={true}
//           showCalendor={true}
//           showCheckbox={true}
//           showIcons={{ plus: false, trash: true, rotate: true }}
//           handleAddClick={() => alert("Add Expense Clicked")}
//           fromDate={fromDate} // Pass fromDate
//           setFromDate={setFromDate} // Pass setFromDate
//           toDate={toDate} // Pass toDate
//           setToDate={setToDate} // Pass setToDate
//           handleResetFilters={handleResetFilters}
//         />
//         <div className="tablebody">
//           <table className="table-data">
//             <thead>
//               <tr>
//                 <th>
//                   <Checkbox
//                     checked={
//                       selectedDocuments.length === currentDocuments.length &&
//                       currentDocuments.length > 0
//                     }
//                     indeterminate={
//                       selectedDocuments.length > 0 &&
//                       selectedDocuments.length < currentDocuments.length
//                     }
//                     onChange={handleSelectAll}
//                   />
//                 </th>
//                 <th>EmployeeName</th>
//                 <th>EmployeeId</th>
//                 <th>Applied Date</th>
//                 <th>Amount</th>
//                 <th>Category</th>
//                 <th>Approved Date</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentDocuments.map((doc) => (
//                 <tr key={doc.id}>
//                   <td>
//                     <Checkbox
//                       checked={selectedDocuments.includes(doc.id)}
//                       onChange={() => handleSelectDocument(doc.id)}
//                     />
//                   </td>
//                   <td>{doc.Emp_name}</td>
//                   <td>{doc.Emp_ID}</td>
//                   <td>{doc.AppliedDate}</td>
//                   <td>{doc.Amount}</td>
//                   <td>{doc.Category}</td>
//                   <td>{doc.ApprovedDate}</td>
//                   <td style={{ color: statusColors[doc.Status] }}>
//                     {doc.Status}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="pagination-table-container">
//             <DownloadButton
//               onClick={() => alert("Download")}
//               className="download-button-table-data"
//             />
//             <TablePagination
//               component="div"
//               count={filteredDocuments.length}
//               page={currentPage}
//               onPageChange={handlePageChange}
//               rowsPerPage={itemsPerPage}
//               rowsPerPageOptions={[6, 10, 20]}
//               onRowsPerPageChange={handleItemsPerPageChange}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminExpense;


import React, { useState, useEffect } from "react";
import "../../../components/css/Table.css";
import Header from "../../../Employee/components/Navbar/Navbar";
import Checkbox from "@mui/material/Checkbox";
import { TablePagination } from "@mui/material";
import CommonHeader from "../../../components/CommonHeader/index";
import DownloadButton from "../../../Employee/components/DownloadButton";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton } from "@mui/material";
import { fetchAllExpenseData } from "../../ApiServices"; // Adjust the import path
import IconMapper from "../../../components/IconMapper/IconMapper";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const profileImage = "/assets/images/profile.jpg";
const ITEMS_PER_PAGE = 6;
const statusColors = {
  APPROVED: "green",
  REJECTED: "red",
  PENDING: "orange",
};

const AdminExpense = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [allDocuments, setAllDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  // State for managing the modal (popup form)
  const [open, setOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllExpenseData();
        console.log(data);
        setAllDocuments(data);
        setFilteredDocuments(data);
      } catch (error) {
        console.error("Error fetching expenses:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let documentsToDisplay = allDocuments;

    if (searchTerm) {
      documentsToDisplay = documentsToDisplay.filter(
        (doc) =>
          (doc.employeeName &&
            doc.employeeName.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (doc.expenseType &&
            doc.expenseType.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (statusFilter !== "all") {
      documentsToDisplay = documentsToDisplay.filter(
        (doc) => doc.status === statusFilter
      );
    }

    documentsToDisplay = documentsToDisplay.filter((doc) => {
      const appliedDate = parseDate(doc.expenseDate);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : new Date();

      if (from) {
        return appliedDate >= from && appliedDate <= to;
      }
      return true;
    });

    setFilteredDocuments(documentsToDisplay);
  }, [searchTerm, statusFilter, fromDate, toDate, allDocuments]);

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
      setSelectedDocuments(currentDocuments.map((doc) => doc.expenseId));
    } else {
      setSelectedDocuments([]);
    }
  };

  const handleSelectDocument = (expenseId) => {
    setSelectedDocuments((prev) =>
      prev.includes(expenseId) ? prev.filter((item) => item !== expenseId) : [...prev, expenseId]
    );
  };

  const handleDeleteSelected = () => {
    const newFilteredDocuments = filteredDocuments.filter(
      (doc) => !selectedDocuments.includes(doc.expenseId)
    );
    setFilteredDocuments(newFilteredDocuments);
    setSelectedDocuments([]);
    setCurrentPage(0);
  };

  const handleResetFilters = () => {
    setFromDate("");
    setToDate("");
    setSearchTerm("");
    setStatusFilter("all");
    setSelectedDocuments([]);
    setCurrentPage(0);
    setFilteredDocuments(allDocuments);
  };

  //new

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
    // Update the status of the selected document
    const updatedDocuments = filteredDocuments.map((doc) =>
      doc.expenseId === selectedDoc.expenseId ? { ...doc, status: newStatus } : doc
    );

    setFilteredDocuments(updatedDocuments);
    handleCloseDialog(); // Close the dialog after updating status
  };
  

  return (
    <div>
      <Header
        siteName={"Expense"}
        profileImage={profileImage}
        showLinks={["expenses"]}
      />
      <div className="payslip-table-container">
        <CommonHeader
          title="Expense Management"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleDeleteSelected={handleDeleteSelected}
          selectedDocuments={selectedDocuments}
          currentDocuments={currentDocuments}
          handleSelectAll={handleSelectAll}
          setStatusFilter={setStatusFilter}
          statusFilter={statusFilter}
          showStatusFilter={true}
          showCalendor={true}
          showCheckbox={true}
          showIcons={{ plus: false, trash: true, rotate: true }}
          handleAddClick={() => alert("Add Expense Clicked")}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          handleResetFilters={handleResetFilters}
        />
        <div className="tablebody">
          <table className="table-data">
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
                {/* <th>Expense ID</th> */}
                <th>Employee Name</th>
                <th>Employee ID</th>
                <th>Expense Date</th>
                <th>Amount</th>
                <th>Expense Type</th>
                <th>Expense Description</th>
                <th>Receipt File</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentDocuments.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <Checkbox
                      checked={selectedDocuments.includes(doc.expenseId)}
                      onChange={() => handleSelectDocument(doc.expenseId)}
                    />
                  </td>
                  {/* <td>{doc.expenseId}</td> */}
                  <td>{doc.employeeName}</td>
                  <td>{doc.employeeId}</td>
                  <td>{doc.expenseDate}</td>
                  <td>{doc.amount}</td>
                  <td>{doc.expenseType}</td>
                  <td>{doc.expenseDescription}</td>
                  <td>{doc.receiptFileName}</td>
                  <td style={{ color: statusColors[doc.status] }}>
                    {doc.status}
                  <IconButton onClick={() => handleOpenDialog(doc)}>
                    <ArrowDropDownIcon /> {/* Arrow down icon */}
                  </IconButton>
                  </td>
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

          <div className="pagination-table-container">
            <DownloadButton
              onClick={() => alert("Download")}
              className="download-button-table-data"
            />
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
        {/* Modal for changing status */}
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>Change Status for {selectedDoc?.employeeName}</DialogTitle>
          <DialogContent>
            <p>Expense ID: {selectedDoc?.expenseId}</p>
            <p>Select status:</p>
            <Button onClick={() => handleStatusChange("APPROVED")}>Approved</Button>
            <Button onClick={() => handleStatusChange("PENDING")}>Pending</Button>
            <Button onClick={() => handleStatusChange("REJECTED")}>Reject</Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminExpense;
