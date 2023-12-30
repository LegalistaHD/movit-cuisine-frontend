// pages/Admin/login.jsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Login.module.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const saveTokenToLocalStorage = (token) => {
    localStorage.setItem("token", token);
  };

  const handleClick = async () => {
    setError(""); // Reset error message on new login attempt
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token; // Assuming the token is received in response data
        saveTokenToLocalStorage(token); // Save token to localStorage
        router.push("/Admin"); // Redirect to the admin page
      } else {
        // Handle specific error messages if your API returns them
        setError(data.message || "An error occurred during login.");
      }
    } catch (err) {
      setError("An error occurred during login.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>
        <input
          placeholder="username"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick} className={styles.button}>
          Sign In
        </button>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default Login;
