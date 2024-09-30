import React from "react";
import { Routes, Route } from "react-router-dom";
import SuperAdminLayout from "../components/SuperAdminLayout/SuperAdminLayout";
import AllEmployees from "../page/Employees/AllEmployee/AllEmployee";
import EditEmployee from "../page/Employees/EditEmployee/EditEmployee";
import SuperAdminPayslip from "../page/Payslip/SuperAdminPayslip";
import SuperAdminDashboard from "../page/SuperAdminDashboard/SuperAdminDashboard";
import AddEmployee from "../page/Employees/AddEmployee/AddEmployee";
import SuperAdminPerks from "../page/Perks/SuperAdminPerks/PerksSuperAdmin";
import Expenses from '../page/SuperAdminExpenses/SuperAdminExpense'
import TimeOffRequest from '../page/AdminTimeOff/SuperAdminTimeOff'
import SuperAdminLogin from "../auth/SuperAdminLogin";
import SuperAdminDocuments from "../page/DocumentSuperAdmin/SuperAdminDocuments";
import DocumentPage from "../page/DocumentSuperAdmin/DocumentPage";
import MeetingRecordPage from "../page/MeetingRecordPage/MeetingRecordPage";
import AssetManagementPage from '../page/AssetManagementPage/AssetManagementPage';
import SuperAdminTimesheet from "../page/SuperAdminTimesheet/SuperAdminTimesheet";
import SuperAdminTimesheetPopup from "../page/SuperAdminTimesheet/SuperAdminTimesheetDetails";
import {ROUTES} from './constants'
import { PrivateRoute } from "./PrivateRoute";
 export const SuperAdminRouting = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<SuperAdminLogin />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <SuperAdminLayout />
          </PrivateRoute>
        }
      >
        <Route path={ROUTES.DASHBOARD} element={<SuperAdminDashboard />} />
        <Route path={ROUTES.ALL_EMPLOYEES} element={<AllEmployees />} />
        <Route path={ROUTES.EDIT_EMPLOYEE} element={<EditEmployee />} />
        <Route path={ROUTES.ADD_EMPLOYEE} element={<AddEmployee />} />
        <Route path={ROUTES.SUPER_ADMIN_PAYSLIP} element={<SuperAdminPayslip />} />
        <Route path={ROUTES.PERKS_ADMIN} element={<SuperAdminPerks />} />
        <Route path={ROUTES.DOCUMENTS_ADMIN} element={<SuperAdminDocuments />} />
        <Route path={ROUTES.MEETING_RECORD} element={<MeetingRecordPage />} />
        <Route path={ROUTES.ASSET_MANAGEMENT} element={<AssetManagementPage/>} />
        <Route path={ROUTES.DOCUMENT_PAGE} element={ <DocumentPage/>} />
        <Route path={ROUTES.ADMIN_EXPENSES} element={ <Expenses/>} />
        <Route path={ROUTES.ADMIN_TIMEOFFREQUEST} element={ <TimeOffRequest/>} />
        <Route path={ROUTES.Super_ADMIN_TIMESHEET} element={ <SuperAdminTimesheet/>}/>
        <Route path={ROUTES.SuperADMINTIMESHEETPOPUP} element={<SuperAdminTimesheetPopup />} />
      </Route>
    </Routes>
  );
};

