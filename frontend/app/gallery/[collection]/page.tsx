"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

interface Artwork {
  id: string;
  title: string;
  year: string;
  description: string;
  imageUrl: string;
  collection: string;
}

export default function CollectionPage() {
  const params = useParams();
  const raw = (params.collection as string) || "";

  // ------------------------------
  // UNIVERSAL NAME NORMALIZER
  // ------------------------------
  const nameMap: Record<string, string> = {
    "postcards": "Postcards",
    "c&g collection": "C&G Collection",
    "c%26g collection": "C&G Collection",
    "wall collection": "Wall Collection",
    "wc collection": "Wc Collection",
    "photography": "Photography",
  };

  const cleaned = decodeURIComponent(raw).toLowerCase().trim();
  const normalized = nameMap[cleaned] || decodeURIComponent(raw);
  const collectionName = normalized;

  // ------------------------------
  // STATE
  // ------------------------------
  const [items, setItems] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  // ------------------------------
  // LOAD ARTWORKS
  // ------------------------------
  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/artworks?collection=${encodeURIComponent(
          collectionName
        )}`
      )
      .then((res) => setItems(res.data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [collectionName]);

  // ------------------------------
  // RENDER
  // ------------------------------
  return (
    <div style={{ paddingTop: "130px", paddingBottom: "80px" }}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: "center",
          fontSize: "50px",
          fontFamily: "Playfair Display, serif",
          letterSpacing: "1px",
          marginBottom: "10px",
        }}
      >
        {collectionName}
      </motion.h1>

      {loading && (
        <p
          style={{
            textAlign: "center",
            marginTop: "40px",
            fontSize: "20px",
            opacity: 0.6,
          }}
        >
          Loading artworks…
        </p>
      )}

      {!loading && items.length === 0 && (
        <p
          style={{
            textAlign: "center",
            marginTop: "40px",
            fontSize: "20px",
            opacity: 0.6,
          }}
        >
          No artworks yet in this collection.
        </p>
      )}

      <div style={{ marginTop: "50px" }}>
        {items.map((art, index) => (
          <motion.div
            key={art.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              display: "flex",
              flexDirection: index % 2 === 0 ? "row" : "row-reverse",
              padding: "0 10%",
              gap: "40px",
              marginBottom: "140px",
              alignItems: "center",
            }}
          >
            <motion.img
              src={art.imageUrl}
              alt={art.title}
              style={{
                width: "50%",
                borderRadius: "16px",
                height: "450px",
                objectFit: "cover",
                boxShadow: "0 14px 30px rgba(0,0,0,0.18)",
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />

            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: "34px",
                  fontFamily: "Playfair Display, serif",
                  marginBottom: "14px",
                }}
              >
                {art.title}
              </h2>
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: 1.6,
                  opacity: 0.7,
                  maxWidth: "500px",
                }}
              >
                {art.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}