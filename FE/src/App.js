import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../src/dashboard/sidebar.jsx";
import Dashboard from "../src/dashboard/dashboard.jsx";
import Order from "../src/order/order.jsx";
import Menu from "../src/order/menu.jsx";
import Login from "../src/dashboard/login.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="*"
          element={
            <div className="container">
              <Sidebar />
              <main className="content">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/menu" element={<Menu />} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
