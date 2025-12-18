require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

const app = express();

/* ---------------- CORS (FINAL FIX) ---------------- */
app.use(
  cors({
    origin: [
      "https://honeysartgalleryy.vercel.app",
      "https://honeysartgalleryy-git-main-noorblehs-projects.vercel.app",
    ],
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// handle preflight explicitly
app.options("*", cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const SECRET = process.env.JWT_SECRET || "HONEY_GALLERY_SECRET";

/* ---------------- FIREBASE LAZY INIT ---------------- */
let db;

function getDB() {
  if (db) return db;

  if (!process.env.GSERVICE_JSON) {
    throw new Error("GSERVICE_JSON missing at runtime");
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(process.env.GSERVICE_JSON)
      ),
    });
  }

  db = admin.firestore();
  return db;
}

/* ---------------- AUTH MIDDLEWARE ---------------- */
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
}

/* ---------------- LOGIN ---------------- */
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = getDB();

    const q = await db
      .collection("admins")
      .where("username", "==", username)
      .limit(1)
      .get();

    if (q.empty) return res.status(404).json({ message: "Admin not found" });

    const doc = q.docs[0];
    const match = await bcrypt.compare(password, doc.data().passwordHash);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: doc.id }, SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    console.error("login error", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- ADD ART ---------------- */
app.post("/addArt", verifyToken, async (req, res) => {
  try {
    const db = getDB();
    const { title, description, year, collection, imageUrl } = req.body;

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

/* ---------------- CONTACT EMAIL ---------------- */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/contact", async (req, res) => {
  try {
    console.log("📩 Contact request received:", req.body);

    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Missing fields" });
    }

    await transporter.sendMail({
      from: `"Honey’s Art Gallery" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("❌ CONTACT EMAIL ERROR:", err);
    res.status(500).json({ message: "Failed to send email" });
  }
});

/* ---------------- ROOT ---------------- */
app.get("/", (_, res) => res.send("Backend is live"));

/* ---------------- START ---------------- */
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
