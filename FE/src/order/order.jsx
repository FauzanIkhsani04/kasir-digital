import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate for navigation
import { db } from "../firebase/firebase"; // Adjust path as necessary
import { collection, getDocs, addDoc } from "firebase/firestore";
import "../assets/order.css";
import { FaQrcode, FaMoneyBillWave } from "react-icons/fa"; // Import icons for QRIS and Cash

const Order = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]); // State for filtered items
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [showPaymentPopup, setShowPaymentPopup] = useState(false); // State for showing payment popup
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);
  const [cashPaid, setCashPaid] = useState(0);
  const [error, setError] = useState(""); // State for customer name validation
  const navigate = useNavigate();

  // Fetch menu items from Firestore
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "menu"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMenuItems(items);
        setFilteredItems(items); // Initially, all items are displayed
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };

    fetchMenuItems();
  }, []);

  // Update date and time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
      setCurrentDate(now.toLocaleDateString("en-US", options));
      setCurrentTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleAddItem = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const handleRemoveItem = (index) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const handlePlaceOrder = () => {
    if (!customerName.trim()) {
      setError("Harap Masukan Nama Pelanggan.");
      return;
    }
    setError("");
    setShowPaymentPopup(true); // Show the payment popup when the order is placed
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredItems(menuItems.filter((item) => item.name.toLowerCase().includes(query)));
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
    setShowPaymentPopup(false);
    setShowSummaryPopup(true);
  };

  const handleConfirmPayment = async () => {
    const orderDetails = selectedItems.reduce((acc, item, index) => {
      acc[`order-${index + 1}`] = item;
      return acc;
    }, {});

    try {
      await addDoc(collection(db, "Nota"), {
        customer: customerName,
        order: orderDetails,
        paid: total,
        "payment-method": paymentMethod,
        timestamp: new Date().toISOString(), // Add timestamp here
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving to Firestore:", error);
    }
  };

  const subtotal = selectedItems.reduce((acc, item) => acc + item.price, 0);
  const total = subtotal;
  const change = cashPaid - total;

  return (
    <div className="app">
      {/* Left Panel: Menu Items */}
      <div className="menu">
        <div className="header">
          <div className="date">{currentDate}</div>
          <div className="time">{currentTime}</div>
          <Link to="/menu" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Menu
          </Link>
        </div>

        <div className="categories">
          <button className="category active">Semua Menu</button>
        </div>

        <input className="search" type="text" placeholder="Temukan Menu" value={searchQuery} onChange={handleSearch} />

        <div className="menu-items">
          {filteredItems.map((item) => (
            <div className="menu-item" key={item.id} onClick={() => handleAddItem(item)}>
              <div className="item-name">{item.name}</div>
              <div className="item-price">Rp {item.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: Order Summary */}
      <div className="order-summary">
        <div className="order-header">
          <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Nama" className="customer-name-input" />
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="order-details">
          {selectedItems.length > 0 ? (
            selectedItems.map((item, index) => (
              <div className="order-item" key={index}>
                <span>{item.name}</span>
                <span>Rp {item.price}</span>
                <button className="remove-item-btn" onClick={() => handleRemoveItem(index)}>
                  Remove
                </button>
              </div>
            ))
          ) : (
            <div className="no-items">Tidak Ada Item</div>
          )}
        </div>

        {/* Order Summary */}
        <div className="summary">
          <div className="subtotal">
            <span>Subtotal</span>
            <span>Rp {subtotal}</span>
          </div>
          <div className="total">
            <span>TOTAL</span>
            <span>Rp {total}</span>
          </div>
        </div>

        <button className="payment-btn" onClick={handlePlaceOrder}>
          Pesan
        </button>
      </div>

      {/* Payment Popup */}
      {showPaymentPopup && (
        <div className="payment-popup">
          <div className="popup-content">
            <h3>Pilih Metode Pembayaran</h3>
            <button className="payment-option" onClick={() => handlePaymentMethod("cash")}>
              <FaMoneyBillWave className="payment-icon" /> Cash
            </button>
            <button className="payment-option" onClick={() => handlePaymentMethod("qris")}>
              <FaQrcode className="payment-icon" /> QRIS
            </button>
            <button className="close-popup" onClick={() => setShowPaymentPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Summary Popup */}
      {showSummaryPopup && (
        <div className="summary-popup">
          <div className="popup-content">
            <h3>Rincian</h3>
            <ul>
              {selectedItems.map((item, index) => (
                <li key={index}>
                  {item.name} - Rp {item.price}
                </li>
              ))}
            </ul>
            <div className="total">Total: Rp {total}</div>
            {paymentMethod === "cash" && (
              <div>
                <input type="number" value={cashPaid} onChange={(e) => setCashPaid(Number(e.target.value))} placeholder="Enter payment amount" />
                <div>Kembalian: Rp {change >= 0 ? change : 0}</div>
              </div>
            )}
            <button className="confirm-btn" onClick={handleConfirmPayment}>
              Lunas
            </button>
            <button className="cancel-btn" onClick={() => setShowSummaryPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
