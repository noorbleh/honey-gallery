// bulk-upload-wall.js
// Run with: node bulk-upload-wall.js

require("dotenv").config();
const admin = require("firebase-admin");
const path = require("path");

// Initialize Firebase Admin
let credential;
if (process.env.GSERVICE_JSON) {
  credential = admin.credential.cert(JSON.parse(process.env.GSERVICE_JSON));
} else {
  const svcPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    path.join(__dirname, "serviceAccountKey.json");
  credential = admin.credential.cert(require(svcPath));
}

admin.initializeApp({ credential });

const db = admin.firestore();

// ---------------- WALL COLLECTION ARTWORKS ----------------
const artworks = [
  {
    url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764680796/IMG_20251130_000643_hfs8vc.png",
    title: "Quiet Structure",
    desc: "A minimalist, expressive wall composition exploring balance and abstract contrast.",
  },
  {
    url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764680804/IMG_20251130_000440_exhuyp.png",
    title: "Chromatic Flow",
    desc: "A vibrant flow of layered colors, depth, and playful abstract form.",
  },
  {
    url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764680815/IMG_20251130_000458_kl8lyy.png",
    title: "Color Burst",
    desc: "A bold color-focused artwork showcasing striking contrasts and energy.",
  },
];

// ---------------- UPLOAD FUNCTION ----------------
async function uploadWallArt() {
  try {
    console.log("Uploading Wall Collection...");

    for (const art of artworks) {
      await db.collection("artworks").add({
        title: art.title,
        description: art.desc,
        year: "",
        collection: "Wall Collection",
        imageUrl: art.url,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log("Uploaded:", art.title);
    }

    console.log("\n✨ DONE! Wall Collection uploaded successfully.");
    process.exit();
  } catch (err) {
    console.error("❌ Upload error:", err);
    process.exit(1);
  }
}

uploadWallArt();