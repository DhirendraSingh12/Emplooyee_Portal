import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SuperAdminSidebar.css";
import IconMapper from "../../../components/IconMapper/IconMapper";
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1000 || window.innerHeight <= 720);
  const [employeeDropdownOpen, setEmployeeDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
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

  const toggleDropdown = (setDropdownOpen) => {
    setDropdownOpen(prev => !prev);
  };

  const renderDropdownMenu = (dropdownOpen, menuItems) => {
    return dropdownOpen && (
      <ul className="dropdown-menu">
        {menuItems.map(({ path, icon, text }) => (
          <li
            key={path}
            className={`list-item ${activeItem === path ? "active" : ""}`}
            onClick={() => handleItemClick(path)}
          >
            <Link to={path} className="list-item">
              <IconMapper className="ImageIcons" iconName={icon} />
              {isOpen && <span className="list-item-text">{text}</span>}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      {isMobileView ? (
        <div className={`sidebar-popup ${isOpen ? "open" : ""}`}>
          <div className="sidebar-content">
            <div className="sidebar-header">
              <div className="popup-sidebar1">
                <div onClick={toggleSidebar} className="toggleMenu">
                  <img src="/assets/logo/hirefleX247.com-dark.png" alt="Logo" />
                </div>
                <div className="close-icon-sidebar" onClick={toggleSidebar}>
                  <IconMapper iconName="close" isFontAwesome={true} />
                </div>
              </div>
              <hr />
              <div className="slider2">
                <li className={`list-item ${activeItem === "/superadmin/dashboard" ? "active" : ""}`} onClick={() => toggleDropdown(setAdminDropdownOpen)}>
                  <span className="list-item">
                    <IconMapper className="ImageIcons" iconName="Dashboard" />
                    <span className="list-item-texts">Dashboard</span>
                    <IconMapper
                      // isFontAwesome={true}
                      className="dropdown-icon"
                      iconName={adminDropdownOpen ? "arrowUp" : "arrowDown"}
                    />
                  </span>
                </li>
                {renderDropdownMenu(adminDropdownOpen, [
                  { path: "/superadmin/dashboard", icon: "Dashboard", text: "Admin Dashboard" },
                  { path: "/superadmin/meetingRecordPage", icon: "Dailog", text: "DialogAdmin" },
                  { path: "/superadmin/assets", icon: "MeetingIcon", text: "Assest-Super-Admin" },

                ])}

                <li className={`list-item ${activeItem === "/superadmin/allemployees" ? "active" : ""}`} onClick={() => toggleDropdown(setEmployeeDropdownOpen)}>
                  <span className="list-items">
                    <IconMapper className="ImageIcons" iconName="ePayslips" />
                    {isOpen && (
                      <>
                        <span className="list-item-texts">Management</span>
                        <IconMapper
                          className="dropdown-icon"
                          iconName={employeeDropdownOpen ? "arrowUp" : "arrowDown"}
                        />
                      </>
                    )}
                  </span>
                </li>
                {renderDropdownMenu(employeeDropdownOpen, [
                  { path: "/superadmin/allemployees", icon: "ePayslips", text: "All Employees" },
                  { path: "/superadmin/addemployee", icon: "MyDocuments", text: "Add Employee" },
                  // { path: "/superadmin/editemployees/:id", icon: "Perks", text: "Edit Employee" },
                ])}

                <li
                  className={`list-item ${activeItem === "/superadmin/employeepayslip" ? "active" : ""}`}
                  onClick={() => handleItemClick("/superadmin/employeepayslip")}
                >
                  <Link to="/superadmin/employeepayslip" className="list-item">
                    <IconMapper className="ImageIcons" iconName="Dashboard" />
                    {isOpen && <span className="list-item-text">Employee Payslip</span>}
                  </Link>
                </li>
                <li
                  className={`list-item ${activeItem === "/superadmin/perksadmin" ? "active" : ""}`}
                  onClick={() => handleItemClick("/superadmin/perksadmin")}
                >
                  <Link to="/superadmin/perksadmin" className="list-item">
                    <IconMapper className="ImageIcons" iconName="Dashboard" />
                    {isOpen && <span className="list-item-text">Perks</span>}
                  </Link>
                </li>
                <li
                  className={`list-item ${activeItem === "superadmin/documentsadmin" ? "active" : ""}`}
                  onClick={() => handleItemClick("/superadmin/documentsadmin")}
                >
                  <Link to="superadmin/documentsadmin" className="list-item">
                    <IconMapper className="ImageIcons" iconName="Dashboard" />
                    {isOpen && <span className="list-item-text">Documents</span>}
                  </Link>
                </li>
                <li
                  className={`list-item ${activeItem === "/superadmin/timesheet" ? "active" : ""}`}
                  onClick={() => handleItemClick("/superadmin/timesheet")}
                >
                  <Link to="/superadmin/timesheet" className="list-item">
                    <IconMapper className="ImageIcons" iconName="Timesheet" />
                    {isOpen && <span className="list-item-text">Timesheet</span>}
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="sidebar" style={{ width: isOpen ? "268px" : "68px" }}>
          <div className="sidebar-header">
            <div className="slider1">
              <div onClick={toggleSidebar} className="toggleMenu">
                <li className="list-items">
                  <IconMapper
                    className="ImageIcon"
                    iconName="bars"
                    isFontAwesome={true}
                  />
                  {isOpen && (
                    <img
                      className="LogoImage"
                      src="/assets/logo/hirefleX247.com-dark.png"
                      alt="Logo"
                    />
                  )}
                </li>
              </div>
            </div>
            <div className="slider2">
              <li className={`list-item ${activeItem === "/superadmin/dashboard" ? "active" : ""}`} onClick={() => toggleDropdown(setAdminDropdownOpen)}>
                <span className="list-items">
                  <IconMapper className="ImageIcons" iconName="Dashboard" />
                  {isOpen && (
                    <>
                      <span className="list-item-texts">Dashboard</span>
                      <IconMapper
                        className="dropdown-icon"
                        iconName={adminDropdownOpen ? "arrowUp" : "arrowDown"}
                      />
                    </>
                  )}
                </span>
              </li>
              {renderDropdownMenu(adminDropdownOpen, [
                { path: "/superadmin/dashboard", icon: "Dashboard", text: "Dashboard" },
                { path: "/superadmin/meetingRecordPage", icon: "Dailog", text: "Dialog-Super-Admin" },
                { path: "/superadmin/assets", icon: "MeetingIcon", text: "Assest-Super-Admin" },

              ])}

              <li  className={`list-item ${activeItem === "/superadmin/allemployees" ? "active" : ""}`}onClick={() => toggleDropdown(setEmployeeDropdownOpen)}>
                <span className="list-items">
                  <IconMapper className="ImageIcons" iconName="MyDocuments" />
                  {isOpen && (
                    <>
                      <span className="list-item-texts">Employees</span>
                      <IconMapper
                        className="dropdown-icon"
                        iconName={employeeDropdownOpen ? "arrowUp" : "arrowDown"}
                      />
                    </>
                  )}
                </span>
              </li>
              {renderDropdownMenu(employeeDropdownOpen, [
                { path: "/superadmin/allemployees", icon: "MyDocuments", text: "All Employees" },
                { path: "/superadmin/addemployee", icon: "MyDocuments", text: "Add Employee" },
                // { path: "/superadmin/editemployees/:id", icon: "Perks", text: "Edit Employee" },
              ])}

              <li
                className={`list-item ${activeItem === "/superadmin/employeepayslip" ? "active" : ""}`}
                onClick={() => handleItemClick("/superadmin/employeepayslip")}
              >
                <Link to="/superadmin/employeepayslip" className="list-item">
                  <IconMapper className="ImageIcons" iconName="ePayslips" />
                  {isOpen && <span className="list-item-text">Payslip</span>}
                </Link>
              </li>
              <li
                className={`list-item ${activeItem === "/superadmin/perksadmin" ? "active" : ""}`}
                onClick={() => handleItemClick("/superadmin/perksadmin")}
              >
                <Link to="/superadmin/perksadmin" className="list-item">
                  <IconMapper className="ImageIcons" iconName="Perks" />
                  {isOpen && <span className="list-item-text">Perks</span>}
                </Link>
              </li>
              <li
                className={`list-item ${activeItem === "/superadmin/documentsadmin" ? "active" : ""}`}
                onClick={() => handleItemClick("/superadmin/documentsadmin")}
              >
                <Link to="/superadmin/documentsadmin" className="list-item">
                  <IconMapper className="ImageIcons" iconName="MyDocuments" />
                  {isOpen && <span className="list-item-text">Documents</span>}
                </Link>
              </li>
              <li
                className={`list-item ${activeItem === "/superadmin/expenses" ? "active" : ""}`}
                onClick={() => handleItemClick("/superadmin/expenses")}
              >
                <Link to="/superadmin/expenses" className="list-item">
                  <IconMapper className="ImageIcons" iconName="Expenses" />
                  {isOpen && <span className="list-item-text">Expenses</span>}
                </Link>
              </li>
              <li
                  className={`list-item ${activeItem === "/superadmin/timeoff" ? "active" : ""}`}
                  onClick={() => handleItemClick("/superadmin/timeoff")}
                >
                  <Link to="/superadmin/timeoff" className="list-item">
                    <IconMapper className="ImageIcons" iconName="TimeOfRequest" />
                    {isOpen && <span className="list-item-text">Time-Off Request</span>}
                  </Link>
                </li>
              <li
                  className={`list-item ${activeItem === "/superadmin/timesheet" ? "active" : ""}`}
                  onClick={() => handleItemClick("/superadmin/timesheet")}
                >
                  <Link to="/superadmin/timesheet" className="list-item">
                    <IconMapper className="ImageIcons" iconName="TimeSheets" />
                    {isOpen && <span className="list-item-text">Timesheet</span>}
                  </Link>
                </li>
               
            
              {/* <li className={`list-item ${activeItem === "/superadmin/account" ? "active" : ""}`}
                onClick={() => handleItemClick("/admin/account")}>
                <Link to="/superadmin/account" className="list-item">
                  <IconMapper className="ImageIcons" iconName="LogoMini" />
                  {isOpen && <span className="list-item-text">Account</span>}
                </Link>
              </li>
              <li className={`list-item ${activeItem === "/superadmin/account" ? "active" : ""}`}
              onClick={handleLogout}>
                <span className="list-item">
                  <IconMapper className="ImageIcons" iconName="Logout" />
                  {isOpen && <span className="list-item-text">Logout</span>}
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
