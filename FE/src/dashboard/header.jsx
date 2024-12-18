// src/components/Header.js
import React from "react";
import "../assets/header.css"; // You can create this file for specific Header styles

const Header = () => {
  return (
    <header className="header">
      <input type="text" placeholder="Search anything" className="search-bar" />
      <div className="icons">
        <span role="img" aria-label="notifications">
          🔔
        </span>
        <span role="img" aria-label="email">
          📧
        </span>
        <span role="img" aria-label="user">
          👤
        </span>
      </div>
    </header>
  );
};

export default Header;
