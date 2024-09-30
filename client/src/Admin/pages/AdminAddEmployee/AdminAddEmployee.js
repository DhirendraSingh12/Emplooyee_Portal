import React from "react";
import "./AdminAddEmployee.css";
import Header from "../../components/AdminHeader/AdminNavbar";
import CommonHeader from '../../../components/CommonHeader/index';
import { Link } from "react-router-dom";

const profileImage = "/assets/images/profile.jpg";



const AddEmployee = () => {
    return (
        <div>
            <Header
                siteName={" Employee hub"}
                profileImage={profileImage}
                showLinks={["emppayslip"]}
            />
            <div className="add-emp-table-container">
                <CommonHeader
                    showIcons={{ plus: true, trash: true, rotate: true }}
                />
            </div>

            <div className="emp-add-btn">
                <header className="emp-add-header">
                {/* <div className="multi-header-container">
                    <p>Employee Details</p>
                    <p>Employment Details</p>
                    <p>Summary</p>
                </div> */}
                    <button className="emp-add-btn">  <Link to={'/admin/empdetails'}>Add Employee</Link> </button>
                    {/* <span>2 employees not registered for HireFleX247 <button className="head-view-btn">View</button></span> */}
                </header>
            </div>
        </div>
    );
};

export default AddEmployee;
