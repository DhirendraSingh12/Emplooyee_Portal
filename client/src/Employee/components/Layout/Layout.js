import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./Layout.css";

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="Employeelayout">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="Employeemain-content">
        <Header isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="Employeecontent">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;



