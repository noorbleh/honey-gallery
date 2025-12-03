require("dotenv").config();
const admin = require("firebase-admin");
const path = require("path");

// Load Firebase service account
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

// ---------------- POSTCARD DATA ----------------
const artworks = [
  {
    url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764524676/IMG_20251129_230648_m4xmdx.jpg",
    title: "Delicate Bloom",
    desc: "Whimsical floral illustration capturing soft gradients and tender strokes.",
  },
  {
    url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764524672/IMG_20251129_233155_blldop.jpg",
    title: "Warm Letter",
    desc: "A cozy hand-drawn postcard expressing emotion through warm tones and gentle texture.",
  },
  {
    url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764520463/postcardcover_z2a5mr.jpg",
    title: "Whispered Lines",
    desc: "Soft, minimal, carefully balanced sketchwork forming soothing harmony.",
  },
  {
    url: "https://res.cloudinary.com/doqshkcln/image/upload/v1764674814/IMG_20251129_232356_pnkfst.jpg",
    title: "Sunny Note",
    desc: "A bright, cheerful postcard piece radiating warmth and positivity.",
  },
];

async function uploadAll() {
  console.log("Uploading Postcards...");

  for (const art of artworks) {
    await db.collection("artworks").add({
      title: art.title,
      description: art.desc,
      year: "",
      imageUrl: art.url,
      collection: "Postcards",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log("Uploaded →", art.title);
  }

  console.log("Done! All Postcards uploaded.");
  process.exit();
}

uploadAll();