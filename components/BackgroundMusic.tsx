"use client";

import { useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/romantic.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggle}
        className="fixed bottom-4 right-4 bg-white/20 backdrop-blur-xl text-white px-4 py-2 rounded-full border border-white/30"
      >
        {playing ? "🔊 Music On" : "🔈 Music Off"}
      </button>
    </>
  );
}