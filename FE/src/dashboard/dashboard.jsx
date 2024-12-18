import React, { useEffect, useState } from "react";
import "../assets/dashboard.css"; // Import the CSS file for styling
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Pastikan konfigurasi Firebase benar

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      const menuData = [];
      const querySnapshot = await getDocs(collection(db, "menu"));
      querySnapshot.forEach((doc) => {
        menuData.push({ id: doc.id, ...doc.data() });
      });

      const labels = menuData.map((item) => item.name);
      const values = menuData.map((item) => item.price);

      setChartData({
        labels,
        datasets: [
          {
            label: "Menu Prices (IDR)",
            data: values,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    };

    fetchChartData();
  }, []);

  return (
    <div className="dashboard-container">
      <main className="content">
        <header className="header">
          <div className="date-selector">November 2024 - December 2024</div>
        </header>
        <section className="dashboard">
          <div className="dashboard-cards">
            {/* Large Card */}
            <div className="card large-card">
              <h3>Overview</h3>
            </div>

            {/* Small Cards */}
            <div className="card small-card">
              <h3>New Users</h3>
            </div>
            <div className="card small-card">
              <h3>Revenue</h3>
            </div>

            {/* Medium Card for Chart */}
            <div className="card medium-card">
              <h3>Menu Price Chart</h3>
              {chartData ? (
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              ) : (
                <p>Loading Chart...</p>
              )}
            </div>

            {/* Another Medium Card */}
            <div className="card medium-card">
              <h3>Tasks</h3>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
