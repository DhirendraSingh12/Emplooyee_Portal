import React, { useState } from "react";
import "./Header.css";
import IconMapper from "../../../components/IconMapper/IconMapper";
import { Link } from "react-router-dom";
import { ProfileImage } from "../../../components/Profile/profile";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/authSlice/authSlice"; 
const profile = "/assets/images/profile.jpg";

const Header = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const togglePopup = (e) => {
    e.stopPropagation();
    setIsPopupOpen(!isPopupOpen);
    setIsSettingsOpen(false);
  };


  const closePopup = () => {
    if (isPopupOpen) {
      setIsPopupOpen(false);
      setIsSettingsOpen(false);
    }
  };
  const handleLogout = () => {
    dispatch(logout());  // Dispatch the logout action to clear authentication state
  };

  return (
    <header className="employee-header" onClick={closePopup}>
      <div className="header-left">
        <IconMapper
          iconName={"bars"}
          isFontAwesome={true}
          className="IconHembar"
          onClick={toggleSidebar}
        />
        <img
          className="logomedia"
          src="/assets/logo/hirefleX247.com-dark.png"
          alt="hirefleX247.com-dark"
        />
        {!isOpen ? (
          <img
            onClick={toggleSidebar}
            className="HeaderLogoView"
            src="/assets/logo/hirefleX247.com-dark.png"
            alt="hirefleX247.com-dark"

          />
        ) : (
          <div className="hembarIcon">
            <IconMapper iconName={"bars"} isFontAwesome={false} />
          </div>
        )}
      </div>
      <div className="header-right">
        <div className="name-container" onClick={togglePopup}>
          <h4>John</h4>
          <div className="icon-container">
            <ProfileImage src={profile} alt="Avatar" width="35px" height="35px" />
          </div>

          {isPopupOpen && (
            <div className="employee_popup">
              <ul>
                <Link to="/account" className="employee_popup-link">
                  <IconMapper iconName="account" isFontAwesome={true} /> Account
                </Link>
                <Link to="/inbox" className="employee_popup-link">
                  <IconMapper iconName="inbox" isFontAwesome={true} /> Inbox
                </Link>
                <Link to="/settings" className="employee_popup-link">
                  <IconMapper iconName="settings" isFontAwesome={true} />{" "}
                  Settings
                </Link>
                <Link to="/login" className="employee_popup-link" onClick={handleLogout}>
                  <IconMapper iconName="logout" isFontAwesome={true} /> Logout
                </Link>
              </ul>

              {isSettingsOpen && (
                <div className="settings-popup-wrapper">
                  <div className="settings-popup">
                    <ul>
                      <Link to="/profile" className="popup-link">
                        <IconMapper iconName="globe" isFontAwesome={true} /> Language
                      </Link>
                      <Link to="/password" className="popup-link">
                        <IconMapper iconName="lock" isFontAwesome={true} /> Password
                      </Link>
                      <Link to="/performance" className="popup-link">
                        <IconMapper iconName="chart-bar" isFontAwesome={true} /> Performance
                      </Link>
                      <Link to="/about" className="popup-link">
                        <IconMapper iconName="info-circle" isFontAwesome={true} /> About
                      </Link>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header >
  );
};

export default Header;
