import React from "react";
import { Link } from "react-router-dom";
import "./SuperAdminNavbar.css";
import IconMapper from "../../../components/IconMapper/IconMapper";
const Navbar = ({ siteName, showLinks }) => {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <h2>{siteName}</h2>
            </div>
            <div className="navbar-right">
                <nav className="gap-7px">
                    <Link to="/superadmin/dashboard" className="nav-link">
                        <div className="gap-2">
                            <IconMapper iconName={"home"} isFontAwesome={true} />
                            <IconMapper iconName={"right"} isFontAwesome={true} />
                        </div>
                        Home
                    </Link>
                    {showLinks.includes("allemp") && (
                        <Link to="/superadmin/allemployees" className="nav-link">
                            <div>
                                <IconMapper iconName={"right"} isFontAwesome={true} />
                            </div>
                            All Employees
                        </Link>
                    )}
                    {showLinks.includes("documentss") && (
                        <Link to="/superadmin/documentsadmin" className="nav-link">
                            <div>
                                <IconMapper iconName={"right"} isFontAwesome={true} />
                            </div>
                            Documents
                        </Link>
                    )}
                    {showLinks.includes("meetingpage") && (
                        <Link to="/superadmin/meetingRecordPage" className="nav-link">
                            <div>
                                <IconMapper iconName={"right"} isFontAwesome={true} />
                            </div>
                            Dialogues Section
                        </Link>
                    )}
                    {showLinks.includes("emppayslip") && (
                        <Link to="/superadmin/employeepayslip" className="nav-link">
                            <div>
                                <IconMapper iconName={"right"} isFontAwesome={true} />
                            </div>
                            Payslips
                        </Link>
                    )}
                    {showLinks.includes("perks") && (
                        <Link to="/superadmin/perksadmin" className="nav-link">
                            <div>
                                <IconMapper iconName={"right"} isFontAwesome={true} />
                            </div>
                            perks
                        </Link>
                    )}
                    {showLinks.includes("expense") && (
                        <Link to="/superadmin/expenses" className="nav-link">
                            <div>
                                <IconMapper iconName={"right"} isFontAwesome={true} />
                            </div>
                            expenses
                        </Link>
                    )}
                    {showLinks.includes("timeoffs") && (
                        <Link to="/superadmin/timeoff" className="nav-link">
                            <div>
                                <IconMapper iconName={"right"} isFontAwesome={true} />
                            </div>
                            timeoff
                        </Link>
                    )}
                    {showLinks.includes("timesheet") && (
                        <Link to="/superadmin/timesheet" className="nav-link">
                            <div>
                                <IconMapper iconName={"right"} isFontAwesome={true} />
                            </div>
                            timesheet
                        </Link>
                    )}
                </nav>
            </div>
        </div>
    );
};
export default Navbar;
