import React, { useState, useEffect } from "react";
import '../../../components/css/Table.css';
import './admintimesheetpopup.css';
import Header from "../../components/SuperAdminNavbar/SuperAdminNavbar";
import { Link } from "react-router-dom";
import { getAllTimesheets } from "../../ApiServices"; 
const ITEMS_PER_PAGE = 6;

const AdminTimesheet = () => {
    const [timesheetData, setTimesheetData] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [page] = useState(0);
    const [rowsPerPage] = useState(ITEMS_PER_PAGE);
    const [showDropdown, setShowDropdown] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);

    const handleDropdownClick = () => {
        setShowDropdown(!showDropdown);
        setPopupVisible(true);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "Approve":
                return { color: "green", fontWeight: 600 };
            case "Pending":
                return { color: "gold", fontWeight: 600 };
            case "Reject":
                return { color: "red", fontWeight: 600 };
            default:
                return { fontWeight: 600 };
        }
    };



    const Popup = ({ visible, children }) => {
        if (!visible) return null;
        return (
            <div className="dropdown-popup">
                <div className="dropdown-popup-content">
                    {children}
                </div>
            </div>
        );
    };

    const handleOptionClick = (option, timesheetId) => {
        // Update the status property of the timesheet object with the matching ID
        setTimesheetData(
            timesheetData.map((timesheet) => {
                if (timesheet._id === timesheetId) {
                    return { ...timesheet, status: option };
                }
                return timesheet;
            })
        );

        // Update the currentItems state to re-render the table
        const filteredData = timesheetData.filter((timesheet) => {
            const matchesSearch = timesheet.employeeName.toLowerCase();
            const matchesStatus =   timesheet.status;
            return matchesSearch && matchesStatus;
        });
        const newOffset = page * rowsPerPage;
        setCurrentItems(filteredData.slice(newOffset, newOffset + rowsPerPage));

        setPopupVisible(false);
    };

    // Fetch timesheet data when the component mounts
    useEffect(() => {
        const fetchTimesheets = async () => {
            try {
                const data = await getAllTimesheets();
                setTimesheetData(data); // Update the state with the fetched data
            } catch (error) {
                console.error("Failed to fetch timesheets:", error);
            }
        };

        fetchTimesheets();
    }, []);

    useEffect(() => {
        const filteredData = timesheetData.filter((timesheet) => {
            const matchesSearch = timesheet.employeeName.toLowerCase();
            const matchesStatus =   timesheet.status;
            return matchesSearch && matchesStatus;
        });
        const newOffset = page * rowsPerPage;
        setCurrentItems(filteredData.slice(newOffset, newOffset + rowsPerPage))}, [ page, rowsPerPage, timesheetData, ]);

    const profileImage = "/assets/images/profile.jpg";

    return (
        <div>
            <Header
                siteName={"Timesheet"}
                userName={"Jaideep"}
                profileImage={profileImage}
                showLinks={["timesheet"]}
            />
            <div className="super-timesheet-table-container">
                <div className="super-timesheet-tablebody">
                    <table className="super-timesheet-table-data">
                        <thead>
                            <tr>
                                <th>EmpId</th>
                                <th>TimesheetId</th>
                                <th>EmpName</th>
                                <th>inDate</th>
                                <th>inTimeHH</th>
                                <th>inTimeMM</th>
                                <th>inPeriod</th>
                                <th>outDate</th>
                                <th>outTimeHH</th>
                                <th>outTimeMM</th>
                                <th>outPeriod</th>
                                <th>hours</th>
                                <th>PresentStatus</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((timesheet) => (
                                <tr key={timesheet._id}>
                                    <td><Link data-label="EmployeeId" to={'/superadmin/timesheets'}>{timesheet.employeeId}</Link></td>
                                    <td data-label="EmployeeName">{timesheet.timesheetId}</td>
                                    <td data-label="TimesheetId">{timesheet.employeeName}</td>
                                    <td data-label="InDate">{timesheet.inDate}</td>
                                    <td data-label="InTimeHH">{timesheet.inTimeHH}</td>
                                    <td data-label="InTimeMM">{timesheet.inTimeMM}</td>
                                    <td data-label="InPeriod">{timesheet.inPeriod}</td>
                                    <td data-label="OutDate">{timesheet.outDate}</td>
                                    <td data-label="OutTimeHH">{timesheet.outTimeHH}</td>
                                    <td data-label="OutTimeMM">{timesheet.outTimeMM}</td>
                                    <td data-label="OutPeriod">{timesheet.outPeriod}</td>
                                    <td data-label="Hours">{timesheet.hours}</td>
                                    <td data-label="AttendanceStatus">{timesheet.attendanceStatus}</td>
                                    <td data-label="Status" style={getStatusStyle(timesheet.status)}>{timesheet.status}</td>
                                    <td data-label="Dropdown">
                                        <div style={{ cursor: 'pointer', textAlign: 'left' }} className="dropdown-icon" onClick={handleDropdownClick}>
                                            <span style={{ paddingLeft: 22, textAlign: 'center' }}>▼</span>
                                        </div>
                                        <Popup visible={popupVisible}>
                                            <ul className="dropdown-menu">
                                                <li className="accept-dropdown-menu" onClick={() => handleOptionClick("Approve", timesheet._id)}>Approve</li>
                                                <li className="pending-dropdown-menu" onClick={() => handleOptionClick("Pending", timesheet._id)}>Pending</li>
                                                <li className="reject-dropdown-menu" onClick={() => handleOptionClick("Reject", timesheet._id)}>Reject</li>
                                            </ul>
                                        </Popup>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminTimesheet;

