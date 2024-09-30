import React, { useState, useEffect } from "react";
import Header from "../../components/Navbar/Navbar";
// import "../../css/Table.css";
import './Payslips.css'
import Footer from "../../../components/Footer/footer";
import Checkbox from "@mui/material/Checkbox";
import TablePagination from "@mui/material/TablePagination";
import { payslipData as initialPayslipData } from "../../data/Table";
import DownloadButton from "../../components/DownloadButton";
import CommonHeader from "../../../components/CommonHeader/index";
const ITEMS_PER_PAGE = 6;
const Payslips = () => {
  const [payslipData, setPayslipData] = useState(initialPayslipData);
  const [currentItems, setCurrentItems] = useState(
    payslipData.slice(6, ITEMS_PER_PAGE)
  );
  const [selectedPayslips, setSelectedPayslips] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ITEMS_PER_PAGE);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const filteredData = payslipData.filter((payslip) =>
      payslip.date.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCurrentItems(
      filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    );
  }, [searchTerm, payslipData, page, rowsPerPage]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSelectPayslip = (id) => {
    setSelectedPayslips((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPayslips(currentItems.map((item) => item.id));
    } else {
      setSelectedPayslips([]);
    }
  };
  const handleDeleteSelected = () => {
    const newPayslipData = payslipData.filter(
      (payslip) => !selectedPayslips.includes(payslip.id)
    );
    setPayslipData(newPayslipData);
    setSelectedPayslips([]);
    setPage(0);
  };
  const profileImage = "/assets/images/profile.jpg";
  return (
    <div>
      <Header
        siteName={"My-PaySlips"}
        profileImage={profileImage}
        showLinks={["payslips"]}
      />
      <div className="PaySlip-table-container">
        <CommonHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleDeleteSelected={handleDeleteSelected}
          selectedPayslips={selectedPayslips}
          showIcons={{ plus: false, trash: true, rotate: true,PdfIcon: false }}
          handleSelectAll={handleSelectAll}
          currentDocuments={currentItems}
          selectedDocuments={selectedPayslips}        
        />
        <div className="PaySlip-tablebody">
          <table className="PaySlip-table-data">
            <thead>
              <tr>
                <th style={{ padding: "5px" }}>
                  <Checkbox
                    checked={
                      selectedPayslips.length === currentItems.length &&
                      currentItems.length > 0
                    }
                    indeterminate={
                      selectedPayslips.length > 0 &&
                      selectedPayslips.length < currentItems.length
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Payslip Date</th>
                <th style={{paddingLeft:'20%'}} >Tax Year/Period</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((payslip) => (
                <tr key={payslip.id}>
                  <td className="w-[10px]" style={{ padding: "5px" , textAlign:'left'}}>
                    <Checkbox
                      checked={selectedPayslips.includes(payslip.id)}
                      onChange={() => handleSelectPayslip(payslip.id)}
                    />
                  </td>
                  <td  data-label="Payslip Date">{payslip.date}</td>
                  <td style={{paddingLeft:'20%'}} data-label="Tax Year/Period">{payslip.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="PaySlip-pagination-table-container">
            <DownloadButton
              onClick={() => alert("download")}
              className="PaySlip-download-button-table-data"
            />
            <TablePagination
              rowsPerPageOptions={[ITEMS_PER_PAGE, 10, 20]}
              component="div"
              count={payslipData.length}
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
    </div>
  );
};

export default Payslips;
