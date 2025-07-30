import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Signup from "./routes/signup";
import Login from "./routes/Login";
import "./App.css";
import Tasks from "./routes/Tasks";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
    const navigate = useNavigate();
    async function handleLogout(e) {
        await axios.post("http://localhost:3000/logout");
        navigate("/login");
    }
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/signup">
                            <button>Signup</button>{" "}
                        </Link>
                        <Link to="/login">
                            <button>Login</button>{" "}
                        </Link>
                        <Link to="/tasks">
                            <button>Tasks</button>{" "}
                        </Link>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/tasks" element={<Tasks />} />
            </Routes>
        </div>
    );
}

export default App;
