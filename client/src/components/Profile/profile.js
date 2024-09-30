import React from "react";
import "./Profile.css";

export const ProfileImage = ({ src, alt, width, height }) => {
  return (
    <div
      className="Employee-profile-image"
      style={{
        backgroundImage: `url(${src})`,
        width: width,
        height: height,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "50%",
      }}
      aria-label={alt}
    />
  );
};
