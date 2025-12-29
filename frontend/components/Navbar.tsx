"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [audioOn, setAudioOn] = useState(true);

  // ---------------- SCREEN SIZE ----------------
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ---------------- AUDIO SYNC ----------------
  useEffect(() => {
    const audio = document.getElementById("ambient-audio") as HTMLAudioElement | null;
    if (!audio) return;

    audioOn ? audio.play().catch(() => {}) : audio.pause();
  }, [audioOn]);

  return (
    <>
      <nav
        style={{
          width: "100%",
          height: "72px",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(25px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          fontFamily: "Playfair Display, serif",
          padding: isMobile ? "0 16px" : "0 6%",
        }}
      >
        {/* LEFT */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
            <NavLink href="/">home</NavLink>
            <NavLink href="/gallery">portfolio</NavLink>
            <NavLink href="/prints">prints</NavLink>

            {/* 🔊 AMBIENT TOGGLE */}
            <button
              onClick={() => setAudioOn((p) => !p)}
              style={{
                padding: "6px 14px",
                borderRadius: "18px",
                border: "1px solid #c7a66a",
                background: audioOn ? "#c7a66a" : "transparent",
                color: audioOn ? "white" : "#3f372f",
                fontSize: "13px",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              ambient {audioOn ? "on" : "off"}
            </button>
          </div>
        )}

        {/* CENTER LOGO */}
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <span
            style={{
              fontSize: "26px",
              fontWeight: 600,
              color: "#c7a66a",
              letterSpacing: "2px",
            }}
          >
            H
          </span>
        </div>

        {/* RIGHT */}
        {!isMobile ? (
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#c7a66a",
              boxShadow: "0 0 12px rgba(199,166,106,0.8)",
            }}
          />
        ) : (
          <button
            onClick={() => setMenuOpen(true)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: "rgba(255,255,255,0.6)",
              fontSize: 20,
            }}
          >
            ☰
          </button>
        )}
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.85)",
              zIndex: 500,
              paddingTop: "120px",
              textAlign: "center",
            }}
          >
            <MobileLink href="/" onClick={() => setMenuOpen(false)}>home</MobileLink>
            <MobileLink href="/gallery" onClick={() => setMenuOpen(false)}>portfolio</MobileLink>
            <MobileLink href="/prints" onClick={() => setMenuOpen(false)}>prints</MobileLink>

            <button
              onClick={() => setAudioOn((p) => !p)}
              style={{
                marginTop: "40px",
                padding: "10px 28px",
                borderRadius: "30px",
                border: "1px solid #c7a66a",
                background: audioOn ? "#c7a66a" : "transparent",
                color: "white",
              }}
            >
              ambient {audioOn ? "on" : "off"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={{ textDecoration: "none", color: "#3f372f" }}>
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link href={href} onClick={onClick} style={{ color: "white", fontSize: "28px" }}>
      {children}
    </Link>
  );
}
