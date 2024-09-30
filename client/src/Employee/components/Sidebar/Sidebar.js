
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import IconMapper from "../../../components/IconMapper/IconMapper";
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [isMobileView, setIsMobileView] = useState(
    window.innerWidth <= 1000
  );
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  useEffect(() => {
    const handleResize = () =>
      setIsMobileView(window.innerWidth <= 1000);
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
    setDropdownOpen((prev) => !prev);
  };

  const renderDropdownMenu = (dropdownOpen, menuItems) => {
    return (
      dropdownOpen && (
        <ul className="dropdown-menu">
          {menuItems.map(({ path, icon, text }) => (
            <li
              key={path}
              className={`list-item ${activeItem === path ? "active" : ""
                }`}
              onClick={() => handleItemClick(path)}
            >
              <Link to={path} className="list-item">
                <IconMapper className="ImageIcons" iconName={icon} />
                {isOpen && <span className="list-item-text">{text}</span>}
              </Link>
            </li>
          ))}
        </ul>
      )
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
                <div
                  className="close-icon-sidebar"
                  onClick={toggleSidebar}
                >
                  <IconMapper iconName="close" isFontAwesome={true} />
                </div>
              </div>
              <hr />
              <div className="slider2">
                <li
                  className="list-item"
                  onClick={() => toggleDropdown(setAdminDropdownOpen)}
                >
                  <span  className={`list-item ${activeItem === "/dashboard" ? "active" : ""
                    }`}>
                    <IconMapper
                      className="ImageIcons"
                      iconName="Dashboard"
                    />
                    <span className="list-item-texts">Dashboard</span>
                    <IconMapper
                      // isFontAwesome={true}
                      className="dropdown-icon"
                      iconName={adminDropdownOpen ? "arrowUp" : "arrowDown"}
                    />
                  </span>
                </li>
                {renderDropdownMenu(adminDropdownOpen, [
                  {
                    path: "/dashboard",
                    icon: "Dashboard",
                    text: "Admin Dashboard",
                  },
                  {
                    path: "/emp_dialogues",
                    icon: "Dailog",
                    text: "DialogAdmin",
                  },
                ])}
                <li
                  className={`list-item ${activeItem === "/payslips" ? "active" : ""
                    }`}
                  onClick={() => handleItemClick("/payslips")}
                >
                  <Link to="/payslips" className="list-item">
                    <IconMapper
                      className="ImageIcons"
                      iconName="ePayslips"
                    />
                    {isOpen && (
                      <span className="list-item-text"> Payslip</span>
                    )}
                  </Link>
                </li>
                <li
                  className={`list-item ${activeItem === "/documents" ? "active" : ""
                    }`}
                  onClick={() => handleItemClick("/documents")}
                >
                  <Link to="/documents" className="list-item">
                    <IconMapper
                      className="ImageIcons"
                      iconName="MyDocuments"
                    />
                    {isOpen && (
                      <span className="list-item-text">
                        {" "}
                        My Documents
                      </span>
                    )}
                  </Link>
                </li>
                <li
                  className={`list-item ${activeItem === "/perks" ? "active" : ""
                    }`}
                  onClick={() => handleItemClick("/perks")}
                >
                  <Link to="/perks" className="list-item">
                    <IconMapper className="ImageIcons" iconName="Perks" />
                    {isOpen && (
                      <span className="list-item-text"> My Perks</span>
                    )}
                  </Link>
                </li>
                <li
                  className={`list-item ${activeItem === "/policies" ? "active" : ""
                    }`}
                  onClick={() => handleItemClick("/policies")}
                >
                  <Link to="/policies" className="list-item">
                    <IconMapper
                      className="ImageIcons"
                      iconName="CompanyPolicies"
                    />
                    {isOpen && (
                      <span className="list-item-text">
                        Company Policies
                      </span>
                    )}
                  </Link>
                </li>
                <li
                  className={`list-item ${activeItem === "/expenses" ? "active" : ""
                    }`}
                  onClick={() => handleItemClick("/expenses")}
                >
                  <Link to="/expenses" className="list-item">
                    <IconMapper
                      className="ImageIcons"
                      iconName="Expenses"
                    />
                    {isOpen && (
                      <span className="list-item-text">
                        {" "}
                        Submit Expenses
                      </span>
                    )}
                  </Link>
                </li>
                <li
                  className={`list-item ${activeItem === "/timeoff" ? "active" : ""
                    }`}
                  onClick={() => handleItemClick("/timeoff")}
                >
                  <Link to="/timeoff" className="list-item">
                    <IconMapper
                      className="ImageIcons"
                      iconName="TimeOfRequest"
                    />
                    {isOpen && (
                      <span className="list-item-text">
                        Time-Off Request
                      </span>
                    )}
                  </Link>
                </li>
                <li
                  className={`list-item ${activeItem === "/timesheets" ? "active" : ""
                    }`}
                  onClick={() => handleItemClick("/timesheets")}
                >
                  <Link to="/timesheets" className="list-item">
                    <IconMapper
                      className="ImageIcons"
                      iconName="TimeSheets"
                    />
                    {isOpen && (
                      <span className="list-item-text">
                        My Timesheets
                      </span>
                    )}
                  </Link>
                </li>{" "}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="sidebar"
          style={{ width: isOpen ? "270px" : "68px" }}
        >
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
              <li
                 className={`list-item ${activeItem === "/dashboard" ? "active" : ""
                }`}
                onClick={() => toggleDropdown(setAdminDropdownOpen)}
              >
                <span className="list-items">
                  <IconMapper
                    className="ImageIcons"
                    iconName="Dashboard"
                  />
                  {isOpen && (
                    <>
                      <span className="list-item-texts ">Dashboard</span>
                      <IconMapper
                        className="dropdown-icon"
                        iconName={adminDropdownOpen ? "arrowUp" : "arrowDown"}
                      />
                    </>
                  )}
                </span>
              </li>
              {renderDropdownMenu(adminDropdownOpen, [
                { path: "/dashboard", icon: "Dashboard", text: "Dashboard", },
                { path: "/emp_dialogues", icon: "Dailog", text: "Emp_Dialog" },
              ])}

              <li
                className={`list-item ${activeItem === "/payslips" ? "active" : ""
                  }`}
                onClick={() => handleItemClick("/payslips")}
              >
                <Link to="/payslips" className="list-item">
                  <IconMapper
                    className="ImageIcons"
                    iconName="ePayslips"
                  />
                  {isOpen && (
                    <span className="list-item-text"> Payslip</span>
                  )}
                </Link>
              </li>
              <li
                className={`list-item ${activeItem === "/documents" ? "active" : ""
                  }`}
                onClick={() => handleItemClick("/documents")}
              >
                <Link to="/documents" className="list-item">
                  <IconMapper
                    className="ImageIcons"
                    iconName="MyDocuments"
                  />
                  {isOpen && (
                    <span className="list-item-text"> My Documents</span>
                  )}
                </Link>
              </li>
              <li
                className={`list-item ${activeItem === "/perks" ? "active" : ""
                  }`}
                onClick={() => handleItemClick("/perks")}
              >
                <Link to="/perks" className="list-item">
                  <IconMapper className="ImageIcons" iconName="Perks" />
                  {isOpen && (
                    <span className="list-item-text"> My Perks</span>
                  )}
                </Link>
              </li>

              <li
                className={`list-item ${activeItem === "/policies" ? "active" : ""
                  }`}
                onClick={() => handleItemClick("/policies")}
              >
                <Link to="/policies" className="list-item">
                  <IconMapper
                    className="ImageIcons"
                    iconName="CompanyPolicies"
                  />
                  {isOpen && (
                    <span className="list-item-text">
                      Company Policies
                    </span>
                  )}
                </Link>
              </li>
              <li
                className={`list-item ${activeItem === "/expenses" ? "active" : ""
                  }`}
                onClick={() => handleItemClick("/expenses")}
              >
                <Link to="/expenses" className="list-item">
                  <IconMapper
                    className="ImageIcons"
                    iconName="Expenses"
                  />
                  {isOpen && (
                    <span className="list-item-text">
                      {" "}
                      Submit Expenses
                    </span>
                  )}
                </Link>
              </li>

              <li
                className={`list-item ${activeItem === "/timeoff" ? "active" : ""
                  }`}
                onClick={() => handleItemClick("/timeoff")}
              >
                <Link to="/timeoff" className="list-item">
                  <IconMapper
                    className="ImageIcons"
                    iconName="TimeOfRequest"
                  />
                  {isOpen && (
                    <span className="list-item-text">
                      Time-Off Request
                    </span>
                  )}
                </Link>
              </li>
              <li
                className={`list-item ${activeItem === "/timesheets" ? "active" : ""
                  }`}
                onClick={() => handleItemClick("/timesheets")}
              >
                <Link to="/timesheets" className="list-item">
                  <IconMapper
                    className="ImageIcons"
                    iconName="TimeSheets"
                  />
                  {isOpen && (
                    <span className="list-item-text">My Timesheets</span>
                  )}
                </Link>
              </li>

              {/* <li
                className={`list-item ${
                  activeItem === "/account" ? "active" : ""
                }`}
                onClick={() => handleItemClick("/account")}
              >
                <Link to="/account" className="list-item">
                  <IconMapper
                    className="ImageIcons"
                    iconName="LogoMini"
                  />
                  {isOpen && (
                    <span className="list-item-text">Account</span>
                  )}
                </Link>
              </li>
              <li
                className={`list-item ${
                  activeItem === "/logout" ? "active" : ""
                }`}
                onClick={() => handleItemClick("/logout")}
              >
                <Link to="/logout" className="list-item">
                  <IconMapper
                    className="ImageIcons"
                    iconName="Logout"
                  />
                  {isOpen && (
                    <span className="list-item-text">Logout</span>
                  )}
                </Link>
              </li> */}

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;


