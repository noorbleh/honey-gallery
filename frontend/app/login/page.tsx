"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // If user is already logged in → redirect to dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/dashboard");
  }, [router]);

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter username and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/login",
        { username, password }
      );

      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch (err) {
      alert("Incorrect username or password.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f6f2ea",
        fontFamily: "Playfair Display, serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", fontSize: "28px", color: "#3f372f" }}>
          Honey’s Art Gallery — Admin Login
        </h2>

        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: "12px",
            margin: "10px 0",
            width: "100%",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "12px",
            margin: "10px 0",
            width: "100%",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            background: "#3f372f",
            color: "white",
            borderRadius: "8px",
            width: "100%",
            fontWeight: "bold",
            letterSpacing: "0.5px",
            cursor: "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </div>
    </div>
  );
}
