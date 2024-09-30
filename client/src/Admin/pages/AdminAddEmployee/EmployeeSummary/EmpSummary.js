import React, { useState } from "react";
import './EmpSummary.css';
import Header from '../../../components/AdminHeader/AdminNavbar';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";
const profileImage = "/assets/images/profile.jpg";
const EmpSummary = () => {
    const [selectedEmpSummary, setSelectedEmpSummary] = useState([]);
    const [currentItems] = useState([ { id: 1, name: "John Doe", email: "johndoe@example.com" },]); // Fill with actual data
    const navigate = useNavigate();

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedEmpSummary(currentItems.map(item => item.id));
        } else {
            setSelectedEmpSummary([]);
        }
    };
    const handleSelectEmpSummary = (id) => {
        setSelectedEmpSummary(prev =>
            prev.includes(id) ? prev.filter(payslipId => payslipId !== id) : [...prev, id]
        );
    };

  

    return (
        <>
            <Header
                siteName={"Employee Summary"}
                profileImage={profileImage}
                showLinks={["emppayslip"]}
            />
            <div className="multi-header-employee-summary">
                <p>Employee Details</p>
                <p>Employment Details</p>
                <p>Summary</p>
            </div>

            <div className="summary-tablebody">
                <table className="summary-table-data">
                    <thead>
                        <tr>
                            <th style={{ padding: "5px" }}>
                                <Checkbox
                                    checked={selectedEmpSummary.length === currentItems.length && currentItems.length > 0}
                                    indeterminate={selectedEmpSummary.length > 0 && selectedEmpSummary.length < currentItems.length}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th>Name</th>
                            <th style={{ paddingLeft: '20%' }}>Email address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((EmpSummary) => (
                            <tr key={EmpSummary.id}>
                                <td className="w-[10px]" style={{ padding: "5px", textAlign: 'left' }}>
                                    <Checkbox
                                        checked={selectedEmpSummary.includes(EmpSummary.id)}
                                        onChange={() => handleSelectEmpSummary(EmpSummary.id)}
                                    />
                                </td>
                                <td data-label="Name">{EmpSummary.name}</td>
                                <td style={{ paddingLeft: '20%' }} data-label="Email address">{EmpSummary.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="add-all-hireflex-footer">
                <div className="personal-button-container">
                    <button className="start-and-over-btn" onClick={() => navigate('/admin/empdetails')}>Start Over</button>
                    <button className="back-btn-summary" onClick={() => navigate('/admin/singledetails')}>Back</button>
                    <button className="save-and-continue-btn" onClick={() => navigate('/admin/finalsummary')}>Add all to HireFlex</button>
                </div>
            </div>
        </>
    );
};

export default EmpSummary;
