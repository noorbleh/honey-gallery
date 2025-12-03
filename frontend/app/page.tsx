"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function HomePage() {
  return (
    <main style={{ overflowX: "hidden", background: "#f6f2ea" }}>
      <Navbar />

      {/* =====================================================
          HERO SECTION — FIXED PARALLAX SCROLL
      ====================================================== */}
      <section
        style={{
          height: "100vh",
          width: "100%",
          backgroundImage: "url('/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // ⭐ HERO STAYS STILL
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "60px",
          position: "relative",
        }}
      >
        {/* DARK OVERLAY */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.22)",
          }}
        ></div>

        {/* HERO TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "0 22px",
            color: "white",
          }}
        >
          <h1
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "52px",
              marginBottom: "18px",
            }}
          >
            Honey’s Art Gallery
          </h1>

          <p
            style={{
              fontSize: "19px",
              lineHeight: 1.7,
              maxWidth: "700px",
              margin: "0 auto",
              color: "rgba(255,255,255,0.92)",
            }}
          >
            A curated exhibition of graphite & watercolour work exploring
            emotion, stillness, and intimate storytelling.
          </p>
        </motion.div>
      </section>

      {/* =====================================================
          WELCOME SECTION
      ====================================================== */}
      <section style={{ padding: "60px 6%" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              flex: "0 1 420px",
              background: "#ebe6dd",
              padding: "14px",
              borderRadius: "12px",
              boxShadow: "0px 8px 25px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src="https://res.cloudinary.com/doqshkcln/image/upload/v1764773414/boyfriend_ijdfje.jpg"
              style={{
                width: "100%",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ flex: "1 1 420px" }}
          >
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "34px",
                marginBottom: "12px",
              }}
            >
              Welcome
            </h2>

            <p
              style={{
                lineHeight: 1.7,
                color: "#3d3d3d",
                fontSize: "18px",
              }}
            >
              Honey is a self-taught graphite artist, oil painter, and photographer whose work blends precision with emotional storytelling, drawing from surreal and dreamlike themes. His creations explore the quiet spaces between reality and imagination, capturing fleeting moments, inner worlds, and the subtle emotions that words cannot express.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          FEATURED COLLECTIONS
      ====================================================== */}
      <section
        style={{
          marginTop: "120px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: "#eae3d9",
            borderRadius: "18px",
            overflow: "hidden",
            width: "92%",
            maxWidth: "1200px",
            height: "300px",
            display: "flex",
            boxShadow: "0px 10px 30px rgba(0,0,0,0.12)",
          }}
        >
          <img
            src="https://res.cloudinary.com/doqshkcln/image/upload/v1764686039/Screenshot_2025-12-02_at_8.03.08_PM_zluihx.png"
            style={{
              width: "50%",
              objectFit: "cover",
              height: "100%",
            }}
          />

          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "32px",
                marginBottom: "12px",
                color: "#3c3029",
              }}
            >
              Explore Collections
            </h2>

            <p
              style={{
                color: "#53473f",
                fontSize: "16px",
                maxWidth: "340px",
                marginBottom: "18px",
                lineHeight: 1.6,
              }}
            >
              Discover Honey’s curated graphite, charcoal and watercolour series,
              each capturing emotion, detail, and quiet storytelling.
            </p>

            <motion.a
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              href="/gallery"
              style={{
                padding: "12px 26px",
                background: "#3c3029",
                color: "white",
                borderRadius: "8px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              View Collections
            </motion.a>
          </div>
        </motion.div>
      </section>

                       {/* =====================================================
          PRINTS PREVIEW — 3D MUSEUM SPOTLIGHT EFFECT
      ====================================================== */}
      <section style={{ padding: "120px 6%", background: "#f6f2ea" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {/* Museum Wall + Spotlight */}
          <div
            style={{
              position: "relative",
              padding: "120px 40px",
              background: "#f1ece2",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 18px 45px rgba(0,0,0,0.14)",
            }}
          >
            {/* Spotlight Cone */}
            <div
              style={{
                position: "absolute",
                top: "-10%",
                left: "50%",
                width: "140%",
                height: "200%",
                transform: "translateX(-50%)",
                background:
                  "radial-gradient(ellipse at top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 20%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.25) 100%)",
                filter: "blur(40px)",
                opacity: 0.65,
                pointerEvents: "none",
              }}
            />

            {/* Painting Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              whileHover={{ scale: 1.02, y: -6 }}
              style={{
                position: "relative",
                background: "#fff",
                padding: "14px",
                borderRadius: "14px",
                width: "90%",
                margin: "0 auto",
                boxShadow: `
                  0 12px 30px rgba(0,0,0,0.25),
                  inset 0 0 20px rgba(0,0,0,0.12)
                `,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Painting Image */}
              <img
                src="https://res.cloudinary.com/doqshkcln/image/upload/v1764773413/prints-preview_lxcbpv.jpg"
                style={{
                  width: "100%",
                  height: "430px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  filter: "brightness(1.03) contrast(1.05)",
                }}
              />

              {/* Frame Shadow (3D Depth) */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "14px",
                  boxShadow:
                    "0 25px 40px rgba(0,0,0,0.28)",
                  zIndex: -1,
                }}
              ></div>
            </motion.div>
          </div>

          {/* TEXT */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            style={{
              maxWidth: "900px",
              margin: "40px auto 22px",
              fontFamily: "Georgia, serif",
              fontSize: "18px",
              lineHeight: 1.7,
              color: "#3e3e3e",
            }}
          >
            Prints offer a refined way to experience Honey’s artwork through
            high-resolution giclée reproductions — preserving emotion, technique,
            and every deliberate stroke.
          </motion.p>

          {/* BUTTON */}
          <motion.a
            href="/prints"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            style={{
              padding: "12px 28px",
              background: "#3c3029",
              color: "white",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "16px",
              textDecoration: "none",
              display: "inline-block",
              marginTop: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            View Available Prints
          </motion.a>
        </div>
      </section>

      {/* =====================================================
    TOOLS SECTION — with Contact Button
====================================================== */}
<section style={{ padding: "40px 6%" }}>
  <div
    style={{
      maxWidth: 1100,
      margin: "0 auto",
      background: "#eee7db",
      borderRadius: 14,
      padding: "40px",
      display: "flex",
      gap: 40,
      flexWrap: "wrap",
      alignItems: "center",
    }}
  >
    <img
      src="https://res.cloudinary.com/doqshkcln/image/upload/v1764520459/homepage_g21mqw.jpg"
      style={{
        width: "100%",
        maxWidth: "420px",
        borderRadius: 12,
        objectFit: "cover",
      }}
    />

    <div style={{ flex: "1 1 400px" }}>
      <h2
        style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "32px",
          marginBottom: 12,
        }}
      >
        Behind The Work
      </h2>

      <p style={{ lineHeight: 1.7, color: "#444", marginBottom: "22px" }}>
        Every piece begins with tools, light, and emotion — forming the
        quiet foundation of Honey’s artistic world.
      </p>

      {/* CONTACT BUTTON */}
      <motion.a
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        href="/contact"
        style={{
          padding: "12px 26px",
          background: "#3c3029",
          color: "white",
          borderRadius: "8px",
          fontWeight: 700,
          letterSpacing: "0.5px",
          boxShadow: "0px 4px 14px rgba(0,0,0,0.15)",
          display: "inline-block",
          cursor: "pointer",
          fontSize: "15px",
          transition: "0.3s",
        }}
      >
        Contact Us
      </motion.a>
    </div>
  </div>
</section>

      
      {/* =====================================================
          QUOTE
      ====================================================== */}
      <section
        style={{
          padding: "100px 6%",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1489348611450-4c0d746d89e7?q=80&w=2000')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
          color: "#3c3029",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "38px",
            maxWidth: 800,
            margin: "0 auto",
            textShadow: "0 0 8px rgba(41, 29, 29, 0.36)",
          }}
        >
          “Art allows us to find ourselves and lose ourselves at the same time.”
        </motion.h2>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer
        style={{
          padding: "24px 6%",
          background: "#e7dfd4",
          borderTop: "1px solid rgba(0,0,0,0.05)",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "14px",
          }}
        >
          <div
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "17px",
            }}
          >
            Honey’s Art Gallery {new Date().getFullYear()}
          </div>

          <div style={{ display: "flex", gap: "18px", fontSize: "16px" }}>
            <a
              href="https://www.instagram.com/ashmedh.singh?igsh=MXc2OXBnMm9rOGd2dA=="
              target="_blank"
            >
              Instagram
            </a>
            <a href="https://www.youtube.com/@ashmedhsingh8154" target="_blank">
              YouTube
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
