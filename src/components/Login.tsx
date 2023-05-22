import { navigate } from "raviger";
import React, { useState } from "react";
import { login } from "../utils/apiUtils";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const data = await login(username, password);
            localStorage.setItem("token", data.token);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
        <h1>Login</h1>
        </div>
    );
    }