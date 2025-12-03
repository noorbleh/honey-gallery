const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const artworks = [
  {
    title: "Warm Portrait",
    description: "A soft, emotionally rich portrait with warm tones and gentle structure.",
    imageUrl:
      "https://res.cloudinary.com/doqshkcln/image/upload/v1764686042/IMG_20251201_023159_ebsloc.jpg",
    collection: "Wc Collection",
    year: "",
  },
  {
    title: "Golden Evening",
    description: "A dreamy composition blending golden hues with expressive brushwork.",
    imageUrl:
      "https://res.cloudinary.com/doqshkcln/image/upload/v1764686039/Screenshot_2025-12-02_at_8.03.08_PM_zluihx.png",
    collection: "Wc Collection",
    year: "",
  },
  {
    title: "Blossom Bloom",
    description:
      "A tranquil oil painting study focusing on subtle gradients and fine textures.",
    imageUrl:
      "https://res.cloudinary.com/doqshkcln/image/upload/v1764520966/IMG_20251129_175809_ezvcog.jpg",
    collection: "Wc Collection",
    year: "",
  },
  {
    title: "Textured Whispers",
    description:
      "A bold and expressive oil artwork featuring depth, color, and organic movement.",
    imageUrl:
      "https://res.cloudinary.com/doqshkcln/image/upload/v1764686056/IMG_20251129_175220_gxnogi.png",
    collection: "Wc Collection",
    year: "",
  },
];

(async () => {
  for (const art of artworks) {
    const docRef = db.collection("artworks").doc();
    await docRef.set({
      ...art,
      createdAt: new Date().toISOString(),
    });
    console.log("Uploaded:", art.title);
  }

  console.log("Done!");
})();