"use client";

import { motion } from "framer-motion";

export default function PrintsPage() {
  return (
    <main style={{ background: "#f6f2ea", overflowX: "hidden" }}>
      {/* =====================================================
          PARALLAX HERO SECTION
      ====================================================== */}
      <section
        style={{
          height: "90vh",
          backgroundImage: "url('/prints-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // ⭐ PARALLAX MAGIC
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Dark gradient overlay for readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.2))",
            zIndex: 1,
          }}
        />

        {/* TEXT OVER IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          style={{
            position: "relative",
            zIndex: 2,
            color: "white",
            textAlign: "center",
            padding: "20px",
            maxWidth: "900px",
          }}
        >
          <h1
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "48px",
              marginBottom: "18px",
            }}
          >
            Fine Art Prints
          </h1>

          <p
            style={{
              fontSize: "20px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            Explore high-resolution giclée prints created from original works,
            offering a meaningful and collectible way to experience Honey’s art.
          </p>

          <motion.a
            href="/contact"
            whileHover={{ scale: 1.07, backgroundColor: "#2b231e" }}
            whileTap={{ scale: 0.93 }}
            style={{
              marginTop: "25px",
              display: "inline-block",
              padding: "14px 28px",
              background: "#3c3029",
              color: "white",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
            }}
          >
            Contact Us
          </motion.a>
        </motion.div>
      </section>

      {/* =====================================================
          PRINT INFORMATION SECTION
      ====================================================== */}
      <section style={{ padding: "80px 7%" }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          style={{
            maxWidth: "1050px",
            margin: "0 auto",
            textAlign: "left",
          }}
        >
          <h2
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "36px",
              marginBottom: "22px",
              color: "#3d3d3d",
            }}
          >
            About the Prints
          </h2>

          <p
            style={{
              fontSize: "19px",
              lineHeight: 1.8,
              color: "#4a4a4a",
              marginBottom: "18px",
            }}
          >
            These fine art giclée prints are high-resolution scans of the
            original artworks created in limited runs. They preserve every stroke,
            shade, and emotional detail present in the originals.
          </p>

          <p
            style={{
              fontSize: "19px",
              lineHeight: 1.8,
              color: "#4a4a4a",
              marginBottom: "18px",
            }}
          >
            Printed using archival inks on museum-grade paper, each print is made
            to last decades without fading, making them perfect for collectors,
            interior spaces, and art enthusiasts looking for meaningful additions
            to their homes.
          </p>

          <p
            style={{
              fontSize: "19px",
              lineHeight: 1.8,
              color: "#4a4a4a",
            }}
          >
            Whether you’re drawn to emotional graphite pieces, immersive
            watercolours, or surrealistic compositions — each print captures the
            artist’s world in a deeply personal and lasting way.
          </p>
        </motion.div>
      </section>

      {/* =====================================================
          OPTIONAL: SUBTLE DIVIDER
      ====================================================== */}
      <div
        style={{
          width: "100%",
          height: "1px",
          background: "rgba(0,0,0,0.1)",
          margin: "40px 0",
        }}
      ></div>

      {/* =====================================================
          FUTURE: MORE PRINTS GRID (if needed)
      ====================================================== */}
      <section style={{ padding: "40px 7%", opacity: 0.7, textAlign: "center" }}>
        <p
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "22px",
            color: "#5a5a5a",
          }}
        >
          More prints coming soon…
        </p>
      </section>
    </main>
  );
}
