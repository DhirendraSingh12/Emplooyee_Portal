import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./AdminSidebar.css";
import IconMapper from "../../../components/IconMapper/IconMapper";
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1000 || window.innerHeight <= 720);
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 1000 || window.innerHeight <= 720);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleItemClick = (path) => {
    setActiveItem(path);
    if (isMobileView) {
      toggleSidebar();
    }
  };


  return (
    <>
      {isMobileView ? (
        <div className={`Admin-sidebar-popup ${isOpen ? "open" : ""}`}>
          <div className="Admin-sidebar-content">
            <div className="Admin-sidebar-header">
              <div className="Admin-popup-sidebar1">
                <div onClick={toggleSidebar} className="Admin-toggleMenu">
                  <img src="/assets/logo/hirefleX247.com-dark.png" alt="Logo" />
                </div>
                <div className="Admin-close-icon-sidebar" onClick={toggleSidebar}>
                  <IconMapper iconName="close" isFontAwesome={true} />
                </div>
              </div>
              <hr />
              <div className="Admin-slider2">
              <li
                className={`Admin-list-item ${activeItem === "/admin/dashboard" ? "active" : ""}`}
                onClick={() => handleItemClick("/admin/dashboard")}
              >
                <Link to="/admin/dashboard" className="Admin-list-item">
                  <IconMapper className="Admin-ImageIcons" iconName="ePayslips" />
                  {isOpen && <span className="Admin-list-item-text">Dashboard</span>}
                </Link>
              </li>
              <li
                className={`Admin-list-item ${activeItem === "/admin/payslip" ? "active" : ""}`}
                onClick={() => handleItemClick("/admin/payslip")}
              >
                <Link to="/admin/payslip" className="Admin-list-item">
                  <IconMapper className="Admin-ImageIcons" iconName="ePayslips" />
                  {isOpen && <span className="Admin-list-item-text"> Payslip</span>}
                </Link>
              </li>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="Admin-sidebar" style={{ width: isOpen ? "268px" : "68px" }}>
          <div className="Admin-sidebar-header">
            <div className="Admin-slider1">
              <div onClick={toggleSidebar} className="Admin-toggleMenu">
                <li className="Admin-list-items">
                  <IconMapper
                    className="Admin-ImageIcon"
                    iconName="bars"
                    isFontAwesome={true}
                  />
                  {isOpen && (
                    <img
                      className="Admin-LogoImage"
                      src="/assets/logo/hirefleX247.com-dark.png"
                      alt="Logo"
                    />
                  )}
                </li>
              </div>
            </div>
            <div className="Admin-slider2">
            <li
                className={`Admin-list-item ${activeItem === "/admin/dashboard" ? "active" : ""}`}
                onClick={() => handleItemClick("/admin/dashboard")}
              >
                <Link to="/admin/dashboard" className="Admin-list-item">
                  <IconMapper className="Admin-ImageIcons" iconName="Dashboard" />
                  {isOpen && <span className="Admin-list-item-text">Dashboard</span>}
                </Link>
              </li>
              <li
                className={`Admin-list-item ${activeItem === "/admin/payslip" ? "active" : ""}`}
                onClick={() => handleItemClick("/admin/payslip")}
              >
                <Link to="/admin/payslip" className="Admin-list-item">
                  <IconMapper className="Admin-ImageIcons" iconName="ePayslips" />
                  {isOpen && <span className="Admin-list-item-text"> Payslip</span>}
                </Link>
              </li>
              <li
                className={`Admin-list-item ${activeItem === "/admin/adminpaydata" ? "active" : ""}`}
                onClick={() => handleItemClick("/admin/adminpaydata")}
              >
                <Link to="/admin/adminpaydata" className="Admin-list-item">
                  <IconMapper className="Admin-ImageIcons" iconName="ePayslips" />
                  {isOpen && <span className="Admin-list-item-text"> AdminPayslip</span>}
                </Link>
              </li>
              <li
                className={`Admin-list-item ${activeItem === "/admin/addemployee" ? "active" : ""}`}
                onClick={() => handleItemClick("/admin/addemployee")}
              >
                <Link to="/admin/addemployee" className="Admin-list-item">
                  <IconMapper className="Admin-ImageIcons" iconName="ePayslips" />
                  {isOpen && <span className="Admin-list-item-text"> Add Employee</span>}
                </Link>
              </li>

              {/* <li className={`Admin-list-item ${activeItem === "/superadmin/account" ? "active" : ""}`}
                onClick={() => handleItemClick("/admin/account")}>
                <Link to="/superadmin/account" className="Admin-list-item">
                    <IconMapper className="Admin-ImageIcons" iconName="LogoMini" />
                    {isOpen && <span className="Admin-list-item-text">Account</span>}
                </Link>
                </li>
                <li className={`Admin-list-item ${activeItem === "/superadmin/account" ? "active" : ""}`}
                onClick={handleLogout}>
                <span className="Admin-list-item">
                    <IconMapper className="Admin-ImageIcons" iconName="Logout" />
                    {isOpen && <span className="Admin-list-item-text">Logout</span>}
                </span>
              </li> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;


