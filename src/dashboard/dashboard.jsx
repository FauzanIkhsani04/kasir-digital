// src/components/Dashboard.js
import React from "react";
import Card from "./card";
import "../assets/dashboard.css"; // You can create this file for specific Dashboard styles

const Dashboard = () => {
  return (
    <section className="dashboard">
      <h2>Dashboard</h2>
      <p>Way to manage sales</p>
      <div className="card-container">
        <Card size="large" />
        <Card size="small" />
        <Card size="small" />
        <Card size="medium" />
        <Card size="medium" />
      </div>
    </section>
  );
};

export default Dashboard;
