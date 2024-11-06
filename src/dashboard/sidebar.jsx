// src/components/Sidebar.js
import React from "react";
import "../assets/sidebar.css"; // You can create this file for specific Sidebar styles

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">Website</div>
      <nav className="menu">
        <h3>Menu</h3>
        <ul>
          <li>
            <a href="#">Feature</a>
          </li>
          <li>
            <a href="#">Feature</a>
          </li>
          <li>
            <a href="#">Feature</a>
          </li>
          <li>
            <a href="#">Feature</a>
          </li>
        </ul>
        <h3>General</h3>
        <ul>
          <li>
            <a href="#">Feature</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
