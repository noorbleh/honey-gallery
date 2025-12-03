"use client";

import { motion } from "framer-motion";

export default function WaxSeal() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 30% 30%, #8b3a2d, #5a1d17 70%, #3b0f0b)",
        boxShadow:
          "0 8px 16px rgba(0,0,0,0.4), inset 0 4px 10px rgba(255,255,255,0.15)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "22px auto",
      }}
    >
      {/* GOLD H */}
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "48px",
          fontWeight: 700,
          color: "#d7b26a",
          textShadow: "0 0 8px rgba(215,178,106,0.8)",
        }}
      >
        H
      </motion.span>

      {/* SHINE SWEEP */}
      <motion.div
        initial={{ x: "-150%" }}
        animate={{ x: "150%" }}
        transition={{
          delay: 0.8,
          duration: 1.8,
          repeat: Infinity,
          repeatDelay: 2,
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "40px",
          height: "120px",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
          transform: "skewX(-25deg)",
        }}
      />
    </motion.div>
  );
}
