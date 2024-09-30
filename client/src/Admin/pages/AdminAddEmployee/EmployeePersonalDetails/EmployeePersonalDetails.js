import React, { useState } from "react";
import {
    TextField,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper,
    IconButton,
    Box,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { ArrowBack } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import './EmployeePersonalDetails.css';
import Header from '../../../components/AdminHeader/AdminNavbar';

const profileImage = "/assets/images/profile.jpg";
const EmployeePersonalDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const { firstName, lastName, email } = location.state || {};  // Get the passed data
    const [formData, setFormData] = useState({
        title: "",
        firstName: firstName || "",  // Use the passed firstName
        lastName: lastName || "",    // Use the passed lastName
        middleName: "",
        gender: "",
        dob: "",
        email: email || "",
        mobile: "",
        jobTitle: "",
        startDate: "",
        probationEndDate: "",
        address1: "",
        address2: "",
        address3: "",
        townCity: "",
        country: "",
        postcode: "",
        emergencyContact: "",
        bankAccountName: "",
        bankName: "",
        bankBranch: "",
        accountNumber: "",
        sortCode: "",
        taxCode: "",
        niNumber: "",
        passportNumber: "",
        passportCountry: "",
        passportExpiry: "",
        drivingLicenceNumber: "",
        drivingLicenceCountry: "",
        licenceClass: "",
        drivingLicenceExpiry: "",
        visaNumber: "",
        visaExpiry: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted", formData);
        navigate('/admin/singledetails');
    };

    return (
        <>
            <Header
                siteName={"Employee Personal Details"}
                profileImage={profileImage}
                showLinks={["emppayslip"]}
            />
            <div className="multi-header-emp-details">
                <p>Employee Details</p>
                <p>Employment Details</p>
                <p>Summary</p>
            </div>
            <div className="layout-personal-container">
                {/* Left container with back button, name, and additional container */}
                <div className="left-personal-container">
                    <div className="header-personal-left">
                        <div className="back-arrow-section" onClick={() => navigate('/admin/empdetails')}>
                            <IconButton>
                                <ArrowBack />
                            </IconButton>
                            <span className="arrow-label">Back</span>
                        </div>
                        <div className="personal-name-section">
                            <span style={{ fontSize: '20px', fontWeight: '600' }}>{`${firstName} ${lastName}`}</span>
                        </div>
                    </div>

                    {/* Additional container on the left side */}
                    <div className="additional-left-container">
                        <Box display="flex" alignItems="center" spacing={1}>
                            <Box flexGrow={1} marginRight={2}>
                                <TextField
                                    label="Search"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Box>
                            <Box width="200px"> {/* Set a fixed width for the dropdown */}
                                <TextField
                                    select
                                    label="Dropdown"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                >
                                    <MenuItem value="email">Email</MenuItem>
                                    <MenuItem value="firstName">First Name</MenuItem>
                                    <MenuItem value="lastName">Last Name</MenuItem>
                                </TextField>
                            </Box>
                        </Box>

                        <div className="personal-name-email-container">
                            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                                <Box>
                                    <Typography variant="h6" component="span">
                                        {`${firstName} ${lastName}`}
                                    </Typography>
                                    <Typography variant="body2">
                                        {email}
                                    </Typography>
                                </Box>
                                <IconButton
                                    color="error"
                                    aria-label="delete"

                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </div>

                    </div>
                </div>

                {/* Right container with the form */}
                <div className="personal-right-container">
                    <Paper elevation={3} className="employee-details-form-container">
                        <form onSubmit={handleSubmit} className="employee-details-form">
                            <Typography style={{ fontSize: '1.25rem', fontWeight: '600' }} className="form-details-title">Basic Details</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Title</InputLabel>
                                        <Select name="title" label="Title" value={formData.title} onChange={handleChange}>
                                            <MenuItem value="Mr">Mr</MenuItem>
                                            <MenuItem value="Mrs">Mrs</MenuItem>
                                            <MenuItem value="Miss">Miss</MenuItem>
                                            <MenuItem value="Dr">Dr</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth name="firstName" label="First Name" value={formData.firstName} onChange={handleChange} required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth name="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth name="middleName" label="Middle Name" value={formData.middleName} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Gender</InputLabel>
                                        <Select name="gender" value={formData.gender} onChange={handleChange}>
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        name="dob"
                                        label="Date of Birth"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        required
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth name="email" label="Email Address" type="email" value={formData.email} onChange={handleChange} required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth name="mobile" label="Mobile Number" value={formData.mobile} onChange={handleChange} required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth name="jobTitle" label="Job Title" value={formData.jobTitle} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        name="startDate"
                                        label="Employee Start Date"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        required
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        name="probationStartDate"
                                        label="Probation Start Date"
                                        value={formData.probationStartDate}
                                        onChange={handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <Typography style={{ fontSize: '1.25rem', fontWeight: '600' }} className="form-details-title">Address Details</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField fullWidth name="address1" label="Address 1" value={formData.address1} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth name="address2" label="Address 2" value={formData.address2} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth name="address3" label="Address 3" value={formData.address3} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth name="townCity" label="Town/City" value={formData.townCity} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth name="country" label="Country" value={formData.country} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth name="postcode" label="Postcode" value={formData.postcode} onChange={handleChange} />
                                </Grid>
                            </Grid>

                            <Typography style={{ fontSize: '1.25rem', fontWeight: '600' }} className="form-details-title">Emergency Contact</Typography>
                            <div className="emergency-container">
                                <button className="emergency-btn" onClick={() => alert("Emergency contact action")}>
                                    Emergency Contact
                                </button>
                                <span>Add an emergency contact in case something unexpected happens.</span>
                            </div>

                            <Typography style={{ fontSize: '1.25rem', fontWeight: '600' }} className="form-details-title">Bank Details</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth name="bankAccountName" label="Name on Account" value={formData.bankAccountName} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth name="bankName" label="Name of Bank" value={formData.bankName} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth name="bankBranch" label="Bank Branch" value={formData.bankBranch} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth name="accountNumber" label="Account Number" value={formData.accountNumber} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth name="sortCode" label="Sort Code" value={formData.sortCode} onChange={handleChange} />
                                </Grid>
                            </Grid>

                            <Typography style={{ fontSize: '1.25rem', fontWeight: '600' }} className="form-details-title">Sensitive Details</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth name="taxCode" label="Tax Code" value={formData.taxCode} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth name="niNumber" label="NI Number" value={formData.niNumber} onChange={handleChange} />
                                </Grid>
                            </Grid>

                            <Typography style={{ fontSize: '1.25rem', fontWeight: '600' }} className="form-details-title">Passport</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth name="passportNumber" label="Passport Number" value={formData.passportNumber} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth name="passportCountry" label="Country of Issue" value={formData.passportCountry} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        name="passportExpiryDate"
                                        label="Passport Expiry Date"
                                        value={formData.passportExpiryDate}
                                        onChange={handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <Typography style={{ fontSize: '1.25rem', fontWeight: '600' }} className="form-details-title">Driving Licence</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth name="drivingLicenceNumber" label="Licence Number" value={formData.drivingLicenceNumber} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth name="drivingLicenceCountry" label="Country of Issue" value={formData.drivingLicenceCountry} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth name="licenceClass" label="Licence Class" value={formData.licenceClass} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        name="dateOfExpiry"
                                        label="Date of Expiry"
                                        value={formData.dateOfExpiry}
                                        onChange={handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <Typography style={{ fontSize: '1.25rem', fontWeight: '600' }} className="form-details-title">Visa</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth name="visaNumber" label="Visa Number" value={formData.visaNumber} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        name="visaExpiryDate"
                                        label="Visa Expiry Date"
                                        value={formData.visaExpiryDate}
                                        onChange={handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </div>
            </div>
            <div className="save-and-continue-footer">
                <div className="personal-button-container">
                    <button className="start-and-over-btn" onClick={() => navigate('/admin/empdetails')}>Start Over</button>
                    <button className="save-and-continue-btn" onClick={() => navigate('/admin/singledetails')}>Save & Continue</button>
                </div>
            </div>
        </>
    );



};

export default EmployeePersonalDetails;