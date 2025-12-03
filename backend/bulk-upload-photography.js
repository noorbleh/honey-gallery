// bulk-upload-photography.js
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// ---------------------- PHOTOGRAPHY ARTWORKS ----------------------
const photos = [
  "https://res.cloudinary.com/doqshkcln/image/upload/v1764687488/PXL_20250707_133534385.PORTRAIT_wzakpm.jpg",
  "https://res.cloudinary.com/doqshkcln/image/upload/v1764687488/Screenshot_2025-11-29-17-35-12-573_com.android.chrome_jz9yjp.png",
  "https://res.cloudinary.com/doqshkcln/image/upload/v1764524639/photo_vtm4oo.jpg",
  "https://res.cloudinary.com/doqshkcln/image/upload/v1764520442/photographycover_rfaobc.jpg",
  "https://res.cloudinary.com/doqshkcln/image/upload/v1764706558/Screenshot_2025-12-03-01-10-38-747-edit_com.instagram.android_tm8xlf.jpg",
  "https://res.cloudinary.com/doqshkcln/image/upload/v1764706558/IMG_20251203_011801_gr7ndl.jpg",
  "https://res.cloudinary.com/doqshkcln/image/upload/v1764706558/Screenshot_2025-12-03-00-56-03-397-edit_com.instagram.android_sam4cr.jpg",
  "https://res.cloudinary.com/doqshkcln/image/upload/v1764706558/Screenshot_2025-12-03-00-55-35-514-edit_com.instagram.android_yjexfb.jpg",
  "https://res.cloudinary.com/doqshkcln/image/upload/v1764706603/IMG-20250330-WA0040_zt2lku.jpg",
  "https://res.cloudinary.com/doqshkcln/image/upload/v1764706690/Screenshot_2025-12-03-01-09-31-279-edit_com.instagram.android_znvba4.jpg",
  "https://res.cloudinary.com/doqshkcln/image/upload/v1764706691/Screenshot_2025-12-03-01-10-20-916-edit_com.instagram.android_ewwzn7.jpg",
  "https://res.cloudinary.com/doqshkcln/image/upload/v1764706690/IMG_20251203_011539_agigqu.jpg",
  "https://res.cloudinary.com/doqshkcln/image/upload/v1764706691/Screenshot_2025-12-03-00-54-04-643-edit_com.instagram.android_kqjoun.jpg",
  "https://res.cloudinary.com/doqshkcln/image/upload/v1764706692/Screenshot_2025-12-03-01-00-04-260_com.google.android.apps.photos_whqhpp.png",
  "https://res.cloudinary.com/doqshkcln/image/upload/v1764706741/Screenshot_2025-12-03-01-11-04-141-edit_com.instagram.android_sv6icn.jpg",
];

// auto-generate minimal titles
function autoTitle(index) {
  return `Photography ${index + 1}`;
}

// bulk upload function
async function uploadPhotos() {
  const batch = db.batch();

  photos.forEach((url, i) => {
    const docRef = db.collection("artworks").doc();

    batch.set(docRef, {
      title: autoTitle(i),
      description: "Captured moment.",
      imageUrl: url,
      collection: "Photography",
      year: "",
      createdAt: new Date(),
    });
  });

  try {
    await batch.commit();
    console.log("Uploaded Photography Collection Successfully!");
  } catch (err) {
    console.error("Error uploading:", err);
  }
}

uploadPhotos();