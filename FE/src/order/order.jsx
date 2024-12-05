import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase"; // Adjust path as necessary
import { collection, getDocs } from "firebase/firestore";
import "../assets/order.css";

const Order = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [customerName, setCustomerName] = useState("Customer's Name");
  const [orderNumber, setOrderNumber] = useState(0);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [showPaymentPopup, setShowPaymentPopup] = useState(false); // State for showing payment popup

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

  const handleClearOrder = () => {
    setSelectedItems([]);
  };

  const handlePlaceOrder = () => {
    setShowPaymentPopup(true); // Show the payment popup when the order is placed
  };

  const subtotal = selectedItems.reduce((acc, item) => acc + item.price, 0);
  const total = subtotal;

  return (
    <div className="app">
      {/* Left Panel: Menu Items */}
      <div className="menu">
        <div className="header">
          <div className="date">{currentDate}</div>
          <div className="time">{currentTime}</div>
          <button className="close-order" onClick={handleClearOrder}>
            Close Order
          </button>
        </div>

        <div className="categories">
          <button className="category active">All Menu</button>
          <button className="category">Sate</button>
          <button className="category">Minuman</button>
          <button className="category">Sop</button>
          <button className="category">Lainnya</button>
        </div>

        <input className="search" type="text" placeholder="Search something on your mind" />

        <div className="menu-items">
          {menuItems.map((item) => (
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
          <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Enter Customer's Name" className="customer-name-input" />
          <input type="number" value={orderNumber} onChange={(e) => setOrderNumber(Number(e.target.value))} placeholder="Order Number" className="order-number-input" />
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
            <div className="no-items">No Item Selected</div>
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
          Place Order
        </button>
      </div>

      {/* Payment Popup */}
      {showPaymentPopup && (
        <div className="payment-popup">
          <div className="popup-content">
            <h3>Select Payment Method</h3>
            <button className="payment-option" onClick={() => alert("Payment via Cash")}>
              Cash
            </button>
            <button className="payment-option" onClick={() => alert("Payment via QRIS")}>
              QRIS
            </button>
            <button className="close-popup" onClick={() => setShowPaymentPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
