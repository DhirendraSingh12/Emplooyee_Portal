
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SuperAdminSidebar from "../SuperAdminSidebar/SuperAdminSidebar";
import SuperAdminHeader from "../SuperAdminHeader/SuperAdminHeader";
import "./SuperAdminLayout.css";

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="SuperAdmin-layout">
      <SuperAdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="SuperAdmin-main-content">
        <SuperAdminHeader isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="SuperAdmin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

