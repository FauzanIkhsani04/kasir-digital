import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../src/dashboard/sidebar.jsx";
import Header from "../src/dashboard/header.jsx";
import Dashboard from "../src/dashboard/dashboard.jsx";
import Order from "../src/order/order.jsx"; // Import your Order page
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <main className="content">
          <Header />
          {/* Define the Routes for your app */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
