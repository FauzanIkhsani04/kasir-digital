import React from "react";
import "../assets/dashboard.css"; // Import the CSS file for styling

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <main className="content">
        <header className="header">
          <div className="date-selector">November 2024 - December 2024</div>
        </header>
        <section className="dashboard">
          <div className="dashboard-cards">
            <div className="card large-card"></div>
            <div className="card small-card"></div>
            <div className="card small-card"></div>
            <div className="card medium-card"></div>
            <div className="card medium-card"></div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
