import React, { useEffect, useState } from "react";
import "../assets/dashboard.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase/firebase";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [incomeData, setIncomeData] = useState(null);

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
            label: "Harga Menu (IDR)",
            data: values,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    };

    const fetchOrderHistory = async () => {
      const orderData = [];
      const orderQuery = query(collection(db, "Nota"), orderBy("timestamp", "desc"), limit(5));
      const querySnapshot = await getDocs(orderQuery);
      querySnapshot.forEach((doc) => {
        const { customer, paid } = doc.data();
        orderData.push({ id: doc.id, customer, paid });
      });
      setOrderHistory(orderData);
    };

    fetchChartData();
    fetchOrderHistory();
  }, []);

  useEffect(() => {
    const fetchIncomeData = async () => {
      const today = new Date();
      const startDate = new Date();
      startDate.setDate(today.getDate() - 6); // 7 hari terakhir

      const incomeQuery = query(collection(db, "Nota"), where("timestamp", ">=", startDate.toISOString()), where("timestamp", "<=", today.toISOString()), orderBy("timestamp", "asc"));

      const querySnapshot = await getDocs(incomeQuery);
      const incomeMap = {};

      querySnapshot.forEach((doc) => {
        const { paid, timestamp } = doc.data();
        const date = new Date(timestamp).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

        if (!incomeMap[date]) {
          incomeMap[date] = 0;
        }

        incomeMap[date] += paid;
      });

      const labels = Object.keys(incomeMap);
      const values = Object.values(incomeMap);

      setIncomeData({
        labels,
        datasets: [
          {
            label: "Pemasukan (IDR)",
            data: values,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      });
    };

    fetchIncomeData();
  }, []);

  return (
    <div className="dashboard-container">
      <main className="content">
        <header className="header">
          <div className="date-selector">Desember 2024 - Januari 2025</div>
        </header>
        <section className="dashboard">
          <div className="dashboard-cards">
            <div className="card large-card">
              <h3>Grafik Harga Menu</h3>
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

            <div className="card large-card">
              <h3>Riwayat Order</h3>
              {orderHistory.length > 0 ? (
                <ul className="order-history-list">
                  {orderHistory.map((order) => (
                    <li key={order.id} className="order-item">
                      <p>
                        <strong>Customer:</strong> {order.customer}
                      </p>
                      <p>
                        <strong>Total Bayar:</strong> Rp {order.paid}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No orders.</p>
              )}
            </div>

            <div className="card large-card">
              <h3>Pemasukan 7 Hari Terakhir</h3>
              {incomeData ? (
                <Bar
                  data={incomeData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              ) : (
                <p>Loading Income Data...</p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
