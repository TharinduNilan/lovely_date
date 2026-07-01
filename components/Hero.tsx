"use client";

import { motion } from "framer-motion";
import MovingNoButton from "./MovingNoButton";

export default function Hero({ onYes }: { onYes: () => void }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white/20 backdrop-blur-xl border border-white/30 p-10 rounded-3xl text-center shadow-2xl w-105"
    >
      <div className="text-6xl mb-4">💖</div>

      <h1 className="text-4xl font-bold text-white">
        Will you go on a date with me?
      </h1>

      <p className="text-pink-100 mt-3">
        I promise it'll be amazing ✨
      </p>

      <div className="mt-8 flex justify-center gap-6 relative h-12">
        <button
          onClick={onYes}
          className="bg-pink-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-110 transition animate-[pulse_1.5s_ease-in-out_infinite]"
        >
          Yes ❤️
        </button>

        <MovingNoButton />
      </div>
    </motion.div>
  );
}