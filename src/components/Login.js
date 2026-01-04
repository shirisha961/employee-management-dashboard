import React, { useState } from "react";
import { login } from "../utils/auth";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(username, password)) {
            onLogin();
        } else {
            alert("Invalid Login");
        }
    };

    return (
        <div className="login-container">
            <h2>Employee Dashboard Login</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Username" onChange={e => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
