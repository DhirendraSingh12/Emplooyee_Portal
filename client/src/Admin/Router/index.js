import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLogin from "../auth/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import AdminPayslip from "../pages/AdminPayslip/AdminPayslip";
import AdminPaySlipTableData from '../pages/AdminPayTable/AdminPaySlipTable'
import AdminLayout from "../components/Layout/AdminLayout";
import AddEmployee from "../pages/AdminAddEmployee/AdminAddEmployee";
import EmployeeDetails from "../pages/AdminAddEmployee/EmployeeDetails/EmployeeDetails";
import EmployeePersonalDetails from "../pages/AdminAddEmployee/EmployeePersonalDetails/EmployeePersonalDetails";
import ImportBulkEmp from "../pages/AdminAddEmployee/ImportBulkEmp/ImportBulkEmp";
import SingleEmpDetails from "../pages/AdminAddEmployee/SingleEmployeeDetails/SingleEmpDetails";
import EmpSummary from "../pages/AdminAddEmployee/EmployeeSummary/EmpSummary";
import FinalSummary from "../pages/AdminAddEmployee/FinalSummary/FinalSummary";
import EmpAddSuccessfully from "../pages/AdminAddEmployee/EmployeeAddSuccessfully/EmpAddSuccessfully";
import { ROUTES } from './constants'
import { PrivateRoute } from "./PrivateRoute";

export const AdminRouting = () => {
    return (
        <Routes>
     <Route path={ROUTES.LOGIN} element={<AdminLogin />} />

            <Route
                path="/"
                element={
                    <PrivateRoute>
                        < AdminLayout />
                    </PrivateRoute>
                }
            >
                <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard/>}/>
                <Route path={ROUTES.ADMIN_PAY_SLIP} element={<AdminPayslip />} />
                <Route path={ROUTES.ADMIN_DataTable} element={<AdminPaySlipTableData />} />
                <Route path={ROUTES.ADD_EMPLOYEE} element={<AddEmployee />}/>
                <Route path={ROUTES.EMP_DETAILS} element={<EmployeeDetails/>}/>
                <Route path={ROUTES.EMPLOYEE_PERSONAL_DETAILS} element={<EmployeePersonalDetails />}/>
                <Route path={ROUTES.IMPORT_BULK_EMP} element={<ImportBulkEmp/>}/>
                <Route path={ROUTES.SINGLE_EMP_DETAILS} element={<SingleEmpDetails/>}/>
                <Route path={ROUTES.EMP_SUMMARY} element={<EmpSummary/>}/>
                <Route path={ROUTES.FINAL_SUMMARY} element={<FinalSummary/>}/>
                <Route path={ROUTES.EMP_ADD_SUCCESSFULLY} element={<EmpAddSuccessfully/>}/>
            </Route>
        </Routes>
    )
}