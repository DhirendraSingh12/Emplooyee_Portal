import React, { useState } from "react";
import "./SuperAdminHeader.css";
import IconMapper from "../../../components/IconMapper/IconMapper";
import { useNavigate, NavLink } from "react-router-dom";

const profile = "/assets/images/profile.jpg";

const Header = ({ isOpen, toggleSidebar }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const togglePopup = (e) => {
    e.stopPropagation();
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    if (isPopupOpen) {
      setIsPopupOpen(false);
    }
  };
  const logout = () => {
    navigate("/login");
  };
  return (
    <>
      {" "}
      <header className="SuperAdmin-header" onClick={closePopup}>
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
            alt="HireFlex 247 dark logo"
          />

          {!isOpen ? (
            <img
              onClick={toggleSidebar}
              className="HeaderLogoView"
              src="/assets/logo/hirefleX247.com-dark.png"
              alt="HireFlex 247 dark logo"
            />
          ) : (
            <div className="hembarIcon">
              <IconMapper iconName={"bars"} isFontAwesome={false} />
            </div>
          )}
        </div>
        <div className="header-right">
          {/* <div className="icon-container">
            <Link to="/admin/meetingRecordPage">
            <IconMapper iconName="MeetingIcon" className="MeetingRecoardIcon" />
            </Link>
          </div> */}
          <div className="name-container" onClick={togglePopup}>
            <h4>Jhon </h4>
            <div className="icon-container">
              <img src={profile} alt="Profile" className="headerprofile" />
            </div>
            {isPopupOpen && (
              <div className="popup">
                <ul>
                  <NavLink to="/account" className="popup-link">
                    <IconMapper iconName="account" isFontAwesome={true} />{" "}
                    Account
                  </NavLink>
                  <NavLink to="/inbox" className="popup-link">
                    <IconMapper iconName="inbox" isFontAwesome={true} /> Inbox
                  </NavLink>
                  <NavLink to="/settings" className="popup-link">
                    <IconMapper iconName="settings" isFontAwesome={true} />{" "}
                    Settings
                  </NavLink>
                  <NavLink to="/login" className="popup-link" onClick={logout}>
                    <IconMapper iconName="logout" isFontAwesome={true} /> Logout
                  </NavLink>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
