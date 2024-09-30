import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faRotate,
  faPenToSquare,
  faDownload,
  faPlus,
  faHome,
  faAngleRight,
  faBars,
  faUser,
  faSignOutAlt,
  faEnvelope,
  faCog, 
  faClose,
  faCalendar,
  faArrowDown,
  faArrowUp,
  faLock,        // Add this for Password icon
  faChartBar,    // Add this for Performance icon
  faInfoCircle,   // Add this for About icon
  faGlobe 

} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

import { Icons } from "../assets/Icons";

const iconMap = {
  trash: faTrash,
  rotate: faRotate,
  pen: faPenToSquare,
  download: faDownload,
  plus: faPlus,
  home: faHome,
  right: faAngleRight,
  bars: faBars,
  linkedin: faLinkedin,
  account: faUser,
  logout: faSignOutAlt,
  inbox: faEnvelope,
  settings: faCog,
  close: faClose,
  calendar:faCalendar,
  arrowDown: faArrowDown,
  arrowUp: faArrowUp,
  lock: faLock,            // Lock icon for Password
  "chart-bar": faChartBar, // Chart bar icon for Performance
  "info-circle": faInfoCircle, // Info circle icon for About
  globe: faGlobe
};

const IconMapper = ({ iconName, isFontAwesome = false, ...props }) => {
  if (isFontAwesome) {
    const icon = iconMap[iconName];
    if (!icon) {
      console.error(`FontAwesome icon ${iconName} not found.`);
      return null;
    }
    return <FontAwesomeIcon icon={icon} {...props} />;
  } else {
    const Icon = Icons[iconName];
    if (!Icon) {
      console.error(`Image icon ${iconName} not found.`);
      return null;
    }
    return <img src={Icon} alt={iconName} {...props} />;
  }
};

export default IconMapper;
