// backend/create-admin.js
require("dotenv").config();
const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

let credential;
if (process.env.GSERVICE_JSON) {
  credential = admin.credential.cert(JSON.parse(process.env.GSERVICE_JSON));
} else {
  const svcPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(__dirname, "serviceAccountKey.json");
  credential = admin.credential.cert(require(svcPath));
}
admin.initializeApp({ credential });

const db = admin.firestore();

async function create() {
  const username = process.env.NEW_ADMIN_USERNAME || "honey";
  const password = process.env.NEW_ADMIN_PASSWORD || "honeysartgallery";
  const hash = await bcrypt.hash(password, 10);

  const adminsRef = db.collection("admins");
  // store by auto-generated doc (or you can use username as doc id)
  await adminsRef.add({ username, passwordHash: hash, createdAt: admin.firestore.FieldValue.serverTimestamp() });
  console.log("Created admin:", username);
  process.exit(0);
}
create().catch((e) => { console.error(e); process.exit(1); });
