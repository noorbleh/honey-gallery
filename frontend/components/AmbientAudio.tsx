"use client";
import { useEffect } from "react";

export default function AmbientAudio() {
  useEffect(() => {
    let audio = document.getElementById("ambient-audio") as HTMLAudioElement | null;

    if (!audio) {
      audio = document.createElement("audio");
      audio.id = "ambient-audio";
      audio.src = "/ambient.mp3";
      audio.loop = true;
      audio.volume = 0.17;
      document.body.appendChild(audio);
    }

    const unlock = () => audio!.play().catch(() => {});
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("scroll", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
  }, []);

  return null;
}
