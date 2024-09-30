import React ,{useState} from "react";
import Header from "../../../components/AdminHeader/AdminNavbar";
import "./ImportBulkEmp.css";
import { Button } from "@mui/material";
import IconMapper from '../../../../components/IconMapper/IconMapper';
import { Box, Typography, Paper, IconButton } from "@mui/material";
import { useNavigate, } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";



const profileImage = "/assets/images/profile.jpg";
const ImportBulkEmp = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            console.log("Selected file:", file);
        }
    };
    return (
        <>
            <Header
                siteName={"Import Bulk Employee"}
                profileImage={profileImage}
                showLinks={["emppayslip"]}
            />
            <div className="import-emp-box">
                <Box p={4} sx={{ maxWidth: "850px", margin: "auto", }}>
                    <Box display="flex" alignItems="center" mb={2} ml={-1}>
                        <IconButton onClick={() => navigate('/admin/empdetails')}>
                            <ArrowBack />
                        </IconButton>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Back</Typography>
                    </Box>
                    <Typography variant="h4" mb={2} fontWeight="bold" className="import-box-title">Bulk import</Typography>
                    <Paper elevation={3} sx={{ p: 5, backgroundColor: "#f0f8ff", mb: 3 }}>
                        <Typography variant="body1" color="primary">
                            We’ve listened to your feedback! Probation is now included on the
                            employee bulk import. Please download and use the new template as
                            older versions will no longer work.
                        </Typography>
                    </Paper>
                    <Typography variant="body1" mb={3} fontWeight="600">
                        Download the template below and add up to 1,000 employees each time. Do
                        not delete or edit the column headings, as they’re needed for a
                        successful import.
                    </Typography>
                    <Button
                        className="downloaded-templated-btn"
                    >
                        Download template
                    </Button>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 4,
                            textAlign: "center",
                            border: "1.5px dashed rgba(0, 87, 173)",
                            mb: 3,
                            mt: 3,
                            backgroundColor: "#f9f9f9",
                            height: "300px",
                        }}
                    >
                        <div className="import-bulk-emp">
                            <IconMapper iconName={'BulkImport'} className="bulk-import-icon" />
                        </div>
                        <Typography variant="body1" color="textSecondary" mt={2} mb={6} >
                            Drag and drop your list of employees here
                        </Typography>
                        {/* Input field to select the file */}
                        <input
                            type="file"
                            accept=".xlsx"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                            id="bulk-file-input"
                        />
                        <label htmlFor="bulk-file-input">
                            <Button
                                variant="outlined"
                                className="browse-bulk-file"
                                component="span"
                            >
                                Browse files...
                            </Button>
                        </label>
                    </Paper>
                    <Typography variant="caption" color="textSecondary" fontSize='17px' fontWeight="600">
                        15 MB max size. File should end in .xlsx.
                    </Typography>
                    {/* Display selected file name */}
                    {selectedFile && (
                        <Typography variant="body1" mt={2}>
                            Selected file: {selectedFile.name}
                        </Typography>
                    )}
                </Box>
            </div>
        </>
    );
};

export default ImportBulkEmp;
