"use client";

import { motion } from "framer-motion";

export default function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-200 text-2xl"
          initial={{
            x: Math.random() * 100 + "vw",
            y: "100vh",
            opacity: 0,
          }}
          animate={{
            y: "-10vh",
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          💖
        </motion.div>
      ))}
    </div>
  );
}