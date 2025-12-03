"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
          WebkitBackdropFilter: "blur(25px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          fontFamily: "Playfair Display, serif",
          padding: isMobile ? "0 16px" : "0 6%",
        }}
      >
        {/* LEFT — desktop only */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "28px" }}>
            <NavLink href="/">home</NavLink>
            <NavLink href="/gallery">portfolio</NavLink>
            <NavLink href="/prints">prints</NavLink>
          </div>
        )}

        {/* CENTER LOGO */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
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

        {/* RIGHT SIDE — GOLD GLOW DOT / MOBILE MENU */}
        {!isMobile ? (
          // GOLD PULSING DOT
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#c7a66a",
              boxShadow: "0 0 12px rgba(199,166,106,0.8)",
            }}
          ></motion.div>
        ) : (
          // MOBILE MENU BUTTON
          <button
            onClick={() => setMenuOpen(true)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              border: "1px solid rgba(0,0,0,0.1)",
              background: "rgba(255,255,255,0.6)",
              fontSize: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              backdropFilter: "blur(12px)",
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
              display: "flex",
              flexDirection: "column",
              paddingTop: "120px",
              textAlign: "center",
            }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                position: "absolute",
                top: 24,
                right: 20,
                width: 42,
                height: 42,
                borderRadius: 10,
                border: "none",
                background: "rgba(255,255,255,0.1)",
                color: "white",
                fontSize: 20,
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            <MobileLink href="/" onClick={() => setMenuOpen(false)}>
              home
            </MobileLink>
            <MobileLink href="/gallery" onClick={() => setMenuOpen(false)}>
              portfolio
            </MobileLink>
            <MobileLink href="/prints" onClick={() => setMenuOpen(false)}>
              prints
            </MobileLink>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        paddingBottom: "4px",
        fontSize: "16px",
        color: "#3f372f",
        textDecoration: "none",
      }}
    >
      {children}
      <span
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: hover ? "100%" : "0%",
          height: "2px",
          background: "#c7a66a",
          transition: "width 0.3s ease",
        }}
      ></span>
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
    <Link
      href={href}
      onClick={onClick}
      style={{
        color: "white",
        fontSize: "28px",
        textDecoration: "none",
        margin: "18px 0",
        display: "block",
        fontWeight: 300,
        letterSpacing: "1px",
      }}
    >
      {children}
    </Link>
  );
}
