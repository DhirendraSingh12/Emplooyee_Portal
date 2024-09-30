import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // MUI icon for success
import { Typography, Box } from '@mui/material'; // MUI components

const EmpAddSuccessfully = () => {
    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            height="100vh"
        >
            <CheckCircleIcon style={{ fontSize: 60, color: 'green' }} />
            <Typography variant="h5" style={{ marginTop: 16 }}>
                Employee added successfully!
            </Typography>
        </Box>
    );
}

export default EmpAddSuccessfully;
