"use client";

import { useEffect } from "react";
// @ts-expect-error - no type declarations available for canvas-confetti
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

export default function Greeting({
  date,
  activity,
  onRestart,
}: {
  date: Date;
  activity: string;
  onRestart: () => void;
}) {
useEffect(() => {
  const interval = setInterval(() => {
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
    });
  }, 1200);

  return () => clearInterval(interval);
}, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-130 text-center bg-white/20 backdrop-blur-xl border border-white/30 p-10 rounded-3xl shadow-2xl"
    >
      {/* ICON */}
      <div className="text-7xl mb-4">💖</div>

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-white">
        It’s a Date! 🎉
      </h1>

      {/* MESSAGE */}
      <p className="text-pink-100 mt-3 text-lg">
        I can’t wait to spend this special moment with you ❤️
      </p>

      {/* DETAILS */}
      <div className="mt-6 bg-white/20 rounded-2xl p-4 text-white">
        <p className="text-lg">
          📅 {date.toDateString()}
        </p>
        <p className="text-lg mt-2">
          🎯 {activity}
        </p>
      </div>

      {/* EXTRA LOVE */}
      <p className="mt-6 text-pink-100 italic">
        “Every moment with you will be my favorite memory” 💕
      </p>

      {/* BUTTON */}
      <button
        onClick={onRestart}
        className="mt-6 bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-full text-white font-bold"
      >
        Plan Again 🔄
      </button>
    </motion.div>
  );
}