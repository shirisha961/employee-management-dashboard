import React, { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { isAuthenticated } from "./utils/auth";

function App() {
  const [auth, setAuth] = useState(isAuthenticated());

  return auth ? <Dashboard onLogout={() => setAuth(false)} /> : <Login onLogin={() => setAuth(true)} />;
}

export default App;
