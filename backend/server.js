// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

/**
 * INIT FIREBASE ADMIN – RAILWAY SAFE VERSION
 */
if (!process.env.GSERVICE_JSON) {
  console.error("❌ Missing GSERVICE_JSON env variable");
  process.exit(1);
}

let credential = admin.credential.cert(JSON.parse(process.env.GSERVICE_JSON));

admin.initializeApp({ credential });
const db = admin.firestore();

const SECRET = process.env.JWT_SECRET || "HONEY_GALLERY_SECRET";

// ---------------- AUTH MIDDLEWARE ----------------
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
}

// ---------------- LOGIN ----------------
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const q = await db
      .collection("admins")
      .where("username", "==", username)
      .limit(1)
      .get();

    if (q.empty) return res.status(404).json({ message: "Admin not found" });

    const doc = q.docs[0];
    const data = doc.data();

    const match = await bcrypt.compare(password, data.passwordHash);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: doc.id }, SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    console.error("login error", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------- ADD ARTWORK ----------------
app.post("/addArt", verifyToken, async (req, res) => {
  try {
    const { title, description, year, collection, imageUrl } = req.body;

    if (!imageUrl)
      return res.status(400).json({ message: "Image URL missing" });

    const docRef = await db.collection("artworks").add({
      title: title || "",
      description: description || "",
      year: year || "",
      collection: collection || null,
      imageUrl,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({ message: "Artwork saved", id: docRef.id });
  } catch (err) {
    console.error("addArt error", err);
    res.status(500).json({ message: "Upload failed" });
  }
});

// ---------------- GET ARTWORKS ----------------
app.get("/artworks", async (req, res) => {
  try {
    const c = req.query.collection;
    let snap;

    if (c) {
      snap = await db
        .collection("artworks")
        .where("collection", "==", c)
        .orderBy("createdAt", "desc")
        .get();
    } else {
      snap = await db.collection("artworks").orderBy("createdAt", "desc").get();
    }

    const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    res.json(rows);
  } catch (err) {
    console.error("get artworks error", err);
    res.status(500).json({ message: "Error fetching artworks" });
  }
});

// ---------------- GET COLLECTION LIST ----------------
app.get("/collections", async (req, res) => {
  try {
    const snap = await db.collection("artworks").get();
    const set = new Set();

    snap.docs.forEach((d) => {
      const col = d.data().collection;
      if (col) set.add(col);
    });

    const defaultCollections = [
      "C&G Collection",
      "Wall Collection",
      "Wc Collection",
      "Photography",
      "Postcards",
    ];

    const merged = Array.from(new Set([...defaultCollections, ...set]));

    res.json(merged.sort());
  } catch (err) {
    console.error("get collections error", err);
    res.status(500).json({ message: "Error fetching collections" });
  }
});

// ---------------- DELETE ARTWORK ----------------
app.delete("/artworks/:id", verifyToken, async (req, res) => {
  try {
    await db.collection("artworks").doc(req.params.id).delete();
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("delete error", err);
    res.status(500).json({ message: "Error deleting artwork" });
  }
});

// ---------------- ROOT ----------------
app.get("/", (req, res) => res.send("Backend is live!"));

// ---------------- START (RAILWAY SAFE) ----------------
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
