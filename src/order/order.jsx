import React, { useState } from "react";
import "../assets/order.css";

const Order = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const menuItems = Array(12).fill({ name: "Cakes", price: 27000 });

  const handleAddItem = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const handleClearOrder = () => {
    setSelectedItems([]);
  };

  const subtotal = selectedItems.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="app">
      {/* Left Panel: Menu Items */}
      <div className="menu">
        <div className="header">
          <div className="date">Thursday, 25 March 2024</div>
          <div className="time">09:00 AM</div>
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
          {menuItems.map((item, index) => (
            <div className="menu-item" key={index} onClick={() => handleAddItem(item)}>
              <div className="item-name">{item.name}</div>
              <div className="item-price">Rp {item.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: Order Summary */}
      <div className="order-summary">
        <div className="order-header">
          <h2>Customer's Name</h2>
          <div>Order #000</div>
        </div>

        <div className="order-details">
          {selectedItems.length > 0 ? (
            selectedItems.map((item, index) => (
              <div className="order-item" key={index}>
                <span>{item.name}</span>
                <span>Rp {item.price}</span>
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
          <div className="tax">
            <span>Tax 5%</span>
            <span>Rp {tax}</span>
          </div>
          <div className="total">
            <span>TOTAL</span>
            <span>Rp {total}</span>
          </div>
        </div>

        <button className="payment-btn">Payment Method</button>
        <button className="place-order">Place Order</button>
      </div>
    </div>
  );
};

export default Order;
