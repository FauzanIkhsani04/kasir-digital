import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import "../assets/menu.css"; // Import the CSS file for styling

const AddMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "" });
  const [editingItemId, setEditingItemId] = useState(null);

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
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  // Handle add new menu item
  const handleAddMenuItem = async () => {
    if (newItem.name && newItem.price) {
      try {
        const docRef = await addDoc(collection(db, "menu"), {
          name: newItem.name,
          price: parseFloat(newItem.price),
        });
        setMenuItems([...menuItems, { id: docRef.id, ...newItem }]);
        setNewItem({ name: "", price: "" });
      } catch (error) {
        console.error("Error adding menu item:", error);
      }
    }
  };

  // Handle delete menu item
  const handleDeleteMenuItem = async (id) => {
    try {
      await deleteDoc(doc(db, "menu", id));
      setMenuItems(menuItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  // Handle edit menu item
  const handleEditMenuItem = (id) => {
    const item = menuItems.find((item) => item.id === id);
    setNewItem({ name: item.name, price: item.price });
    setEditingItemId(id);
  };

  const handleUpdateMenuItem = async () => {
    if (editingItemId && newItem.name && newItem.price) {
      try {
        await updateDoc(doc(db, "menu", editingItemId), {
          name: newItem.name,
          price: parseFloat(newItem.price),
        });
        setMenuItems(menuItems.map((item) => (item.id === editingItemId ? { id: editingItemId, ...newItem } : item)));
        setNewItem({ name: "", price: "" });
        setEditingItemId(null);
      } catch (error) {
        console.error("Error updating menu item:", error);
      }
    }
  };

  return (
    <div className="container">
      {/* Add New Menu Form */}
      <div className="form-container">
        <h2>Add New Menu</h2>
        <div className="form">
          <input type="text" placeholder="Menu Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} className="input" />
          <input type="number" placeholder="Price" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} className="input" />
          <button onClick={editingItemId ? handleUpdateMenuItem : handleAddMenuItem} className="button add-button">
            {editingItemId ? "Update Menu" : "Add Menu"}
          </button>
        </div>
      </div>

      {/* Menu Items Table */}
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>Rp {item.price}</td>
              <td>
                <button onClick={() => handleEditMenuItem(item.id)} className="button edit-button">
                  Edit
                </button>
              </td>
              <td>
                <button onClick={() => handleDeleteMenuItem(item.id)} className="button delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddMenu;
