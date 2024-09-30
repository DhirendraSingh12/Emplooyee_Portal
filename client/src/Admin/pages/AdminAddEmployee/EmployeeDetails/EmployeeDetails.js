import React, { useState } from 'react';
import './EmployeeDetails.css';
import Header from "../../../components/AdminHeader/AdminNavbar";
import IconMapper from '../../../../components/IconMapper/IconMapper';
import { Link, useNavigate, } from "react-router-dom";
import { IconButton  } from '@mui/material';
import { ArrowBack } from "@mui/icons-material";

const profileImage = "/assets/images/profile.jpg";

function EmployeeDetails() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
    
        if (!firstName && !lastName) {
            newErrors.form = "Either first name or last name is required.";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            console.log("Form Submitted:", { firstName, lastName });
            navigate('/admin/emppersonaldetails' , { state: { firstName, lastName } });
        } else {
            alert("Please fill in the employee details or upload a bulk file.");
        }
    };

    return (
        <>
            <Header
                siteName="Employee Details"
                profileImage={profileImage}
                showLinks={["emppayslip"]}
            />
            {/* <div className="emp-details-container">
                <CommonHeader showIcons={{ plus: true, trash: true, rotate: true }} />
            </div> */}

            <div className="emp-details-container">
            <div className="multi-header-emp-details">
                    <p>Employee Details</p>
                    <p>Employment Details</p>
                    <p>Summary</p>
                </div>
                <div className="inp-details-form">
                <div className="back-arrow-section" onClick={() => navigate('/admin/addemployee')}>
                            <IconButton>
                                <ArrowBack />
                            </IconButton>
                            <span className="arrow-label">Back</span>
                        </div>
                    <span>No employees added, please start entering your first employee below to get started.</span>
                    <form onSubmit={handleSubmit}>
                        <div className="input-details">
                            <label>
                                <input
                                    type="text"
                                    id='first_name'
                                    name='first_name'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder='First Name'
                                    className={errors.firstName ? 'input-error' : ''}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    id='last_name'
                                    name='last_name'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder='Last Name'
                                    className={errors.lastName ? 'input-error' : ''}
                                />
                            </label>
                            <button type="submit" className='check-mark-btn'>
                                <IconMapper iconName="checkmark" className="check-mark-icon" />
                                <p>or press enter to save</p>
                            </button>
                        </div>
                    </form>

                    <div className="bulk-text-container">
                        <div className="bulk-icon">
                            <IconMapper iconName={'bulkimport'} className="import-icon" />
                        </div>
                        <div className="bulk-text">
                            <p>Enter your employee details above to get started, or bulk import up to 1,000 employees at once.</p>
                        </div>
                    </div>

                    <div className="bulk-import-btn-container">
                        <button className="bulk-import-btn">
                            <Link to={'/admin/importbulkemp'}>
                                Bulk import employees
                            </Link> </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EmployeeDetails;
