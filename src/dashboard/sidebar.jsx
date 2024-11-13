import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "../assets/sidebar.css";
import "../dashboard/dashboard.jsx";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <a href="/dashboard">Website</a>
      </div>
      <nav className="menu">
        <h3>Menu</h3>
        <ul>
          <li>
            <Link to="/order">Order</Link> {/* Use Link for navigation */}
          </li>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
