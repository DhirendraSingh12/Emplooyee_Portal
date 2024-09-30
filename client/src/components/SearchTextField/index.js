import React from 'react';
import './SearchInput.css'; 

const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input-text" 
    />
  );
};

export default SearchInput;
