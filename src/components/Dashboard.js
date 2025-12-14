import { useEffect, useState } from "react";
import {
  getSweets,
  addSweet,
  buySweet,
  deleteSweet
} from "../services/api";
import "./Dashboard.css";

function Dashboard({ user, setPage }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {
    const data = await getSweets(user);
    setSweets(data);
  };

  const handleAdd = async () => {
    if (!name || !price || !quantity) return;
    await addSweet({
      name,
      price,
      quantity,
      username: user
    });
    setName("");
    setPrice("");
    setQuantity("");
    loadSweets();
  };

  const handleBuy = async (id) => {
    await buySweet(id);
    loadSweets();
  };

  const handleDelete = async (id) => {
    await deleteSweet(id);
    loadSweets();
  };

  const filtered = sweets.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <h2 className="welcome">🍭 Welcome {user}</h2>

      {/* ADD SWEET FORM */}
      <div className="add-form">
        <input
          placeholder="Sweet name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <input
          placeholder="Quantity"
          type="number"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
        />
        <button className="primary" onClick={handleAdd}>
          Add Sweet
        </button>
      </div>

      {/* SEARCH */}
      <div className="search-box">
        <input
          placeholder="🔍 Search sweets..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* SWEET LIST */}
      <div className="sweet-list">
        {filtered.map(s => (
          <div className="sweet-card" key={s.id}>
            <div className="sweet-info">
              🍩 <b>{s.name}</b> — ₹{s.price} — Qty: {s.quantity}
              {s.quantity === 0 && <span className="sold"> ❌ Sold Out</span>}
            </div>

            <div className="actions">
              <button
                className="secondary"
                disabled={s.quantity === 0}
                onClick={() => handleBuy(s.id)}
              >
                Buy
              </button>
              <button
                className="danger"
                onClick={() => handleDelete(s.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* LOGOUT */}
      <button className="logout" onClick={() => setPage("login")}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
