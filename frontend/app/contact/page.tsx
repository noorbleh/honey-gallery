"use client";

import { useState } from "react";
import WaxSeal from "../../components/WaxSeal";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(
        "https://honey-gallery-production.up.railway.app/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main
      style={{
        padding: "120px 6%",
        background: "#f2eadd",
        minHeight: "100vh",
        fontFamily: "Playfair Display, serif",
      }}
    >
      {/* PAGE TITLE */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "44px",
          marginBottom: "8px",
          color: "#3a2e25",
        }}
      >
        Contact Honey’s Art Gallery
      </h1>

      <div
        style={{
          width: "120px",
          height: "3px",
          background: "#c7a66a",
          margin: "10px auto 50px",
        }}
      />

      {/* CARD */}
      <div
        style={{
          background: "white",
          maxWidth: "900px",
          margin: "0 auto",
          padding: "40px 50px",
          borderRadius: "14px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        }}
      >
        {/* SUCCESS MESSAGE */}
        {status === "success" && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <WaxSeal />

            <p
              style={{
                fontSize: "22px",
                marginTop: "10px",
                fontWeight: 600,
                color: "#3a2e25",
              }}
            >
              Your message has been sent!
            </p>

            <p
              style={{
                marginTop: "6px",
                color: "#4a4037",
                fontSize: "17px",
              }}
            >
              We’ve emailed you a confirmation. 💌
            </p>

            <p
              style={{
                fontSize: "20px",
                marginTop: "35px",
                color: "#3a2e25",
                textAlign: "right",
              }}
            >
              — Honey
            </p>
          </div>
        )}

        {/* CONTACT FORM */}
        {status !== "success" && (
          <>
            <h2
              style={{
                fontSize: "32px",
                marginBottom: "10px",
                color: "#3a2e25",
              }}
            >
              Write To Us
            </h2>

            <p
              style={{
                color: "#4a4037",
                fontSize: "17px",
                marginBottom: "35px",
                lineHeight: 1.6,
              }}
            >
              For commissions, print inquiries, collaborations or exhibitions,
              send us a message below. We usually respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "22px" }}>
              <div>
                <label style={{ fontSize: "15px", color: "#6b5c53" }}>
                  Your Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ fontSize: "15px", color: "#6b5c53" }}>
                  Your Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ fontSize: "15px", color: "#6b5c53" }}>
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  background: "#3a2e25",
                  color: "white",
                  padding: "12px 26px",
                  width: "180px",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: 600,
                  marginTop: "10px",
                  cursor: "pointer",
                }}
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}

/* SHARED INPUT STYLE */
const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid #c9b8a9",
  borderRadius: "6px",
  marginTop: "6px",
  fontFamily: "inherit",
  fontSize: "15px",
  outline: "none",
  background: "#faf7f2",
};
