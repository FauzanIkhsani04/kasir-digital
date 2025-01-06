import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "../assets/sidebar.css";
import "../dashboard/dashboard.jsx";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      {/* <div className="logo-container">
        <img src="./sukuna.png" alt="Logo" className="logo" />
      </div> */}

      <nav className="menu">
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/order">Kasir</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
