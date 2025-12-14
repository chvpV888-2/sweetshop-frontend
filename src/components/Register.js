import { useState } from "react";
import { register } from "../services/api";

export default function Register({ setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    try {
      await register(username, password);
      alert("Registered successfully");
      setPage("login");
    } catch {
      alert("Register failed");
    }
  }

  return (
    <div className="card big">
      <h2>📝 Register</h2>
      <input placeholder="Username" onChange={e=>setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      <button className="secondary" onClick={()=>setPage("login")}>Back</button>
    </div>
  );
}
