import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, year, description, collectionName, imageUrl } = body;

    const docRef = await addDoc(collection(db, "artworks"), {
      title,
      year,
      description,
      collectionName,
      imageUrl,
      createdAt: Date.now(),
    });

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
