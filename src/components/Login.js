import { useState } from "react";
import { login } from "../services/api";

export default function Login({ setPage, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      await login(username, password);
      setUser(username);
      setPage("dashboard");
    } catch {
      alert("Login failed");
    }
  }

  return (
    <div className="card big">
      <h2>🍭 Sweet Shop Login</h2>
      <input placeholder="Username" onChange={e=>setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button className="secondary" onClick={()=>setPage("register")}>Register</button>
    </div>
  );
}
