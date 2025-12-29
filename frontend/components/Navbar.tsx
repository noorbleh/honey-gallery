"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔊 Ambient audio ON by default
  const [audioOn, setAudioOn] = useState(true);

  /* ---------------- SCREEN SIZE ---------------- */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ---------------- AMBIENT AUDIO (GLOBAL) ---------------- */
  useEffect(() => {
    let audio = document.getElementById("ambient-audio") as HTMLAudioElement | null;

    // Create audio once for entire site
    if (!audio) {
      audio = document.createElement("audio");
      audio.id = "ambient-audio";
      audio.src = "/ambient.mp3";
      audio.loop = true;
      audio.volume = 0.17;
      audio.preload = "auto";
      audio.setAttribute("playsinline", "true");
      document.body.appendChild(audio);
    }

    const tryPlay = () => {
      if (audioOn && audio!.paused) {
        audio!.play().catch(() => {});
      }
    };

    // Required browser user interaction
    window.addEventListener("pointerdown", tryPlay, { once: true });
    window.addEventListener("scroll", tryPlay, { once: true });
    window.addEventListener("keydown", tryPlay, { once: true });

    return () => {
      window.removeEventListener("pointerdown", tryPlay);
      window.removeEventListener("scroll", tryPlay);
      window.removeEventListener("keydown", tryPlay);
    };
  }, [audioOn]);

  const toggleAudio = () => {
    const audio = document.getElementById("ambient-audio") as HTMLAudioElement | null;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {});
      setAudioOn(true);
    } else {
      audio.pause();
      setAudioOn(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "72px",
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0 16px" : "0 6%",
          background: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(25px)",
          WebkitBackdropFilter: "blur(25px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          fontFamily: "Playfair Display, serif",
        }}
      >
        {/* LEFT (DESKTOP) */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
            <NavLink href="/">home</NavLink>
            <NavLink href="/gallery">portfolio</NavLink>
            <NavLink href="/prints">prints</NavLink>

            {/* 🔊 AMBIENT TOGGLE */}
            <button
              onClick={toggleAudio}
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
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "26px",
            fontWeight: 600,
            color: "#c7a66a",
            letterSpacing: "2px",
          }}
        >
          H
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
              border: "1px solid rgba(0,0,0,0.1)",
              background: "rgba(255,255,255,0.6)",
              fontSize: 20,
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
              zIndex: 500,
              background: "rgba(0,0,0,0.85)",
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
                background: "rgba(255,255,255,0.1)",
                color: "white",
                fontSize: 20,
                border: "none",
              }}
            >
              ✕
            </button>

            <MobileLink href="/" onClick={() => setMenuOpen(false)}>home</MobileLink>
            <MobileLink href="/gallery" onClick={() => setMenuOpen(false)}>portfolio</MobileLink>
            <MobileLink href="/prints" onClick={() => setMenuOpen(false)}>prints</MobileLink>

            {/* MOBILE AMBIENT */}
            <button
              onClick={toggleAudio}
              style={{
                marginTop: "40px",
                padding: "10px 28px",
                borderRadius: "30px",
                border: "1px solid #c7a66a",
                background: audioOn ? "#c7a66a" : "transparent",
                color: "white",
                fontSize: "16px",
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

/* ---------------- LINKS ---------------- */

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
      />
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
        fontWeight: 300,
      }}
    >
      {children}
    </Link>
  );
}
