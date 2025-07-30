import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const result = await axios.post("http://localhost:3000/signup", {
                username,
                password,
            });
            console.log("signup page result", result);
            return navigate("/login");
        } catch (err) {
            console.log("err msg", err.response);
            if (err.response.status == 400) {
                const msg = err.response?.data?.msg;
                setErrorMsg(msg);
            }
        }
    }

    return (
        <>
            <h1>Sign up</h1>
            {errorMsg && <h3>{errorMsg}</h3>}
            <form method="post" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <br />
                <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <label htmlFor="password">Password</label>
                <br />
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />

                <button type="submit">Signup</button>
            </form>
        </>
    );
}

export default Signup;
