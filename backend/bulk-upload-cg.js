require("dotenv").config();
const admin = require("firebase-admin");
const path = require("path");

// Load service account
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

// ---------- YOUR CG ARTWORK LINKS ----------
const artworks = [
  {
    title: "CG Artwork 1",
    year: "2024",
    description: "",
    imageUrl: "https://res.cloudinary.com/doqshkcln/image/upload/v1764520476/IMG_20251130_000631_rvn86g.png",
    collection: "C&G Collection",
  },
  {
    title: "CG Artwork 2",
    year: "2024",
    description: "",
    imageUrl: "https://res.cloudinary.com/doqshkcln/image/upload/v1764524640/3_rsibnk.jpg",
    collection: "C&G Collection",
  },
  {
    title: "CG Artwork 3",
    year: "2024",
    description: "",
    imageUrl: "https://res.cloudinary.com/doqshkcln/image/upload/v1764524674/IMG_20251130_000515_wgrjlf.png",
    collection: "C&G Collection",
  },
  {
    title: "CG Artwork 4",
    year: "2024",
    description: "",
    imageUrl: "https://res.cloudinary.com/doqshkcln/image/upload/v1764524680/IMG_20251130_000546_kyjzrp.png",
    collection: "C&G Collection",
  },
  {
    title: "CG Artwork 5",
    year: "2024",
    description: "",
    imageUrl: "https://res.cloudinary.com/doqshkcln/image/upload/v1764524680/IMG_20251130_000605_lltnn8.png",
    collection: "C&G Collection",
  },
  {
    title: "CG Artwork 6",
    year: "2024",
    description: "",
    imageUrl: "https://res.cloudinary.com/doqshkcln/image/upload/v1764524681/IMG_20251130_000534_vuzeuq.png",
    collection: "C&G Collection",
  },
  {
    title: "CG Artwork 7",
    year: "2024",
    description: "",
    imageUrl: "https://res.cloudinary.com/doqshkcln/image/upload/v1764524693/1_lmubtn.png",
    collection: "C&G Collection",
  },
];

async function run() {
  for (const art of artworks) {
    await db.collection("artworks").add({
      ...art,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log("Uploaded:", art.title);
  }
  console.log("All CG artworks uploaded!");
}

run();
