// Automatically switches to your Render backend when deployed
const BASE = window.location.hostname === "localhost"
  ? "http://localhost:8080"
  : "https://sweetshop-backend-efqb.onrender.com";

export async function login(username, password) {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function register(username, password) {
  const res = await fetch(`${BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error("Register failed");
  return res.json();
}

export async function getSweets(username) {
  const res = await fetch(`${BASE}/api/sweets/${username}`);
  return res.json();
}

export async function addSweet(data) {
  const res = await fetch(`${BASE}/api/sweets/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function buySweet(id) {
  return fetch(`${BASE}/api/sweets/buy/${id}`, { method: "POST" });
}

export async function deleteSweet(id) {
  return fetch(`${BASE}/api/sweets/${id}`, { method: "DELETE" });
}