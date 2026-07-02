"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Heart = {
  id: number;
  x: number;
  duration: number;
  delay: number;
};

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      duration: 6 + Math.random() * 5,
      delay: Math.random() * 5,
    }));

    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-200 text-2xl"
          initial={{
            x: `${heart.x}vw`,
            y: "100vh",
            opacity: 0,
          }}
          animate={{
            y: "-10vh",
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
          }}
        >
          💖
        </motion.div>
      ))}
    </div>
  );
}