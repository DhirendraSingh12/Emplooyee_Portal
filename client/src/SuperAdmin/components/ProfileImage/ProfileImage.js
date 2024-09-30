import React from 'react';
import './ProfileImage.css';

const ProfileImage = ({ src, alt = 'Profile Image', size }) => {
  return (
    <div className="Admin-profile-image-container" style={{ width: size, height: size }}>
      <img src={src || '/default-avatar.png'} alt={alt} className="Admin-profile-image" />
    </div>
  );
};

export default ProfileImage;
