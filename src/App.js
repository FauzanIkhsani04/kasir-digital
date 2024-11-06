// src/App.js
import React from "react";
import Sidebar from "../src/dashboard/sidebar.jsx";
import Header from "../src/dashboard/header.jsx";
import Dashboard from "../src/dashboard/dashboard.jsx";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Sidebar />
      <main className="content">
        <Header />
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
