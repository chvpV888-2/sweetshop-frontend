import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import "./index.css";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  if (page === "login")
    return <Login setPage={setPage} setUser={setUser} />;

  if (page === "register")
    return <Register setPage={setPage} />;

  return <Dashboard user={user} setPage={setPage} />;
}

export default App;
