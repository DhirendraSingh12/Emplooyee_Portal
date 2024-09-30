import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"; 

import "./App.css";
import Login from "./Employee/auth/Login/Login";
import Register from "./Employee/auth/Register/Register";
import Layout from "./Employee/components/Layout/Layout";
import Dashboard from "./Employee/pages/Dashboard/Dashboard";
import Payslips from "./Employee/pages/Payslips/Payslips";
import Documents from "./Employee/pages/Documents/Documents";
import Perks from "./Employee/pages/Perks/Perks";
import Policies from "./Employee/pages/Policies/Policies";
import Expenses from "./Employee/pages/Expenses/Expenses";
import TimeOff from "./Employee/pages/TimeOff/TimeOff";
import EmpDialogues from "./Employee/pages/Dashboard/Emp_Dialogues";
import ParentComponent from "./Employee/pages/Timesheets/ParentComponent";
import Account from "./Employee/pages/Account/Account";
import { SuperAdminRouting } from "../src/SuperAdmin/Router/index";
import { AdminRouting } from "./Admin/Router";
import PrivateRoute from "./Employee/auth/PrivateRoute/PrivateRoute"; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  return (
      <Routes>
        <Route path="/superadmin/*" element={<SuperAdminRouting />} />
        <Route path="/admin/*" element={<AdminRouting />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute element={<Layout/>} isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />} />
          <Route path="/payslips" element={<PrivateRoute element={<Payslips />} isAuthenticated={isAuthenticated} />} />
          <Route path="/documents" element={<PrivateRoute element={<Documents />} isAuthenticated={isAuthenticated} />} />
          <Route path="/emp_dialogues" element={<PrivateRoute element={<EmpDialogues />} isAuthenticated={isAuthenticated} />} />
          <Route path="/perks" element={<PrivateRoute element={<Perks />} isAuthenticated={isAuthenticated} />} />
          <Route path="/policies" element={<PrivateRoute element={<Policies />} isAuthenticated={isAuthenticated} />} />
          <Route path="/expenses" element={<PrivateRoute element={<Expenses />} isAuthenticated={isAuthenticated} />} />
          <Route path="/timeoff" element={<PrivateRoute element={<TimeOff />} isAuthenticated={isAuthenticated} />} />
          <Route path="/timesheets" element={<PrivateRoute element={<ParentComponent />} isAuthenticated={isAuthenticated} />} />
          <Route path="/account" element={<PrivateRoute element={<Account />} isAuthenticated={isAuthenticated} />} />
        </Route>
      </Routes>
  );
}

export default App;
