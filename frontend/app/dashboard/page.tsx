"use client";

import axios from "axios";
import { useEffect, useState, ChangeEvent } from "react";

interface Artwork {
  id: number;
  title: string;
  year: string;
  description: string;
  imageUrl: string;
  collection: string;
}

export default function DashboardPage() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [collection, setCollection] = useState("");
  const [collections, setCollections] = useState<string[]>([]);

  const [artworks, setArtworks] = useState<Artwork[]>([]);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  useEffect(() => {
    loadArtworks();

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/collections`)
      .then((res) => {
        // Make sure it's always string[]
        const list: string[] = res.data as string[];

        setCollections(list);
        if (list.length > 0) setCollection(list[0]);
      })
      .catch(() => {
        const fallback = [
          "C&G Collection",
          "Wall Collection",
          "Wc Collection",
          "Photography",
          "Postcards"
        ];

        setCollections(fallback);
        setCollection("C&G Collection");
      });
  }, []);

  const loadArtworks = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/artworks`);
    setArtworks(res.data);
  };

  // preview selected image
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(null);
  };

  // upload artwork
  const uploadArtwork = async () => {
    if (!image) return alert("Select an image");

    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onloadend = async () => {
      const base64 = reader.result;

      const cloud = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({
          image: base64,
          folder: "artworks",
        }),
      });

      const uploaded = await cloud.json();

      if (!uploaded.url) return alert("Cloud upload error");

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/addArt`,
        {
          title,
          year,
          description,
          collection,
          imageUrl: uploaded.url,
        },
        {
          headers: { Authorization: token ?? "" },
        }
      );

      alert("Artwork uploaded!");
      setTitle("");
      setYear("");
      setDescription("");
      setImage(null);
      setPreview(null);

      loadArtworks();
    };
  };

  const deleteArtwork = async (id: number) => {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/artworks/${id}`,
      {
        headers: { Authorization: token ?? "" },
      }
    );

    loadArtworks();
  };

  return (
    <div style={{ padding: 36 }}>
      <h1 style={{ fontSize: 34 }}>Admin Dashboard — Upload Art</h1>

      <div style={{ marginTop: 20, display: "grid", gap: 10, maxWidth: 700 }}>
        
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ minHeight: "80px" }}
        />

        <label>
          Collection:
          <select
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
            style={{ marginLeft: 10 }}
          >
            {collections.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}

            <option value="">-- New collection --</option>
          </select>
        </label>

        <input type="file" onChange={handleFileChange} />

        {preview && (
          <img
            src={preview}
            style={{
              width: 200,
              marginTop: 12,
              borderRadius: 8,
              objectFit: "cover",
            }}
          />
        )}

        <button
          onClick={uploadArtwork}
          style={{
            width: 140,
            padding: 10,
            background: "#4a3d36",
            color: "#fff",
            borderRadius: 8,
          }}
        >
          Upload
        </button>
      </div>

      <h2 style={{ marginTop: 40 }}>Your Artworks</h2>

      <div style={{ display: "grid", gap: 18 }}>
        {artworks.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              background: "#eee6d9",
              padding: 12,
              borderRadius: 8,
            }}
          >
            <img
              src={item.imageUrl}
              style={{
                width: 160,
                height: 120,
                objectFit: "cover",
                borderRadius: 6,
              }}
            />

            <div>
              <div style={{ fontWeight: 700 }}>
                {item.title} — {item.year}
              </div>
              <div style={{ opacity: 0.7 }}>{item.collection}</div>
            </div>

            <div style={{ marginLeft: "auto" }}>
              <button
                onClick={() => deleteArtwork(item.id)}
                style={{
                  background: "#b94f4f",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: 6,
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
