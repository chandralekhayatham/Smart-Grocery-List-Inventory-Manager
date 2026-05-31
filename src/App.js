import React, { useState, useEffect } from "react";

function App() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Vegetables");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("groceryItems")) || []
  );

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("groceryItems", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!itemName || !quantity || !price) {
      alert("⚠ Please fill all fields");
      return;
    }

    const newItem = {
      itemName,
      quantity: Number(quantity),
      price: Number(price),
      category,
    };

    if (editIndex !== null) {
      const updated = [...items];
      updated[editIndex] = newItem;
      setItems(updated);
      setEditIndex(null);
    } else {
      setItems([...items, newItem]);
    }

    setItemName("");
    setQuantity("");
    setPrice("");
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const editItem = (index) => {
    const item = items[index];

    setItemName(item.itemName);
    setQuantity(item.quantity);
    setPrice(item.price);
    setCategory(item.category);

    setEditIndex(index);
  };

  const clearAll = () => {
    if (window.confirm("Delete all items?")) {
      setItems([]);
      localStorage.removeItem("groceryItems");
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.itemName.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  const grandTotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        background: darkMode ? "#1e1e1e" : "#f4f8ff",
        color: darkMode ? "white" : "black",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
          background: darkMode ? "#2d2d2d" : "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0px 0px 10px gray",
        }}
      >
        <div
  style={{
    display: "flex",
    justifyContent: "space-around",
    padding: "12px",
    background: "#0077ff",
    color: "white",
    borderRadius: "10px",
    marginBottom: "20px",
    fontWeight: "bold",
  }}
>
  <span>🏠 Dashboard</span>
  <span>📦 Inventory</span>
  <span>📊 Reports</span>
  <span>⚙ Settings</span>
</div>
        <h1 style={{ textAlign: "center", color: "#0077ff" }}>
          🛒 Smart Grocery List & Inventory Manager
        </h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "10px",
            marginBottom: "15px",
            background: "#444",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        <br />

        <input
          type="text"
          placeholder="🔍 Search Item"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px", width: "100%", marginBottom: "15px" }}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="📦 Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />

          <input
            type="number"
            placeholder="🔢 Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <input
            type="number"
            placeholder="💰 Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Vegetables</option>
            <option>Fruits</option>
            <option>Dairy</option>
            <option>Snacks</option>
            <option>Beverages</option>
          </select>

          <button
            onClick={addItem}
            style={{
              background: "#28a745",
              color: "white",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {editIndex !== null ? "✏ Update" : "➕ Add Item"}
          </button>

          <button
            onClick={clearAll}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            🗑 Clear All
          </button>
        </div>

        <h3>📊 Total Items: {items.length}</h3>

        <table
          border="1"
          width="100%"
          cellPadding="10"
          style={{ borderCollapse: "collapse" }}
        >
          <thead style={{ background: "#0099ff", color: "white" }}>
            <tr>
              <th>📦 Item</th>
              <th>🏷 Category</th>
              <th>🔢 Qty</th>
              <th>💰 Price</th>
              <th>🧾 Total</th>
              <th>📈 Status</th>
              <th>⚙ Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={index}>
                <td>{item.itemName}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>
                <td>₹{item.quantity * item.price}</td>

                <td>
                  {item.quantity < 5
                    ? "🔴 Low Stock"
                    : "🟢 In Stock"}
                </td>

                <td>
                  <button
                    onClick={() => editItem(index)}
                    style={{
                      background: "orange",
                      color: "white",
                      border: "none",
                      padding: "5px",
                      marginRight: "5px",
                    }}
                  >
                    ✏ Edit
                  </button>

                  <button
                    onClick={() => deleteItem(index)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "5px",
                    }}
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2
          style={{
            textAlign: "right",
            color: grandTotal > 5000 ? "red" : "green",
            marginTop: "20px",
          }}
        >
          💵 Grand Total: ₹{grandTotal}
         </h2>

        {grandTotal > 5000 && (
          <h3 style={{ color: "red", textAlign: "right" }}>
            ⚠ Budget Exceeded!
          </h3>
        )}
      </div>
    </div>
  );
}

export default App;