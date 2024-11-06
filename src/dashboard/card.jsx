// src/components/Card.js
import React from "react";
import "../assets/card.css"; // You can create this file for specific Card styles

const Card = ({ size }) => {
  return <div className={`card ${size}`}></div>;
};

export default Card;
