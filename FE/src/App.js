import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../src/dashboard/sidebar.jsx";
import Header from "../src/dashboard/header.jsx";
import Dashboard from "../src/dashboard/dashboard.jsx";
import Order from "../src/order/order.jsx";
import Menu from "../src/order/menu.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/order" element={<Order />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
