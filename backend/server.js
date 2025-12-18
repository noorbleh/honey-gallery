require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

const app = express();

/* --------- CORS (NODE 22 SAFE) --------- */
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

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const SECRET = process.env.JWT_SECRET || "HONEY_GALLERY_SECRET";

/* --------- FIREBASE LAZY INIT --------- */
let db;
function getDB() {
  if (db) return db;

  if (!process.env.GSERVICE_JSON) {
    throw new Error("GSERVICE_JSON missing");
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

/* --------- AUTH --------- */
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No token" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
}

/* --------- LOGIN --------- */
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
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* --------- CONTACT EMAIL --------- */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/contact", async (req, res) => {
  try {
    console.log("📩 CONTACT:", req.body);

    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Missing fields" });
    }

    await transporter.sendMail({
      from: `"Honey’s Art Gallery" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p>${message}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    res.status(500).json({ message: "Email failed" });
  }
});

/* --------- ROOT --------- */
app.get("/", (_, res) => res.send("Backend live"));

/* --------- START --------- */
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Backend running on port ${PORT}`)
);
