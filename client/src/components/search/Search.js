import React from "react";
import { MdSearch } from "react-icons/md";
import "./Search.scss";

function Search({ onChange }) {
  const handleInputChange = (event) => {
    const newSearchText = event.target.value;
    onChange(newSearchText);
  };
  return (
    <div className="search-container">
      <div className="search">
        <MdSearch className="search-icon" size="1.3em" color="#4a4e51" />
        <input
          type="text"
          placeholder="seach here..."
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default Search;
