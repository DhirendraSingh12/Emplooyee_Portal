import React from "react";
import { Box, Button, Typography, Grid, Table, TableBody, TableRow, TableCell } from "@mui/material";
import "./AdminPayslip.css";

const AdminPayslip = () => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <Box className="payslip-print" sx={{ padding: 3 }}>
            <Box className="header-print" sx={{ textAlign: "center", marginBottom: 3 }}>
                <Typography variant="h4">Payslip</Typography>
                <Typography variant="h6">Payslip for the month of August 2024</Typography>
            </Box>

            <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: 3 }}>
                <Grid item>
                <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
  <img src="/assets/logo/check1.jpg" alt="TechAghori Logo" style={{ width: '2%', height: '2%', marginRight: 8 }} />
  TechAghori Technology
</Typography>

                    <Typography>Indore M.P.</Typography>
                    <Typography>Indore city</Typography>
                    <Typography>India</Typography>
                    <Typography>hr@techaghori.com</Typography>
                </Grid>
                <Grid item sx={{ textAlign: "right" }}>
                    <Typography>Payment to</Typography>
                    <Typography>XYZ</Typography>
                    <Typography>TechAghori Technology</Typography>
                    <Typography>Indore M.P.</Typography>
                    <Typography>Indore city</Typography>
                    <Typography>India</Typography>
                    <Typography>xy@z.com</Typography>
                </Grid>
            </Grid>

            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <Typography variant="h6">Earnings</Typography>
                    <Table>
                        <TableBody>
                            {[
                                { label: "Basic", amount: "₹8,568" },
                                { label: "HRA", amount: "₹125" },
                                { label: "DA", amount: "₹87" },
                                { label: "Special Allowance", amount: "₹50" },
                                { label: "Bonus", amount: "₹75" },
                                { label: "Total Earnings", amount: "₹8,905" },
                            ].map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.label}</TableCell>
                                    <TableCell align="right">{item.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Typography><strong>Net Pay: ₹8,552.00</strong></Typography>
                    <Typography variant="caption">Eight Thousand Five Hundred Fifty Two Only</Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography variant="h6">Deductions</Typography>
                    <Table>
                        <TableBody>
                            {[
                                { label: "Provident Fund", amount: "₹10" },
                                { label: "Professional Tax", amount: "₹20" },
                                { label: "ESI", amount: "₹0" },
                                { label: "Home Loan", amount: "₹210" },
                                { label: "TDS", amount: "₹113" },
                                { label: "Total Deductions", amount: "₹353" },
                            ].map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.label}</TableCell>
                                    <TableCell align="right">{item.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>

            <Box className="footer-print" sx={{ textAlign: "right", marginTop: 5 }}>
                <Typography>For XYZ</Typography>
                <Typography>Authorised Signatory</Typography>
            </Box>

            <Button variant="contained" color="primary" onClick={handlePrint} sx={{ marginTop: 3 }}>
                Print this receipt
            </Button>
        </Box>
    );
};

export default AdminPayslip;
