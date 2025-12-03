"use client";

import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CollectionItem {
  name: string;
  description: string;
  image: string;
}

export default function GalleryIndex() {
  const [collections, setCollections] = useState<string[]>([]);

  // --- Collection details ---
  const collectionDetails: Record<string, CollectionItem> = {
    "C&G Collection": {
      name: "C&G Collection",
      description:
        "A refined set of graphite artworks, showcasing delicate shading, realism, and emotional depth.",
      image:
        "https://res.cloudinary.com/doqshkcln/image/upload/v1764520476/IMG_20251130_000631_rvn86g.png",
    },

    "Wall Collection": {
      name: "Wall Collection",
      description:
        "Bold, expressive wall paintings created with texture, depth, and immersive artistic storytelling.",
      image:
        "https://res.cloudinary.com/doqshkcln/image/upload/v1764520476/IMG_20251130_000458_rymids.png",
    },

    "Wc Collection": {
      name: "Wc Collection",
      description:
        "A premium selection of oil paintings — rich strokes, layered textures, timeless warmth.",
      image:
        "https://res.cloudinary.com/doqshkcln/image/upload/v1764686042/IMG_20251201_023159_ebsloc.jpg",
    },

    Photography: {
      name: "Photography",
      description:
        "Cinematic photographs captured by Honey — blending emotion, composition, and storytelling.",
      image:
        "https://res.cloudinary.com/doqshkcln/image/upload/v1764520442/photographycover_rfaobc.jpg",
    },

    Postcards: {
      name: "Postcards",
      description:
        "Whimsical hand-drawn postcards illustrated by Honey — charming, artistic, and collectible.",
      image:
        "https://res.cloudinary.com/doqshkcln/image/upload/v1764524676/IMG_20251129_230648_m4xmdx.jpg",
    },
  };

  // Fetch from backend
  useEffect(() => {
    axios
      .get("http://localhost:4000/collections")
      .then((res) => setCollections(res.data))
      .catch(() =>
        setCollections([
          "C&G Collection",
          "Wall Collection",
          "Wc Collection",
          "Photography",
          "Postcards",
        ])
      );
  }, []);

  // fallback
  const items =
    collections.length > 0
      ? collections
      : [
          "C&G Collection",
          "Wall Collection",
          "Wc Collection",
          "Photography",
          "Postcards",
        ];

  return (
    <div style={{ padding: "60px 10%" }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "48px",
          marginBottom: "60px",
          fontFamily: "Playfair Display, serif",
          letterSpacing: "1px",
        }}
      >
        Collections
      </h1>

      {/* LIST */}
      <div style={{ display: "grid", gap: "40px" }}>
        {items.map((name, idx) => {
          const info = collectionDetails[name];
          if (!info) return null;

          // ⭐ FIX FOR CG PAGE ROUTING ⭐
          const href =
            name === "C&G Collection"
              ? "/gallery/cg"
              : `/gallery/${encodeURIComponent(name)}`;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              style={{
                background: "#eee6d9",
                padding: "30px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "30px",
              }}
            >
              {/* TEXT */}
              <div style={{ maxWidth: "60%" }}>
                <h2 style={{ fontSize: "32px", marginBottom: "8px" }}>
                  {info.name}
                </h2>

                <p
                  style={{
                    opacity: 0.8,
                    lineHeight: 1.6,
                    fontSize: "16px",
                    marginBottom: "18px",
                  }}
                >
                  {info.description}
                </p>

                <Link
                  href={href}
                  style={{
                    padding: "10px 22px",
                    background: "#3c3029",
                    color: "white",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                >
                  Explore →
                </Link>
              </div>

              {/* IMAGE */}
              <motion.img
                src={info.image}
                alt={info.name}
                initial={{ scale: 1.1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                style={{
                  width: "230px",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
