"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function MovingNoButton() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <motion.button
      onMouseEnter={() =>
        setPos({
          x: Math.random() * 200 - 100,
          y: Math.random() * 120 - 60,
        })
      }
      animate={pos}
      transition={{ type: "spring", stiffness: 400 }}
      className="bg-gray-200 px-6 py-2 rounded-full absolute"
    >
      No 😅
    </motion.button>
  );
}