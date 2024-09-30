import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../AdminSidebar/AdminSidebar";
import "./AdminLayout.css";
import Header from "../../../Employee/components/Header/Header";

const AdminLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="Admins-layout">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="Admins-main-content">
                <Header isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="Admins-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
