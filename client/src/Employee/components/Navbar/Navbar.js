import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import IconMapper from "../../../components/IconMapper/IconMapper";
const Navbar = ({ siteName, showLinks }) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h2>{siteName}</h2>
      </div>
      <div className="navbar-right">
        <nav className="gap-7px">
          <Link to="/dashboard" className="nav-link">
            <div className="gap-2">
              <IconMapper iconName={"home"} isFontAwesome={true} />
              <IconMapper iconName={"right"} isFontAwesome={true} />
            </div>
            Home
          </Link>
          {showLinks.includes("documents") && (
            <Link to="/documents" className="nav-link">
              <div>
                <IconMapper iconName={"right"} isFontAwesome={true} />
              </div>
              Documents
            </Link>
          )}
            {showLinks.includes("emp_dialogues") && (
            <Link to="/emp_dialogues" className="nav-link">
              <div>
                <IconMapper iconName={"right"} isFontAwesome={true} />
              </div>
              Dialogues Section
            </Link>
          )}
          {showLinks.includes("payslips") && (
            <Link to="/payslips" className="nav-link">
              <div>
                <IconMapper iconName={"right"} isFontAwesome={true} />
              </div>
              Payslips
            </Link>
          )}
          {showLinks.includes("perks") && (
            <Link to="/perks" className="nav-link">
              <div>
                <IconMapper iconName={"right"} isFontAwesome={true} />
              </div>
              perks
            </Link>
          )}
          {showLinks.includes("policies") && (
            <Link to="/policies" className="nav-link">
              <div>
                <IconMapper iconName={"right"} isFontAwesome={true} />
              </div>
              policies
            </Link>
          )}
          {showLinks.includes("expenses") && (
            <Link to="/expenses" className="nav-link">
              <div>
                <IconMapper iconName={"right"} isFontAwesome={true} />
              </div>
              expenses
            </Link>
          )}
          {showLinks.includes("timeoff") && (
            <Link to="/timeoff" className="nav-link">
              <div>
                <IconMapper iconName={"right"} isFontAwesome={true} />
              </div>
              timeoff
            </Link>
          )}
          {showLinks.includes("timesheets") && (
            <Link to="/timesheets" className="nav-link">
              <div>
                <IconMapper iconName={"right"} isFontAwesome={true} />
              </div>
              timesheets
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};
export default Navbar;
